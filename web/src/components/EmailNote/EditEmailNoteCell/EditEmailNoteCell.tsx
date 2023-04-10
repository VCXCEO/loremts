import type { EditEmailNoteById, UpdateEmailNoteInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import EmailNoteForm from 'src/components/EmailNote/EmailNoteForm'

export const QUERY = gql`
  query EditEmailNoteById($id: Int!) {
    emailNote: emailNote(id: $id) {
      id
      note
      createdAt
      updatedAt
      emailId
      customerId
      customerEmail
      userId
    }
  }
`
const UPDATE_EMAIL_NOTE_MUTATION = gql`
  mutation UpdateEmailNoteMutation($id: Int!, $input: UpdateEmailNoteInput!) {
    updateEmailNote(id: $id, input: $input) {
      id
      note
      createdAt
      updatedAt
      emailId
      customerId
      customerEmail
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ emailNote }: CellSuccessProps<EditEmailNoteById>) => {
  const [updateEmailNote, { loading, error }] = useMutation(
    UPDATE_EMAIL_NOTE_MUTATION,
    {
      onCompleted: () => {
        toast.success('EmailNote updated')
        navigate(routes.emailNotes())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateEmailNoteInput,
    id: EditEmailNoteById['emailNote']['id']
  ) => {
    updateEmailNote({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit EmailNote {emailNote?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <EmailNoteForm
          emailNote={emailNote}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
