import EditEmailMessageReceivedCell from 'src/components/EmailMessageReceived/EditEmailMessageReceivedCell'

type EmailMessageReceivedPageProps = {
  id: number
}

const EditEmailMessageReceivedPage = ({
  id,
}: EmailMessageReceivedPageProps) => {
  return <EditEmailMessageReceivedCell id={id} />
}

export default EditEmailMessageReceivedPage
