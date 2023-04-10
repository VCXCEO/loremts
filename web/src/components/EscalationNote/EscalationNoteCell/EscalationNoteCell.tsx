import type { FindEscalationNoteById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import EscalationNote from 'src/components/EscalationNote/EscalationNote'

export const QUERY = gql`
  query FindEscalationNoteById($id: Int!) {
    escalationNote: escalationNote(id: $id) {
      id
      note
      createdAt
      updatedAt
      escalationId
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>EscalationNote not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  escalationNote,
}: CellSuccessProps<FindEscalationNoteById>) => {
  return <EscalationNote escalationNote={escalationNote} />
}
