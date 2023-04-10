export const schema = gql`
  type CustomerToUserChatNote {
    id: Int!
    note: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    customerToUserChat: CustomerToUserChat!
    customerToUserChatId: Int!
    customer: Customer!
    customerId: Int!
    customerEmail: String!
    user: User!
    userId: Int!
  }

  type customerToUserChatNoteByChatId {
    id: Int!
    note: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    customerToUserChat: CustomerToUserChat!
    customerToUserChatId: Int!
    user: User!
    userId: Int!
    customer: Customer!
    customerId: Int!
  }

  type Query {
    customerToUserChatNotes: [CustomerToUserChatNote!]! @requireAuth
    customerToUserChatNote(id: Int!): CustomerToUserChatNote @requireAuth
    customerToUserChatNoteByChatId(
      customerToUserChatId: Int!
    ): [CustomerToUserChatNote!] @requireAuth
  }

  input CreateCustomerToUserChatNoteInput {
    note: String!
    customerToUserChatId: Int!
    customerId: Int!
    customerEmail: String!
    userId: Int!
  }

  input UpdateCustomerToUserChatNoteInput {
    note: String
    customerToUserChatId: Int
    customerId: Int
    customerEmail: String
    userId: Int
  }

  type Mutation {
    createCustomerToUserChatNote(
      input: CreateCustomerToUserChatNoteInput!
    ): CustomerToUserChatNote! @requireAuth
    updateCustomerToUserChatNote(
      id: Int!
      input: UpdateCustomerToUserChatNoteInput!
    ): CustomerToUserChatNote! @requireAuth
    deleteCustomerToUserChatNote(id: Int!): CustomerToUserChatNote! @requireAuth
  }
`
