export const schema = gql`
  type Company {
    id: Int!
    name: String!
    industry: String!
    domain: String!
    companyLogo: String!
    emailAddress: String!
    phoneNumber: String!
    chatIdentifier: String!
    apiKey: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    users: [User]!
    calls: [Call]!
    emails: [Email]!
    escalations: [Escalation]!
    userToUserChats: [UserToUserChat]!
    customerToUserChats: [CustomerToUserChat]!
    customers: [Customer]!
    companyNotes: [CompanyNote]!
    companyBillings: [CompanyBilling]!
  }

  type Query {
    companies: [Company!]! @requireAuth
    company(id: Int!): Company @requireAuth
  }

  input CreateCompanyInput {
    name: String!
    industry: String!
    domain: String!
    companyLogo: String!
    emailAddress: String!
    phoneNumber: String!
  }

  input UpdateCompanyInput {
    name: String
    industry: String
    domain: String
    companyLogo: String
    emailAddress: String
    phoneNumber: String
    chatIdentifier: String
    apiKey: String
  }

  type Mutation {
    createCompany(input: CreateCompanyInput!): Company! @skipAuth
    updateCompany(id: Int!, input: UpdateCompanyInput!): Company! @requireAuth
    deleteCompany(id: Int!): Company! @requireAuth
  }
`
