import type { FindCallNoteById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import CallNote from 'src/components/CallNote/CallNote'

export const QUERY = gql`
  query FindCallNoteById($id: Int!) {
    callNote: callNote(id: $id) {
      id
      note
      createdAt
      updatedAt
      callId
      customerId
      customerPhone
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>CallNote not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ callNote }: CellSuccessProps<FindCallNoteById>) => {
  return <CallNote callNote={callNote} />
}
