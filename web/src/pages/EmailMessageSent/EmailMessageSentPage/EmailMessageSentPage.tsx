import EmailMessageSentCell from 'src/components/EmailMessageSent/EmailMessageSentCell'

type EmailMessageSentPageProps = {
  id: number
}

const EmailMessageSentPage = ({ id }: EmailMessageSentPageProps) => {
  return <EmailMessageSentCell id={id} />
}

export default EmailMessageSentPage
