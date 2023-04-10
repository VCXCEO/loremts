export const schema = gql`
  type EmailNote {
    id: Int!
    note: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    email: Email!
    emailId: Int!
    customer: Customer!
    customerId: Int!
    customerEmail: String!
    user: User!
    userId: Int!
  }

  type Query {
    emailNotes: [EmailNote!]! @requireAuth
    emailNote(id: Int!): EmailNote @requireAuth
  }

  input CreateEmailNoteInput {
    note: String!
    emailId: Int!
    customerId: Int!
    customerEmail: String!
    userId: Int!
  }

  input UpdateEmailNoteInput {
    note: String
    emailId: Int
    customerId: Int
    customerEmail: String
    userId: Int
  }

  type Mutation {
    createEmailNote(input: CreateEmailNoteInput!): EmailNote! @requireAuth
    updateEmailNote(id: Int!, input: UpdateEmailNoteInput!): EmailNote!
      @requireAuth
    deleteEmailNote(id: Int!): EmailNote! @requireAuth
  }
`
