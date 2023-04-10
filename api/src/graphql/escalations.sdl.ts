export const schema = gql`
  type Escalation {
    id: Int!
    type: String!
    record: String!
    reason: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    customer: Customer
    customerId: Int
    customerEmail: String
    customerPhone: String
    company: Company!
    companyId: Int!
    companyName: String!
    escalationNotes: [EscalationNote]!
  }

  type Query {
    escalations: [Escalation!]! @requireAuth
    escalation(id: Int!): Escalation @requireAuth
  }

  input CreateEscalationInput {
    type: String!
    record: String!
    reason: String!
    customerId: Int
    customerEmail: String
    customerPhone: String
    companyId: Int!
    companyName: String!
  }

  input UpdateEscalationInput {
    type: String
    record: String
    reason: String
    customerId: Int
    customerEmail: String
    customerPhone: String
    companyId: Int
    companyName: String
  }

  type Mutation {
    createEscalation(input: CreateEscalationInput!): Escalation! @requireAuth
    updateEscalation(id: Int!, input: UpdateEscalationInput!): Escalation!
      @requireAuth
    deleteEscalation(id: Int!): Escalation! @requireAuth
  }
`
