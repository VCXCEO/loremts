export const schema = gql`
  type Call {
    id: Int!
    callDirection: String!
    callDuration: Int!
    record: String!
    dateReceived: DateTime!
    tags: [String]!
    satisfactionRating: Int
    internalSatisfactionRating: Int
    createdAt: DateTime!
    updatedAt: DateTime!
    customer: Customer!
    customerId: Int!
    customerPhone: String!
    company: Company!
    companyId: Int!
    companyName: String!
    user: User
    userId: Int
    callNotes: [CallNote]!
  }

  type Query {
    calls: [Call!]! @requireAuth
    call(id: Int!): Call @requireAuth
  }

  input CreateCallInput {
    callDirection: String!
    callDuration: Int!
    record: String!
    dateReceived: DateTime!
    tags: [String]!
    satisfactionRating: Int
    internalSatisfactionRating: Int
    customerId: Int!
    customerPhone: String!
    companyId: Int!
    companyName: String!
    userId: Int
  }

  input UpdateCallInput {
    callDirection: String
    callDuration: Int
    record: String
    dateReceived: DateTime
    tags: [String]!
    satisfactionRating: Int
    internalSatisfactionRating: Int
    customerId: Int
    customerPhone: String
    companyId: Int
    companyName: String
    userId: Int
  }

  type Mutation {
    createCall(input: CreateCallInput!): Call! @requireAuth
    updateCall(id: Int!, input: UpdateCallInput!): Call! @requireAuth
    deleteCall(id: Int!): Call! @requireAuth
  }
`
