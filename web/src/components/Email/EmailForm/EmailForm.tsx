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
import type { EditEmailById, UpdateEmailInput } from 'types/graphql'

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
      email
    }
  }
`

const FETCH_USERS = gql`
  query FetchUsers {
    users {
      id
    }
  }
`

const formatDatetimeForDisplay = (value) => {
  if (value) {
    const date = typeof value === 'string' ? new Date(value) : value
    const datetimeString = date.toISOString().slice(0, 19)
    return datetimeString
  }
}
const formatDatetimeForServer = (value) => {
  if (value) {
    const date = typeof value === 'string' ? new Date(value) : value
    const datetimeString = date.toISOString()
    return datetimeString
  }
}

type FormEmail = NonNullable<EditEmailById['email']>

interface EmailFormProps {
  email?: EditEmailById['email']
  onSave: (data: UpdateEmailInput, id?: FormEmail['id']) => void
  error: RWGqlError
  loading: boolean
}

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
}))

const EmailForm = (props: EmailFormProps) => {
  const onSubmit = (data: FormEmail) => {
    const updatedData = {
      ...data,
      dateReceived: formatDatetimeForServer(data.dateReceived),
    }
    props.onSave(updatedData, props?.email?.id)
  }

  const { data: customerData } = useQuery(FETCH_CUSTOMERS)

  const { data: companyData } = useQuery(FETCH_COMPANIES)

  const { data: userData } = useQuery(FETCH_USERS)

  const formMethods = useForm<FormEmail>()

  return (
    <StyledCard>
      <CardContent>
        <Form<FormEmail>
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
              <Controller
                name="messageId"
                control={formMethods.control}
                defaultValue={props.email?.messageId || ''}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField {...field} label="messageId" fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="conversationId"
                control={formMethods.control}
                defaultValue={props.email?.conversationId || ''}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField {...field} label="conversationId" fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="direction">Direction</InputLabel>
                <Controller
                  name="direction"
                  control={formMethods.control}
                  defaultValue={props.email?.direction || ''}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="direction"
                      inputProps={{
                        id: 'direction',
                      }}
                    >
                      <MenuItem value="inbound">Inbound</MenuItem>
                      <MenuItem value="outbound">Outbound</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="inbox"
                control={formMethods.control}
                defaultValue={props.email?.inbox || ''}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField {...field} label="inbox" fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="handleTime"
                control={formMethods.control}
                defaultValue={props.email?.handleTime || 0}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Handle Time"
                    type="number"
                    fullWidth
                    inputProps={{ min: 0 }}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? parseInt(e.target.value, 10) : 0
                      )
                    }
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="dateReceived"
                control={formMethods.control}
                defaultValue={
                  formatDatetimeForDisplay(props.email?.dateReceived) ||
                  formatDatetimeForDisplay(new Date().toISOString())
                }
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Date received"
                    type="datetime-local"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="tags"
                control={formMethods.control}
                defaultValue={props.email?.tags || []}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Tags"
                    fullWidth
                    onChange={(e) => field.onChange(e.target.value.split(','))}
                    value={field.value.join(',')}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="satisfactionRating"
                control={formMethods.control}
                defaultValue={props.email?.satisfactionRating || 0}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Satisfaction rating"
                    type="number"
                    fullWidth
                    inputProps={{ min: 0 }}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? parseInt(e.target.value, 10) : 0
                      )
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="customerId"
                control={formMethods.control}
                defaultValue={props.email?.customerId || ''}
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
                defaultValue={props.email?.customerEmail || ''}
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
                      const newName = newValue?.name || ''
                      field.onChange(newName)
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
                name="companyId"
                control={formMethods.control}
                defaultValue={props.email?.companyId || ''}
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
                defaultValue={props.email?.companyName || ''}
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
            <Grid item xs={12}>
              <Controller
                name="userId"
                control={formMethods.control}
                defaultValue={props.email?.userId || ''}
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
                      field.onChange(newValue?.id || '')
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="User ID"
                        variant="outlined"
                        fullWidth
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

export default EmailForm
