import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import EmailMessageReceivedForm from 'src/components/EmailMessageReceived/EmailMessageReceivedForm'

import type { CreateEmailMessageReceivedInput } from 'types/graphql'

const CREATE_EMAIL_MESSAGE_RECEIVED_MUTATION = gql`
  mutation CreateEmailMessageReceivedMutation(
    $input: CreateEmailMessageReceivedInput!
  ) {
    createEmailMessageReceived(input: $input) {
      id
    }
  }
`

const NewEmailMessageReceived = () => {
  const [createEmailMessageReceived, { loading, error }] = useMutation(
    CREATE_EMAIL_MESSAGE_RECEIVED_MUTATION,
    {
      onCompleted: () => {
        toast.success('EmailMessageReceived created')
        navigate(routes.emailMessageReceiveds())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateEmailMessageReceivedInput) => {
    createEmailMessageReceived({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          New EmailMessageReceived
        </h2>
      </header>
      <div className="rw-segment-main">
        <EmailMessageReceivedForm
          onSave={onSave}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  )
}

export default NewEmailMessageReceived
