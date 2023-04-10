import type { EditCallById, UpdateCallInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CallForm from 'src/components/Call/CallForm'

export const QUERY = gql`
  query EditCallById($id: Int!) {
    call: call(id: $id) {
      id
      callDirection
      callDuration
      record
      dateReceived
      tags
      satisfactionRating
      internalSatisfactionRating
      createdAt
      updatedAt
      customerId
      customerPhone
      companyId
      companyName
      userId
    }
  }
`
const UPDATE_CALL_MUTATION = gql`
  mutation UpdateCallMutation($id: Int!, $input: UpdateCallInput!) {
    updateCall(id: $id, input: $input) {
      id
      callDirection
      callDuration
      record
      dateReceived
      tags
      satisfactionRating
      internalSatisfactionRating
      createdAt
      updatedAt
      customerId
      customerPhone
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

export const Success = ({ call }: CellSuccessProps<EditCallById>) => {
  const [updateCall, { loading, error }] = useMutation(UPDATE_CALL_MUTATION, {
    onCompleted: () => {
      toast.success('Call updated')
      navigate(routes.calls())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input: UpdateCallInput, id: EditCallById['call']['id']) => {
    updateCall({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Call {call?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <CallForm call={call} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
