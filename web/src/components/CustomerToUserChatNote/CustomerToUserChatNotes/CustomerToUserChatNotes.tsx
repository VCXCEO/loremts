import { Grid, Paper } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import type {
  DeleteCustomerToUserChatNoteMutationVariables,
  FindCustomerToUserChatNotes,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/CustomerToUserChatNote/CustomerToUserChatNotesCell'

const DELETE_CUSTOMER_TO_USER_CHAT_NOTE_MUTATION = gql`
  mutation DeleteCustomerToUserChatNoteMutation($id: Int!) {
    deleteCustomerToUserChatNote(id: $id) {
      id
    }
  }
`

const CustomerToUserChatNotesList = ({
  customerToUserChatNotes,
}: FindCustomerToUserChatNotes) => {
  const [deleteCustomerToUserChatNote] = useMutation(
    DELETE_CUSTOMER_TO_USER_CHAT_NOTE_MUTATION,
    {
      onCompleted: () => {
        toast.success('CustomerToUserChatNote deleted')
      },
      onError: (error) => {
        toast.error(error.message)
      },
      refetchQueries: [{ query: QUERY }],
      awaitRefetchQueries: true,
    }
  )

  const onDeleteClick = (
    id: DeleteCustomerToUserChatNoteMutationVariables['id']
  ) => {
    if (
      confirm(
        'Are you sure you want to delete customerToUserChatNote ' + id + '?'
      )
    ) {
      deleteCustomerToUserChatNote({ variables: { id } })
    }
  }

  const renderShowAction = (params) => {
    const customerToUserChatNoteId = params.id
    return (
      <Link
        to={routes.customerToUserChatNote({ id: customerToUserChatNoteId })}
        title={
          'Show customerToUserChatNote ' + customerToUserChatNoteId + ' detail'
        }
        className="rw-button rw-button-small"
      >
        Show
      </Link>
    )
  }

  const renderEditAction = (params) => {
    const customerToUserChatNoteId = params.id
    return (
      <Link
        to={routes.editCustomerToUserChatNote({ id: customerToUserChatNoteId })}
        title={'Edit customerToUserChatNote ' + customerToUserChatNoteId}
        className="rw-button rw-button-small rw-button-blue"
      >
        Edit
      </Link>
    )
  }

  const renderDeleteAction = (params) => {
    const customerToUserChatNoteId = params.id
    return (
      <button
        type="button"
        title={'Delete customerToUserChatNote ' + customerToUserChatNoteId}
        className="rw-button rw-button-small rw-button-red"
        onClick={(event) => {
          event.stopPropagation()
          onDeleteClick(customerToUserChatNoteId)
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
    {
      field: 'customerToUserChatId',
      headerName: 'Customer to user chat id',
      flex: 1,
    },
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

  const rows = customerToUserChatNotes.map((customerToUserChatNote) => ({
    id: customerToUserChatNote.id,
    note: customerToUserChatNote.note,
    createdAt: formatDate(customerToUserChatNote.createdAt),
    updatedAt: formatDate(customerToUserChatNote.updatedAt),
    customerToUserChatId: customerToUserChatNote.customerToUserChatId,
    customerId: customerToUserChatNote.customerId,
    customerEmail: customerToUserChatNote.customerEmail,
    userId: customerToUserChatNote.userId,
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

export default CustomerToUserChatNotesList
