import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import EscalationNoteForm from 'src/components/EscalationNote/EscalationNoteForm'

import type { CreateEscalationNoteInput } from 'types/graphql'

const CREATE_ESCALATION_NOTE_MUTATION = gql`
  mutation CreateEscalationNoteMutation($input: CreateEscalationNoteInput!) {
    createEscalationNote(input: $input) {
      id
    }
  }
`

const NewEscalationNote = () => {
  const [createEscalationNote, { loading, error }] = useMutation(
    CREATE_ESCALATION_NOTE_MUTATION,
    {
      onCompleted: () => {
        toast.success('EscalationNote created')
        navigate(routes.escalationNotes())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateEscalationNoteInput) => {
    createEscalationNote({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New EscalationNote</h2>
      </header>
      <div className="rw-segment-main">
        <EscalationNoteForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewEscalationNote
