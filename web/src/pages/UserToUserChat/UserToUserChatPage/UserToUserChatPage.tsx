import UserToUserChatCell from 'src/components/UserToUserChat/UserToUserChatCell'

type UserToUserChatPageProps = {
  id: number
}

const UserToUserChatPage = ({ id }: UserToUserChatPageProps) => {
  return <UserToUserChatCell id={id} />
}

export default UserToUserChatPage
