const { ApolloServer, gql } = require("apollo-server");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  scalar Upload

  input CreateEventInput {
    id: String
    userId: String
    location: String
    description: String
    category: String
    coverPhoto: String
    startDate: String
    endDate: String
    title: String
    privacy: String
    selectedFriends: [String]
  }
  input UpdateEventInput {
    id: String
    userId: String
    location: String
    description: String
    coverPhoto: String
    startDate: String
    endDate: String
    title: String
    privacy: String
    eventPhotos: [PhotoInput]
  }

  input UpdateUserAttendanceInput {
    userId: String
    eventId: String
    attendance: Int
  }

  input UserInput {
    id: String
  }
  input PhotoInput {
    id: String
    url: String
    user: UserInput
    caption: String
  }
  input SignUpUserInput {
    coverPhoto: String
    profilePhoto: String
    phoneNumber: String
    email: String
    firstName: String
    lastName: String
    location: String
    bio: String
  }

  input EditUserInput {
    id: String!
    email: String
    firstName: String
    lastName: String
    location: String
    bio: String
    profilePhoto: String
    changedProfilePhoto: Boolean
    coverPhoto: String
    changedCoverPhoto: Boolean
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
  input TextInviteInput {
    phoneNumber: String
  }

  input RespondToEventInviteInput {
    eventId: String
    activeUserId: String
    response: Int
  }

  input AddCommentInput {
    eventId: String!
    content: String
    imageUrl: String
    userId: String
  }

  input ProfilePictureUploadInput {
    id: String!
    file: Upload!
    isCover: Boolean
  }

  input EventByIdInput {
    id: String!
    activeUserId: String!
  }

  type Photo {
    id: String
    url: String
    event: Event
    user: User
    caption: String
  }

  type Event {
    id: String
    title: String
    location: String
    length: String
    category: String
    description: String
    coverPhoto: String
    startDate: String
    userId: String
    user: User
    endDate: String
    privacy: String
    responses: [Response]
    createdOn: String
    comments: [Comment]
    eventPhotos: [Photo]
  }

  type Comment {
    id: String
    event: Event
    user: User
    content: String
    imageUrl: String
    createdOn: String
  }

  type User {
    id: String
    email: String
    firstName: String
    lastName: String
    location: String
    phoneNumber: String
    bio: String
    profilePhoto: String
    coverPhoto: String
    comments: [Comment]
    friendships: [Friendship]
    friends: [UserFriends]
    isFriend: Boolean
    events: [Event]
  }

  type UserFriends {
    id: String
    user: User
    friend: User
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
    activeUser: User
    eventsByUserId(iduser: String): [Event]
    responsesByEventId(eventId: String): [Response]
    userByEmail(email: String): User
    userByPhone(phoneNumber: String): User
    friendRequestsByUserId(activeUserId: String): [FriendRequest]
    friendshipsByUserId(userId: String): [Friendship]
    eventInvitesByInviteeId(userId: String): [EventInvite]
    eventById(input: EventByIdInput!): Event
  }

  type Mutation {
    createEvent(input: CreateEventInput!): Event
    signUpUser(input: SignUpUserInput!): User
    updateEvent(input: UpdateEventInput!): Event
    confirmFriendRequest(input: FriendRequestInput): User
    addFriend(input: FriendRequestInput): FriendRequest
    inviteFriendToEvent(input: FriendInviteInput): EventInvite
    respondToEventInvite(input: RespondToEventInviteInput!): EventInvite
    addComment(input: AddCommentInput): Comment
    uploadUserPhoto(input: ProfilePictureUploadInput!): User
    sendTextInvite(input: TextInviteInput): String
    updateUserAttributes(input: EditUserInput): User
    updateUserAttendance(input: UpdateUserAttendanceInput): Response
  }
`;
