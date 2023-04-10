import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import EmailMessageSentForm from 'src/components/EmailMessageSent/EmailMessageSentForm'

import type { CreateEmailMessageSentInput } from 'types/graphql'

const CREATE_EMAIL_MESSAGE_SENT_MUTATION = gql`
  mutation CreateEmailMessageSentMutation(
    $input: CreateEmailMessageSentInput!
  ) {
    createEmailMessageSent(input: $input) {
      id
    }
  }
`

const NewEmailMessageSent = () => {
  const [createEmailMessageSent, { loading, error }] = useMutation(
    CREATE_EMAIL_MESSAGE_SENT_MUTATION,
    {
      onCompleted: () => {
        toast.success('EmailMessageSent created')
        navigate(routes.emailMessageSents())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateEmailMessageSentInput) => {
    createEmailMessageSent({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          New EmailMessageSent
        </h2>
      </header>
      <div className="rw-segment-main">
        <EmailMessageSentForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewEmailMessageSent
