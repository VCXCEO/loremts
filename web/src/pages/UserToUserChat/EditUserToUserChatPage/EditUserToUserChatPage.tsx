import EditUserToUserChatCell from 'src/components/UserToUserChat/EditUserToUserChatCell'

type UserToUserChatPageProps = {
  id: number
}

const EditUserToUserChatPage = ({ id }: UserToUserChatPageProps) => {
  return <EditUserToUserChatCell id={id} />
}

export default EditUserToUserChatPage
