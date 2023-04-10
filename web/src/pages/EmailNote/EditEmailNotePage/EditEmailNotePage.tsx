import EditEmailNoteCell from 'src/components/EmailNote/EditEmailNoteCell'

type EmailNotePageProps = {
  id: number
}

const EditEmailNotePage = ({ id }: EmailNotePageProps) => {
  return <EditEmailNoteCell id={id} />
}

export default EditEmailNotePage
