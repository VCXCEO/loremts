import type { FindCustomerNoteById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import CustomerNote from 'src/components/CustomerNote/CustomerNote'

export const QUERY = gql`
  query FindCustomerNoteById($id: Int!) {
    customerNote: customerNote(id: $id) {
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

export const Empty = () => <div>CustomerNote not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  customerNote,
}: CellSuccessProps<FindCustomerNoteById>) => {
  return <CustomerNote customerNote={customerNote} />
}
