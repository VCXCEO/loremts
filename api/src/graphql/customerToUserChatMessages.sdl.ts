export const schema = gql`
  type CustomerToUserChatMessage {
    id: Int!
    messageText: String!
    isRead: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
    customerToUserChat: CustomerToUserChat!
    customerToUserChatId: Int!
    user: User
    userId: Int
  }

  type CustomerToUserChatMessageByChatId {
    id: Int!
    messageText: String!
    isRead: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
    customerToUserChat: CustomerToUserChat!
    customerToUserChatId: Int!
    user: User
    userId: Int
  }

  type Query {
    customerToUserChatMessages: [CustomerToUserChatMessage!]! @skipAuth
    customerToUserChatMessage(id: Int!): CustomerToUserChatMessage @requireAuth
    customerToUserChatMessagesByChatId(
      customerToUserChatId: Int!
    ): [CustomerToUserChatMessageByChatId!]! @requireAuth
  }

  input CreateCustomerToUserChatMessageInput {
    messageText: String!
    isRead: Boolean!
    customerToUserChatId: Int!
    userId: Int
  }

  input UpdateCustomerToUserChatMessageInput {
    messageText: String
    isRead: Boolean
    customerToUserChatId: Int
    userId: Int
  }

  type Mutation {
    createCustomerToUserChatMessage(
      input: CreateCustomerToUserChatMessageInput!
    ): CustomerToUserChatMessage! @skipAuth
    updateCustomerToUserChatMessage(
      id: Int!
      input: UpdateCustomerToUserChatMessageInput!
    ): CustomerToUserChatMessage! @requireAuth
    deleteCustomerToUserChatMessage(id: Int!): CustomerToUserChatMessage!
      @requireAuth
  }
`
