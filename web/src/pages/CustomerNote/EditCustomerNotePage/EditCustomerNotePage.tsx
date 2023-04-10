import EditCustomerNoteCell from 'src/components/CustomerNote/EditCustomerNoteCell'

type CustomerNotePageProps = {
  id: number
}

const EditCustomerNotePage = ({ id }: CustomerNotePageProps) => {
  return <EditCustomerNoteCell id={id} />
}

export default EditCustomerNotePage
