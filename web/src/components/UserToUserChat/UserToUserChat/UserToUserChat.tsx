import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material'
import type {
  DeleteUserToUserChatMutationVariables,
  FindUserToUserChatById,
} from 'types/graphql'

import { Link, navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_USER_TO_USER_CHAT_MUTATION = gql`
  mutation DeleteUserToUserChatMutation($id: Int!) {
    deleteUserToUserChat(id: $id) {
      id
    }
  }
`

interface Props {
  userToUserChat: NonNullable<FindUserToUserChatById['userToUserChat']>
}

const UserToUserChat = ({ userToUserChat }: Props) => {
  const [deleteUserToUserChat] = useMutation(
    DELETE_USER_TO_USER_CHAT_MUTATION,
    {
      onCompleted: () => {
        toast.success('UserToUserChat deleted')
        navigate(routes.userToUserChats())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onDeleteClick = (id: DeleteUserToUserChatMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete userToUserChat ' + id + '?')) {
      deleteUserToUserChat({ variables: { id } })
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
        <CardHeader title={`UserToUserChat ${userToUserChat.id} Detail`} />
        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>{userToUserChat.id}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tags</TableCell>
                <TableCell>{userToUserChat.tags}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Created at</TableCell>
                <TableCell>{timeTag(userToUserChat.createdAt)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Updated at</TableCell>
                <TableCell>{timeTag(userToUserChat.updatedAt)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Company id</TableCell>
                <TableCell>{userToUserChat.companyId}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Company name</TableCell>
                <TableCell>{userToUserChat.companyName}</TableCell>
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
            <Link to={routes.editUserToUserChat({ id: userToUserChat.id })}>
              <Button color="primary" variant="contained">
                Edit
              </Button>
            </Link>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => onDeleteClick(userToUserChat.id)}
            >
              Delete
            </Button>
          </nav>
        </CardContent>
      </Card>
    </div>
  )
}

export default UserToUserChat
