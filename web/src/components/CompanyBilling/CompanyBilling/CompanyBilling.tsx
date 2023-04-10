import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material'
import type {
  DeleteCompanyBillingMutationVariables,
  FindCompanyBillingById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_COMPANY_BILLING_MUTATION = gql`
  mutation DeleteCompanyBillingMutation($id: Int!) {
    deleteCompanyBilling(id: $id) {
      id
    }
  }
`

interface Props {
  companyBilling: NonNullable<FindCompanyBillingById['companyBilling']>
}

const CompanyBilling = ({ companyBilling }: Props) => {
  const [deleteCompanyBilling] = useMutation(DELETE_COMPANY_BILLING_MUTATION, {
    onCompleted: () => {
      toast.success('CompanyBilling deleted')
      navigate(routes.companyBillings())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteCompanyBillingMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete companyBilling ' + id + '?')) {
      deleteCompanyBilling({ variables: { id } })
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card elevation={5}>
        <CardHeader title={`CompanyBilling ${companyBilling.id} Detail`} />
        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>{companyBilling.id}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Billing period</TableCell>
                <TableCell>{companyBilling.billingPeriod}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Billing amount</TableCell>
                <TableCell>{companyBilling.billingAmount}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Renewal date</TableCell>
                <TableCell>{timeTag(companyBilling.renewalDate)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Renewal frequency</TableCell>
                <TableCell>{companyBilling.renewalFrequency}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Created at</TableCell>
                <TableCell>{timeTag(companyBilling.createdAt)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Updated at</TableCell>
                <TableCell>{timeTag(companyBilling.updatedAt)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Company id</TableCell>
                <TableCell>{companyBilling.companyId}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <nav
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '1rem',
            }}
          >
            <Link to={routes.editCompanyBilling({ id: companyBilling.id })}>
              <Button color="primary" variant="contained">
                Edit
              </Button>
            </Link>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => onDeleteClick(companyBilling.id)}
            >
              Delete
            </Button>
          </nav>
        </CardContent>
      </Card>
    </div>
  )
}

export default CompanyBilling
