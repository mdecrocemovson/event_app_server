// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.

import prisma from "../prisma/prisma";

export const resolvers = {
  Query: {
    books: () => console.log("yeet"),
    eventsByUserId: async (_, args, ctx) => {
      console.log(args);
      return await prisma.event.findMany({
        where: {
          userId: args.iduser,
        },
        include: {
          user: true,
        },
      });
    },
    userByEmail: async (_, args, ctx) => {
      const user = await prisma.user.findUnique({
        where: {
          email: args.email,
        },
      });
      return user;
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
        return await prisma.event.create({
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
      } catch (err) {
        console.log("error in create event", err);
      }
    },
    createUser: async (_, { input }, ctx) => {
      const { email, firstName, lastName, location, idealPlans } = input;

      const user = await prisma.user.create({
        data: {
          email,
          firstName,
          lastName,
          idealPlans,
          location,
        },
      });
      return user;
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
        return event;
      } catch (err) {
        console.log(err, "error in editing event");
      }
    },
  },
};
