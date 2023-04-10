import EditCustomerToUserChatMessageCell from 'src/components/CustomerToUserChatMessage/EditCustomerToUserChatMessageCell'

type CustomerToUserChatMessagePageProps = {
  id: number
}

const EditCustomerToUserChatMessagePage = ({
  id,
}: CustomerToUserChatMessagePageProps) => {
  return <EditCustomerToUserChatMessageCell id={id} />
}

export default EditCustomerToUserChatMessagePage
