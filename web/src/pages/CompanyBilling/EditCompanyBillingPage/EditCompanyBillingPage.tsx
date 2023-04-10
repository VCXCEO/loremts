import EditCompanyBillingCell from 'src/components/CompanyBilling/EditCompanyBillingCell'

type CompanyBillingPageProps = {
  id: number
}

const EditCompanyBillingPage = ({ id }: CompanyBillingPageProps) => {
  return <EditCompanyBillingCell id={id} />
}

export default EditCompanyBillingPage
