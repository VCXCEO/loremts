import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CustomerNoteForm from 'src/components/CustomerNote/CustomerNoteForm'

import type { CreateCustomerNoteInput } from 'types/graphql'

const CREATE_CUSTOMER_NOTE_MUTATION = gql`
  mutation CreateCustomerNoteMutation($input: CreateCustomerNoteInput!) {
    createCustomerNote(input: $input) {
      id
    }
  }
`

const NewCustomerNote = () => {
  const [createCustomerNote, { loading, error }] = useMutation(
    CREATE_CUSTOMER_NOTE_MUTATION,
    {
      onCompleted: () => {
        toast.success('CustomerNote created')
        navigate(routes.customerNotes())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateCustomerNoteInput) => {
    createCustomerNote({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New CustomerNote</h2>
      </header>
      <div className="rw-segment-main">
        <CustomerNoteForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewCustomerNote
