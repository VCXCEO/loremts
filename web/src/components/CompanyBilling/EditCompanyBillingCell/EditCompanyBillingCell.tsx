import type {
  EditCompanyBillingById,
  UpdateCompanyBillingInput,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CompanyBillingForm from 'src/components/CompanyBilling/CompanyBillingForm'

export const QUERY = gql`
  query EditCompanyBillingById($id: Int!) {
    companyBilling: companyBilling(id: $id) {
      id
      billingPeriodStart
      billingPeriodEnd
      billingAmount
      renewalDate
      renewalFrequency
      createdAt
      updatedAt
      companyId
    }
  }
`
const UPDATE_COMPANY_BILLING_MUTATION = gql`
  mutation UpdateCompanyBillingMutation(
    $id: Int!
    $input: UpdateCompanyBillingInput!
  ) {
    updateCompanyBilling(id: $id, input: $input) {
      id
      billingPeriodStart
      billingPeriodEnd
      billingAmount
      renewalDate
      renewalFrequency
      createdAt
      updatedAt
      companyId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  companyBilling,
}: CellSuccessProps<EditCompanyBillingById>) => {
  const [updateCompanyBilling, { loading, error }] = useMutation(
    UPDATE_COMPANY_BILLING_MUTATION,
    {
      onCompleted: () => {
        toast.success('CompanyBilling updated')
        navigate(routes.companyBillings())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateCompanyBillingInput,
    id: EditCompanyBillingById['companyBilling']['id']
  ) => {
    updateCompanyBilling({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit CompanyBilling {companyBilling?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <CompanyBillingForm
          companyBilling={companyBilling}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
