const { ApolloServer, gql } = require("apollo-server");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    eventsByUserId(iduser: String): [Event]
    userByEmail(email: String): User
  }
  input CreateEventInput {
    userId: String
    location: String
    description: String
    coverPhoto: String
    date: String
    title: String
    privacy: String
  }
  input EditEventInput {
    eventId: String
    location: String
    description: String
    coverPhoto: String
    date: String
    title: String
    privacy: String
  }
  input CreateUserInput {
    email: String
    firstName: String
    lastName: String
    location: String
    idealPlans: String
  }

  type Event {
    id: String
    title: String
    location: String
    description: String
    coverPhoto: String
    date: String
    privacy: String
  }

  type User {
    id: String
    email: String
    firstName: String
    lastName: String
    location: String
    idealPlans: String
  }

  type Mutation {
    createEvent(input: CreateEventInput!): Event
    createUser(input: CreateUserInput!): User
    editEvent(input: EditEventInput!): Event
  }
`;
