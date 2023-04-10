import EditCallNoteCell from 'src/components/CallNote/EditCallNoteCell'

type CallNotePageProps = {
  id: number
}

const EditCallNotePage = ({ id }: CallNotePageProps) => {
  return <EditCallNoteCell id={id} />
}

export default EditCallNotePage
