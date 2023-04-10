import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import UserToUserChatForm from 'src/components/UserToUserChat/UserToUserChatForm'

import type { CreateUserToUserChatInput } from 'types/graphql'

const CREATE_USER_TO_USER_CHAT_MUTATION = gql`
  mutation CreateUserToUserChatMutation($input: CreateUserToUserChatInput!) {
    createUserToUserChat(input: $input) {
      id
    }
  }
`

const NewUserToUserChat = () => {
  const [createUserToUserChat, { loading, error }] = useMutation(
    CREATE_USER_TO_USER_CHAT_MUTATION,
    {
      onCompleted: () => {
        toast.success('UserToUserChat created')
        navigate(routes.userToUserChats())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateUserToUserChatInput) => {
    createUserToUserChat({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New UserToUserChat</h2>
      </header>
      <div className="rw-segment-main">
        <UserToUserChatForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewUserToUserChat
