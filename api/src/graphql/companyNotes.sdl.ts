export const schema = gql`
  type CompanyNote {
    id: Int!
    note: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    company: Company!
    companyId: Int!
    companyName: String!
    user: User!
    userId: Int!
  }

  type Query {
    companyNotes: [CompanyNote!]! @requireAuth
    companyNote(id: Int!): CompanyNote @requireAuth
  }

  input CreateCompanyNoteInput {
    note: String!
    companyId: Int!
    companyName: String!
    userId: Int!
  }

  input UpdateCompanyNoteInput {
    note: String
    companyId: Int
    companyName: String
    userId: Int
  }

  type Mutation {
    createCompanyNote(input: CreateCompanyNoteInput!): CompanyNote! @requireAuth
    updateCompanyNote(id: Int!, input: UpdateCompanyNoteInput!): CompanyNote!
      @requireAuth
    deleteCompanyNote(id: Int!): CompanyNote! @requireAuth
  }
`
