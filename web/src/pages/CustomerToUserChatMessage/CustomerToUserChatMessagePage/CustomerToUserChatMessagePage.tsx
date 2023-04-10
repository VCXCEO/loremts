import CustomerToUserChatMessageCell from 'src/components/CustomerToUserChatMessage/CustomerToUserChatMessageCell'

type CustomerToUserChatMessagePageProps = {
  id: number
}

const CustomerToUserChatMessagePage = ({
  id,
}: CustomerToUserChatMessagePageProps) => {
  return <CustomerToUserChatMessageCell id={id} />
}

export default CustomerToUserChatMessagePage
