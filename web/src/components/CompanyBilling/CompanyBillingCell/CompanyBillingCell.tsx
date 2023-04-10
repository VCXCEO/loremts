import type { FindCompanyBillingById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import CompanyBilling from 'src/components/CompanyBilling/CompanyBilling'

export const QUERY = gql`
  query FindCompanyBillingById($id: Int!) {
    companyBilling: companyBilling(id: $id) {
      id
      billingPeriodStart
      billingPeriodEnd
      billingAmount
      renewalDate
      renewalFrequency
      createdAt
      updatedAt
      companyId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>CompanyBilling not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  companyBilling,
}: CellSuccessProps<FindCompanyBillingById>) => {
  return <CompanyBilling companyBilling={companyBilling} />
}
