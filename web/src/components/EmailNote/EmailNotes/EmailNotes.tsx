import { Grid, Paper } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import type {
  DeleteEmailNoteMutationVariables,
  FindEmailNotes,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/EmailNote/EmailNotesCell'

const DELETE_EMAIL_NOTE_MUTATION = gql`
  mutation DeleteEmailNoteMutation($id: Int!) {
    deleteEmailNote(id: $id) {
      id
    }
  }
`

const EmailNotesList = ({ emailNotes }: FindEmailNotes) => {
  const [deleteEmailNote] = useMutation(DELETE_EMAIL_NOTE_MUTATION, {
    onCompleted: () => {
      toast.success('EmailNote deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteEmailNoteMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete emailNote ' + id + '?')) {
      deleteEmailNote({ variables: { id } })
    }
  }

  const renderShowAction = (params) => {
    const emailNoteId = params.id
    return (
      <Link
        to={routes.emailNote({ id: emailNoteId })}
        title={'Show emailNote ' + emailNoteId + ' detail'}
        className="rw-button rw-button-small"
      >
        Show
      </Link>
    )
  }

  const renderEditAction = (params) => {
    const emailNoteId = params.id
    return (
      <Link
        to={routes.editEmailNote({ id: emailNoteId })}
        title={'Edit emailNote ' + emailNoteId}
        className="rw-button rw-button-small rw-button-blue"
      >
        Edit
      </Link>
    )
  }

  const renderDeleteAction = (params) => {
    const emailNoteId = params.id
    return (
      <button
        type="button"
        title={'Delete emailNote ' + emailNoteId}
        className="rw-button rw-button-small rw-button-red"
        onClick={(event) => {
          event.stopPropagation()
          onDeleteClick(emailNoteId)
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
    { field: 'id', headerName: 'Id', flex: 1 },
    { field: 'note', headerName: 'Note', flex: 1 },
    { field: 'createdAt', headerName: 'Created at', flex: 1 },
    { field: 'updatedAt', headerName: 'Updated at', flex: 1 },
    { field: 'emailId', headerName: 'Email id', flex: 1 },
    { field: 'customerId', headerName: 'Customer id', flex: 1 },
    { field: 'customerEmail', headerName: 'Customer email', flex: 1 },
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

  const rows = emailNotes.map((emailNote) => ({
    id: emailNote.id,
    note: emailNote.note,
    createdAt: formatDate(emailNote.createdAt),
    updatedAt: formatDate(emailNote.updatedAt),
    emailId: emailNote.emailId,
    customerId: emailNote.customerId,
    customerEmail: emailNote.customerEmail,
    userId: emailNote.userId,
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

export default EmailNotesList
