import { Grid, TextField, Button, Box, Card, CardContent } from '@mui/material'
import { styled } from '@mui/system'
import { useForm } from 'react-hook-form'
import type {
  EditCustomerToUserChatById,
  UpdateCustomerToUserChatInput,
} from 'types/graphql'

import type { RWGqlError } from '@redwoodjs/forms'

type FormCustomerToUserChat = NonNullable<
  EditCustomerToUserChatById['customerToUserChat']
>

interface CustomerToUserChatFormProps {
  customerToUserChat?: EditCustomerToUserChatById['customerToUserChat']
  onSave: (
    data: UpdateCustomerToUserChatInput,
    id?: FormCustomerToUserChat['id']
  ) => void
  error: RWGqlError
  loading: boolean
}

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
}))

const CustomerToUserChatForm = (props: CustomerToUserChatFormProps) => {
  const formMethods = useForm<FormCustomerToUserChat>()

  const onSubmit = (data: FormCustomerToUserChat) => {
    props.onSave(data, props?.customerToUserChat?.id)
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
                defaultValue={props.customerToUserChat?.tags}
                fullWidth
                required
                {...formMethods.register('tags', { required: true })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="satisfactionRating"
                label="Satisfaction rating"
                defaultValue={props.customerToUserChat?.satisfactionRating}
                fullWidth
                {...formMethods.register('satisfactionRating')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="customerId"
                label="Customer id"
                defaultValue={props.customerToUserChat?.customerId}
                fullWidth
                required
                {...formMethods.register('customerId', { required: true })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="customerEmail"
                label="Customer email"
                defaultValue={props.customerToUserChat?.customerEmail}
                fullWidth
                required
                {...formMethods.register('customerEmail', { required: true })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="companyId"
                label="Company id"
                defaultValue={props.customerToUserChat?.companyId}
                fullWidth
                required
                {...formMethods.register('companyId', { required: true })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="companyName"
                label="Company name"
                defaultValue={props.customerToUserChat?.companyName}
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

export default CustomerToUserChatForm
