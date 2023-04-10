import { Grid, Card, CardContent, TextField, Button, Box } from '@mui/material'
import { styled } from '@mui/system'
import { Controller, useForm } from 'react-hook-form'
import type {
  EditUserToUserChatMessageById,
  UpdateUserToUserChatMessageInput,
} from 'types/graphql'

import { Form, FormError } from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'

type FormUserToUserChatMessage = NonNullable<
  EditUserToUserChatMessageById['userToUserChatMessage']
>

interface UserToUserChatMessageFormProps {
  userToUserChatMessage?: EditUserToUserChatMessageById['userToUserChatMessage']
  onSave: (
    data: UpdateUserToUserChatMessageInput,
    id?: FormUserToUserChatMessage['id']
  ) => void
  error: RWGqlError
  loading: boolean
}

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
}))

const UserToUserChatMessageForm = (props: UserToUserChatMessageFormProps) => {
  const formMethods = useForm<FormUserToUserChatMessage>()

  const onSubmit = (data: FormUserToUserChatMessage) => {
    props.onSave(data, props?.userToUserChatMessage?.id)
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
                name="messageText"
                control={formMethods.control}
                defaultValue={props.userToUserChatMessage?.messageText || ''}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Message text"
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
                defaultValue={
                  props.userToUserChatMessage?.userToUserChatId || ''
                }
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
                defaultValue={props.userToUserChatMessage?.userId || ''}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="User id"
                    variant="outlined"
                    fullWidth
                    type="number"
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

export default UserToUserChatMessageForm
