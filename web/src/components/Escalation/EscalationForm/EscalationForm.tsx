import {
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material'
import { Autocomplete } from '@mui/material'
import { styled } from '@mui/system'
import { Controller, useForm } from 'react-hook-form'
import type { EditEscalationById, UpdateEscalationInput } from 'types/graphql'

import { Form, FormError } from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'
import { useQuery } from '@redwoodjs/web'

const FETCH_COMPANIES = gql`
  query FetchCompanies {
    companies {
      id
      name
    }
  }
`
const FETCH_CUSTOMERS = gql`
  query FetchCustomers {
    customers {
      id
      phone
      email
    }
  }
`

type FormEscalation = NonNullable<EditEscalationById['escalation']>

interface EscalationFormProps {
  escalation?: EditEscalationById['escalation']
  onSave: (data: UpdateEscalationInput, id?: FormEscalation['id']) => void
  error: RWGqlError
  loading: boolean
}

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
}))

const EscalationForm = (props: EscalationFormProps) => {
  const { data: customerData } = useQuery(FETCH_CUSTOMERS)

  const { data: companyData } = useQuery(FETCH_COMPANIES)

  const formMethods = useForm<FormEscalation>()

  const onSubmit = (data: FormEscalation) => {
    props.onSave(data, props?.escalation?.id)
  }

  return (
    <StyledCard>
      <CardContent>
        <Form<FormEscalation>
          onSubmit={onSubmit}
          error={props.error}
          formMethods={formMethods}
        >
          <FormError
            error={props.error}
            wrapperClassName="rw-form-error-wrapper"
            titleClassName="rw-form-error-title"
            listClassName="rw-form-error-list"
          />

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="type">Type</InputLabel>
                <Controller
                  name="type"
                  control={formMethods.control}
                  defaultValue={props.escalation?.type || ''}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="type"
                      inputProps={{
                        id: 'type',
                      }}
                    >
                      <MenuItem value="inbound">Call</MenuItem>
                      <MenuItem value="outbound">Chat</MenuItem>
                      <MenuItem value="email">Email</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="record"
                control={formMethods.control}
                defaultValue={props.escalation?.record || ''}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField {...field} label="Record" fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="reason"
                control={formMethods.control}
                defaultValue={props.escalation?.reason || ''}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField {...field} label="Record" fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="customerId"
                control={formMethods.control}
                defaultValue={props.escalation?.customerId || ''}
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
            <Grid item xs={12}>
              <Controller
                name="customerPhone"
                control={formMethods.control}
                defaultValue={props.escalation?.customerPhone || ''}
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
                      formMethods.setValue(
                        'customerEmail',
                        newValue?.email || ''
                      )
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
                name="customerEmail"
                control={formMethods.control}
                defaultValue={props.escalation?.customerEmail || ''}
                render={({ field }) => (
                  <Autocomplete
                    id="companyName"
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
                      formMethods.setValue(
                        'customerPhone',
                        newValue?.phone || ''
                      )
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
                name="companyId"
                control={formMethods.control}
                defaultValue={props.escalation?.companyId || ''}
                render={({ field }) => (
                  <Autocomplete
                    id="companyId"
                    options={companyData?.companies || []}
                    getOptionLabel={(company) => `${company.id}`}
                    value={
                      companyData?.companies.find(
                        (company) => company.id === field.value
                      ) || null
                    }
                    onChange={(event, newValue) => {
                      const newId = newValue?.id || ''
                      field.onChange(newId)
                      formMethods.setValue('companyName', newValue?.name || '')
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Company id"
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
                name="companyName"
                control={formMethods.control}
                defaultValue={props.escalation?.companyName || ''}
                render={({ field }) => (
                  <Autocomplete
                    id="companyName"
                    options={companyData?.companies || []}
                    getOptionLabel={(company) => `${company.name}`}
                    value={
                      companyData?.companies.find(
                        (company) => company.name === field.value
                      ) || null
                    }
                    onChange={(event, newValue) => {
                      const newName = newValue?.name || ''
                      field.onChange(newName)
                      formMethods.setValue('companyId', newValue?.id || '')
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Company name"
                        variant="outlined"
                        fullWidth
                      />
                    )}
                  />
                )}
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
        </Form>
      </CardContent>
    </StyledCard>
  )
}

export default EscalationForm
