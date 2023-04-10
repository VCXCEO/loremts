import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import EscalationForm from 'src/components/Escalation/EscalationForm'

import type { CreateEscalationInput } from 'types/graphql'

const CREATE_ESCALATION_MUTATION = gql`
  mutation CreateEscalationMutation($input: CreateEscalationInput!) {
    createEscalation(input: $input) {
      id
    }
  }
`

const NewEscalation = () => {
  const [createEscalation, { loading, error }] = useMutation(
    CREATE_ESCALATION_MUTATION,
    {
      onCompleted: () => {
        toast.success('Escalation created')
        navigate(routes.escalations())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateEscalationInput) => {
    createEscalation({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Escalation</h2>
      </header>
      <div className="rw-segment-main">
        <EscalationForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewEscalation
