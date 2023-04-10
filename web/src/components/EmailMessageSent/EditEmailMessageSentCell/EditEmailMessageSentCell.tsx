import type {
  EditEmailMessageSentById,
  UpdateEmailMessageSentInput,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import EmailMessageSentForm from 'src/components/EmailMessageSent/EmailMessageSentForm'

export const QUERY = gql`
  query EditEmailMessageSentById($id: Int!) {
    emailMessageSent: emailMessageSent(id: $id) {
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
const UPDATE_EMAIL_MESSAGE_SENT_MUTATION = gql`
  mutation UpdateEmailMessageSentMutation(
    $id: Int!
    $input: UpdateEmailMessageSentInput!
  ) {
    updateEmailMessageSent(id: $id, input: $input) {
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
  emailMessageSent,
}: CellSuccessProps<EditEmailMessageSentById>) => {
  const [updateEmailMessageSent, { loading, error }] = useMutation(
    UPDATE_EMAIL_MESSAGE_SENT_MUTATION,
    {
      onCompleted: () => {
        toast.success('EmailMessageSent updated')
        navigate(routes.emailMessageSents())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateEmailMessageSentInput,
    id: EditEmailMessageSentById['emailMessageSent']['id']
  ) => {
    updateEmailMessageSent({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit EmailMessageSent {emailMessageSent?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <EmailMessageSentForm
          emailMessageSent={emailMessageSent}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
