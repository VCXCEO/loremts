import EditCompanyCell from 'src/components/Company/EditCompanyCell'

type CompanyPageProps = {
  id: number
}

const EditCompanyPage = ({ id }: CompanyPageProps) => {
  return <EditCompanyCell id={id} />
}

export default EditCompanyPage
