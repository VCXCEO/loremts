export const schema = gql`
  type CustomerToUserChat {
    id: Int!
    tags: [String]!
    satisfactionRating: Int
    internalSatisfactionRating: Int
    createdAt: DateTime!
    updatedAt: DateTime!
    customer: Customer!
    customerId: Int!
    customerEmail: String!
    company: Company!
    companyId: Int!
    companyName: String!
    companyChatIdentifier: String!
    users: [User]!
    customerToUserChatMessages: [CustomerToUserChatMessage]!
    customerToUserChatNotes: [CustomerToUserChatNote]!
  }

  type Query {
    customerToUserChats: [CustomerToUserChat!]! @skipAuth
    customerToUserChat(id: Int!): CustomerToUserChat @skipAuth
    filteredCustomerToUserChats: [CustomerToUserChat!]! @requireAuth
  }

  input CreateCustomerToUserChatInput {
    tags: [String]!
    satisfactionRating: Int
    internalSatisfactionRating: Int
    customerId: Int!
    customerEmail: String!
    companyId: Int!
    companyName: String!
    companyChatIdentifier: String!
  }

  input UpdateCustomerToUserChatInput {
    tags: [String]!
    satisfactionRating: Int
    internalSatisfactionRating: Int
    customerId: Int
    customerEmail: String
    companyId: Int
    companyName: String
    companyChatIdentifier: String!
  }

  type Mutation {
    createCustomerToUserChat(
      input: CreateCustomerToUserChatInput!
    ): CustomerToUserChat! @requireAuth
    updateCustomerToUserChat(
      id: Int!
      input: UpdateCustomerToUserChatInput!
    ): CustomerToUserChat! @requireAuth
    deleteCustomerToUserChat(id: Int!): CustomerToUserChat! @requireAuth
  }
`
