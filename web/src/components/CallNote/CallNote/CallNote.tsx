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
  DeleteCallNoteMutationVariables,
  FindCallNoteById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_CALL_NOTE_MUTATION = gql`
  mutation DeleteCallNoteMutation($id: Int!) {
    deleteCallNote(id: $id) {
      id
    }
  }
`

interface Props {
  callNote: NonNullable<FindCallNoteById['callNote']>
}

const CallNote = ({ callNote }: Props) => {
  const [deleteCallNote] = useMutation(DELETE_CALL_NOTE_MUTATION, {
    onCompleted: () => {
      toast.success('CallNote deleted')
      navigate(routes.callNotes())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteCallNoteMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete callNote ' + id + '?')) {
      deleteCallNote({ variables: { id } })
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
                      <TableCell>{callNote.id}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Note
                      </TableCell>
                      <TableCell>{callNote.note}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Created at
                      </TableCell>
                      <TableCell>{timeTag(callNote.createdAt)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Updated at
                      </TableCell>
                      <TableCell>{timeTag(callNote.updatedAt)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Call id
                      </TableCell>
                      <TableCell>{callNote.callId}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Customer id
                      </TableCell>
                      <TableCell>{callNote.customerId}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Customer phone
                      </TableCell>
                      <TableCell>{callNote.customerPhone}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        User id
                      </TableCell>
                      <TableCell>{callNote.userId}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
            <CardActions>
              <Link to={routes.editCallNote({ id: callNote.id })}>
                <Button variant="contained" color="primary">
                  Edit
                </Button>
              </Link>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => onDeleteClick(callNote.id)}
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

export default CallNote
