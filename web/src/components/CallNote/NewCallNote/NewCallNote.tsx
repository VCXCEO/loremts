import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CallNoteForm from 'src/components/CallNote/CallNoteForm'

import type { CreateCallNoteInput } from 'types/graphql'

const CREATE_CALL_NOTE_MUTATION = gql`
  mutation CreateCallNoteMutation($input: CreateCallNoteInput!) {
    createCallNote(input: $input) {
      id
    }
  }
`

const NewCallNote = () => {
  const [createCallNote, { loading, error }] = useMutation(
    CREATE_CALL_NOTE_MUTATION,
    {
      onCompleted: () => {
        toast.success('CallNote created')
        navigate(routes.callNotes())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateCallNoteInput) => {
    createCallNote({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New CallNote</h2>
      </header>
      <div className="rw-segment-main">
        <CallNoteForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewCallNote
