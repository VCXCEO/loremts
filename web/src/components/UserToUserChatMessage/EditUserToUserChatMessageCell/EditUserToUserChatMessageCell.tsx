import type {
  EditUserToUserChatMessageById,
  UpdateUserToUserChatMessageInput,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import UserToUserChatMessageForm from 'src/components/UserToUserChatMessage/UserToUserChatMessageForm'

export const QUERY = gql`
  query EditUserToUserChatMessageById($id: Int!) {
    userToUserChatMessage: userToUserChatMessage(id: $id) {
      id
      messageText
      isRead
      createdAt
      updatedAt
      userToUserChatId
      userId
    }
  }
`
const UPDATE_USER_TO_USER_CHAT_MESSAGE_MUTATION = gql`
  mutation UpdateUserToUserChatMessageMutation(
    $id: Int!
    $input: UpdateUserToUserChatMessageInput!
  ) {
    updateUserToUserChatMessage(id: $id, input: $input) {
      id
      messageText
      isRead
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
  userToUserChatMessage,
}: CellSuccessProps<EditUserToUserChatMessageById>) => {
  const [updateUserToUserChatMessage, { loading, error }] = useMutation(
    UPDATE_USER_TO_USER_CHAT_MESSAGE_MUTATION,
    {
      onCompleted: () => {
        toast.success('UserToUserChatMessage updated')
        navigate(routes.userToUserChatMessages())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateUserToUserChatMessageInput,
    id: EditUserToUserChatMessageById['userToUserChatMessage']['id']
  ) => {
    updateUserToUserChatMessage({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit UserToUserChatMessage {userToUserChatMessage?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <UserToUserChatMessageForm
          userToUserChatMessage={userToUserChatMessage}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
