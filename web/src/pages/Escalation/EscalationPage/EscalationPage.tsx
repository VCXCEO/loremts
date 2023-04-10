import EscalationCell from 'src/components/Escalation/EscalationCell'

type EscalationPageProps = {
  id: number
}

const EscalationPage = ({ id }: EscalationPageProps) => {
  return <EscalationCell id={id} />
}

export default EscalationPage
