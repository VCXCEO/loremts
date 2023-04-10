import { Card, CardContent, Typography, Button, Grid } from '@mui/material'
import { styled } from '@mui/system'
import type {
  DeleteCustomerToUserChatNoteMutationVariables,
  FindCustomerToUserChatNoteById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_CUSTOMER_TO_USER_CHAT_NOTE_MUTATION = gql`
  mutation DeleteCustomerToUserChatNoteMutation($id: Int!) {
    deleteCustomerToUserChatNote(id: $id) {
      id
    }
  }
`

interface Props {
  customerToUserChatNote: NonNullable<
    FindCustomerToUserChatNoteById['customerToUserChatNote']
  >
}

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
}))

const CustomerToUserChatNote = ({ customerToUserChatNote }: Props) => {
  const [deleteCustomerToUserChatNote] = useMutation(
    DELETE_CUSTOMER_TO_USER_CHAT_NOTE_MUTATION,
    {
      onCompleted: () => {
        toast.success('CustomerToUserChatNote deleted')
        navigate(routes.customerToUserChatNotes())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onDeleteClick = (
    id: DeleteCustomerToUserChatNoteMutationVariables['id']
  ) => {
    if (
      confirm(
        'Are you sure you want to delete customerToUserChatNote ' + id + '?'
      )
    ) {
      deleteCustomerToUserChatNote({ variables: { id } })
    }
  }

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          CustomerToUserChatNote {customerToUserChatNote.id} Detail
        </Typography>
        <Grid container spacing={2}>
          {[
            ['Id', customerToUserChatNote.id],
            ['Note', customerToUserChatNote.note],
            ['Created at', timeTag(customerToUserChatNote.createdAt)],
            ['Updated at', timeTag(customerToUserChatNote.updatedAt)],
            [
              'Customer to user chat id',
              customerToUserChatNote.customerToUserChatId,
            ],
            ['Customer id', customerToUserChatNote.customerId],
            ['Customer email', customerToUserChatNote.customerEmail],
            ['User id', customerToUserChatNote.userId],
          ].map(([label, value]) => (
            <Grid item xs={12} key={label}>
              <Typography variant="subtitle1">
                <strong>{label}:</strong> {value}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </CardContent>
      <Grid container spacing={2} justifyContent="flex-end">
        <Grid item>
          <Button
            component={Link}
            to={routes.editCustomerToUserChatNote({
              id: customerToUserChatNote.id,
            })}
            variant="contained"
            color="primary"
          >
            Edit
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="error"
            onClick={() => onDeleteClick(customerToUserChatNote.id)}
          >
            Delete
          </Button>
        </Grid>
      </Grid>
    </StyledCard>
  )
}

export default CustomerToUserChatNote
