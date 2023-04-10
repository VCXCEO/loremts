import type { FindUserToUserChats } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import UserToUserChats from 'src/components/UserToUserChat/UserToUserChats'

export const QUERY = gql`
  query FindUserToUserChats {
    userToUserChats {
      id
      createdAt
      updatedAt
      companyId
      companyName
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No userToUserChats yet. '}
      <Link to={routes.newUserToUserChat()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  userToUserChats,
}: CellSuccessProps<FindUserToUserChats>) => {
  return <UserToUserChats userToUserChats={userToUserChats} />
}
