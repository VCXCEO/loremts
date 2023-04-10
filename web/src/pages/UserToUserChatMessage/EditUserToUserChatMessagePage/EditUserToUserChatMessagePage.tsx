import EditUserToUserChatMessageCell from 'src/components/UserToUserChatMessage/EditUserToUserChatMessageCell'

type UserToUserChatMessagePageProps = {
  id: number
}

const EditUserToUserChatMessagePage = ({
  id,
}: UserToUserChatMessagePageProps) => {
  return <EditUserToUserChatMessageCell id={id} />
}

export default EditUserToUserChatMessagePage
