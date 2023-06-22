// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.

import moment from "moment";
import prisma from "../prisma/prisma";
import { Prisma, Response } from "@prisma/client";
import { Resolvers, Mutation } from "./generated/graphql";

// import { fetchMutualFriends } from "./friendUtils";
import { responses } from "./utils";
import { calculateMutualFriends } from "./friendUtils";
import { Buffer } from "buffer";
// import { fileTypeFromBuffer } from "file-type";

// import {
//   generatePresignedUrl,
//   populateCoverPhotoForEvent,
//   populateProfilePictureForUser,
//   savePhoto,
//   saveUserEventPhoto,
//   saveUserPhoto,
// } from "./imageUtils";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

export const resolvers = {
  Query: {
    eventsByUserId: async (_, args, ctx) => {
      const hostedEvents = await prisma.event.findMany({
        where: {
          userId: args.iduser,
        },
        include: {
          user: true,
          comments: {
            include: {
              user: true,
            },
          },
          responses: {
            include: {
              user: true,
              event: true,
            },
          },
        },
      });
      const responses = await prisma.response.findMany({
        where: {
          userId: args.iduser,
        },
        include: {
          event: {
            include: {
              comments: {
                include: {
                  user: true,
                },
              },
              user: true,
              responses: {
                include: {
                  user: true,
                  event: true,
                },
              },
            },
          },
        },
      });
      // we want every response where they're not the user whose hosting - i.e. not response.event.userId
      const eventsFromResponses = responses
        .filter((r) => {
          if (r.event.userId !== args.iduser) return r.event;
        })
        .map((r) => r.event);
      const allEvents = hostedEvents.concat(eventsFromResponses).flat();
      // const eventsWithCoverPhotos = await Promise.all(
      //   allEvents.map((e) => {
      //     console.log(e.coverPhoto, "cover photo");
      //     if (e.coverPhoto) return populateCoverPhotoForEvent(e);
      //     return e;
      //   })
      // );
      return allEvents;
    },
    eventById: async (_, { input }, ctx) => {
      const event = await prisma.event.findUnique({
        where: {
          id: input.id,
        },
        include: {
          user: true,
          comments: {
            include: {
              user: true,
            },
          },
          eventPhotos: {
            include: {
              user: true,
            },
          },
          responses: {
            include: {
              user: true,
              event: true,
            },
          },
        },
      });
      console.log(event);

      return event;
    },
    userByEmail: async (_, args, ctx) => {
      const user = await prisma.user.findUnique({
        where: {
          email: args.email,
        },
        include: {
          friends: {
            include: {
              friend: true,
            },
          },
          events: true,
        },
      });
      return user;
    },
    userByPhone: async (_, args, ctx) => {
      const user = await prisma.user.findUnique({
        where: {
          phoneNumber: args.phoneNumber,
        },
        include: {
          friends: {
            include: {
              friend: true,
            },
          },
        },
      });
      console.log(user, "user");
      return user;
    },
    //   responsesByEventId: async (_, args, ctx) => {
    //     console.log(args, "args");
    //     const responses = await prisma.response.findMany({
    //       where: {
    //         eventId: args.eventId,
    //       },
    //       include: {
    //         user: true,
    //         event: true,
    //       },
    //     });
    //     console.log(responses);
    //     return responses;
    //   },
    //   friendRequestsByUserId: async (_, args, ctx) => {
    //     console.log(args, "args");
    //     // need the mutual friends here too!!
    //     try {
    //       const requests = await prisma.friendRequest.findMany({
    //         where: {
    //           receiver: args.activeuserId,
    //         },
    //         include: {
    //           // receiver: true,
    //           requestor: true,
    //         },
    //       });
    //       // fetchMutualFriends(requests[0].requestor.id, args.activeUserId);
    //       // console.log(requests);
    //       return requests;
    //     } catch (err) {
    //       console.log(err, "failure to fetch friend requests");
    //     }
    //   },
    //   friendshipsByUserId: async (_, args, ctx) => {
    //     // console.log(args, "args in friendships call");
    //     const { userId, activeUserId } = args;
    //     try {
    //       const user = await prisma.user.findFirst({
    //         where: {
    //           id: userId,
    //         },
    //         include: {
    //           friendships: {
    //             include: {
    //               friends: true,
    //             },
    //           },
    //         },
    //       });
    //       // const friends = user.friends;
    //       return user.friendships;
    //     } catch (err) {
    //       console.log("error fetching friends, ", err);
    //     }
    //   },
    //   eventInvitesByInviteeId: async (_, args, ctx) => {
    //     try {
    //       const eventInvites = await prisma.eventInvite.findMany({
    //         where: {
    //           inviteeId: args.userId,
    //         },
    //         include: {
    //           event: true,
    //           invitee: true,
    //           inviter: true,
    //         },
    //       });
    //       return eventInvites;
    //     } catch (err) {
    //       console.log("Failed to fetch invites", err);
    //     }
    //   },
    // },
  },
  Mutation: {
    createEvent: async (_, { input }, ctx) => {
      const {
        title,
        coverPhoto,
        location,
        description,
        startDate,
        category,
        endDate,
        privacy,
        userId,
        selectedFriends,
      } = input;
      console.log(input, "INPUT FOR CREATE EVENT");
      try {
        const event = await prisma.event.create({
          data: {
            createdOn: new Date().toString(),
            title,
            user: {
              connect: {
                id: userId,
              },
            },
            coverPhoto,
            category,
            location,
            description,
            startDate,
            endDate,
            privacy,
          },
        });
        // const eventPhotos3Key = await saveUserEventPhoto(event.id, coverPhoto);
        // await prisma.event.update({
        //   where: {
        //     id: event.id,
        //   },
        //   data: {
        //     coverPhoto: eventPhotos3Key,
        //   },
        // });
        // The active user is going
        await prisma.response.create({
          data: {
            event: {
              connect: {
                id: event.id,
              },
            },
            user: {
              connect: {
                id: userId,
              },
            },
            response: responses.GOING,
          },
        });
        // The active user is inviting friends
        if (selectedFriends.length > 0) {
          let invites = selectedFriends.map((friendId) => {
            return prisma.eventInvite.create({
              data: {
                event: {
                  connect: {
                    id: event.id,
                  },
                },
                invitee: {
                  connect: {
                    id: friendId,
                  },
                },
                inviter: {
                  connect: {
                    id: userId,
                  },
                },
              },
            });
          });
          try {
            const response = await Promise.allSettled(invites);
            console.log(response, "response from allSettled");
          } catch (err) {
            console.log(err, "error creating invites");
          }
        }
        // console.log("got here?");
        return await prisma.event.findFirst({
          where: {
            id: event.id,
          },
        });
      } catch (err) {
        console.log("error in create event", err);
      }
    },
    signUpUser: async (_, { input }, ctx) => {
      const {
        email,
        firstName,
        lastName,
        phoneNumber,
        bio,
        profilePhoto,
        coverPhoto,
      } = input;
      try {
        const user = await prisma.user.create({
          data: {
            email,
            firstName,
            phoneNumber,
            lastName,
            location: "Not developed yet",
            bio,
            profilePhoto,
            coverPhoto,
          },
        });
        return user;
      } catch (err) {
        console.log(err, "error creating user");
      }
    },
    updateEvent: async (_, { input }, ctx) => {
      console.log(input, "input");
      const {
        title,
        userId,
        coverPhoto,
        location,
        description,
        startDate,
        endDate,
        privacy,
        eventPhotos,
        id,
      } = input;
      // const newKey = await saveUserEventPhoto(eventId, coverPhoto);
      try {
        const event = await prisma.event.update({
          where: {
            id,
          },
          data: {
            title,
            // coverPhoto: newKey,
            location,
            description,
            startDate,
            endDate,
            eventPhotos: {
              upsert: eventPhotos.map((photo) => ({
                where: { id: photo.id },
                update: {
                  userId: photo.user.id,
                  url: photo.url,
                },
                create: {
                  userId: photo.user.id,
                  url: photo.url,
                },
              })),
            },
            privacy,
          },
        });
        console.log("edited event", event);
        return event;
      } catch (err) {
        console.log(err, "error in editing event");
      }
    },
    updateUserAttendance: async (_, { input }, ctx) => {
      const { userId, eventId, attendance } = input;
      try {
        const response = await prisma.response.findMany({
          where: {
            userId: userId,
            eventId: eventId,
          },
        });
        // i am not a backend developer, but this is what i came up with
        if (response.length > 0) {
          return await prisma.response.update({
            where: {
              id: response[0].id,
            },
            data: {
              response: attendance,
            },
          });
        }
      } catch (err) {
        return err;
      }
    },
    confirmFriendRequest: async (_, { input }, ctx) => {
      const { activeUserId, userId } = input;
      try {
        const user = await prisma.user.findFirst({
          where: {
            id: userId,
          },
          include: {},
        });
        const friend = await prisma.user.findFirst({
          where: {
            id: activeUserId,
          },
          include: {},
        });
        const mutualFriends = calculateMutualFriends(friend, user);
        const friendship = await prisma.friendship.create({
          data: {
            receiver: {
              connect: {
                id: activeUserId,
              },
            },
            sender: {
              connect: {
                id: userId,
              },
            },
            status: "accepted",
          },
          include: {
            receiver: true,
            sender: true,
          },
        });
        const friendRequest = await prisma.friendship.findFirst({
          where: {
            AND: [
              {
                receiverId: activeUserId,
              },
              {
                senderId: userId,
              },
            ],
          },
        });
        await prisma.friendship.update({
          where: {
            id: friendRequest.id,
          },
          data: {
            status: "accepted",
          },
        });
      } catch (err) {
        console.log("failure in confirming friend request", err);
        return err;
      }
    },
    addFriend: async (_, { input }, ctx) => {
      const { activeUserId, userId } = input;
      try {
        return await prisma.friendship.create({
          data: {
            status: "pending",
            receiver: {
              connect: {
                id: userId,
              },
            },
            sender: {
              connect: {
                id: activeUserId,
              },
            },
          },
        });
      } catch (err) {
        console.log(err, "error adding friend");
      }
    },
    inviteFriendToEvent: async (_, { input }, ctx) => {
      const { inviterId, inviteeId, eventId } = input;
      try {
        return await prisma.eventInvite.create({
          data: {
            invitee: {
              connect: {
                id: inviteeId,
              },
            },
            inviter: {
              connect: {
                id: inviterId,
              },
            },
            event: {
              connect: {
                id: eventId,
              },
            },
          },
        });
      } catch (err) {
        console.log(err, "Error inviting friend to the mf function");
      }
    },
    sendTextInvite: async (_, { input }, ctx) => {
      console.log("input", input);
      client.messages
        .create({
          body: "Sending this text from twillio as a TEST. Hey babe",
          from: "+12166068464",
          to: "+14018670228",
        })
        .then((message) => console.log(message.sid))
        .catch((err) => console.log(err, "error sending text invite"));
      return "string";
    },
    respondToEventInvite: async (_, { input }, ctx) => {
      const { eventId, activeUserId } = input;
      try {
        const response = await prisma.response.create({
          data: {
            eventId,
            userId: activeUserId,
            response: 3,
          },
        });
        const eventInvite = await prisma.eventInvite.findFirst({
          where: {
            eventId,
            inviteeId: activeUserId,
          },
        });
        console.log(eventInvite);
        await prisma.eventInvite.delete({
          where: {
            id: eventInvite?.id,
          },
        });
        return eventInvite;
      } catch (err) {
        console.log(err, "error responding to or deletting event invite");
      }
      // create a response that says they are going
    },
    addComment: async (_, { input }, ctx) => {
      try {
        const comment = await prisma.comment.create({
          data: {
            user: {
              connect: {
                id: input.userId,
              },
            },
            content: input.content,
            event: {
              connect: {
                id: input.eventId,
              },
            },
          },
        });
        return comment;
      } catch (err) {
        console.log(err, "error adding comment");
      }
    },
    // uploadUserPhoto: async (_, { input }, ctx) => {
    //   try {
    //     const { file, id, isCover } = input;
    //     const whatisreturned = await saveUserPhoto(id, file.uri, isCover);
    //     console.log(whatisreturned, "WHAT IS RETURNED");
    //     return whatisreturned;
    //   } catch (err) {
    //     console.log(err, "error uploadiong prof pic");
    //   }
    // },

    updateUserAttributes: async (_, { input }, ctx) => {
      console.log(input, "input");
      try {
        const user = await prisma.user.update({
          where: {
            id: input.id,
          },
          data: {
            ...input,
          },
          include: {
            friends: {
              include: {
                friend: true,
              },
            },
          },
        });
        return user;
      } catch (err) {
        console.log(err, "error updating user");
      }
    },
  },
  /* async (_, { input }, ctx) => {
    },
    */
};
