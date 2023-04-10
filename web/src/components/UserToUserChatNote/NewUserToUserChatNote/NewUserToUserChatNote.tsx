import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import UserToUserChatNoteForm from 'src/components/UserToUserChatNote/UserToUserChatNoteForm'

import type { CreateUserToUserChatNoteInput } from 'types/graphql'

const CREATE_USER_TO_USER_CHAT_NOTE_MUTATION = gql`
  mutation CreateUserToUserChatNoteMutation(
    $input: CreateUserToUserChatNoteInput!
  ) {
    createUserToUserChatNote(input: $input) {
      id
    }
  }
`

const NewUserToUserChatNote = () => {
  const [createUserToUserChatNote, { loading, error }] = useMutation(
    CREATE_USER_TO_USER_CHAT_NOTE_MUTATION,
    {
      onCompleted: () => {
        toast.success('UserToUserChatNote created')
        navigate(routes.userToUserChatNotes())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateUserToUserChatNoteInput) => {
    createUserToUserChatNote({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          New UserToUserChatNote
        </h2>
      </header>
      <div className="rw-segment-main">
        <UserToUserChatNoteForm
          onSave={onSave}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  )
}

export default NewUserToUserChatNote
