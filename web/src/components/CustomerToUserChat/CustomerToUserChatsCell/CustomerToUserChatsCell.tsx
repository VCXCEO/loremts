import type { FindCustomerToUserChats } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import CustomerToUserChats from 'src/components/CustomerToUserChat/CustomerToUserChats'

export const QUERY = gql`
  query FindCustomerToUserChats {
    customerToUserChats {
      id
      tags
      satisfactionRating
      internalSatisfactionRating
      createdAt
      updatedAt
      customerId
      customerEmail
      companyId
      companyName
      companyChatIdentifier
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No customerToUserChats yet. '}
      <Link to={routes.newCustomerToUserChat()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  customerToUserChats,
}: CellSuccessProps<FindCustomerToUserChats>) => {
  return <CustomerToUserChats customerToUserChats={customerToUserChats} />
}
