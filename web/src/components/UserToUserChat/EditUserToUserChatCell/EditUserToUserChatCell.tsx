import type {
  EditUserToUserChatById,
  UpdateUserToUserChatInput,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import UserToUserChatForm from 'src/components/UserToUserChat/UserToUserChatForm'

export const QUERY = gql`
  query EditUserToUserChatById($id: Int!) {
    userToUserChat: userToUserChat(id: $id) {
      id
      createdAt
      updatedAt
      companyId
      companyName
    }
  }
`
const UPDATE_USER_TO_USER_CHAT_MUTATION = gql`
  mutation UpdateUserToUserChatMutation(
    $id: Int!
    $input: UpdateUserToUserChatInput!
  ) {
    updateUserToUserChat(id: $id, input: $input) {
      id
      createdAt
      updatedAt
      companyId
      companyName
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  userToUserChat,
}: CellSuccessProps<EditUserToUserChatById>) => {
  const [updateUserToUserChat, { loading, error }] = useMutation(
    UPDATE_USER_TO_USER_CHAT_MUTATION,
    {
      onCompleted: () => {
        toast.success('UserToUserChat updated')
        navigate(routes.userToUserChats())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateUserToUserChatInput,
    id: EditUserToUserChatById['userToUserChat']['id']
  ) => {
    updateUserToUserChat({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit UserToUserChat {userToUserChat?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <UserToUserChatForm
          userToUserChat={userToUserChat}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
