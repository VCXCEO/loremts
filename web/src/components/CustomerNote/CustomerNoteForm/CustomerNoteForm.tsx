import { Grid, Card, CardContent, TextField, Button, Box } from '@mui/material'
import { Autocomplete } from '@mui/material'
import { styled } from '@mui/system'
import { Controller, useForm } from 'react-hook-form'
import type {
  EditCustomerNoteById,
  UpdateCustomerNoteInput,
} from 'types/graphql'

import { Form, FormError } from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'
import { useQuery } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

const FETCH_CUSTOMERS = gql`
  query FetchCustomers {
    customers {
      id
      email
      phone
    }
  }
`

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
}))

type FormCustomerNote = NonNullable<EditCustomerNoteById['customerNote']>

interface CustomerNoteFormProps {
  customerNote?: EditCustomerNoteById['customerNote']
  onSave: (data: UpdateCustomerNoteInput, id?: FormCustomerNote['id']) => void
  error: RWGqlError
  loading: boolean
}

const CustomerNoteForm = (props: CustomerNoteFormProps) => {
  const { currentUser } = useAuth()
  const formMethods = useForm<FormCustomerNote>()

  const { data: customerData } = useQuery(FETCH_CUSTOMERS)

  const onSubmit = (data: FormCustomerNote) => {
    props.onSave(data, props?.customerNote?.id)
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
          {/* Other form fields and error handling */}
          <Grid container spacing={2}>
            {/* Other form fields */}
            <Grid item xs={4}>
              <Controller
                name="customerId"
                control={formMethods.control}
                defaultValue={props.customerNote?.customerId || ''}
                render={({ field }) => (
                  <Autocomplete
                    id="customerId"
                    options={customerData?.customers || []}
                    getOptionLabel={(customer) => `${customer.id}`}
                    value={
                      customerData?.customers.find(
                        (customer) => customer.id === field.value
                      ) || null
                    }
                    onChange={(event, newValue) => {
                      const newId = newValue?.id || ''
                      field.onChange(newId)
                      formMethods.setValue(
                        'customerPhone',
                        newValue?.phone || ''
                      )
                      formMethods.setValue(
                        'customerEmail',
                        newValue?.email || ''
                      )
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Customer id"
                        variant="outlined"
                        fullWidth
                      />
                    )}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name="customerEmail"
                control={formMethods.control}
                defaultValue={props.customerNote?.customerEmail || ''}
                render={({ field }) => (
                  <Autocomplete
                    id="customerEmail"
                    options={customerData?.customers || []}
                    getOptionLabel={(customer) => `${customer.email}`}
                    value={
                      customerData?.customers.find(
                        (customer) => customer.email === field.value
                      ) || null
                    }
                    onChange={(event, newValue) => {
                      const newEmail = newValue?.email || ''
                      field.onChange(newEmail)
                      formMethods.setValue(
                        'customerPhone',
                        newValue?.phone || ''
                      )
                      formMethods.setValue('customerId', newValue?.id || '')
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Customer email"
                        variant="outlined"
                        fullWidth
                      />
                    )}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name="customerPhone"
                control={formMethods.control}
                defaultValue={props.customerNote?.customerPhone || ''}
                render={({ field }) => (
                  <Autocomplete
                    id="customerPhone"
                    options={customerData?.customers || []}
                    getOptionLabel={(customer) => `${customer.phone}`}
                    value={
                      customerData?.customers.find(
                        (customer) => customer.phone === field.value
                      ) || null
                    }
                    onChange={(event, newValue) => {
                      const newPhone = newValue?.phone || ''
                      field.onChange(newPhone)
                      formMethods.setValue(
                        'customerEmail',
                        newValue?.email || ''
                      )
                      formMethods.setValue('customerId', newValue?.id || '')
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Customer phone"
                        variant="outlined"
                        fullWidth
                      />
                    )}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="note"
                control={formMethods.control}
                defaultValue={props.customerNote?.note || ''}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Note"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                  />
                )}
              />
            </Grid>
            <Controller
              name="userId"
              control={formMethods.control}
              defaultValue={currentUser?.id || ''}
              render={({ field }) => <input type="hidden" {...field} />}
            />
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

export default CustomerNoteForm
