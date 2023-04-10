import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import UserToUserChatMessageForm from 'src/components/UserToUserChatMessage/UserToUserChatMessageForm'

import type { CreateUserToUserChatMessageInput } from 'types/graphql'

const CREATE_USER_TO_USER_CHAT_MESSAGE_MUTATION = gql`
  mutation CreateUserToUserChatMessageMutation(
    $input: CreateUserToUserChatMessageInput!
  ) {
    createUserToUserChatMessage(input: $input) {
      id
    }
  }
`

const NewUserToUserChatMessage = () => {
  const [createUserToUserChatMessage, { loading, error }] = useMutation(
    CREATE_USER_TO_USER_CHAT_MESSAGE_MUTATION,
    {
      onCompleted: () => {
        toast.success('UserToUserChatMessage created')
        navigate(routes.userToUserChatMessages())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateUserToUserChatMessageInput) => {
    createUserToUserChatMessage({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          New UserToUserChatMessage
        </h2>
      </header>
      <div className="rw-segment-main">
        <UserToUserChatMessageForm
          onSave={onSave}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  )
}

export default NewUserToUserChatMessage
