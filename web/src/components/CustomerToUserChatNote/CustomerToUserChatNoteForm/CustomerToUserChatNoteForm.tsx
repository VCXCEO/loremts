import { Grid, Card, CardContent, TextField, Button, Box } from '@mui/material'
import { styled } from '@mui/system'
import { Controller, useForm } from 'react-hook-form'
import type {
  EditCustomerToUserChatNoteById,
  UpdateCustomerToUserChatNoteInput,
} from 'types/graphql'

import { Form, FormError } from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'

type FormCustomerToUserChatNote = NonNullable<
  EditCustomerToUserChatNoteById['customerToUserChatNote']
>

interface CustomerToUserChatNoteFormProps {
  customerToUserChatNote?: EditCustomerToUserChatNoteById['customerToUserChatNote']
  onSave: (
    data: UpdateCustomerToUserChatNoteInput,
    id?: FormCustomerToUserChatNote['id']
  ) => void
  error: RWGqlError
  loading: boolean
}

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
}))

const CustomerToUserChatNoteForm = (props: CustomerToUserChatNoteFormProps) => {
  const formMethods = useForm<FormCustomerToUserChatNote>()

  const onSubmit = (data: FormCustomerToUserChatNote) => {
    props.onSave(data, props?.customerToUserChatNote?.id)
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
                defaultValue={props.customerToUserChatNote?.note || ''}
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
                name="customerToUserChatId"
                control={formMethods.control}
                defaultValue={
                  props.customerToUserChatNote?.customerToUserChatId || ''
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
                name="customerId"
                control={formMethods.control}
                defaultValue={props.customerToUserChatNote?.customerId || ''}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Customer id"
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
                name="customerEmail"
                control={formMethods.control}
                defaultValue={props.customerToUserChatNote?.customerEmail || ''}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Customer email"
                    variant="outlined"
                    fullWidth
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="userId"
                control={formMethods.control}
                defaultValue={props.customerToUserChatNote?.userId || ''}
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

export default CustomerToUserChatNoteForm
