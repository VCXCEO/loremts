import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CompanyBillingForm from 'src/components/CompanyBilling/CompanyBillingForm'

import type { CreateCompanyBillingInput } from 'types/graphql'

const CREATE_COMPANY_BILLING_MUTATION = gql`
  mutation CreateCompanyBillingMutation($input: CreateCompanyBillingInput!) {
    createCompanyBilling(input: $input) {
      id
    }
  }
`

const NewCompanyBilling = () => {
  const [createCompanyBilling, { loading, error }] = useMutation(
    CREATE_COMPANY_BILLING_MUTATION,
    {
      onCompleted: () => {
        toast.success('CompanyBilling created')
        navigate(routes.companyBillings())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateCompanyBillingInput) => {
    createCompanyBilling({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New CompanyBilling</h2>
      </header>
      <div className="rw-segment-main">
        <CompanyBillingForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewCompanyBilling
