import type { FindCalls } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Calls from 'src/components/Call/Calls'

export const QUERY = gql`
  query FindCalls {
    calls {
      id
      callDirection
      callDuration
      record
      dateReceived
      tags
      satisfactionRating
      internalSatisfactionRating
      createdAt
      updatedAt
      customerId
      customerPhone
      companyId
      companyName
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No calls yet. '}
      <Link to={routes.newCall()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ calls }: CellSuccessProps<FindCalls>) => {
  return <Calls calls={calls} />
}
