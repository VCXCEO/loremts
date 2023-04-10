import EditCompanyNoteCell from 'src/components/CompanyNote/EditCompanyNoteCell'

type CompanyNotePageProps = {
  id: number
}

const EditCompanyNotePage = ({ id }: CompanyNotePageProps) => {
  return <EditCompanyNoteCell id={id} />
}

export default EditCompanyNotePage
