export const schema = gql`
  type CallNote {
    id: Int!
    note: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    call: Call!
    callId: Int!
    customer: Customer!
    customerId: Int!
    customerPhone: String!
    user: User!
    userId: Int!
  }

  type Query {
    callNotes: [CallNote!]! @requireAuth
    callNote(id: Int!): CallNote @requireAuth
  }

  input CreateCallNoteInput {
    note: String!
    callId: Int!
    customerId: Int!
    customerPhone: String!
    userId: Int!
  }

  input UpdateCallNoteInput {
    note: String
    callId: Int
    customerId: Int
    customerPhone: String
    userId: Int
  }

  type Mutation {
    createCallNote(input: CreateCallNoteInput!): CallNote! @requireAuth
    updateCallNote(id: Int!, input: UpdateCallNoteInput!): CallNote!
      @requireAuth
    deleteCallNote(id: Int!): CallNote! @requireAuth
  }
`
