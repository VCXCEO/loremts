import { Grid, Paper } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import type {
  DeleteUserToUserChatNoteMutationVariables,
  FindUserToUserChatNotes,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/UserToUserChatNote/UserToUserChatNotesCell'

const DELETE_USER_TO_USER_CHAT_NOTE_MUTATION = gql`
  mutation DeleteUserToUserChatNoteMutation($id: Int!) {
    deleteUserToUserChatNote(id: $id) {
      id
    }
  }
`

const UserToUserChatNotesList = ({
  userToUserChatNotes,
}: FindUserToUserChatNotes) => {
  const [deleteUserToUserChatNote] = useMutation(
    DELETE_USER_TO_USER_CHAT_NOTE_MUTATION,
    {
      onCompleted: () => {
        toast.success('UserToUserChatNote deleted')
      },
      onError: (error) => {
        toast.error(error.message)
      },
      refetchQueries: [{ query: QUERY }],
      awaitRefetchQueries: true,
    }
  )

  const onDeleteClick = (
    id: DeleteUserToUserChatNoteMutationVariables['id']
  ) => {
    if (
      confirm('Are you sure you want to delete userToUserChatNote ' + id + '?')
    ) {
      deleteUserToUserChatNote({ variables: { id } })
    }
  }

  const renderShowAction = (params) => {
    const userToUserChatNoteId = params.id
    return (
      <Link
        to={routes.userToUserChatNote({ id: userToUserChatNoteId })}
        title={'Show userToUserChatNote ' + userToUserChatNoteId + ' detail'}
        className="rw-button rw-button-small"
      >
        Show
      </Link>
    )
  }

  const renderEditAction = (params) => {
    const userToUserChatNoteId = params.id
    return (
      <Link
        to={routes.editUserToUserChatNote({ id: userToUserChatNoteId })}
        title={'Edit userToUserChatNote ' + userToUserChatNoteId}
        className="rw-button rw-button-small rw-button-blue"
      >
        Edit
      </Link>
    )
  }

  const renderDeleteAction = (params) => {
    const userToUserChatNoteId = params.id
    return (
      <button
        type="button"
        title={'Delete userToUserChatNote ' + userToUserChatNoteId}
        className="rw-button rw-button-small rw-button-red"
        onClick={(event) => {
          event.stopPropagation()
          onDeleteClick(userToUserChatNoteId)
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
    { field: 'userToUserChatId', headerName: 'User to user chat id', flex: 1 },
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

  const rows = userToUserChatNotes.map((userToUserChatNote) => ({
    id: userToUserChatNote.id,
    note: userToUserChatNote.note,
    createdAt: formatDate(userToUserChatNote.createdAt),
    updatedAt: formatDate(userToUserChatNote.updatedAt),
    userToUserChatId: userToUserChatNote.userToUserChatId,
    userId: userToUserChatNote.userId,
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

export default UserToUserChatNotesList
