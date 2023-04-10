import { Grid, Card, CardContent, TextField, Button, Box } from '@mui/material'
import { styled } from '@mui/system'
import { Controller, useForm } from 'react-hook-form'
import type {
  EditCustomerToUserChatMessageById,
  UpdateCustomerToUserChatMessageInput,
} from 'types/graphql'

import { Form, FormError } from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'

type FormCustomerToUserChatMessage = NonNullable<
  EditCustomerToUserChatMessageById['customerToUserChatMessage']
>

interface CustomerToUserChatMessageFormProps {
  customerToUserChatMessage?: EditCustomerToUserChatMessageById['customerToUserChatMessage']
  onSave: (
    data: UpdateCustomerToUserChatMessageInput,
    id?: FormCustomerToUserChatMessage['id']
  ) => void
  error: RWGqlError
  loading: boolean
}

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
}))

const CustomerToUserChatMessageForm = (
  props: CustomerToUserChatMessageFormProps
) => {
  const formMethods = useForm<FormCustomerToUserChatMessage>()

  const onSubmit = (data: FormCustomerToUserChatMessage) => {
    props.onSave(data, props?.customerToUserChatMessage?.id)
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
                defaultValue={
                  props.customerToUserChatMessage?.messageText || ''
                }
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
                name="customerToUserChatId"
                control={formMethods.control}
                defaultValue={
                  props.customerToUserChatMessage?.customerToUserChatId || ''
                }
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Customer to user chat id"
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
                defaultValue={props.customerToUserChatMessage?.userId || ''}
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

export default CustomerToUserChatMessageForm
