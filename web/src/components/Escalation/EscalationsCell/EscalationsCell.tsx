import type { FindEscalations } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Escalations from 'src/components/Escalation/Escalations'

export const QUERY = gql`
  query FindEscalations {
    escalations {
      id
      type
      record
      reason
      createdAt
      updatedAt
      customerId
      customerEmail
      customerPhone
      companyId
      companyName
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No escalations yet. '}
      <Link to={routes.newEscalation()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ escalations }: CellSuccessProps<FindEscalations>) => {
  return <Escalations escalations={escalations} />
}
