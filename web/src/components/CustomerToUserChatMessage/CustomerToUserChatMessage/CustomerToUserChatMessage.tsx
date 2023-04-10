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
  DeleteCustomerToUserChatMessageMutationVariables,
  FindCustomerToUserChatMessageById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_CUSTOMER_TO_USER_CHAT_MESSAGE_MUTATION = gql`
  mutation DeleteCustomerToUserChatMessageMutation($id: Int!) {
    deleteCustomerToUserChatMessage(id: $id) {
      id
    }
  }
`

interface Props {
  customerToUserChatMessage: NonNullable<
    FindCustomerToUserChatMessageById['customerToUserChatMessage']
  >
}

const CustomerToUserChatMessage = ({ customerToUserChatMessage }: Props) => {
  const [deleteCustomerToUserChatMessage] = useMutation(
    DELETE_CUSTOMER_TO_USER_CHAT_MESSAGE_MUTATION,
    {
      onCompleted: () => {
        toast.success('CustomerToUserChatMessage deleted')
        navigate(routes.customerToUserChatMessages())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onDeleteClick = (
    id: DeleteCustomerToUserChatMessageMutationVariables['id']
  ) => {
    if (
      confirm(
        'Are you sure you want to delete customerToUserChatMessage ' + id + '?'
      )
    ) {
      deleteCustomerToUserChatMessage({ variables: { id } })
    }
  }

  return (
    <Card>
      <CardContent>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              CustomerToUserChatMessage {customerToUserChatMessage.id} Detail
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>{customerToUserChatMessage.id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Message text</TableCell>
                  <TableCell>{customerToUserChatMessage.messageText}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Created at</TableCell>
                  <TableCell>
                    {timeTag(customerToUserChatMessage.createdAt)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Updated at</TableCell>
                  <TableCell>
                    {timeTag(customerToUserChatMessage.updatedAt)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Customer to user chat id</TableCell>
                  <TableCell>
                    {customerToUserChatMessage.customerToUserChatId}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>User id</TableCell>
                  <TableCell>{customerToUserChatMessage.userId}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-start" mt={2}>
              <Box mr={1}>
                <Link
                  to={routes.editCustomerToUserChatMessage({
                    id: customerToUserChatMessage.id,
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
                onClick={() => onDeleteClick(customerToUserChatMessage.id)}
              >
                Delete
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CustomerToUserChatMessage
