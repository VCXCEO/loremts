import type { FindEscalationNotes } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import EscalationNotes from 'src/components/EscalationNote/EscalationNotes'

export const QUERY = gql`
  query FindEscalationNotes {
    escalationNotes {
      id
      note
      createdAt
      updatedAt
      escalationId
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No escalationNotes yet. '}
      <Link to={routes.newEscalationNote()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  escalationNotes,
}: CellSuccessProps<FindEscalationNotes>) => {
  return <EscalationNotes escalationNotes={escalationNotes} />
}
