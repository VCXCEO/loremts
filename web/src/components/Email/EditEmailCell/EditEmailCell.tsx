import type { EditEmailById, UpdateEmailInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import EmailForm from 'src/components/Email/EmailForm'

export const QUERY = gql`
  query EditEmailById($id: Int!) {
    email: email(id: $id) {
      id
      conversationId
      inbox
      handleTime
      dateReceived
      subject
      tags
      satisfactionRating
      internalSatisfactionRating
      createdAt
      updatedAt
      customerId
      customerEmail
      companyId
      companyName
      userId
    }
  }
`
const UPDATE_EMAIL_MUTATION = gql`
  mutation UpdateEmailMutation($id: Int!, $input: UpdateEmailInput!) {
    updateEmail(id: $id, input: $input) {
      id
      conversationId
      inbox
      handleTime
      dateReceived
      subject
      tags
      satisfactionRating
      internalSatisfactionRating
      createdAt
      updatedAt
      customerId
      customerEmail
      companyId
      companyName
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ email }: CellSuccessProps<EditEmailById>) => {
  const [updateEmail, { loading, error }] = useMutation(UPDATE_EMAIL_MUTATION, {
    onCompleted: () => {
      toast.success('Email updated')
      navigate(routes.emails())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (
    input: UpdateEmailInput,
    id: EditEmailById['email']['id']
  ) => {
    updateEmail({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Email {email?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <EmailForm
          email={email}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
