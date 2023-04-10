import {
  Card,
  CardContent,
  CardActions,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Button,
} from '@mui/material'
import type {
  DeleteCustomerNoteMutationVariables,
  FindCustomerNoteById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_CUSTOMER_NOTE_MUTATION = gql`
  mutation DeleteCustomerNoteMutation($id: Int!) {
    deleteCustomerNote(id: $id) {
      id
    }
  }
`

interface Props {
  customerNote: NonNullable<FindCustomerNoteById['customerNote']>
}

const CustomerNote = ({ customerNote }: Props) => {
  const [deleteCustomerNote] = useMutation(DELETE_CUSTOMER_NOTE_MUTATION, {
    onCompleted: () => {
      toast.success('CustomerNote deleted')
      navigate(routes.customerNotes())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteCustomerNoteMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete customerNote ' + id + '?')) {
      deleteCustomerNote({ variables: { id } })
    }
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <TableContainer component={Paper}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Id
                      </TableCell>
                      <TableCell>{customerNote.id}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Note
                      </TableCell>
                      <TableCell>{customerNote.note}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Created at
                      </TableCell>
                      <TableCell>{timeTag(customerNote.createdAt)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Updated at
                      </TableCell>
                      <TableCell>{timeTag(customerNote.updatedAt)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Customer id
                      </TableCell>
                      <TableCell>{customerNote.customerId}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Customer email
                      </TableCell>
                      <TableCell>{customerNote.customerEmail}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Customer phone
                      </TableCell>
                      <TableCell>{customerNote.customerPhone}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        User id
                      </TableCell>
                      <TableCell>{customerNote.userId}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
            <CardActions>
              <Link to={routes.editCustomerNote({ id: customerNote.id })}>
                <Button variant="contained" color="primary">
                  Edit
                </Button>
              </Link>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => onDeleteClick(customerNote.id)}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default CustomerNote
