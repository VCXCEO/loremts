import CustomerToUserChatNoteCell from 'src/components/CustomerToUserChatNote/CustomerToUserChatNoteCell'

type CustomerToUserChatNotePageProps = {
  id: number
}

const CustomerToUserChatNotePage = ({
  id,
}: CustomerToUserChatNotePageProps) => {
  return <CustomerToUserChatNoteCell id={id} />
}

export default CustomerToUserChatNotePage
