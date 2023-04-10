import type { FindEmailNotes } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import EmailNotes from 'src/components/EmailNote/EmailNotes'

export const QUERY = gql`
  query FindEmailNotes {
    emailNotes {
      id
      note
      createdAt
      updatedAt
      emailId
      customerId
      customerEmail
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No emailNotes yet. '}
      <Link to={routes.newEmailNote()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ emailNotes }: CellSuccessProps<FindEmailNotes>) => {
  return <EmailNotes emailNotes={emailNotes} />
}
