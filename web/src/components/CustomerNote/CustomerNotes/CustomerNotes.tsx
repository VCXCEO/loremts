import { Grid, Paper } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import type {
  DeleteCustomerNoteMutationVariables,
  FindCustomerNotes,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { gql } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/CustomerNote/CustomerNotesCell'
import { Truncate, TimeTag } from 'src/lib/formatters'

const DELETE_CUSTOMER_NOTE_MUTATION = gql`
  mutation DeleteCustomerNoteMutation($id: Int!) {
    deleteCustomerNote(id: $id) {
      id
    }
  }
`

const CustomerNotesList = ({ customerNotes }: FindCustomerNotes) => {
  const [deleteCustomerNote] = useMutation(DELETE_CUSTOMER_NOTE_MUTATION, {
    onCompleted: () => {
      toast.success('CustomerNote deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteCustomerNoteMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete customerNote ' + id + '?')) {
      deleteCustomerNote({ variables: { id } })
    }
  }

  const renderShowAction = (customerNote) => {
    return (
      <Link
        to={routes.customerNote({ id: customerNote.id })}
        title={'Show customerNote ' + customerNote.id + ' detail'}
        className="rw-button rw-button-small"
      >
        Show
      </Link>
    )
  }

  const renderEditAction = (customerNote) => {
    return (
      <Link
        to={routes.editCustomerNote({ id: customerNote.id })}
        title={'Edit customerNote ' + customerNote.id}
        className="rw-button rw-button-small rw-button-blue"
      >
        Edit
      </Link>
    )
  }

  const renderDeleteAction = (customerNote) => {
    return (
      <button
        type="button"
        title={'Delete customerNote ' + customerNote.id}
        className="rw-button rw-button-small rw-button-red"
        onClick={() => onDeleteClick(customerNote.id)}
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
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    }).format(date)
  }

  const columns = [
    { field: 'id', headerName: 'Id', flex: 1 },
    { field: 'note', headerName: 'Note', flex: 1 },
    { field: 'createdAt', headerName: 'Created at', flex: 1 },
    { field: 'updatedAt', headerName: 'Updated at', flex: 1 },
    { field: 'customerId', headerName: 'Customer id', flex: 1 },
    { field: 'customerEmail', headerName: 'Customer email', flex: 1 },
    { field: 'customerPhone', headerName: 'Customer phone', flex: 1 },
    { field: 'userId', headerName: 'User id', flex: 1 },

    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          {renderShowAction(params.row)}
          {renderEditAction(params.row)}
          {renderDeleteAction(params.row)}
        </>
      ),
    },
  ]

  const rows = customerNotes.map((customerNote) => ({
    id: customerNote.id,
    note: customerNote.note,
    createdAt: formatDate(customerNote.createdAt),
    updatedAt: formatDate(customerNote.updatedAt),
    customerId: customerNote.customerId,
    customerEmail: customerNote.customerEmail,
    customerPhone: customerNote.customerPhone,
    userId: customerNote.userId,
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
              if (params.colDef.field === 'actions') {
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

export default CustomerNotesList
