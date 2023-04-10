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
import type { EditCallById, UpdateCallInput } from 'types/graphql'

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

type FormCall = NonNullable<EditCallById['call']>

interface CallFormProps {
  call?: EditCallById['call']
  onSave: (data: UpdateCallInput, id?: FormCall['id']) => void
  error: RWGqlError
  loading: boolean
}

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
}))

const CallForm = (props: CallFormProps) => {
  const { data: customerData } = useQuery(FETCH_CUSTOMERS)

  const { data: companyData } = useQuery(FETCH_COMPANIES)

  const { data: userData } = useQuery(FETCH_USERS)

  const formMethods = useForm<FormCall>()

  const onSubmit = (data: FormCall) => {
    const updatedData = {
      ...data,
      dateReceived: formatDatetimeForServer(data.dateReceived),
    }
    props.onSave(updatedData, props?.call?.id)
  }

  return (
    <StyledCard>
      <CardContent>
        <Form<FormCall>
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
                <InputLabel htmlFor="callDirection">Call direction</InputLabel>
                <Controller
                  name="callDirection"
                  control={formMethods.control}
                  defaultValue={props.call?.callDirection || ''}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Call direction"
                      inputProps={{
                        id: 'callDirection',
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
                name="callDuration"
                control={formMethods.control}
                defaultValue={props.call?.callDuration || 0}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Call duration"
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
                name="record"
                control={formMethods.control}
                defaultValue={props.call?.record || ''}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField {...field} label="Record" fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="dateReceived"
                control={formMethods.control}
                defaultValue={
                  formatDatetimeForDisplay(props.call?.dateReceived) ||
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
                defaultValue={props.call?.tags || []}
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
                defaultValue={props.call?.satisfactionRating || 0}
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
                defaultValue={props.call?.customerId || ''}
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
                defaultValue={props.call?.customerPhone || ''}
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
                name="companyId"
                control={formMethods.control}
                defaultValue={props.call?.companyId || ''}
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
                defaultValue={props.call?.companyName || ''}
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
                defaultValue={props.call?.userId || ''}
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

export default CallForm
