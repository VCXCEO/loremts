import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CustomerToUserChatMessageForm from 'src/components/CustomerToUserChatMessage/CustomerToUserChatMessageForm'

import type { CreateCustomerToUserChatMessageInput } from 'types/graphql'

const CREATE_CUSTOMER_TO_USER_CHAT_MESSAGE_MUTATION = gql`
  mutation CreateCustomerToUserChatMessageMutation(
    $input: CreateCustomerToUserChatMessageInput!
  ) {
    createCustomerToUserChatMessage(input: $input) {
      id
    }
  }
`

const NewCustomerToUserChatMessage = () => {
  const [createCustomerToUserChatMessage, { loading, error }] = useMutation(
    CREATE_CUSTOMER_TO_USER_CHAT_MESSAGE_MUTATION,
    {
      onCompleted: () => {
        toast.success('CustomerToUserChatMessage created')
        navigate(routes.customerToUserChatMessages())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateCustomerToUserChatMessageInput) => {
    createCustomerToUserChatMessage({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          New CustomerToUserChatMessage
        </h2>
      </header>
      <div className="rw-segment-main">
        <CustomerToUserChatMessageForm
          onSave={onSave}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  )
}

export default NewCustomerToUserChatMessage
