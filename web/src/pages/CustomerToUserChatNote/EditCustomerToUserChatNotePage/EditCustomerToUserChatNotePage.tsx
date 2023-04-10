import EditCustomerToUserChatNoteCell from 'src/components/CustomerToUserChatNote/EditCustomerToUserChatNoteCell'

type CustomerToUserChatNotePageProps = {
  id: number
}

const EditCustomerToUserChatNotePage = ({
  id,
}: CustomerToUserChatNotePageProps) => {
  return <EditCustomerToUserChatNoteCell id={id} />
}

export default EditCustomerToUserChatNotePage
