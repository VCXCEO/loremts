import type { FindEmailMessageReceiveds } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import EmailMessageReceiveds from 'src/components/EmailMessageReceived/EmailMessageReceiveds'

export const QUERY = gql`
  query FindEmailMessageReceiveds {
    emailMessageReceiveds {
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
      {'No emailMessageReceiveds yet. '}
      <Link to={routes.newEmailMessageReceived()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  emailMessageReceiveds,
}: CellSuccessProps<FindEmailMessageReceiveds>) => {
  return <EmailMessageReceiveds emailMessageReceiveds={emailMessageReceiveds} />
}
