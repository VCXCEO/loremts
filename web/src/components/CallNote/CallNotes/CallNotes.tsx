import { Grid, Paper } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import type {
  DeleteCallNoteMutationVariables,
  FindCallNotes,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/CallNote/CallNotesCell'

const DELETE_CALL_NOTE_MUTATION = gql`
  mutation DeleteCallNoteMutation($id: Int!) {
    deleteCallNote(id: $id) {
      id
    }
  }
`

const CallNotesList = ({ callNotes }: FindCallNotes) => {
  const [deleteCallNote] = useMutation(DELETE_CALL_NOTE_MUTATION, {
    onCompleted: () => {
      toast.success('CallNote deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteCallNoteMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete callNote ' + id + '?')) {
      deleteCallNote({ variables: { id } })
    }
  }

  const renderShowAction = (params) => {
    const callNoteId = params.id
    return (
      <Link
        to={routes.callNote({ id: callNoteId })}
        title={'Show callNote ' + callNoteId + ' detail'}
        className="rw-button rw-button-small"
      >
        Show
      </Link>
    )
  }

  const renderEditAction = (params) => {
    const callNoteId = params.id

    return (
      <Link
        to={routes.editCallNote({ id: callNoteId })}
        title={'Edit callNote ' + callNoteId}
        className="rw-button rw-button-small rw-button-blue"
      >
        Edit
      </Link>
    )
  }

  const renderDeleteAction = (params) => {
    const callNoteId = params.id
    return (
      <button
        type="button"
        title={'Delete callNote ' + callNoteId}
        className="rw-button rw-button-small rw-button-red"
        onClick={(event) => {
          event.stopPropagation()
          onDeleteClick(callNoteId)
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
    // Add columns as needed
    { field: 'id', headerName: 'Id', flex: 1 },
    { field: 'note', headerName: 'Note', flex: 1 },
    { field: 'createdAt', headerName: 'Created at', flex: 1 },
    { field: 'updatedAt', headerName: 'Updated at', flex: 1 },
    { field: 'callId', headerName: 'Call id', flex: 1 },
    { field: 'customerId', headerName: 'Customer id', flex: 1 },
    { field: 'customerPhone', headerName: 'Customer phone', flex: 1 },
    { field: 'userId', headerName: 'User id', flex: 1 },
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

  const rows = callNotes.map((callNote) => ({
    id: callNote.id,
    note: callNote.note,
    createdAt: formatDate(callNote.createdAt),
    updatedAt: formatDate(callNote.updatedAt),
    callId: callNote.callId,
    customerId: callNote.customerId,
    customerPhone: callNote.customerPhone,
    userId: callNote.userId,
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

export default CallNotesList
