export const schema = gql`
  type UserToUserChatNote {
    id: Int!
    note: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    userToUserChat: UserToUserChat!
    userToUserChatId: Int!
    user: User!
    userId: Int!
  }

  type userToUserChatNoteByChatId {
    id: Int!
    note: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    userToUserChat: UserToUserChat!
    userToUserChatId: Int!
    user: User!
    userId: Int!
  }

  type Query {
    userToUserChatNotes: [UserToUserChatNote!]! @requireAuth
    userToUserChatNote(id: Int!): UserToUserChatNote @requireAuth
    userToUserChatNoteByChatId(userToUserChatId: Int!): [UserToUserChatNote!]
      @requireAuth
  }

  input CreateUserToUserChatNoteInput {
    note: String!
    userToUserChatId: Int!
    userId: Int!
  }

  input UpdateUserToUserChatNoteInput {
    note: String
    userToUserChatId: Int
    userId: Int
  }

  type Mutation {
    createUserToUserChatNote(
      input: CreateUserToUserChatNoteInput!
    ): UserToUserChatNote! @requireAuth
    updateUserToUserChatNote(
      id: Int!
      input: UpdateUserToUserChatNoteInput!
    ): UserToUserChatNote! @requireAuth
    deleteUserToUserChatNote(id: Int!): UserToUserChatNote! @requireAuth
  }
`
