import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
};

export type AddCommentInput = {
  content?: InputMaybe<Scalars['String']>;
  eventId: Scalars['String'];
  imageUrl?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type Comment = {
  __typename?: 'Comment';
  content?: Maybe<Scalars['String']>;
  createdOn?: Maybe<Scalars['String']>;
  event?: Maybe<Event>;
  id?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type CreateEventInput = {
  coverPhoto?: InputMaybe<Scalars['Upload']>;
  description?: InputMaybe<Scalars['String']>;
  endDate?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  privacy?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type EditEventInput = {
  coverPhoto?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  endDate?: InputMaybe<Scalars['String']>;
  eventId?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  privacy?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type EditUserInput = {
  changedCoverPhoto?: InputMaybe<Scalars['Boolean']>;
  changedProfilePhoto?: InputMaybe<Scalars['Boolean']>;
  coverPhoto?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  idealNightOut?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  profilePhoto?: InputMaybe<Scalars['String']>;
};

export type Event = {
  __typename?: 'Event';
  comments?: Maybe<Array<Maybe<Comment>>>;
  coverPhoto?: Maybe<Scalars['String']>;
  createdOn?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  length?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  privacy?: Maybe<Scalars['String']>;
  responses?: Maybe<Array<Maybe<Response>>>;
  startDate?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']>;
};

export type EventByIdInput = {
  activeUserId: Scalars['String'];
  id: Scalars['String'];
};

export type EventInvite = {
  __typename?: 'EventInvite';
  createdOn?: Maybe<Scalars['String']>;
  event?: Maybe<Event>;
  eventId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  invitee?: Maybe<User>;
  inviteeId?: Maybe<Scalars['String']>;
  inviter?: Maybe<User>;
  inviterId?: Maybe<Scalars['String']>;
};

export type FriendInviteInput = {
  eventId?: InputMaybe<Scalars['String']>;
  inviteeId?: InputMaybe<Scalars['String']>;
  inviterId?: InputMaybe<Scalars['String']>;
};

export type FriendRequest = {
  __typename?: 'FriendRequest';
  id?: Maybe<Scalars['String']>;
  receiver?: Maybe<User>;
  receiverId?: Maybe<Scalars['String']>;
  requestDate?: Maybe<Scalars['String']>;
  requestor?: Maybe<User>;
  requestorId?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type FriendRequestInput = {
  activeUserId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type Friendship = {
  __typename?: 'Friendship';
  friends?: Maybe<Array<Maybe<User>>>;
  id?: Maybe<Scalars['String']>;
  mutualFriends?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addComment?: Maybe<Comment>;
  addFriend?: Maybe<FriendRequest>;
  confirmFriendRequest?: Maybe<User>;
  createEvent?: Maybe<Event>;
  editEvent?: Maybe<Event>;
  editUser?: Maybe<User>;
  inviteFriendToEvent?: Maybe<EventInvite>;
  respondToEventInvite?: Maybe<EventInvite>;
  sendTextInvite?: Maybe<Scalars['String']>;
  signUpUser?: Maybe<User>;
  uploadUserPhoto?: Maybe<User>;
};


export type MutationAddCommentArgs = {
  input?: InputMaybe<AddCommentInput>;
};


export type MutationAddFriendArgs = {
  input?: InputMaybe<FriendRequestInput>;
};


export type MutationConfirmFriendRequestArgs = {
  input?: InputMaybe<FriendRequestInput>;
};


export type MutationCreateEventArgs = {
  input: CreateEventInput;
};


export type MutationEditEventArgs = {
  input: EditEventInput;
};


export type MutationEditUserArgs = {
  input?: InputMaybe<EditUserInput>;
};


export type MutationInviteFriendToEventArgs = {
  input?: InputMaybe<FriendInviteInput>;
};


export type MutationRespondToEventInviteArgs = {
  input: RespondToEventInviteInput;
};


export type MutationSendTextInviteArgs = {
  input?: InputMaybe<TextInviteInput>;
};


export type MutationSignUpUserArgs = {
  input: SignUpUserInput;
};


export type MutationUploadUserPhotoArgs = {
  input: ProfilePictureUploadInput;
};

export type ProfilePictureUploadInput = {
  file: Scalars['Upload'];
  id: Scalars['String'];
  isCover?: InputMaybe<Scalars['Boolean']>;
};

export type Query = {
  __typename?: 'Query';
  activeUser?: Maybe<User>;
  eventById?: Maybe<Event>;
  eventInvitesByInviteeId?: Maybe<Array<Maybe<EventInvite>>>;
  eventsByUserId?: Maybe<Array<Maybe<Event>>>;
  friendRequestsByUserId?: Maybe<Array<Maybe<FriendRequest>>>;
  friendshipsByUserId?: Maybe<Array<Maybe<Friendship>>>;
  responsesByEventId?: Maybe<Array<Maybe<Response>>>;
  userByEmail?: Maybe<User>;
  userByPhone?: Maybe<User>;
};


export type QueryEventByIdArgs = {
  input: EventByIdInput;
};


export type QueryEventInvitesByInviteeIdArgs = {
  userId?: InputMaybe<Scalars['String']>;
};


export type QueryEventsByUserIdArgs = {
  iduser?: InputMaybe<Scalars['String']>;
};


export type QueryFriendRequestsByUserIdArgs = {
  activeUserId?: InputMaybe<Scalars['String']>;
};


export type QueryFriendshipsByUserIdArgs = {
  userId?: InputMaybe<Scalars['String']>;
};


export type QueryResponsesByEventIdArgs = {
  eventId?: InputMaybe<Scalars['String']>;
};


export type QueryUserByEmailArgs = {
  email?: InputMaybe<Scalars['String']>;
};


export type QueryUserByPhoneArgs = {
  phoneNumber?: InputMaybe<Scalars['String']>;
};

export type RespondToEventInviteInput = {
  activeUserId?: InputMaybe<Scalars['String']>;
  eventId?: InputMaybe<Scalars['String']>;
  response?: InputMaybe<Scalars['Int']>;
};

export type Response = {
  __typename?: 'Response';
  event?: Maybe<Event>;
  eventId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  response?: Maybe<Scalars['Int']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']>;
};

export type SignUpUserInput = {
  coverPhoto?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  idealNightOut?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  profilePhoto?: InputMaybe<Scalars['String']>;
};

export type TextInviteInput = {
  phoneNumber?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  comments?: Maybe<Array<Maybe<Comment>>>;
  coverPhoto?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  friends?: Maybe<Array<Maybe<User>>>;
  friendships?: Maybe<Array<Maybe<Friendship>>>;
  id?: Maybe<Scalars['String']>;
  idealNightOut?: Maybe<Scalars['String']>;
  isFriend?: Maybe<Scalars['Boolean']>;
  lastName?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  profilePhoto?: Maybe<Scalars['String']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AddCommentInput: AddCommentInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Comment: ResolverTypeWrapper<Comment>;
  CreateEventInput: CreateEventInput;
  EditEventInput: EditEventInput;
  EditUserInput: EditUserInput;
  Event: ResolverTypeWrapper<Event>;
  EventByIdInput: EventByIdInput;
  EventInvite: ResolverTypeWrapper<EventInvite>;
  FriendInviteInput: FriendInviteInput;
  FriendRequest: ResolverTypeWrapper<FriendRequest>;
  FriendRequestInput: FriendRequestInput;
  Friendship: ResolverTypeWrapper<Friendship>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  ProfilePictureUploadInput: ProfilePictureUploadInput;
  Query: ResolverTypeWrapper<{}>;
  RespondToEventInviteInput: RespondToEventInviteInput;
  Response: ResolverTypeWrapper<Response>;
  SignUpUserInput: SignUpUserInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  TextInviteInput: TextInviteInput;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddCommentInput: AddCommentInput;
  Boolean: Scalars['Boolean'];
  Comment: Comment;
  CreateEventInput: CreateEventInput;
  EditEventInput: EditEventInput;
  EditUserInput: EditUserInput;
  Event: Event;
  EventByIdInput: EventByIdInput;
  EventInvite: EventInvite;
  FriendInviteInput: FriendInviteInput;
  FriendRequest: FriendRequest;
  FriendRequestInput: FriendRequestInput;
  Friendship: Friendship;
  Int: Scalars['Int'];
  Mutation: {};
  ProfilePictureUploadInput: ProfilePictureUploadInput;
  Query: {};
  RespondToEventInviteInput: RespondToEventInviteInput;
  Response: Response;
  SignUpUserInput: SignUpUserInput;
  String: Scalars['String'];
  TextInviteInput: TextInviteInput;
  Upload: Scalars['Upload'];
  User: User;
};

export type CommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdOn?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  event?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventResolvers<ContextType = any, ParentType extends ResolversParentTypes['Event'] = ResolversParentTypes['Event']> = {
  comments?: Resolver<Maybe<Array<Maybe<ResolversTypes['Comment']>>>, ParentType, ContextType>;
  coverPhoto?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdOn?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  endDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  length?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  privacy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  responses?: Resolver<Maybe<Array<Maybe<ResolversTypes['Response']>>>, ParentType, ContextType>;
  startDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventInviteResolvers<ContextType = any, ParentType extends ResolversParentTypes['EventInvite'] = ResolversParentTypes['EventInvite']> = {
  createdOn?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  event?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType>;
  eventId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  invitee?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  inviteeId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  inviter?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  inviterId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FriendRequestResolvers<ContextType = any, ParentType extends ResolversParentTypes['FriendRequest'] = ResolversParentTypes['FriendRequest']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  receiver?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  receiverId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  requestDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  requestor?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  requestorId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FriendshipResolvers<ContextType = any, ParentType extends ResolversParentTypes['Friendship'] = ResolversParentTypes['Friendship']> = {
  friends?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  mutualFriends?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addComment?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType, Partial<MutationAddCommentArgs>>;
  addFriend?: Resolver<Maybe<ResolversTypes['FriendRequest']>, ParentType, ContextType, Partial<MutationAddFriendArgs>>;
  confirmFriendRequest?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<MutationConfirmFriendRequestArgs>>;
  createEvent?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<MutationCreateEventArgs, 'input'>>;
  editEvent?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<MutationEditEventArgs, 'input'>>;
  editUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<MutationEditUserArgs>>;
  inviteFriendToEvent?: Resolver<Maybe<ResolversTypes['EventInvite']>, ParentType, ContextType, Partial<MutationInviteFriendToEventArgs>>;
  respondToEventInvite?: Resolver<Maybe<ResolversTypes['EventInvite']>, ParentType, ContextType, RequireFields<MutationRespondToEventInviteArgs, 'input'>>;
  sendTextInvite?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<MutationSendTextInviteArgs>>;
  signUpUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationSignUpUserArgs, 'input'>>;
  uploadUserPhoto?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUploadUserPhotoArgs, 'input'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  activeUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  eventById?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<QueryEventByIdArgs, 'input'>>;
  eventInvitesByInviteeId?: Resolver<Maybe<Array<Maybe<ResolversTypes['EventInvite']>>>, ParentType, ContextType, Partial<QueryEventInvitesByInviteeIdArgs>>;
  eventsByUserId?: Resolver<Maybe<Array<Maybe<ResolversTypes['Event']>>>, ParentType, ContextType, Partial<QueryEventsByUserIdArgs>>;
  friendRequestsByUserId?: Resolver<Maybe<Array<Maybe<ResolversTypes['FriendRequest']>>>, ParentType, ContextType, Partial<QueryFriendRequestsByUserIdArgs>>;
  friendshipsByUserId?: Resolver<Maybe<Array<Maybe<ResolversTypes['Friendship']>>>, ParentType, ContextType, Partial<QueryFriendshipsByUserIdArgs>>;
  responsesByEventId?: Resolver<Maybe<Array<Maybe<ResolversTypes['Response']>>>, ParentType, ContextType, Partial<QueryResponsesByEventIdArgs>>;
  userByEmail?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryUserByEmailArgs>>;
  userByPhone?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryUserByPhoneArgs>>;
};

export type ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Response'] = ResolversParentTypes['Response']> = {
  event?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType>;
  eventId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  response?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  comments?: Resolver<Maybe<Array<Maybe<ResolversTypes['Comment']>>>, ParentType, ContextType>;
  coverPhoto?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  friends?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  friendships?: Resolver<Maybe<Array<Maybe<ResolversTypes['Friendship']>>>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  idealNightOut?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isFriend?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  profilePhoto?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Comment?: CommentResolvers<ContextType>;
  Event?: EventResolvers<ContextType>;
  EventInvite?: EventInviteResolvers<ContextType>;
  FriendRequest?: FriendRequestResolvers<ContextType>;
  Friendship?: FriendshipResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Response?: ResponseResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
};

