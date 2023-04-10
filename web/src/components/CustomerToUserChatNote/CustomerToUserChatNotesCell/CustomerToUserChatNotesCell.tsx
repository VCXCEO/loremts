import type { FindCustomerToUserChatNotes } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import CustomerToUserChatNotes from 'src/components/CustomerToUserChatNote/CustomerToUserChatNotes'

export const QUERY = gql`
  query FindCustomerToUserChatNotes {
    customerToUserChatNotes {
      id
      note
      createdAt
      updatedAt
      customerToUserChatId
      customerId
      customerEmail
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No customerToUserChatNotes yet. '}
      <Link to={routes.newCustomerToUserChatNote()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  customerToUserChatNotes,
}: CellSuccessProps<FindCustomerToUserChatNotes>) => {
  return (
    <CustomerToUserChatNotes
      customerToUserChatNotes={customerToUserChatNotes}
    />
  )
}
