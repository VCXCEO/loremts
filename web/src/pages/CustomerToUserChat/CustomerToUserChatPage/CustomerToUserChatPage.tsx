import CustomerToUserChatCell from 'src/components/CustomerToUserChat/CustomerToUserChatCell'

type CustomerToUserChatPageProps = {
  id: number
}

const CustomerToUserChatPage = ({ id }: CustomerToUserChatPageProps) => {
  return <CustomerToUserChatCell id={id} />
}

export default CustomerToUserChatPage
