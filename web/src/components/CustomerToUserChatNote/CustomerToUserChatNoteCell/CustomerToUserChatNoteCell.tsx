import type { FindCustomerToUserChatNoteById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import CustomerToUserChatNote from 'src/components/CustomerToUserChatNote/CustomerToUserChatNote'

export const QUERY = gql`
  query FindCustomerToUserChatNoteById($id: Int!) {
    customerToUserChatNote: customerToUserChatNote(id: $id) {
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

export const Empty = () => <div>CustomerToUserChatNote not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  customerToUserChatNote,
}: CellSuccessProps<FindCustomerToUserChatNoteById>) => {
  return (
    <CustomerToUserChatNote customerToUserChatNote={customerToUserChatNote} />
  )
}
