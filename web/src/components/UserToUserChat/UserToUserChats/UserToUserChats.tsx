import { Grid, Paper } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import type {
  DeleteUserToUserChatMutationVariables,
  FindUserToUserChats,
} from 'types/graphql'

import { Link, navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/UserToUserChat/UserToUserChatsCell'

const DELETE_USER_TO_USER_CHAT_MUTATION = gql`
  mutation DeleteUserToUserChatMutation($id: Int!) {
    deleteUserToUserChat(id: $id) {
      id
    }
  }
`

const UserToUserChatsList = ({ userToUserChats }: FindUserToUserChats) => {
  const [deleteUserToUserChat] = useMutation(
    DELETE_USER_TO_USER_CHAT_MUTATION,
    {
      onCompleted: () => {
        toast.success('UserToUserChat deleted')
      },
      onError: (error) => {
        toast.error(error.message)
      },
      refetchQueries: [{ query: QUERY }],
      awaitRefetchQueries: true,
    }
  )

  const onDeleteClick = (id: DeleteUserToUserChatMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete userToUserChat ' + id + '?')) {
      deleteUserToUserChat({ variables: { id } })
    }
  }

  const renderShowAction = (params) => {
    const userToUserChatId = params.id

    return (
      <Link
        to={routes.userToUserChat({ id: userToUserChatId })}
        title={'Show userToUserChat ' + userToUserChatId + ' detail'}
        className="rw-button rw-button-small"
      >
        Show
      </Link>
    )
  }

  const renderEditAction = (params) => {
    const userToUserChatId = params.id

    return (
      <Link
        to={routes.editUserToUserChat({ id: userToUserChatId })}
        title={'Edit userToUserChat ' + userToUserChatId}
        className="rw-button rw-button-small rw-button-blue"
      >
        Edit
      </Link>
    )
  }

  const renderDeleteAction = (params) => {
    const userToUserChatId = params.id

    return (
      <button
        type="button"
        title={'Delete userToUserChat ' + userToUserChatId}
        className="rw-button rw-button-small rw-button-red"
        onClick={(event) => {
          event.stopPropagation()
          onDeleteClick(userToUserChatId)
        }}
      >
        Delete
      </button>
    )
  }

  const columns = [
    { field: 'id', headerName: 'Id', flex: 1 },
    { field: 'tags', headerName: 'Tags', flex: 1 },
    { field: 'createdAt', headerName: 'Created at', flex: 1 },
    { field: 'updatedAt', headerName: 'Updated at', flex: 1 },
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

  const rows = userToUserChats.map((userToUserChat) => ({
    id: userToUserChat.id,
    tags: userToUserChat.tags,
    createdAt: userToUserChat.createdAt.toString(),
    updatedAt: userToUserChat.updatedAt.toString(),
    companyId: userToUserChat.companyId,
    companyName: userToUserChat.companyName,
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

export default UserToUserChatsList
