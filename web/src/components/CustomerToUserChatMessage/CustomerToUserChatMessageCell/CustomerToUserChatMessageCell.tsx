import type { FindCustomerToUserChatMessageById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import CustomerToUserChatMessage from 'src/components/CustomerToUserChatMessage/CustomerToUserChatMessage'

export const QUERY = gql`
  query FindCustomerToUserChatMessageById($id: Int!) {
    customerToUserChatMessage: customerToUserChatMessage(id: $id) {
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

export const Empty = () => <div>CustomerToUserChatMessage not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  customerToUserChatMessage,
}: CellSuccessProps<FindCustomerToUserChatMessageById>) => {
  return (
    <CustomerToUserChatMessage
      customerToUserChatMessage={customerToUserChatMessage}
    />
  )
}
