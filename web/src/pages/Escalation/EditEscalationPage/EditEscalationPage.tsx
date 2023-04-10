import EditEscalationCell from 'src/components/Escalation/EditEscalationCell'

type EscalationPageProps = {
  id: number
}

const EditEscalationPage = ({ id }: EscalationPageProps) => {
  return <EditEscalationCell id={id} />
}

export default EditEscalationPage
