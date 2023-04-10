import type { FindCallById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Call from 'src/components/Call/Call'

export const QUERY = gql`
  query FindCallById($id: Int!) {
    call: call(id: $id) {
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

export const Empty = () => <div>Call not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ call }: CellSuccessProps<FindCallById>) => {
  return <Call call={call} />
}
