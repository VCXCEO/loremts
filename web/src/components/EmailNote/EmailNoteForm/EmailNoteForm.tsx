import { useState } from 'react'

import {
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  Autocomplete,
} from '@mui/material'
import { styled } from '@mui/system'
import { Controller, useForm } from 'react-hook-form'
import type { EditEmailNoteById, UpdateEmailNoteInput } from 'types/graphql'

import { Form, FormError } from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'
import { useQuery } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

const FETCH_CUSTOMERS = gql`
  query FetchCustomers {
    customers {
      id
      email
      emails {
        id
        messageId
      }
    }
  }
`

const FETCH_EMAILS = gql`
  query FetchEmails {
    emails {
      id
      messageId
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
  const { data: customerData } = useQuery(FETCH_CUSTOMERS)
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(
    null
  )
  const { data: emailData } = useQuery(FETCH_EMAILS, {
    variables: { customerId: selectedCustomerId },
  })

  const formMethods = useForm<FormEmailNote>()

  const onSubmit = (data: FormEmailNote) => {
    props.onSave(data, props?.emailNote?.id)
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
                name="emailId"
                control={formMethods.control}
                defaultValue={props.emailNote?.emailId}
                render={({ field }) => (
                  <Autocomplete
                    id="emailId"
                    options={emailData?.emails || []}
                    getOptionLabel={(email) => `${email.id}`}
                    value={
                      emailData?.emails.find(
                        (email) => email.id === field.value
                      ) || null
                    }
                    onChange={(event, newValue) => {
                      const newId = newValue?.id || ''
                      field.onChange(newId)
                      formMethods.setValue('emailId', newValue?.id || '')
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Email Id"
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
                defaultValue={props.emailNote?.customerId || ''}
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
                        'customerEmail',
                        newValue?.email || ''
                      )
                      setSelectedCustomerId(newId)
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

export default EmailNoteForm
