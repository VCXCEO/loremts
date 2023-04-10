import { Grid, Paper } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import type {
  DeleteCompanyBillingMutationVariables,
  FindCompanyBillings,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/CompanyBilling/CompanyBillingsCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_COMPANY_BILLING_MUTATION = gql`
  mutation DeleteCompanyBillingMutation($id: Int!) {
    deleteCompanyBilling(id: $id) {
      id
    }
  }
`

const CompanyBillingsList = ({ companyBillings }: FindCompanyBillings) => {
  const [deleteCompanyBilling] = useMutation(DELETE_COMPANY_BILLING_MUTATION, {
    onCompleted: () => {
      toast.success('CompanyBilling deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteCompanyBillingMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete companyBilling ' + id + '?')) {
      deleteCompanyBilling({ variables: { id } })
    }
  }

  const renderShowAction = (params) => {
    const companyBillingId = params.id

    return (
      <Link
        to={routes.companyBilling({ id: companyBillingId })}
        title={'Show companyBilling ' + companyBillingId + ' detail'}
        className="rw-button rw-button-small"
      >
        Show
      </Link>
    )
  }

  const renderEditAction = (params) => {
    const companyBillingId = params.id

    return (
      <Link
        to={routes.editCompanyBilling({ id: companyBillingId })}
        title={'Edit companyBilling ' + companyBillingId}
        className="rw-button rw-button-small rw-button-blue"
      >
        Edit
      </Link>
    )
  }

  const renderDeleteAction = (params) => {
    const companyBillingId = params.id

    return (
      <button
        type="button"
        title={'Delete companyBilling ' + companyBillingId}
        className="rw-button rw-button-small rw-button-red"
        onClick={(event) => {
          event.stopPropagation() // Prevent triggering onCellClick
          onDeleteClick(companyBillingId)
        }}
      >
        Delete
      </button>
    )
  }

  const columns = [
    { field: 'id', headerName: 'Id', flex: 1 },
    { field: 'billingPeriod', headerName: 'Billing period', flex: 1 },
    { field: 'billingAmount', headerName: 'Billing amount', flex: 1 },
    { field: 'renewalDate', headerName: 'Renewal date', flex: 1 },
    { field: 'renewalFrequency', headerName: 'Renewal frequency', flex: 1 },
    { field: 'createdAt', headerName: 'Created at', flex: 1 },
    { field: 'updatedAt', headerName: 'Updated at', flex: 1 },
    { field: 'companyId', headerName: 'Company id', flex: 1 },
    {
      field: 'showAction',
      headerName: ' ',
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: renderShowAction,
    },
    {
      field: 'editAction',
      headerName: ' ',
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: renderEditAction,
    },
    {
      field: 'deleteAction',
      headerName: ' ',
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: renderDeleteAction,
    },
  ]

  const rows = companyBillings.map((companyBilling) => ({
    id: companyBilling.id,
    billingPeriod: companyBilling.billingPeriod,
    billingAmount: companyBilling.billingAmount,
    renewalDate: companyBilling.renewalDate.toString(),
    renewalFrequency: companyBilling.renewalFrequency,
    createdAt: companyBilling.createdAt.toString(),
    updatedAt: companyBilling.updatedAt.toString(),
    companyId: companyBilling.companyId,
  }))

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={12}>
        <Paper>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            getRowId={(row) => row.id}
            onCellClick={(params, event) => {
              if (params.colDef.field === 'action_column') {
                event.stopPropagation()
              }
            }}
            disableSelectionOnClick
            autoHeight
            maxHeight={600}
            resizable
          />
        </Paper>
      </Grid>
    </Grid>
  )
}

export default CompanyBillingsList
