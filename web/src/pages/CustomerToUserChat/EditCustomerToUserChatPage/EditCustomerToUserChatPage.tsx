import EditCustomerToUserChatCell from 'src/components/CustomerToUserChat/EditCustomerToUserChatCell'

type CustomerToUserChatPageProps = {
  id: number
}

const EditCustomerToUserChatPage = ({ id }: CustomerToUserChatPageProps) => {
  return <EditCustomerToUserChatCell id={id} />
}

export default EditCustomerToUserChatPage
