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
      });
    },
    userByEmail: async (_, args, ctx) => {
      console.log(args);
      const user = await prisma.user.findUnique({
        where: {
          email: args.email,
        },
      });
      console.log(user, "user in user by email");
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
        date,
        privacy,
        userId,
      } = input;
      return await prisma.event.create({
        data: {
          title,
          userId,
          coverPhoto,
          location,
          description,
          date,
          privacy,
        },
      });
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
      console.log(user);
      return user;
    },
    editEvent: async (_, { input }, ctx) => {
      const {
        title,
        coverPhoto,
        location,
        description,
        date,
        privacy,
        eventId,
      } = input;
      const event = await prisma.event.update({
        where: {
          id: eventId,
        },
        data: {
          title,
          coverPhoto,
          location,
          description,
          date,
          privacy,
        },
      });
      return event;
    },
  },
};
