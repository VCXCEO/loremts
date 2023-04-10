export const schema = gql`
  type UserToUserChatMessage {
    id: Int!
    messageText: String!
    isRead: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
    userToUserChat: UserToUserChat!
    userToUserChatId: Int!
    user: User
    userId: Int
  }

  type UserToUserChatMessageByChatId {
    id: Int!
    messageText: String!
    isRead: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
    userToUserChat: UserToUserChat!
    userToUserChatId: Int!
    user: User
    userId: Int
  }

  type Query {
    userToUserChatMessages: [UserToUserChatMessage!]! @requireAuth
    userToUserChatMessage(id: Int!): UserToUserChatMessage @requireAuth
    userToUserChatMessagesByChatId(
      userToUserChatId: Int!
    ): [UserToUserChatMessageByChatId!]! @requireAuth
  }

  input CreateUserToUserChatMessageInput {
    messageText: String!
    userToUserChatId: Int!
    userId: Int
  }

  input UpdateUserToUserChatMessageInput {
    messageText: String
    userToUserChatId: Int
    userId: Int
  }

  type Mutation {
    createUserToUserChatMessage(
      input: CreateUserToUserChatMessageInput!
    ): UserToUserChatMessage! @requireAuth
    updateUserToUserChatMessage(
      id: Int!
      input: UpdateUserToUserChatMessageInput!
    ): UserToUserChatMessage! @requireAuth
    deleteUserToUserChatMessage(id: Int!): UserToUserChatMessage! @requireAuth
    markMessagesAsRead(userToUserChatId: Int!): Boolean! @requireAuth
  }
  type Subscription {
    newMessage(userToUserChatId: Int!): UserToUserChatMessage!
  }
`
