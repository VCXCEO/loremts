import CallCell from 'src/components/Call/CallCell'

type CallPageProps = {
  id: number
}

const CallPage = ({ id }: CallPageProps) => {
  return <CallCell id={id} />
}

export default CallPage
