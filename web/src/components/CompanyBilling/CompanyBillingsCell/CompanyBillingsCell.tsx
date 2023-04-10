import type { FindCompanyBillings } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import CompanyBillings from 'src/components/CompanyBilling/CompanyBillings'

export const QUERY = gql`
  query FindCompanyBillings {
    companyBillings {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No companyBillings yet. '}
      <Link to={routes.newCompanyBilling()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  companyBillings,
}: CellSuccessProps<FindCompanyBillings>) => {
  return <CompanyBillings companyBillings={companyBillings} />
}
