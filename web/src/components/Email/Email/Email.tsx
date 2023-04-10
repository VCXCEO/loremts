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
import type { DeleteEmailMutationVariables, FindEmailById } from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_EMAIL_MUTATION = gql`
  mutation DeleteEmailMutation($id: Int!) {
    deleteEmail(id: $id) {
      id
    }
  }
`

interface Props {
  email: NonNullable<FindEmailById['email']>
}

const Email = ({ email }: Props) => {
  const [deleteEmail] = useMutation(DELETE_EMAIL_MUTATION, {
    onCompleted: () => {
      toast.success('Email deleted')
      navigate(routes.emails())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteEmailMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete email ' + id + '?')) {
      deleteEmail({ variables: { id } })
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
        <CardHeader title={`Email ${email.id} Detail`} />
        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>{email.id}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Message id</TableCell>
                <TableCell>{email.messageId}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Conversation id</TableCell>
                <TableCell>{email.conversationId}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Direction</TableCell>
                <TableCell>{email.direction}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Inbox</TableCell>
                <TableCell>{email.inbox}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Handle time</TableCell>
                <TableCell>{email.handleTime}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Date received</TableCell>
                <TableCell>{timeTag(email.dateReceived)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tags</TableCell>
                <TableCell>{email.tags}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Satisfaction rating</TableCell>
                <TableCell>{email.satisfactionRating}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Created at</TableCell>
                <TableCell>{timeTag(email.createdAt)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Updated at</TableCell>
                <TableCell>{timeTag(email.updatedAt)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Customer id</TableCell>
                <TableCell>{email.customerId}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Customer email</TableCell>
                <TableCell>{email.customerEmail}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Company id</TableCell>
                <TableCell>{email.companyId}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Company name</TableCell>
                <TableCell>{email.companyName}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>User id</TableCell>
                <TableCell>{email.userId}</TableCell>
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
            <Link to={routes.editEmail({ id: email.id })}>
              <Button color="primary" variant="contained">
                Edit
              </Button>
            </Link>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => onDeleteClick(email.id)}
            >
              Delete
            </Button>
          </nav>
        </CardContent>
      </Card>
    </div>
  )
}

export default Email
