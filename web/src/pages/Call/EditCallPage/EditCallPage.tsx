import EditCallCell from 'src/components/Call/EditCallCell'

type CallPageProps = {
  id: number
}

const EditCallPage = ({ id }: CallPageProps) => {
  return <EditCallCell id={id} />
}

export default EditCallPage
