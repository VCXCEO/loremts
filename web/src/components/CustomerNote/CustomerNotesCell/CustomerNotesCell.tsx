import type { FindCustomerNotes } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import CustomerNotes from 'src/components/CustomerNote/CustomerNotes'

export const QUERY = gql`
  query FindCustomerNotes {
    customerNotes {
      id
      note
      createdAt
      updatedAt
      customerId
      customerEmail
      customerPhone
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No customerNotes yet. '}
      <Link to={routes.newCustomerNote()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  customerNotes,
}: CellSuccessProps<FindCustomerNotes>) => {
  return <CustomerNotes customerNotes={customerNotes} />
}
