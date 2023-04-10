import { Grid, TextField, Button, Box, Card, CardContent } from '@mui/material'
import { styled } from '@mui/system'
import { useForm } from 'react-hook-form'
import type {
  EditUserToUserChatById,
  UpdateUserToUserChatInput,
} from 'types/graphql'

import type { RWGqlError } from '@redwoodjs/forms'

type FormUserToUserChat = NonNullable<EditUserToUserChatById['userToUserChat']>

interface UserToUserChatFormProps {
  userToUserChat?: EditUserToUserChatById['userToUserChat']
  onSave: (
    data: UpdateUserToUserChatInput,
    id?: FormUserToUserChat['id']
  ) => void
  error: RWGqlError
  loading: boolean
}

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
}))

const UserToUserChatForm = (props: UserToUserChatFormProps) => {
  const formMethods = useForm<FormUserToUserChat>()

  const onSubmit = (data: FormUserToUserChat) => {
    props.onSave(data, props?.userToUserChat?.id)
  }

  return (
    <StyledCard>
      <CardContent>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="tags"
                label="Tags"
                defaultValue={props.userToUserChat?.tags}
                fullWidth
                required
                {...formMethods.register('tags', { required: true })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="companyId"
                label="Company id"
                defaultValue={props.userToUserChat?.companyId}
                fullWidth
                required
                {...formMethods.register('companyId', { required: true })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="companyName"
                label="Company name"
                defaultValue={props.userToUserChat?.companyName}
                fullWidth
                required
                {...formMethods.register('companyName', { required: true })}
              />
            </Grid>
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
        </form>
      </CardContent>
    </StyledCard>
  )
}

export default UserToUserChatForm
