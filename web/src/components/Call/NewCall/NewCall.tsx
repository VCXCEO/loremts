import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CallForm from 'src/components/Call/CallForm'

import type { CreateCallInput } from 'types/graphql'

const CREATE_CALL_MUTATION = gql`
  mutation CreateCallMutation($input: CreateCallInput!) {
    createCall(input: $input) {
      id
    }
  }
`

const NewCall = () => {
  const [createCall, { loading, error }] = useMutation(CREATE_CALL_MUTATION, {
    onCompleted: () => {
      toast.success('Call created')
      navigate(routes.calls())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input: CreateCallInput) => {
    createCall({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Call</h2>
      </header>
      <div className="rw-segment-main">
        <CallForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewCall
