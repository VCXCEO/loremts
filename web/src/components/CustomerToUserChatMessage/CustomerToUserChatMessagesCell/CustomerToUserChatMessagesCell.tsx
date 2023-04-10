import type { FindCustomerToUserChatMessages } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import CustomerToUserChatMessages from 'src/components/CustomerToUserChatMessage/CustomerToUserChatMessages'

export const QUERY = gql`
  query FindCustomerToUserChatMessages {
    customerToUserChatMessages {
      id
      messageText
      isRead
      createdAt
      updatedAt
      customerToUserChatId
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No customerToUserChatMessages yet. '}
      <Link to={routes.newCustomerToUserChatMessage()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  customerToUserChatMessages,
}: CellSuccessProps<FindCustomerToUserChatMessages>) => {
  return (
    <CustomerToUserChatMessages
      customerToUserChatMessages={customerToUserChatMessages}
    />
  )
}
