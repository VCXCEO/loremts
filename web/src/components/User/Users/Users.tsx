import { Grid, Paper } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import type { DeleteUserMutationVariables, FindUsers } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/User/UsersCell'

const DELETE_USER_MUTATION = gql`
  mutation DeleteUserMutation($id: Int!) {
    deleteUser(id: $id) {
      id
    }
  }
`

const UsersList = ({ users }: FindUsers) => {
  const [deleteUser] = useMutation(DELETE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteUserMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete user ' + id + '?')) {
      deleteUser({ variables: { id } })
    }
  }

  const renderProfilePictureImage = (params) => {
    const profilePictureUrl = params.value

    return (
      <img
        src={profilePictureUrl}
        alt="Profile Picture"
        width="50"
        height="50"
      />
    )
  }

  const renderShowAction = (params) => {
    const userId = params.id

    return (
      <Link
        to={routes.user({ id: userId })}
        title={'Show user ' + userId + ' detail'}
        className="rw-button rw-button-small"
      >
        Show
      </Link>
    )
  }

  const renderEditAction = (params) => {
    const userId = params.id

    return (
      <Link
        to={routes.editUser({ id: userId })}
        title={'Edit user ' + userId}
        className="rw-button rw-button-small rw-button-blue"
      >
        Edit
      </Link>
    )
  }

  const renderDeleteAction = (params) => {
    const userId = params.id

    return (
      <button
        type="button"
        title={'Delete user ' + userId}
        className="rw-button rw-button-small rw-button-red"
        onClick={(event) => {
          event.stopPropagation()
          onDeleteClick(userId)
        }}
      >
        Delete
      </button>
    )
  }

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'firstName', headerName: 'First Name', flex: 1 },
    { field: 'lastName', headerName: 'Last Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'roles', headerName: 'Roles', flex: 1 },
    { field: 'profilePicture', headerName: 'Profile Picture', flex: 1 },
    {
      field: 'profilePictureImage',
      headerName: 'Profile Picture Image',
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: renderProfilePictureImage,
    },
    { field: 'createdAt', headerName: 'Created At', flex: 1 },
    { field: 'updatedAt', headerName: 'Updated At', flex: 1 },
    { field: 'companyId', headerName: 'Company ID', flex: 1 },
    { field: 'companyName', headerName: 'Company Name', flex: 1 },
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

  const rows = users.map((user) => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    roles: user.roles,
    profilePicture: user.profilePicture,
    profilePictureImage: user.profilePicture,
    createdAt: user.createdAt.toString(),
    updatedAt: user.updatedAt.toString(),
    companyId: user.companyId,
    companyName: user.companyName,
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

export default UsersList
