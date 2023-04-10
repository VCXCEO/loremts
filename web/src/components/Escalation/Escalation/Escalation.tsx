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
  DeleteEscalationMutationVariables,
  FindEscalationById,
} from 'types/graphql'

import { Link, navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_ESCALATION_MUTATION = gql`
  mutation DeleteEscalationMutation($id: Int!) {
    deleteEscalation(id: $id) {
      id
    }
  }
`

interface Props {
  escalation: NonNullable<FindEscalationById['escalation']>
}

const Escalation = ({ escalation }: Props) => {
  const [deleteEscalation] = useMutation(DELETE_ESCALATION_MUTATION, {
    onCompleted: () => {
      toast.success('Escalation deleted')
      navigate(routes.escalations())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteEscalationMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete escalation ' + id + '?')) {
      deleteEscalation({ variables: { id } })
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
        <CardHeader title={`Escalation ${escalation.id} Detail`} />
        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>{escalation.id}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{escalation.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Record</TableCell>
                <TableCell>{escalation.record}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Reason</TableCell>
                <TableCell>{escalation.reason}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Created at</TableCell>
                <TableCell>{timeTag(escalation.createdAt)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Updated at</TableCell>
                <TableCell>{timeTag(escalation.updatedAt)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Customer id</TableCell>
                <TableCell>{escalation.customerId}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Customer email</TableCell>
                <TableCell>{escalation.customerEmail}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Customer phone</TableCell>
                <TableCell>{escalation.customerPhone}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Company id</TableCell>
                <TableCell>{escalation.companyId}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Company name</TableCell>
                <TableCell>{escalation.companyName}</TableCell>
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
            <Link to={routes.editEscalation({ id: escalation.id })}>
              <Button color="primary" variant="contained">
                Edit
              </Button>
            </Link>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => onDeleteClick(escalation.id)}
            >
              Delete
            </Button>
          </nav>
        </CardContent>
      </Card>
    </div>
  )
}

export default Escalation
