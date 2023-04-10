export const schema = gql`
  type Email {
    id: Int!
    conversationId: String!
    inbox: String!
    handleTime: Int!
    dateReceived: DateTime!
    subject: String!
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
    user: User
    userId: Int
    emailNotes: [EmailNote]!
    emailMessagesSent: [EmailMessageSent]!
    emailMessagesReceived: [EmailMessageReceived]!
  }

  type Query {
    emails: [Email!]! @requireAuth
    email(id: Int!): Email @requireAuth
  }

  input CreateEmailInput {
    conversationId: String!
    inbox: String!
    handleTime: Int!
    dateReceived: DateTime!
    subject: String!
    tags: [String]!
    satisfactionRating: Int
    internalSatisfactionRating: Int
    customerId: Int!
    customerEmail: String!
    companyId: Int!
    companyName: String!
    userId: Int
  }

  input UpdateEmailInput {
    conversationId: String
    inbox: String
    handleTime: Int
    dateReceived: DateTime
    subject: String
    tags: [String]!
    satisfactionRating: Int
    internalSatisfactionRating: Int
    customerId: Int
    customerEmail: String
    companyId: Int
    companyName: String
    userId: Int
  }

  type Mutation {
    createEmail(input: CreateEmailInput!): Email! @requireAuth
    updateEmail(id: Int!, input: UpdateEmailInput!): Email! @requireAuth
    deleteEmail(id: Int!): Email! @requireAuth
  }
`
