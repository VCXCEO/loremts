import type {
  EditCustomerToUserChatById,
  UpdateCustomerToUserChatInput,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CustomerToUserChatForm from 'src/components/CustomerToUserChat/CustomerToUserChatForm'

export const QUERY = gql`
  query EditCustomerToUserChatById($id: Int!) {
    customerToUserChat: customerToUserChat(id: $id) {
      id
      tags
      satisfactionRating
      internalSatisfactionRating
      createdAt
      updatedAt
      customerId
      customerEmail
      companyId
      companyName
      companyChatIdentifier
    }
  }
`
const UPDATE_CUSTOMER_TO_USER_CHAT_MUTATION = gql`
  mutation UpdateCustomerToUserChatMutation(
    $id: Int!
    $input: UpdateCustomerToUserChatInput!
  ) {
    updateCustomerToUserChat(id: $id, input: $input) {
      id
      tags
      satisfactionRating
      internalSatisfactionRating
      createdAt
      updatedAt
      customerId
      customerEmail
      companyId
      companyName
      companyChatIdentifier
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  customerToUserChat,
}: CellSuccessProps<EditCustomerToUserChatById>) => {
  const [updateCustomerToUserChat, { loading, error }] = useMutation(
    UPDATE_CUSTOMER_TO_USER_CHAT_MUTATION,
    {
      onCompleted: () => {
        toast.success('CustomerToUserChat updated')
        navigate(routes.customerToUserChats())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateCustomerToUserChatInput,
    id: EditCustomerToUserChatById['customerToUserChat']['id']
  ) => {
    updateCustomerToUserChat({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit CustomerToUserChat {customerToUserChat?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <CustomerToUserChatForm
          customerToUserChat={customerToUserChat}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
