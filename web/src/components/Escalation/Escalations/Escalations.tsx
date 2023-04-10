import { Grid, Paper } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import type {
  DeleteEscalationMutationVariables,
  FindEscalations,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Escalation/EscalationsCell'

const DELETE_ESCALATION_MUTATION = gql`
  mutation DeleteEscalationMutation($id: Int!) {
    deleteEscalation(id: $id) {
      id
    }
  }
`

const EscalationsList = ({ escalations }: FindEscalations) => {
  const [deleteEscalation] = useMutation(DELETE_ESCALATION_MUTATION, {
    onCompleted: () => {
      toast.success('Escalation deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteEscalationMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete escalation ' + id + '?')) {
      deleteEscalation({ variables: { id } })
    }
  }

  const renderShowAction = (params) => {
    const escalationId = params.id

    return (
      <Link
        to={routes.escalation({ id: escalationId })}
        title={'Show escalation ' + escalationId + ' detail'}
        className="rw-button rw-button-small"
      >
        Show
      </Link>
    )
  }

  const renderEditAction = (params) => {
    const escalationId = params.id

    return (
      <Link
        to={routes.editEscalation({ id: escalationId })}
        title={'Edit escalation ' + escalationId}
        className="rw-button rw-button-small rw-button-blue"
      >
        Edit
      </Link>
    )
  }

  const renderDeleteAction = (params) => {
    const escalationId = params.id

    return (
      <button
        type="button"
        title={'Delete escalation ' + escalationId}
        className="rw-button rw-button-small rw-button-red"
        onClick={(event) => {
          event.stopPropagation() // Prevent triggering onCellClick
          onDeleteClick(escalationId)
        }}
      >
        Delete
      </button>
    )
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    }).format(date)
  }

  const columns = [
    // Add more columns as needed
    { field: 'id', headerName: 'Id', flex: 1 },
    { field: 'type', headerName: 'Type', flex: 1 },
    { field: 'record', headerName: 'Record', flex: 1 },
    { field: 'reason', headerName: 'Reason', flex: 1 },
    { field: 'createdAt', headerName: 'Created at', flex: 1 },
    { field: 'updatedAt', headerName: 'Updated at', flex: 1 },
    { field: 'customerId', headerName: 'Customer id', flex: 1 },
    { field: 'customerEmail', headerName: 'Customer email', flex: 1 },
    { field: 'customerPhone', headerName: 'Customer phone', flex: 1 },
    { field: 'companyId', headerName: 'Company id', flex: 1 },
    { field: 'companyName', headerName: 'Company name', flex: 1 },
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

  const rows = escalations.map((escalation) => ({
    id: escalation.id,
    type: escalation.type,
    record: escalation.record,
    reason: escalation.reason,
    createdAt: formatDate(escalation.createdAt),
    updatedAt: formatDate(escalation.updatedAt),
    customerId: escalation.customerId,
    customerEmail: escalation.customerEmail,
    customerPhone: escalation.customerPhone,
    companyId: escalation.companyId,
    companyName: escalation.companyName,
  }))

  return (
    <Grid container>
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

export default EscalationsList
