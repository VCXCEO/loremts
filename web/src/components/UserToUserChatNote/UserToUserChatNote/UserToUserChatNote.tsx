import { Card, CardContent, Typography, Button, Grid } from '@mui/material'
import { styled } from '@mui/system'
import type {
  DeleteUserToUserChatNoteMutationVariables,
  FindUserToUserChatNoteById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_USER_TO_USER_CHAT_NOTE_MUTATION = gql`
  mutation DeleteUserToUserChatNoteMutation($id: Int!) {
    deleteUserToUserChatNote(id: $id) {
      id
    }
  }
`

interface Props {
  userToUserChatNote: NonNullable<
    FindUserToUserChatNoteById['userToUserChatNote']
  >
}

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
}))

const UserToUserChatNote = ({ userToUserChatNote }: Props) => {
  const [deleteUserToUserChatNote] = useMutation(
    DELETE_USER_TO_USER_CHAT_NOTE_MUTATION,
    {
      onCompleted: () => {
        toast.success('UserToUserChatNote deleted')
        navigate(routes.userToUserChatNotes())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onDeleteClick = (
    id: DeleteUserToUserChatNoteMutationVariables['id']
  ) => {
    if (
      confirm('Are you sure you want to delete userToUserChatNote ' + id + '?')
    ) {
      deleteUserToUserChatNote({ variables: { id } })
    }
  }

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          UserToUserChatNote {userToUserChatNote.id} Detail
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              <strong>Id:</strong> {userToUserChatNote.id}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              <strong>Note:</strong> {userToUserChatNote.note}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              <strong>Created at:</strong>{' '}
              {timeTag(userToUserChatNote.createdAt)}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              <strong>Updated at:</strong>{' '}
              {timeTag(userToUserChatNote.updatedAt)}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              <strong>User to user chat id:</strong>{' '}
              {userToUserChatNote.userToUserChatId}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              <strong>User id:</strong> {userToUserChatNote.userId}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <Grid container spacing={2} justifyContent="flex-end">
        <Grid item>
          <Button
            component={Link}
            to={routes.editUserToUserChatNote({ id: userToUserChatNote.id })}
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
            onClick={() => onDeleteClick(userToUserChatNote.id)}
          >
            Delete
          </Button>
        </Grid>
      </Grid>
    </StyledCard>
  )
}

export default UserToUserChatNote
