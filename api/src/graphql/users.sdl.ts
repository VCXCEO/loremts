export const schema = gql`
  type User {
    id: Int!
    firstName: String
    lastName: String
    email: String!
    roles: [String]!
    profilePicture: String
    firstLogin: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime
    company: Company
    companyId: Int
    companyName: String
    calls: [Call]!
    emails: [Email]!
    customerToUserChats: [CustomerToUserChat]!
    userToUserChats: [UserToUserChat]!
    userToUserChatMessage: [UserToUserChatMessage]!
    customerToUserChatMessage: [CustomerToUserChatMessage]!
    companyNotes: [CompanyNote]!
    customerNotes: [CustomerNote]!
    callNotes: [CallNote]!
    userToUserChatNotes: [UserToUserChatNote]!
    customerToUserChatNotes: [CustomerToUserChatNote]!
    emailNotes: [EmailNote]!
    escalationNotes: [EscalationNote]!
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: Int!): User @requireAuth
  }

  input CreateUserInput {
    firstName: String
    lastName: String
    email: String!
    roles: [String]!
    profilePicture: String
    firstLogin: Boolean! = true
    companyId: Int
    companyName: String
  }

  input UpdateUserInput {
    firstName: String
    lastName: String
    email: String
    roles: [String]
    profilePicture: String
    password: String
    firstLogin: Boolean = false
    companyId: Int
    companyName: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @skipAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth
  }
`
