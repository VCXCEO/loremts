import CompanyCell from 'src/components/Company/CompanyCell'

type CompanyPageProps = {
  id: number
}

const CompanyPage = ({ id }: CompanyPageProps) => {
  return <CompanyCell id={id} />
}

export default CompanyPage
