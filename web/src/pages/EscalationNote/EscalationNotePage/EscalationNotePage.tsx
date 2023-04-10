import EscalationNoteCell from 'src/components/EscalationNote/EscalationNoteCell'

type EscalationNotePageProps = {
  id: number
}

const EscalationNotePage = ({ id }: EscalationNotePageProps) => {
  return <EscalationNoteCell id={id} />
}

export default EscalationNotePage
