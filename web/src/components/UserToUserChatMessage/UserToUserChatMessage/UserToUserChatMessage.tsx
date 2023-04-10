import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material'
import type {
  DeleteUserToUserChatMessageMutationVariables,
  FindUserToUserChatMessageById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_USER_TO_USER_CHAT_MESSAGE_MUTATION = gql`
  mutation DeleteUserToUserChatMessageMutation($id: Int!) {
    deleteUserToUserChatMessage(id: $id) {
      id
    }
  }
`

interface Props {
  userToUserChatMessage: NonNullable<
    FindUserToUserChatMessageById['userToUserChatMessage']
  >
}

const UserToUserChatMessage = ({ userToUserChatMessage }: Props) => {
  const [deleteUserToUserChatMessage] = useMutation(
    DELETE_USER_TO_USER_CHAT_MESSAGE_MUTATION,
    {
      onCompleted: () => {
        toast.success('UserToUserChatMessage deleted')
        navigate(routes.userToUserChatMessages())
      },
      onError: (error) => {
        toast.error(error.message)
      },
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

  return (
    <Card>
      <CardContent>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              UserToUserChatMessage {userToUserChatMessage.id} Detail
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>{userToUserChatMessage.id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Message text</TableCell>
                  <TableCell>{userToUserChatMessage.messageText}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Created at</TableCell>
                  <TableCell>
                    {timeTag(userToUserChatMessage.createdAt)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Updated at</TableCell>
                  <TableCell>
                    {timeTag(userToUserChatMessage.updatedAt)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>User to user chat id</TableCell>
                  <TableCell>
                    {userToUserChatMessage.userToUserChatId}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>User id</TableCell>
                  <TableCell>{userToUserChatMessage.userId}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-start" mt={2}>
              <Box mr={1}>
                <Link
                  to={routes.editUserToUserChatMessage({
                    id: userToUserChatMessage.id,
                  })}
                  component={Button}
                  variant="contained"
                  color="primary"
                >
                  Edit
                </Link>
              </Box>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => onDeleteClick(userToUserChatMessage.id)}
              >
                {' '}
                Delete
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default UserToUserChatMessage
