import EmailMessageReceivedCell from 'src/components/EmailMessageReceived/EmailMessageReceivedCell'

type EmailMessageReceivedPageProps = {
  id: number
}

const EmailMessageReceivedPage = ({ id }: EmailMessageReceivedPageProps) => {
  return <EmailMessageReceivedCell id={id} />
}

export default EmailMessageReceivedPage
