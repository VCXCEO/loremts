import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import EmailNoteForm from 'src/components/EmailNote/EmailNoteForm'

import type { CreateEmailNoteInput } from 'types/graphql'

const CREATE_EMAIL_NOTE_MUTATION = gql`
  mutation CreateEmailNoteMutation($input: CreateEmailNoteInput!) {
    createEmailNote(input: $input) {
      id
    }
  }
`

const NewEmailNote = () => {
  const [createEmailNote, { loading, error }] = useMutation(
    CREATE_EMAIL_NOTE_MUTATION,
    {
      onCompleted: () => {
        toast.success('EmailNote created')
        navigate(routes.emailNotes())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateEmailNoteInput) => {
    createEmailNote({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New EmailNote</h2>
      </header>
      <div className="rw-segment-main">
        <EmailNoteForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewEmailNote
