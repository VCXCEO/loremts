import type { FindUserToUserChatNoteById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import UserToUserChatNote from 'src/components/UserToUserChatNote/UserToUserChatNote'

export const QUERY = gql`
  query FindUserToUserChatNoteById($id: Int!) {
    userToUserChatNote: userToUserChatNote(id: $id) {
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

export const Empty = () => <div>UserToUserChatNote not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  userToUserChatNote,
}: CellSuccessProps<FindUserToUserChatNoteById>) => {
  return <UserToUserChatNote userToUserChatNote={userToUserChatNote} />
}
