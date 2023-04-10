export const schema = gql`
  type UserToUserChat {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    users: [User]!
    userToUserChatMessages: [UserToUserChatMessage]!
    userToUserChatNotes: [UserToUserChatNote]!
    Company: Company
    companyId: Int
    companyName: String
  }

  type Query {
    userToUserChats: [UserToUserChat!]! @requireAuth
    userToUserChat(id: Int!): UserToUserChat @requireAuth
    filteredUserToUserChats: [UserToUserChat!]! @requireAuth
  }

  input CreateUserToUserChatInput {
    companyId: Int
    companyName: String
  }

  input UpdateUserToUserChatInput {
    companyId: Int
    companyName: String
  }

  type Mutation {
    createUserToUserChat(input: CreateUserToUserChatInput!): UserToUserChat!
      @requireAuth
    updateUserToUserChat(
      id: Int!
      input: UpdateUserToUserChatInput!
    ): UserToUserChat! @requireAuth
    deleteUserToUserChat(id: Int!): UserToUserChat! @requireAuth
  }
`
