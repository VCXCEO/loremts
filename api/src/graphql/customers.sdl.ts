export const schema = gql`
  type Customer {
    id: Int!
    firstName: String
    lastName: String
    email: String
    phone: String
    transactionId: [String]!
    internalSatisfactionRating: Int
    createdAt: DateTime!
    updatedAt: DateTime!
    companies: [Company]!
    calls: [Call]!
    emails: [Email]!
    escalations: [Escalation]!
    customerToUserChats: [CustomerToUserChat]!
    customerNotes: [CustomerNote]!
    callNotes: [CallNote]!
    customerToUserChatNotes: [CustomerToUserChatNote]!
    emailNotes: [EmailNote]!
  }

  type Query {
    customers: [Customer!]! @skipAuth
    customer(id: Int!): Customer @skipAuth
  }

  input CreateCustomerInput {
    firstName: String
    lastName: String
    email: String
    phone: String
    transactionId: [String]!
    internalSatisfactionRating: Int
  }

  input UpdateCustomerInput {
    firstName: String
    lastName: String
    email: String
    phone: String
    transactionId: [String]!
    internalSatisfactionRating: Int
  }

  type Mutation {
    createCustomer(input: CreateCustomerInput!): Customer! @requireAuth
    updateCustomer(id: Int!, input: UpdateCustomerInput!): Customer!
      @requireAuth
    deleteCustomer(id: Int!): Customer! @requireAuth
  }
`
