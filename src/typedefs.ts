const { ApolloServer, gql } = require("apollo-server");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  input CreateEventInput {
    id: String
    userId: String
    location: String
    description: String
    coverPhoto: String
    startDate: String
    endDate: String
    title: String
    privacy: String
  }
  input EditEventInput {
    eventId: String
    location: String
    description: String
    coverPhoto: String
    startDate: String
    endDate: String
    title: String
    privacy: String
  }
  input CreateUserInput {
    coverPhoto: String
    profilePhoto: String
    email: String
    firstName: String
    lastName: String
    location: String
    idealPlans: String
  }

  input UpdateUserInput {
    id: String!
    email: String
    firstName: String
    lastName: String
    location: String
    idealPlans: String
    profilePhoto: String
    coverPhoto: String
  }
  input FriendRequestInput {
    activeUserId: String
    userId: String
  }

  input FriendInviteInput {
    inviterId: String
    eventId: String
    inviteeId: String
  }

  input RespondToEventInviteInput {
    eventId: String
    activeUserId: String
    response: Int
  }

  type Event {
    id: String
    title: String
    location: String
    length: String
    description: String
    coverPhoto: String
    startDate: String
    userId: String
    user: User
    endDate: String
    privacy: String
    responses: [Response]
    createdOn: String
  }

  type User {
    id: String
    email: String
    firstName: String
    lastName: String
    location: String
    idealPlans: String
    profilePhoto: String
    coverPhoto: String
  }

  type Response {
    id: String
    user: User
    userId: String
    event: Event
    eventId: String
    response: Int
  }

  type FriendRequest {
    id: String
    status: String
    requestorId: String
    requestor: User
    receiverId: String
    receiver: User
    requestDate: String
  }

  type Friendship {
    id: String
    mutualFriends: Int
    friends: [User]
  }

  type EventInvite {
    id: String
    inviterId: String
    inviter: User
    inviteeId: String
    invitee: User
    eventId: String
    event: Event
    createdOn: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    eventsByUserId(iduser: String): [Event]
    responsesByEventId(eventId: String): [Response]
    userByEmail(email: String): User
    friendRequestsByUserId(activeUserId: String): [FriendRequest]
    friendshipsByUserId(userId: String): [Friendship]
    eventInvitesByInviteeId(userId: String): [EventInvite]
  }

  type Mutation {
    createEvent(input: CreateEventInput!): Event
    createUser(input: CreateUserInput!): User
    editEvent(input: EditEventInput!): Event
    confirmFriendRequest(input: FriendRequestInput): User
    addFriend(input: FriendRequestInput): FriendRequest
    inviteFriendToEvent(input: FriendInviteInput): EventInvite
    respondToEventInvite(input: RespondToEventInviteInput!): EventInvite
    updateUser(input: UpdateUserInput): User
  }
`;
