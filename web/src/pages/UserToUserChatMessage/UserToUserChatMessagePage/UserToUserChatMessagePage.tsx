import UserToUserChatMessageCell from 'src/components/UserToUserChatMessage/UserToUserChatMessageCell'

type UserToUserChatMessagePageProps = {
  id: number
}

const UserToUserChatMessagePage = ({ id }: UserToUserChatMessagePageProps) => {
  return <UserToUserChatMessageCell id={id} />
}

export default UserToUserChatMessagePage
