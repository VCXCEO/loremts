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
  DeleteCompanyNoteMutationVariables,
  FindCompanyNoteById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_COMPANY_NOTE_MUTATION = gql`
  mutation DeleteCompanyNoteMutation($id: Int!) {
    deleteCompanyNote(id: $id) {
      id
    }
  }
`

interface Props {
  companyNote: NonNullable<FindCompanyNoteById['companyNote']>
}

const CompanyNote = ({ companyNote }: Props) => {
  const [deleteCompanyNote] = useMutation(DELETE_COMPANY_NOTE_MUTATION, {
    onCompleted: () => {
      toast.success('CompanyNote deleted')
      navigate(routes.companyNotes())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteCompanyNoteMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete companyNote ' + id + '?')) {
      deleteCompanyNote({ variables: { id } })
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
                      <TableCell>{companyNote.id}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Note
                      </TableCell>
                      <TableCell>{companyNote.note}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Created at
                      </TableCell>
                      <TableCell>{timeTag(companyNote.createdAt)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Updated at
                      </TableCell>
                      <TableCell>{timeTag(companyNote.updatedAt)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Company id
                      </TableCell>
                      <TableCell>{companyNote.companyId}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Company name
                      </TableCell>
                      <TableCell>{companyNote.companyName}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        User id
                      </TableCell>
                      <TableCell>{companyNote.userId}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
            <CardActions>
              <Link to={routes.editCompanyNote({ id: companyNote.id })}>
                <Button variant="contained" color="primary">
                  Edit
                </Button>
              </Link>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => onDeleteClick(companyNote.id)}
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

export default CompanyNote
