import type { FindUserToUserChatMessageById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import UserToUserChatMessage from 'src/components/UserToUserChatMessage/UserToUserChatMessage'

export const QUERY = gql`
  query FindUserToUserChatMessageById($id: Int!) {
    userToUserChatMessage: userToUserChatMessage(id: $id) {
      id
      messageText
      isRead
      createdAt
      updatedAt
      userToUserChatId
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>UserToUserChatMessage not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  userToUserChatMessage,
}: CellSuccessProps<FindUserToUserChatMessageById>) => {
  return <UserToUserChatMessage userToUserChatMessage={userToUserChatMessage} />
}
