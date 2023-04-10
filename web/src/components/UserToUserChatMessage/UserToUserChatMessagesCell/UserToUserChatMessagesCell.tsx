import type { FindUserToUserChatMessages } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import UserToUserChatMessages from 'src/components/UserToUserChatMessage/UserToUserChatMessages'

export const QUERY = gql`
  query FindUserToUserChatMessages {
    userToUserChatMessages {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No userToUserChatMessages yet. '}
      <Link to={routes.newUserToUserChatMessage()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  userToUserChatMessages,
}: CellSuccessProps<FindUserToUserChatMessages>) => {
  return (
    <UserToUserChatMessages userToUserChatMessages={userToUserChatMessages} />
  )
}
