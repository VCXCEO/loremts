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
  DeleteCustomerToUserChatMutationVariables,
  FindCustomerToUserChatById,
} from 'types/graphql'

import { Link, navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_CUSTOMER_TO_USER_CHAT_MUTATION = gql`
  mutation DeleteCustomerToUserChatMutation($id: Int!) {
    deleteCustomerToUserChat(id: $id) {
      id
    }
  }
`

interface Props {
  customerToUserChat: NonNullable<
    FindCustomerToUserChatById['customerToUserChat']
  >
}

const CustomerToUserChat = ({ customerToUserChat }: Props) => {
  const [deleteCustomerToUserChat] = useMutation(
    DELETE_CUSTOMER_TO_USER_CHAT_MUTATION,
    {
      onCompleted: () => {
        toast.success('CustomerToUserChat deleted')
        navigate(routes.customerToUserChats())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onDeleteClick = (
    id: DeleteCustomerToUserChatMutationVariables['id']
  ) => {
    if (
      confirm('Are you sure you want to delete customerToUserChat ' + id + '?')
    ) {
      deleteCustomerToUserChat({ variables: { id } })
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
        <CardHeader
          title={`CustomerToUserChat ${customerToUserChat.id} Detail`}
        />
        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>{customerToUserChat.id}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tags</TableCell>
                <TableCell>{customerToUserChat.tags}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Satisfaction rating</TableCell>
                <TableCell>{customerToUserChat.satisfactionRating}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Created at</TableCell>
                <TableCell>{timeTag(customerToUserChat.createdAt)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Updated at</TableCell>
                <TableCell>{timeTag(customerToUserChat.updatedAt)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Customer id</TableCell>
                <TableCell>{customerToUserChat.customerId}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Customer email</TableCell>
                <TableCell>{customerToUserChat.customerEmail}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Company id</TableCell>
                <TableCell>{customerToUserChat.companyId}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Company name</TableCell>
                <TableCell>{customerToUserChat.companyName}</TableCell>
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
            <Link
              to={routes.editCustomerToUserChat({ id: customerToUserChat.id })}
            >
              <Button color="primary" variant="contained">
                Edit
              </Button>
            </Link>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => onDeleteClick(customerToUserChat.id)}
            >
              Delete
            </Button>
          </nav>
        </CardContent>
      </Card>
    </div>
  )
}

export default CustomerToUserChat
