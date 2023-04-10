import type { FindEmails } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Emails from 'src/components/Email/Emails'

export const QUERY = gql`
  query FindEmails {
    emails {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No emails yet. '}
      <Link to={routes.newEmail()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ emails }: CellSuccessProps<FindEmails>) => {
  return <Emails emails={emails} />
}
