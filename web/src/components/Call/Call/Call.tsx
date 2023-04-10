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
import type { DeleteCallMutationVariables, FindCallById } from 'types/graphql'

import { Link, navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import { timeTag } from 'src/lib/formatters'

const DELETE_CALL_MUTATION = gql`
  mutation DeleteCallMutation($id: Int!) {
    deleteCall(id: $id) {
      id
    }
  }
`

interface Props {
  call: NonNullable<FindCallById['call']>
}

const Call = ({ call }: Props) => {
  const { hasRole } = useAuth()
  const [deleteCall] = useMutation(DELETE_CALL_MUTATION, {
    onCompleted: () => {
      toast.success('Call deleted')
      navigate(routes.calls())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteCallMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete call ' + id + '?')) {
      deleteCall({ variables: { id } })
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
        <CardHeader title={`Call ${call.id} Detail`} />
        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>{call.id}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Call direction</TableCell>
                <TableCell>{call.callDirection}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Call duration</TableCell>
                <TableCell>{call.callDuration}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Record</TableCell>
                <TableCell>{call.record}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Date received</TableCell>
                <TableCell>{timeTag(call.dateReceived)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tags</TableCell>
                <TableCell>{call.tags}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Created at</TableCell>
                <TableCell>{timeTag(call.createdAt)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Updated at</TableCell>
                <TableCell>{timeTag(call.updatedAt)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Customer id</TableCell>
                <TableCell>{call.customerId}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Customer phone</TableCell>
                <TableCell>{call.customerPhone}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Company id</TableCell>
                <TableCell>{call.companyId}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Company name</TableCell>
                <TableCell>{call.companyName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>User id</TableCell>
                <TableCell>{call.userId}</TableCell>
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
            <Link to={routes.editCall({ id: call.id })}>
              <Button color="primary" variant="contained">
                Edit
              </Button>
            </Link>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => onDeleteClick(call.id)}
            >
              Delete
            </Button>
          </nav>
        </CardContent>
      </Card>
    </div>
  )
}

export default Call
