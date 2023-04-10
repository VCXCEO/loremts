import type { FindEscalationById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Escalation from 'src/components/Escalation/Escalation'

export const QUERY = gql`
  query FindEscalationById($id: Int!) {
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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Escalation not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  escalation,
}: CellSuccessProps<FindEscalationById>) => {
  return <Escalation escalation={escalation} />
}
