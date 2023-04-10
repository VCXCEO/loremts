import { Grid, Paper } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import type { DeleteCallMutationVariables, FindCalls } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Call/CallsCell'

const DELETE_CALL_MUTATION = gql`
  mutation DeleteCallMutation($id: Int!) {
    deleteCall(id: $id) {
      id
    }
  }
`

const CallsList = ({ calls }: FindCalls) => {
  const [deleteCall] = useMutation(DELETE_CALL_MUTATION, {
    onCompleted: () => {
      toast.success('Call deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteCallMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete call ' + id + '?')) {
      deleteCall({ variables: { id } })
    }
  }

  const renderShowAction = (params) => {
    const callId = params.id

    return (
      <Link
        to={routes.call({ id: callId })}
        title={'Show call ' + callId + ' detail'}
        className="rw-button rw-button-small"
      >
        Show
      </Link>
    )
  }

  const renderEditAction = (params) => {
    const callId = params.id

    return (
      <Link
        to={routes.editCall({ id: callId })}
        title={'Edit call ' + callId}
        className="rw-button rw-button-small rw-button-blue"
      >
        Edit
      </Link>
    )
  }

  const renderDeleteAction = (params) => {
    const callId = params.id

    return (
      <button
        type="button"
        title={'Delete call ' + callId}
        className="rw-button rw-button-small rw-button-red"
        onClick={(event) => {
          event.stopPropagation() // Prevent triggering onCellClick
          onDeleteClick(callId)
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
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'callDirection', headerName: 'Call Direction', flex: 1 },
    { field: 'callDuration', headerName: 'Call Duration', flex: 1 },
    { field: 'record', headerName: 'Record', flex: 1 },
    { field: 'dateReceived', headerName: 'Date Received', flex: 1 },
    { field: 'tags', headerName: 'Tags', flex: 1 },
    {
      field: 'satisfactionRating',
      headerName: 'Satisfaction Rating',
      flex: 1,
    },
    { field: 'createdAt', headerName: 'Created At', flex: 1 },
    { field: 'updatedAt', headerName: 'Updated At', flex: 1 },
    { field: 'customerId', headerName: 'Customer ID', flex: 1 },
    { field: 'customerPhone', headerName: 'Customer Phone', flex: 1 },
    { field: 'companyId', headerName: 'Company ID', flex: 1 },
    { field: 'companyName', headerName: 'Company Name', flex: 1 },
    { field: 'userId', headerName: 'User ID', flex: 1 },
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

  const rows = calls.map((call) => ({
    id: call.id,
    callDirection: call.callDirection,
    callDuration: call.callDuration,
    record: call.record,
    dateReceived: formatDate(call.dateReceived),
    tags: call.tags,
    satisfactionRating: call.satisfactionRating,
    createdAt: formatDate(call.createdAt),
    updatedAt: formatDate(call.updatedAt),
    customerId: call.customerId,
    customerPhone: call.customerPhone,
    companyId: call.companyId,
    companyName: call.companyName,
    userId: call.userId,
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

export default CallsList
