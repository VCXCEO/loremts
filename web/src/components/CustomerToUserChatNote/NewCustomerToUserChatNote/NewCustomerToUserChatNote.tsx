import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CustomerToUserChatNoteForm from 'src/components/CustomerToUserChatNote/CustomerToUserChatNoteForm'

import type { CreateCustomerToUserChatNoteInput } from 'types/graphql'

const CREATE_CUSTOMER_TO_USER_CHAT_NOTE_MUTATION = gql`
  mutation CreateCustomerToUserChatNoteMutation(
    $input: CreateCustomerToUserChatNoteInput!
  ) {
    createCustomerToUserChatNote(input: $input) {
      id
    }
  }
`

const NewCustomerToUserChatNote = () => {
  const [createCustomerToUserChatNote, { loading, error }] = useMutation(
    CREATE_CUSTOMER_TO_USER_CHAT_NOTE_MUTATION,
    {
      onCompleted: () => {
        toast.success('CustomerToUserChatNote created')
        navigate(routes.customerToUserChatNotes())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateCustomerToUserChatNoteInput) => {
    createCustomerToUserChatNote({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          New CustomerToUserChatNote
        </h2>
      </header>
      <div className="rw-segment-main">
        <CustomerToUserChatNoteForm
          onSave={onSave}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  )
}

export default NewCustomerToUserChatNote
