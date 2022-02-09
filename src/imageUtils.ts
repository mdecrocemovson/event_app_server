import { Readable } from "stream";
import s3 from "./s3";
import * as uuid from "uuid";
import { Event, User } from "@prisma/client";

import prisma from "../prisma/prisma";

const S3_BUCKET_NAME = process.env.PHOTO_S3_BUCKET;
const S3_KEY_PREFIX = process.env.PHOTO_S3_PREFIX || "dev/";
export const DEFAULT_PRESIGNED_URL_EXPIRATION =
  Number(process.env.DEFAULT_PRESIGNED_URL_EXPIRATION) || 7200;

export async function generatePresignedUrl(
  bucket: string,
  key: string,
  expiration: number
) {
  if (key) {
    const signedUrl = await s3.getSignedUrlPromise("getObject", {
      Bucket: bucket || S3_BUCKET_NAME,
      Key: key,
      Expires: expiration || DEFAULT_PRESIGNED_URL_EXPIRATION,
    });
    return signedUrl;
  }
  return "";
}

export async function saveUserPhoto(
  id: string,
  //   mimetype: string,
  base64: string,
  isCover: boolean
) {
  const keyUuid = uuid.v4();
  const s3Key = `${S3_KEY_PREFIX}user/${id}/${keyUuid}`;
  const buf = Buffer.from(
    base64.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );

  try {
    const uploadResult = await s3
      .upload({
        Bucket: S3_BUCKET_NAME,
        Body: buf,
        Key: s3Key,
        ContentType: "image/jpeg",
      })
      .promise();
    const user = isCover
      ? await prisma.user.update({
          where: { id: id },
          data: { coverPhotoKey: uploadResult.Key },
        })
      : await prisma.user.update({
          where: { id: id },
          data: { profilePhotoKey: uploadResult.Key },
        });

    return isCover
      ? populateCoverPhotoForUser(user)
      : populateProfilePictureForUser(user);
  } catch (err) {
    console.log("s3 error", err);
  }
}

export async function saveUserEventPhoto(
  id: string,
  //   mimetype: string,
  base64: string
) {
  const keyUuid = uuid.v4();
  const s3Key = `${S3_KEY_PREFIX}event/${id}/${keyUuid}`;
  const buf = Buffer.from(
    base64.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );

  try {
    const uploadResult = await s3
      .upload({
        Bucket: S3_BUCKET_NAME,
        Body: buf,
        Key: s3Key,
        ContentType: "image/jpeg",
      })
      .promise();
    return uploadResult.Key;
  } catch (err) {
    console.log("s3 error", err);
  }
}

export async function populateProfilePictureForUser(user: User) {
  try {
    const profilePictureUrl = await generatePresignedUrl(
      S3_BUCKET_NAME,
      user.profilePhotoKey
        ? user.profilePhotoKey
        : `${S3_KEY_PREFIX}user/profile-pic.png`,
      DEFAULT_PRESIGNED_URL_EXPIRATION
    );
    const packet = {
      ...user,
      profilePhoto: profilePictureUrl,
      coverPhoto: await generatePresignedUrl(null, user.coverPhotoKey, null),
    };
    return packet;
  } catch (err) {
    console.error(`Error retrieving profile picture ${err}`);
    return user;
  }
}

export async function populateCoverPhotoForEvent(event: Event) {
  try {
    const coverPhotoUrl = await generatePresignedUrl(
      S3_BUCKET_NAME,
      event.coverPhoto
        ? event.coverPhoto
        : `${S3_KEY_PREFIX}user/profile-pic.png`,
      DEFAULT_PRESIGNED_URL_EXPIRATION
    );
    console.log(coverPhotoUrl, "url from mf amazon IN EVENT");
    const packet = {
      ...event,
      coverPhoto: coverPhotoUrl,
    };
    return packet;
  } catch (err) {
    console.error(`Error retrieving profile picture ${err}`);
    return event;
  }
}

export async function populateCoverPhotoForUser(user: User) {
  try {
    const coverPhotoURL = await generatePresignedUrl(
      S3_BUCKET_NAME,
      user.profilePhotoKey
        ? user.profilePhotoKey
        : `${S3_KEY_PREFIX}user/profile-pic.png`,
      DEFAULT_PRESIGNED_URL_EXPIRATION
    );
    return {
      ...user,
      coverPhoto: coverPhotoURL,
      profilePhoto: generatePresignedUrl(null, user.profilePhotoKey, null),
    };
  } catch (err) {
    console.error(`Error retrieving profile picture ${err}`);
    return user;
  }
}
