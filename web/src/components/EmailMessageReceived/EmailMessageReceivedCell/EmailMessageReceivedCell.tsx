import type { FindEmailMessageReceivedById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import EmailMessageReceived from 'src/components/EmailMessageReceived/EmailMessageReceived'

export const QUERY = gql`
  query FindEmailMessageReceivedById($id: Int!) {
    emailMessageReceived: emailMessageReceived(id: $id) {
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

export const Empty = () => <div>EmailMessageReceived not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  emailMessageReceived,
}: CellSuccessProps<FindEmailMessageReceivedById>) => {
  return <EmailMessageReceived emailMessageReceived={emailMessageReceived} />
}
