import type { FindEmailMessageSents } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import EmailMessageSents from 'src/components/EmailMessageSent/EmailMessageSents'

export const QUERY = gql`
  query FindEmailMessageSents {
    emailMessageSents {
      id
      messageId
      conversationId
      extract
      handleTime
      dateReceived
      emailId
      emailConversationId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No emailMessageSents yet. '}
      <Link to={routes.newEmailMessageSent()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  emailMessageSents,
}: CellSuccessProps<FindEmailMessageSents>) => {
  return <EmailMessageSents emailMessageSents={emailMessageSents} />
}
