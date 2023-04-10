import CallNoteCell from 'src/components/CallNote/CallNoteCell'

type CallNotePageProps = {
  id: number
}

const CallNotePage = ({ id }: CallNotePageProps) => {
  return <CallNoteCell id={id} />
}

export default CallNotePage
