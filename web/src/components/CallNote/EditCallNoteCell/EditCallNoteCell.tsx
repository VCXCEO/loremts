import type { EditCallNoteById, UpdateCallNoteInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CallNoteForm from 'src/components/CallNote/CallNoteForm'

export const QUERY = gql`
  query EditCallNoteById($id: Int!) {
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
const UPDATE_CALL_NOTE_MUTATION = gql`
  mutation UpdateCallNoteMutation($id: Int!, $input: UpdateCallNoteInput!) {
    updateCallNote(id: $id, input: $input) {
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

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ callNote }: CellSuccessProps<EditCallNoteById>) => {
  const [updateCallNote, { loading, error }] = useMutation(
    UPDATE_CALL_NOTE_MUTATION,
    {
      onCompleted: () => {
        toast.success('CallNote updated')
        navigate(routes.callNotes())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateCallNoteInput,
    id: EditCallNoteById['callNote']['id']
  ) => {
    updateCallNote({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit CallNote {callNote?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <CallNoteForm
          callNote={callNote}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
