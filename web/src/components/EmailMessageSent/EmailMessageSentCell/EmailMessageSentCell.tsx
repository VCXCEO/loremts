import type { FindEmailMessageSentById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import EmailMessageSent from 'src/components/EmailMessageSent/EmailMessageSent'

export const QUERY = gql`
  query FindEmailMessageSentById($id: Int!) {
    emailMessageSent: emailMessageSent(id: $id) {
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

export const Empty = () => <div>EmailMessageSent not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  emailMessageSent,
}: CellSuccessProps<FindEmailMessageSentById>) => {
  return <EmailMessageSent emailMessageSent={emailMessageSent} />
}
