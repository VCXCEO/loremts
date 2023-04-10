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
  DeleteCustomerMutationVariables,
  FindCustomerById,
} from 'types/graphql'

import { Link, navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_CUSTOMER_MUTATION = gql`
  mutation DeleteCustomerMutation($id: Int!) {
    deleteCustomer(id: $id) {
      id
    }
  }
`

interface Props {
  customer: NonNullable<FindCustomerById['customer']>
}

const Customer = ({ customer }: Props) => {
  const [deleteCustomer] = useMutation(DELETE_CUSTOMER_MUTATION, {
    onCompleted: () => {
      toast.success('Customer deleted')
      navigate(routes.customers())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteCustomerMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete customer ' + id + '?')) {
      deleteCustomer({ variables: { id } })
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
        <CardHeader title={`Customer ${customer.id} Detail`} />
        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>{customer.id}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>First name</TableCell>
                <TableCell>{customer.firstName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Last name</TableCell>
                <TableCell>{customer.lastName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>{customer.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Phone</TableCell>
                <TableCell>{customer.phone}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Interaction rating aggregate</TableCell>
                <TableCell>{customer.interactionRatingAggregate}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Transaction id</TableCell>
                <TableCell>{customer.transactionId}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Created at</TableCell>
                <TableCell>{timeTag(customer.createdAt)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Updated at</TableCell>
                <TableCell>{timeTag(customer.updatedAt)}</TableCell>
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
            <Link to={routes.editCustomer({ id: customer.id })}>
              <Button color="primary" variant="contained">
                Edit
              </Button>
            </Link>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => onDeleteClick(customer.id)}
            >
              Delete
            </Button>
          </nav>
        </CardContent>
      </Card>
    </div>
  )
}

export default Customer
