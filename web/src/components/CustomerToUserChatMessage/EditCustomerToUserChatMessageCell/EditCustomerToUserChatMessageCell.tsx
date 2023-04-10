import type {
  EditCustomerToUserChatMessageById,
  UpdateCustomerToUserChatMessageInput,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CustomerToUserChatMessageForm from 'src/components/CustomerToUserChatMessage/CustomerToUserChatMessageForm'

export const QUERY = gql`
  query EditCustomerToUserChatMessageById($id: Int!) {
    customerToUserChatMessage: customerToUserChatMessage(id: $id) {
      id
      messageText
      isRead
      createdAt
      updatedAt
      customerToUserChatId
      userId
    }
  }
`
const UPDATE_CUSTOMER_TO_USER_CHAT_MESSAGE_MUTATION = gql`
  mutation UpdateCustomerToUserChatMessageMutation(
    $id: Int!
    $input: UpdateCustomerToUserChatMessageInput!
  ) {
    updateCustomerToUserChatMessage(id: $id, input: $input) {
      id
      messageText
      isRead
      createdAt
      updatedAt
      customerToUserChatId
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  customerToUserChatMessage,
}: CellSuccessProps<EditCustomerToUserChatMessageById>) => {
  const [updateCustomerToUserChatMessage, { loading, error }] = useMutation(
    UPDATE_CUSTOMER_TO_USER_CHAT_MESSAGE_MUTATION,
    {
      onCompleted: () => {
        toast.success('CustomerToUserChatMessage updated')
        navigate(routes.customerToUserChatMessages())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateCustomerToUserChatMessageInput,
    id: EditCustomerToUserChatMessageById['customerToUserChatMessage']['id']
  ) => {
    updateCustomerToUserChatMessage({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit CustomerToUserChatMessage {customerToUserChatMessage?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <CustomerToUserChatMessageForm
          customerToUserChatMessage={customerToUserChatMessage}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
