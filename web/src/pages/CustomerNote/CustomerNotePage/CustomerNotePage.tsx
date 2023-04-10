import CustomerNoteCell from 'src/components/CustomerNote/CustomerNoteCell'

type CustomerNotePageProps = {
  id: number
}

const CustomerNotePage = ({ id }: CustomerNotePageProps) => {
  return <CustomerNoteCell id={id} />
}

export default CustomerNotePage
