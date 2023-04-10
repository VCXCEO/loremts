import UserToUserChatNoteCell from 'src/components/UserToUserChatNote/UserToUserChatNoteCell'

type UserToUserChatNotePageProps = {
  id: number
}

const UserToUserChatNotePage = ({ id }: UserToUserChatNotePageProps) => {
  return <UserToUserChatNoteCell id={id} />
}

export default UserToUserChatNotePage
