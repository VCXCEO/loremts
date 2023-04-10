import type { EditEscalationById, UpdateEscalationInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import EscalationForm from 'src/components/Escalation/EscalationForm'

export const QUERY = gql`
  query EditEscalationById($id: Int!) {
    escalation: escalation(id: $id) {
      id
      type
      record
      reason
      createdAt
      updatedAt
      customerId
      customerEmail
      customerPhone
      companyId
      companyName
    }
  }
`
const UPDATE_ESCALATION_MUTATION = gql`
  mutation UpdateEscalationMutation($id: Int!, $input: UpdateEscalationInput!) {
    updateEscalation(id: $id, input: $input) {
      id
      type
      record
      reason
      createdAt
      updatedAt
      customerId
      customerEmail
      customerPhone
      companyId
      companyName
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  escalation,
}: CellSuccessProps<EditEscalationById>) => {
  const [updateEscalation, { loading, error }] = useMutation(
    UPDATE_ESCALATION_MUTATION,
    {
      onCompleted: () => {
        toast.success('Escalation updated')
        navigate(routes.escalations())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateEscalationInput,
    id: EditEscalationById['escalation']['id']
  ) => {
    updateEscalation({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Escalation {escalation?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <EscalationForm
          escalation={escalation}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
