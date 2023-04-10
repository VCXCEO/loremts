import { Grid, Paper } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import type {
  DeleteCompanyNoteMutationVariables,
  FindCompanyNotes,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/CompanyNote/CompanyNotesCell'

const DELETE_COMPANY_NOTE_MUTATION = gql`
  mutation DeleteCompanyNoteMutation($id: Int!) {
    deleteCompanyNote(id: $id) {
      id
    }
  }
`

const CompanyNotesList = ({ companyNotes }: FindCompanyNotes) => {
  const [deleteCompanyNote] = useMutation(DELETE_COMPANY_NOTE_MUTATION, {
    onCompleted: () => {
      toast.success('CompanyNote deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteCompanyNoteMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete companyNote ' + id + '?')) {
      deleteCompanyNote({ variables: { id } })
    }
  }

  const renderShowAction = (params) => {
    const companyNoteId = params.id
    return (
      <Link
        to={routes.companyNote({ id: companyNoteId })}
        title={'Show companyNote ' + companyNoteId + ' detail'}
        className="rw-button rw-button-small"
      >
        Show
      </Link>
    )
  }

  const renderEditAction = (params) => {
    const companyNoteId = params.id

    return (
      <Link
        to={routes.editCompanyNote({ id: companyNoteId })}
        title={'Edit companyNote ' + companyNoteId}
        className="rw-button rw-button-small rw-button-blue"
      >
        Edit
      </Link>
    )
  }

  const renderDeleteAction = (params) => {
    const companyNoteId = params.id
    return (
      <button
        type="button"
        title={'Delete companyNote ' + companyNoteId}
        className="rw-button rw-button-small rw-button-red"
        onClick={(event) => {
          event.stopPropagation()
          onDeleteClick(companyNoteId)
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
    { field: 'companyId', headerName: 'Company id', flex: 1 },
    { field: 'companyName', headerName: 'Company name', flex: 1 },
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

  const rows = companyNotes.map((companyNote) => ({
    id: companyNote.id,
    note: companyNote.note,
    createdAt: formatDate(companyNote.createdAt),
    updatedAt: formatDate(companyNote.updatedAt),
    companyId: companyNote.companyId,
    companyName: companyNote.companyName,
    userId: companyNote.userId,
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

export default CompanyNotesList
