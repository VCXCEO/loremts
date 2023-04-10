import { Grid, Card, CardContent, TextField, Button, Box } from '@mui/material'
import { Autocomplete } from '@mui/material'
import { styled } from '@mui/system'
import { Controller, useForm } from 'react-hook-form'
import type { EditCallNoteById, UpdateCallNoteInput } from 'types/graphql'

import { Form, FormError } from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'
import { useQuery } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

const FETCH_CUSTOMERS = gql`
  query FetchCustomers {
    customers {
      id
      phone
    }
  }
`

const FETCH_CALLS = gql`
  query FetchCalls {
    calls {
      id
    }
  }
`

type FormCallNote = NonNullable<EditCallNoteById['callNote']>

interface CallNoteFormProps {
  callNote?: EditCallNoteById['callNote']
  onSave: (data: UpdateCallNoteInput, id?: FormCallNote['id']) => void
  error: RWGqlError
  loading: boolean
}

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
}))

const CallNoteForm = (props: CallNoteFormProps) => {
  const { currentUser } = useAuth()

  const { data: customerData } = useQuery(FETCH_CUSTOMERS)
  const { data: callData } = useQuery(FETCH_CALLS)

  const formMethods = useForm<FormCallNote>()

  const onSubmit = (data: FormCallNote) => {
    props.onSave(data, props.callNote?.id)
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
                name="callId"
                control={formMethods.control}
                defaultValue={props.callNote?.callId}
                render={({ field }) => (
                  <Autocomplete
                    id="callId"
                    options={callData?.calls || []}
                    getOptionLabel={(call) => `${call.id}`}
                    value={
                      callData?.calls.find((call) => call.id === field.value) ||
                      null
                    }
                    onChange={(event, newValue) => {
                      const newId = newValue?.id || ''
                      field.onChange(newId)
                      formMethods.setValue('callId', newValue?.id || '')
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Call Id"
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
                name="customerId"
                control={formMethods.control}
                defaultValue={props.callNote?.customerId || ''}
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
            <Grid item xs={12}>
              <Controller
                name="customerPhone"
                control={formMethods.control}
                defaultValue={props.callNote?.customerPhone || ''}
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
                defaultValue={props.callNote?.note || ''}
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

export default CallNoteForm
