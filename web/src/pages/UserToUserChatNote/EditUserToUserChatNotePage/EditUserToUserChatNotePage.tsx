import EditUserToUserChatNoteCell from 'src/components/UserToUserChatNote/EditUserToUserChatNoteCell'

type UserToUserChatNotePageProps = {
  id: number
}

const EditUserToUserChatNotePage = ({ id }: UserToUserChatNotePageProps) => {
  return <EditUserToUserChatNoteCell id={id} />
}

export default EditUserToUserChatNotePage
