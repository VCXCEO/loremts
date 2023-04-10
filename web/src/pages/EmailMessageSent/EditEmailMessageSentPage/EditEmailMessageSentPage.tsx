import EditEmailMessageSentCell from 'src/components/EmailMessageSent/EditEmailMessageSentCell'

type EmailMessageSentPageProps = {
  id: number
}

const EditEmailMessageSentPage = ({ id }: EmailMessageSentPageProps) => {
  return <EditEmailMessageSentCell id={id} />
}

export default EditEmailMessageSentPage
