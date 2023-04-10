import CompanyNoteCell from 'src/components/CompanyNote/CompanyNoteCell'

type CompanyNotePageProps = {
  id: number
}

const CompanyNotePage = ({ id }: CompanyNotePageProps) => {
  return <CompanyNoteCell id={id} />
}

export default CompanyNotePage
