import type {
  EditEmailMessageReceivedById,
  UpdateEmailMessageReceivedInput,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import EmailMessageReceivedForm from 'src/components/EmailMessageReceived/EmailMessageReceivedForm'

export const QUERY = gql`
  query EditEmailMessageReceivedById($id: Int!) {
    emailMessageReceived: emailMessageReceived(id: $id) {
      id
      messageId
      conversationId
      extract
      handleTime
      dateReceived
      emailId
      emailConversationId
    }
  }
`
const UPDATE_EMAIL_MESSAGE_RECEIVED_MUTATION = gql`
  mutation UpdateEmailMessageReceivedMutation(
    $id: Int!
    $input: UpdateEmailMessageReceivedInput!
  ) {
    updateEmailMessageReceived(id: $id, input: $input) {
      id
      messageId
      conversationId
      extract
      handleTime
      dateReceived
      emailId
      emailConversationId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  emailMessageReceived,
}: CellSuccessProps<EditEmailMessageReceivedById>) => {
  const [updateEmailMessageReceived, { loading, error }] = useMutation(
    UPDATE_EMAIL_MESSAGE_RECEIVED_MUTATION,
    {
      onCompleted: () => {
        toast.success('EmailMessageReceived updated')
        navigate(routes.emailMessageReceiveds())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateEmailMessageReceivedInput,
    id: EditEmailMessageReceivedById['emailMessageReceived']['id']
  ) => {
    updateEmailMessageReceived({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit EmailMessageReceived {emailMessageReceived?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <EmailMessageReceivedForm
          emailMessageReceived={emailMessageReceived}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
