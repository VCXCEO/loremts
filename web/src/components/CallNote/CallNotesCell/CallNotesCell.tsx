import type { FindCallNotes } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import CallNotes from 'src/components/CallNote/CallNotes'

export const QUERY = gql`
  query FindCallNotes {
    callNotes {
      id
      note
      createdAt
      updatedAt
      callId
      customerId
      customerPhone
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No callNotes yet. '}
      <Link to={routes.newCallNote()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ callNotes }: CellSuccessProps<FindCallNotes>) => {
  return <CallNotes callNotes={callNotes} />
}
