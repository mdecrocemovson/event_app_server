// // import { Prisma, PrismaClient } from "@prisma/client";
// import prisma from "../prisma/prisma";
// // const prisma = new PrismaClient();

import { User } from "@prisma/client";

// export const fetchMutualFriends = async (user1Id, user2Id) => {
//   // await
//   const user1Friends = await prisma.friendship.findMany({
//     where: {
//       OR: [
//         {
//           user1Id,
//         },
//         {
//           user2Id: user1Id,
//         },
//       ],
//     },
//   });
//   const user2Friends = await prisma.friendship.findMany({
//     where: {
//       OR: [
//         {
//           user1Id: user2Id,
//         },
//         {
//           user2Id,
//         },
//       ],
//     },
//   });
//   console.log(user1Friends, "friends");
//   const user1FriendsSet = new Set(user1Friends);
//   console.log(user2Friends, "friends");
//   const user2FriendsSet = new Set(user2Friends);
//   const mutualFriends = new Set();

//   [
//   {
//     id: 'ckxqeoqa700123v7ozw2oj6sn',
//     user1Id: 'ckx6avhef0103ql7oqt8fufxo',
//     user2Id: 'ckxgpngxa0130hw7ohby0deg5'
//   }
// ] user1friends
// [
//   {
//     id: 'ckxqeoqa700123v7ozw2oj6sn',
//     user1Id: 'ckx6avhef0103ql7oqt8fufxo',
//     user2Id: 'ckxgpngxa0130hw7ohby0deg5'
//   }
// ] user2Freinds

//   for (let friend of user1Friends) {
//     //
//     if (user2FriendsSet.has(friend)) {
//     }
//   }

//   let friends = new Set(["Timmy", "John", "Greg", "Sophia", "Kate"]);
//   let friendTwo = new Set(["Nate", "John", "Kate", "Timmy", "Lee"]);
//   let mutualfriend = new Set();
//   for (let item of friendOne) {
//     if (friendTwo.has(item)) {
//       mutualfriend.add(item);
//     }
//   }

//   //   const result1 = await prisma.$queryRaw(Prisma.sql`SELECT *
//   //   FROM (
//   //     SELECT *
//   //     FROM "Friendship"
//   //     WHERE user1Id = ${user1Id}
//   //   ) p1 INNER JOIN (
//   //     SELECT *
//   //     FROM "Friendship"
//   //     WHERE user1Id = ${user1Id}
//   //   ) p2
//   //     ON p1.user2Id = p2.user2Id`);

//   //   const result2 = await prisma.$queryRaw(Prisma.sql`SELECT *
//   //   FROM (
//   //     SELECT *
//   //     FROM "Friendship"
//   //     WHERE user1Id = ${user1Id}
//   //   ) p1 INNER JOIN (
//   //     SELECT *
//   //     FROM "Friendship"
//   //     WHERE user1Id = ${user1Id}
//   //   ) p2
//   //     ON p1.user2Id = p2.user2Id`);

//   // ThIS WORKS
//   /*

//     SELECT * FROM (
//     SELECT *
//     FROM "Friendship" as f1
//     WHERE f1."user1Id" = 'ckx6avhef0103ql7oqt8fufxo'
//   ) as p1 INNER JOIN (
//     SELECT *
//     FROM "Friendship"
//     WHERE "user1Id"='ckx6avhef0103ql7oqt8fufxo'
//   ) as p2
//     ON p1."user2Id" = p2."user2Id"
//     */

//   // THIS IS UNTRIED
//   /*

//     $sql = "SELECT u.*
//           FROM friends f1
//     INNER JOIN friends f2 ON (f2.user2_id = f1.user2_id)
//     INNER JOIN user u ON (u.id = f2.user2_id)
//          WHERE f1.user1_id = '$user1_id'
//            AND f2.user1_id = '$user2_id'";
//            */

//   //   return result;
// };

export const getFriendsFromUser = (user) => {
  return user?.friendships?.map((friendship) => {
    const { friends } = friendship;
    return [friends[0].id, friends[1].id];
  });
};

export const calculateMutualFriends = (activeUser, friend) => {
  const totalFriendsActiveUser = getFriendsFromUser(activeUser);

  const totalFriendsFriend = getFriendsFromUser(friend);

  if (totalFriendsActiveUser.length === 0 || totalFriendsFriend.length === 0) {
    return 0;
  }

  // accounting for no friendships?
  // accounting for no friendships?

  const allFriends = totalFriendsActiveUser
    .flat()
    .concat(...totalFriendsFriend);

  console.log(allFriends);

  let allFriendsMap = {};

  for (let friend of allFriends) {
    if (allFriendsMap[friend]) {
      allFriendsMap[friend]++;
    } else {
      allFriendsMap[friend] = 1;
    }
  }

  let mutualFriendsCounter = 0;

  for (let entry in allFriendsMap) {
    if (allFriendsMap[entry] > 1) mutualFriendsCounter++;
  }

  console.log(allFriendsMap, "map");

  return mutualFriendsCounter;
};
