import EmailNoteCell from 'src/components/EmailNote/EmailNoteCell'

type EmailNotePageProps = {
  id: number
}

const EmailNotePage = ({ id }: EmailNotePageProps) => {
  return <EmailNoteCell id={id} />
}

export default EmailNotePage
