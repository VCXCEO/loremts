import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CustomerToUserChatForm from 'src/components/CustomerToUserChat/CustomerToUserChatForm'

import type { CreateCustomerToUserChatInput } from 'types/graphql'

const CREATE_CUSTOMER_TO_USER_CHAT_MUTATION = gql`
  mutation CreateCustomerToUserChatMutation(
    $input: CreateCustomerToUserChatInput!
  ) {
    createCustomerToUserChat(input: $input) {
      id
    }
  }
`

const NewCustomerToUserChat = () => {
  const [createCustomerToUserChat, { loading, error }] = useMutation(
    CREATE_CUSTOMER_TO_USER_CHAT_MUTATION,
    {
      onCompleted: () => {
        toast.success('CustomerToUserChat created')
        navigate(routes.customerToUserChats())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateCustomerToUserChatInput) => {
    createCustomerToUserChat({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          New CustomerToUserChat
        </h2>
      </header>
      <div className="rw-segment-main">
        <CustomerToUserChatForm
          onSave={onSave}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  )
}

export default NewCustomerToUserChat
