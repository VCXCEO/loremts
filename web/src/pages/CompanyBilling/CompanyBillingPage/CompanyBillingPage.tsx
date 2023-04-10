import CompanyBillingCell from 'src/components/CompanyBilling/CompanyBillingCell'

type CompanyBillingPageProps = {
  id: number
}

const CompanyBillingPage = ({ id }: CompanyBillingPageProps) => {
  return <CompanyBillingCell id={id} />
}

export default CompanyBillingPage
