export const schema = gql`
  type EscalationNote {
    id: Int!
    note: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    escalation: Escalation!
    escalationId: Int!
    user: User!
    userId: Int!
  }

  type Query {
    escalationNotes: [EscalationNote!]! @requireAuth
    escalationNote(id: Int!): EscalationNote @requireAuth
  }

  input CreateEscalationNoteInput {
    note: String!
    escalationId: Int!
    userId: Int!
  }

  input UpdateEscalationNoteInput {
    note: String
    escalationId: Int
    userId: Int
  }

  type Mutation {
    createEscalationNote(input: CreateEscalationNoteInput!): EscalationNote!
      @requireAuth
    updateEscalationNote(
      id: Int!
      input: UpdateEscalationNoteInput!
    ): EscalationNote! @requireAuth
    deleteEscalationNote(id: Int!): EscalationNote! @requireAuth
  }
`
