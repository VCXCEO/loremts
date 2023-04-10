import { Grid, Paper } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import type {
  DeleteUserToUserChatMessageMutationVariables,
  FindUserToUserChatMessages,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/UserToUserChatMessage/UserToUserChatMessagesCell'

const DELETE_USER_TO_USER_CHAT_MESSAGE_MUTATION = gql`
  mutation DeleteUserToUserChatMessageMutation($id: Int!) {
    deleteUserToUserChatMessage(id: $id) {
      id
    }
  }
`

const UserToUserChatMessagesList = ({
  userToUserChatMessages,
}: FindUserToUserChatMessages) => {
  const [deleteUserToUserChatMessage] = useMutation(
    DELETE_USER_TO_USER_CHAT_MESSAGE_MUTATION,
    {
      onCompleted: () => {
        toast.success('UserToUserChatMessage deleted')
      },
      onError: (error) => {
        toast.error(error.message)
      },
      refetchQueries: [{ query: QUERY }],
      awaitRefetchQueries: true,
    }
  )

  const onDeleteClick = (
    id: DeleteUserToUserChatMessageMutationVariables['id']
  ) => {
    if (
      confirm(
        'Are you sure you want to delete userToUserChatMessage ' + id + '?'
      )
    ) {
      deleteUserToUserChatMessage({ variables: { id } })
    }
  }

  const renderShowAction = (params) => {
    const userToUserChatMessageId = params.id
    return (
      <Link
        to={routes.userToUserChatMessage({ id: userToUserChatMessageId })}
        title={
          'Show userToUserChatMessage ' + userToUserChatMessageId + ' detail'
        }
        className="rw-button rw-button-small"
      >
        Show
      </Link>
    )
  }

  const renderEditAction = (params) => {
    const userToUserChatMessageId = params.id
    return (
      <Link
        to={routes.editUserToUserChatMessage({ id: userToUserChatMessageId })}
        title={'Edit userToUserChatMessage ' + userToUserChatMessageId}
        className="rw-button rw-button-small rw-button-blue"
      >
        Edit
      </Link>
    )
  }

  const renderDeleteAction = (params) => {
    const userToUserChatMessageId = params.id
    return (
      <button
        type="button"
        title={'Delete userToUserChatMessage ' + userToUserChatMessageId}
        className="rw-button rw-button-small rw-button-red"
        onClick={(event) => {
          event.stopPropagation()
          onDeleteClick(userToUserChatMessageId)
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
    { field: 'messageText', headerName: 'Message text', flex: 1 },
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

  const rows = userToUserChatMessages.map((userToUserChatMessage) => ({
    id: userToUserChatMessage.id,
    messageText: userToUserChatMessage.messageText,
    createdAt: formatDate(userToUserChatMessage.createdAt),
    updatedAt: formatDate(userToUserChatMessage.updatedAt),
    userToUserChatId: userToUserChatMessage.userToUserChatId,
    userId: userToUserChatMessage.userId,
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

export default UserToUserChatMessagesList
