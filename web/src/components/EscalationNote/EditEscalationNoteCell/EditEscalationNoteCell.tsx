import type {
  EditEscalationNoteById,
  UpdateEscalationNoteInput,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import EscalationNoteForm from 'src/components/EscalationNote/EscalationNoteForm'

export const QUERY = gql`
  query EditEscalationNoteById($id: Int!) {
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
const UPDATE_ESCALATION_NOTE_MUTATION = gql`
  mutation UpdateEscalationNoteMutation(
    $id: Int!
    $input: UpdateEscalationNoteInput!
  ) {
    updateEscalationNote(id: $id, input: $input) {
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

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  escalationNote,
}: CellSuccessProps<EditEscalationNoteById>) => {
  const [updateEscalationNote, { loading, error }] = useMutation(
    UPDATE_ESCALATION_NOTE_MUTATION,
    {
      onCompleted: () => {
        toast.success('EscalationNote updated')
        navigate(routes.escalationNotes())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateEscalationNoteInput,
    id: EditEscalationNoteById['escalationNote']['id']
  ) => {
    updateEscalationNote({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit EscalationNote {escalationNote?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <EscalationNoteForm
          escalationNote={escalationNote}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
