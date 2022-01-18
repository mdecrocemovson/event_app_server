// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.

import moment from "moment";
import prisma from "../prisma/prisma";
import { Prisma } from "@prisma/client";

// import { fetchMutualFriends } from "./friendUtils";
import { responses } from "./utils";
import { calculateMutualFriends } from "./friendUtils";
const AWS = require("aws-sdk");

import Amplify, { Storage } from "aws-amplify";
import awsconfig from "../src/aws-exports";
Amplify.configure(awsconfig);

export const resolvers = {
  Query: {
    eventsByUserId: async (_, args, ctx) => {
      const hostedEvents = await prisma.event.findMany({
        where: {
          userId: args.iduser,
        },
        include: {
          user: true,
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
          // response: responses.GOING,
        },
        include: {
          event: {
            include: {
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
      console.log(eventsFromResponses);

      const allEvents = hostedEvents.concat(eventsFromResponses).flat();
      return allEvents;
    },
    userByEmail: async (_, args, ctx) => {
      const user = await prisma.user.findUnique({
        where: {
          email: args.email,
        },
      });
      return user;
    },
    responsesByEventId: async (_, args, ctx) => {
      console.log(args, "args");
      const responses = await prisma.response.findMany({
        where: {
          eventId: args.eventId,
        },
        include: {
          user: true,
          event: true,
        },
      });
      console.log(responses);
      return responses;
    },
    friendRequestsByUserId: async (_, args, ctx) => {
      console.log(args, "args");
      // need the mutual friends here too!!

      try {
        const requests = await prisma.friendRequest.findMany({
          where: {
            receiver: args.activeuserId,
          },
          include: {
            // receiver: true,
            requestor: true,
          },
        });

        // fetchMutualFriends(requests[0].requestor.id, args.activeUserId);

        // console.log(requests);
        return requests;
      } catch (err) {
        console.log(err, "failure to fetch friend requests");
      }
    },
    friendshipsByUserId: async (_, args, ctx) => {
      // console.log(args, "args in friendships call");
      const { userId, activeUserId } = args;
      try {
        const user = await prisma.user.findFirst({
          where: {
            id: userId,
          },
          include: {
            friendships: {
              include: {
                friends: true,
              },
            },
          },
        });

        // const friends = user.friends;

        return user.friendships;
      } catch (err) {
        console.log("error fetching friends, ", err);
      }
    },

    eventInvitesByInviteeId: async (_, args, ctx) => {
      try {
        const eventInvites = await prisma.eventInvite.findMany({
          where: {
            inviteeId: args.userId,
          },
          include: {
            event: true,
            invitee: true,
            inviter: true,
          },
        });
        return eventInvites;
      } catch (err) {
        console.log("Failed to fetch invites", err);
      }
    },
  },

  Mutation: {
    createEvent: async (_, { input }, ctx) => {
      const {
        title,
        coverPhoto,
        location,
        description,
        startDate,
        endDate,
        privacy,
        userId,
      } = input;
      try {
        const event = await prisma.event.create({
          data: {
            title,
            user: {
              connect: {
                id: userId,
              },
            },
            coverPhoto,
            location,
            description,
            startDate,
            endDate,
            privacy,
          },
        });
        console.log(event, "created event");

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
        return event;
      } catch (err) {
        console.log("error in create event", err);
      }
    },
    createUser: async (_, { input }, ctx) => {
      const {
        email,
        firstName,
        lastName,
        location,
        idealPlans,
        profilePhoto,
        coverPhoto,
      } = input;

      try {
        const user = await prisma.user.create({
          data: {
            email,
            firstName,
            lastName,
            idealPlans,
            location,
            profilePhoto,
            coverPhoto,
          },
        });
        return user;
      } catch (err) {
        console.log(err, "error creating user");
      }
    },
    editEvent: async (_, { input }, ctx) => {
      const {
        title,
        coverPhoto,
        location,
        description,
        startDate,
        endDate,
        privacy,
        eventId,
      } = input;
      console.log(input, "input");
      try {
        const event = await prisma.event.update({
          where: {
            id: eventId,
          },
          data: {
            title,
            coverPhoto,
            location,
            description,
            startDate,
            endDate,
            privacy,
          },
        });
        console.log("edited event", event);
        return event;
      } catch (err) {
        console.log(err, "error in editing event");
      }
    },
    confirmFriendRequest: async (_, { input }, ctx) => {
      const { activeUserId, userId } = input;

      try {
        const user = await prisma.user.findFirst({
          where: {
            id: userId,
          },
          include: {
            friendships: {
              include: {
                friends: true,
              },
            },
          },
        });

        const friend = await prisma.user.findFirst({
          where: {
            id: activeUserId,
          },
          include: {
            friendships: {
              include: {
                friends: true,
              },
            },
          },
        });

        const mutualFriends = calculateMutualFriends(friend, user);
        const friendship = await prisma.friendship.create({
          data: {
            friends: {
              connect: [
                {
                  id: activeUserId,
                },
                {
                  id: userId,
                },
              ],
            },
            mutualFriends,
          },
          include: {
            friends: true,
          },
        });

        const friendRequest = await prisma.friendRequest.findFirst({
          where: {
            AND: [
              {
                receiverId: activeUserId,
              },
              {
                requestorId: userId,
              },
            ],
          },
        });

        await prisma.friendRequest.update({
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
        return await prisma.friendRequest.create({
          data: {
            status: "pending",
            requestor: {
              connect: {
                id: userId,
              },
            },
            receiver: {
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

    updateUser: async (_, { input }, ctx) => {
      const {
        id,
        email,
        firstName,
        lastName,
        location,
        idealPlans,
        profilePhoto,
        coverPhoto,
      } = input;
      console.log(input, "input");

      const user = await prisma.user.update({
        where: {
          id,
        },
        data: {
          ...input,
        },
      });
    },
  },

  /* async (_, { input }, ctx) => {
    
  },
  */
};
