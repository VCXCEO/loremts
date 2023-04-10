import type { FindUserToUserChatById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import UserToUserChat from 'src/components/UserToUserChat/UserToUserChat'

export const QUERY = gql`
  query FindUserToUserChatById($id: Int!) {
    userToUserChat: userToUserChat(id: $id) {
      id
      createdAt
      updatedAt
      companyId
      companyName
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>UserToUserChat not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  userToUserChat,
}: CellSuccessProps<FindUserToUserChatById>) => {
  return <UserToUserChat userToUserChat={userToUserChat} />
}
