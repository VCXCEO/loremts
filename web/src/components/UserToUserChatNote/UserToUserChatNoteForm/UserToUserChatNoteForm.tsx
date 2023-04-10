import { Grid, Card, CardContent, TextField, Button, Box } from '@mui/material'
import { styled } from '@mui/system'
import { Controller, useForm } from 'react-hook-form'
import type {
  EditUserToUserChatNoteById,
  UpdateUserToUserChatNoteInput,
} from 'types/graphql'

import { Form, FormError } from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'

type FormUserToUserChatNote = NonNullable<
  EditUserToUserChatNoteById['userToUserChatNote']
>

interface UserToUserChatNoteFormProps {
  userToUserChatNote?: EditUserToUserChatNoteById['userToUserChatNote']
  onSave: (
    data: UpdateUserToUserChatNoteInput,
    id?: FormUserToUserChatNote['id']
  ) => void
  error: RWGqlError
  loading: boolean
}

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
}))

const UserToUserChatNoteForm = (props: UserToUserChatNoteFormProps) => {
  const formMethods = useForm<FormUserToUserChatNote>()

  const onSubmit = (data: FormUserToUserChatNote) => {
    props.onSave(data, props?.userToUserChatNote?.id)
  }

  return (
    <StyledCard>
      <CardContent>
        <Form
          formMethods={formMethods}
          error={props.error}
          loading={props.loading}
          onSubmit={onSubmit}
        >
          <FormError
            error={props.error}
            wrapperClassName="rw-form-error-wrapper"
            titleClassName="rw-form-error-title"
            listClassName="rw-form-error-list"
          />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="note"
                control={formMethods.control}
                defaultValue={props.userToUserChatNote?.note || ''}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Note"
                    variant="outlined"
                    fullWidth
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="userToUserChatId"
                control={formMethods.control}
                defaultValue={props.userToUserChatNote?.userToUserChatId || ''}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="User to user chat id"
                    variant="outlined"
                    fullWidth
                    type="number"
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="userId"
                control={formMethods.control}
                defaultValue={props.userToUserChatNote?.userId || ''}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="User id"
                    variant="outlined"
                    fullWidth
                    type="number"
                    required
                  />
                )}
              />
            </Grid>
            <Box mt={2}>
              <Button
                type="submit"
                disabled={props.loading}
                variant="contained"
                color="primary"
              >
                Save
              </Button>
            </Box>
          </Grid>
        </Form>
      </CardContent>
    </StyledCard>
  )
}

export default UserToUserChatNoteForm
