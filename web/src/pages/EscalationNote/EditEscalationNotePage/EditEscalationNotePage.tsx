import EditEscalationNoteCell from 'src/components/EscalationNote/EditEscalationNoteCell'

type EscalationNotePageProps = {
  id: number
}

const EditEscalationNotePage = ({ id }: EscalationNotePageProps) => {
  return <EditEscalationNoteCell id={id} />
}

export default EditEscalationNotePage
