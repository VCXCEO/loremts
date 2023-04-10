import type {
  EditUserToUserChatNoteById,
  UpdateUserToUserChatNoteInput,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import UserToUserChatNoteForm from 'src/components/UserToUserChatNote/UserToUserChatNoteForm'

export const QUERY = gql`
  query EditUserToUserChatNoteById($id: Int!) {
    userToUserChatNote: userToUserChatNote(id: $id) {
      id
      note
      createdAt
      updatedAt
      userToUserChatId
      userId
    }
  }
`
const UPDATE_USER_TO_USER_CHAT_NOTE_MUTATION = gql`
  mutation UpdateUserToUserChatNoteMutation(
    $id: Int!
    $input: UpdateUserToUserChatNoteInput!
  ) {
    updateUserToUserChatNote(id: $id, input: $input) {
      id
      note
      createdAt
      updatedAt
      userToUserChatId
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  userToUserChatNote,
}: CellSuccessProps<EditUserToUserChatNoteById>) => {
  const [updateUserToUserChatNote, { loading, error }] = useMutation(
    UPDATE_USER_TO_USER_CHAT_NOTE_MUTATION,
    {
      onCompleted: () => {
        toast.success('UserToUserChatNote updated')
        navigate(routes.userToUserChatNotes())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateUserToUserChatNoteInput,
    id: EditUserToUserChatNoteById['userToUserChatNote']['id']
  ) => {
    updateUserToUserChatNote({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit UserToUserChatNote {userToUserChatNote?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <UserToUserChatNoteForm
          userToUserChatNote={userToUserChatNote}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
