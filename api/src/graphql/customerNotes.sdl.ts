export const schema = gql`
  type CustomerNote {
    id: Int!
    note: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    customer: Customer!
    customerId: Int!
    customerEmail: String!
    customerPhone: String!
    user: User!
    userId: Int!
  }

  type Query {
    customerNotes: [CustomerNote!]! @requireAuth
    customerNote(id: Int!): CustomerNote @requireAuth
  }

  input CreateCustomerNoteInput {
    note: String!
    customerId: Int!
    customerEmail: String!
    customerPhone: String!
    userId: Int!
  }

  input UpdateCustomerNoteInput {
    note: String
    customerId: Int
    customerEmail: String
    customerPhone: String
    userId: Int
  }

  type Mutation {
    createCustomerNote(input: CreateCustomerNoteInput!): CustomerNote!
      @requireAuth
    updateCustomerNote(
      id: Int!
      input: UpdateCustomerNoteInput!
    ): CustomerNote! @requireAuth
    deleteCustomerNote(id: Int!): CustomerNote! @requireAuth
  }
`
