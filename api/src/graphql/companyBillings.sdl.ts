export const schema = gql`
  type CompanyBilling {
    id: Int!
    billingPeriodStart: DateTime!
    billingPeriodEnd: DateTime!
    billingAmount: Int!
    renewalDate: DateTime!
    renewalFrequency: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    company: Company!
    companyId: Int!
  }

  type Query {
    companyBillings: [CompanyBilling!]! @requireAuth
    companyBilling(id: Int!): CompanyBilling @requireAuth
  }

  input CreateCompanyBillingInput {
    billingPeriodStart: DateTime!
    billingPeriodEnd: DateTime!
    billingAmount: Int!
    renewalDate: DateTime!
    renewalFrequency: String!
    companyId: Int!
  }

  input UpdateCompanyBillingInput {
    billingPeriodStart: DateTime
    billingPeriodEnd: DateTime
    billingAmount: Int
    renewalDate: DateTime
    renewalFrequency: String
    companyId: Int
  }

  type Mutation {
    createCompanyBilling(input: CreateCompanyBillingInput!): CompanyBilling!
      @requireAuth
    updateCompanyBilling(
      id: Int!
      input: UpdateCompanyBillingInput!
    ): CompanyBilling! @requireAuth
    deleteCompanyBilling(id: Int!): CompanyBilling! @requireAuth
  }
`
