import type { FindUserToUserChatNotes } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import UserToUserChatNotes from 'src/components/UserToUserChatNote/UserToUserChatNotes'

export const QUERY = gql`
  query FindUserToUserChatNotes {
    userToUserChatNotes {
      id
      note
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
      {'No userToUserChatNotes yet. '}
      <Link to={routes.newUserToUserChatNote()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  userToUserChatNotes,
}: CellSuccessProps<FindUserToUserChatNotes>) => {
  return <UserToUserChatNotes userToUserChatNotes={userToUserChatNotes} />
}
