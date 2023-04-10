import { Grid, Card, CardContent, TextField, Button, Box } from '@mui/material'
import { Autocomplete } from '@mui/material'
import { styled } from '@mui/system'
import { Controller, useForm } from 'react-hook-form'
import type { EditEmailNoteById, UpdateEmailNoteInput } from 'types/graphql'

import { Form, FormError } from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'
import { useQuery } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

const FETCH_USERS = gql`
  query FetchUsers {
    users {
      id
    }
  }
`

const FETCH_CUSTOMERS = gql`
  query FetchCustomers {
    customers {
      id
      email
    }
  }
`

type FormEmailNote = NonNullable<EditEmailNoteById['emailNote']>

interface EmailNoteFormProps {
  emailNote?: EditEmailNoteById['emailNote']
  onSave: (data: UpdateEmailNoteInput, id?: FormEmailNote['id']) => void
  error: RWGqlError
  loading: boolean
}

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
}))

const EmailNoteForm = (props: EmailNoteFormProps) => {
  const { currentUser } = useAuth()

  const { data: userData } = useQuery(FETCH_USERS)
  const { data: customerData } = useQuery(FETCH_CUSTOMERS)

  const formMethods = useForm<FormEmailNote>()

  const onSubmit = (data: FormEmailNote) => {
    props.onSave(data, props.emailNote?.id)
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
                defaultValue={props.emailNote?.note || ''}
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
                name="emailId"
                control={formMethods.control}
                defaultValue={props.emailNote?.emailId || ''}
                render={({ field }) => (
                  <Autocomplete
                    id="emailId"
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
                        'customerEmail',
                        newValue?.email || ''
                      )
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Email id"
                        variant="outlined"
                        fullWidth
                        required
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
                defaultValue={props.emailNote?.customerId || ''}
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
                defaultValue={props.emailNote?.customerEmail || ''}
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
                      formMethods.setValue('emailId', newValue?.id || '')
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Customer email"
                        variant="outlined"
                        fullWidth
                        required
                      />
                    )}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="userId"
                control={formMethods.control}
                defaultValue={props.emailNote?.userId || ''}
                render={({ field }) => (
                  <Autocomplete
                    id="userId"
                    options={userData?.users || []}
                    getOptionLabel={(user) => `${user.id}`}
                    value={
                      userData?.users.find((user) => user.id === field.value) ||
                      null
                    }
                    onChange={(event, newValue) => {
                      const newId = newValue?.id || ''
                      field.onChange(newId)
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="User id"
                        variant="outlined"
                        fullWidth
                        type="number"
                        required
                      />
                    )}
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

export default EmailNoteForm
