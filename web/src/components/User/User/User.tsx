import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material'
import type { DeleteUserMutationVariables, FindUserById } from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_USER_MUTATION = gql`
  mutation DeleteUserMutation($id: Int!) {
    deleteUser(id: $id) {
      id
    }
  }
`

interface Props {
  user: NonNullable<FindUserById['user']>
}

const User = ({ user }: Props) => {
  const [deleteUser] = useMutation(DELETE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User deleted')
      navigate(routes.users())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteUserMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete user ' + id + '?')) {
      deleteUser({ variables: { id } })
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card elevation={5}>
        <div style={{ width: '100%', overflow: 'hidden' }}>
          <CardMedia
            component="img"
            style={{ width: '100%', height: '200px', objectFit: 'contain' }}
            image={user.profilePicture}
            alt={`Profile picture of user ${user.id}`}
          />
        </div>
        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>{user.id}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>First name</TableCell>
                <TableCell>{user.firstName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Last name</TableCell>
                <TableCell>{user.lastName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Roles</TableCell>
                <TableCell>{user.roles}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Profile picture</TableCell>
                <TableCell>{user.profilePicture}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Created at</TableCell>
                <TableCell>{timeTag(user.createdAt)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Updated at</TableCell>
                <TableCell>{timeTag(user.updatedAt)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Company id</TableCell>
                <TableCell>{user.companyId}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Company name</TableCell>
                <TableCell>{user.companyName}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <nav
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '1rem',
            }}
          >
            <Link to={routes.editUser({ id: user.id })}>
              <Button color="primary" variant="contained">
                Edit
              </Button>
            </Link>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => onDeleteClick(user.id)}
            >
              Delete
            </Button>
          </nav>
        </CardContent>
      </Card>
    </div>
  )
}

export default User
