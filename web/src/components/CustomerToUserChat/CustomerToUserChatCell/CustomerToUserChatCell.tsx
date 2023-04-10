import type { FindCustomerToUserChatById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import CustomerToUserChat from 'src/components/CustomerToUserChat/CustomerToUserChat'

export const QUERY = gql`
  query FindCustomerToUserChatById($id: Int!) {
    customerToUserChat: customerToUserChat(id: $id) {
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

export const Empty = () => <div>CustomerToUserChat not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  customerToUserChat,
}: CellSuccessProps<FindCustomerToUserChatById>) => {
  return <CustomerToUserChat customerToUserChat={customerToUserChat} />
}
