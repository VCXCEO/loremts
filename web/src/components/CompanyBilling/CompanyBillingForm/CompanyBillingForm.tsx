import { useState } from 'react'

import {
  Grid,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import { Autocomplete } from '@mui/material'
import { styled } from '@mui/system'
import { Controller, useForm } from 'react-hook-form'
import type {
  EditCompanyBillingById,
  UpdateCompanyBillingInput,
} from 'types/graphql'

import { useQuery } from '@redwoodjs/web'

const FETCH_COMPANIES = gql`
  query FetchCompanies {
    companies {
      id
      name
    }
  }
`

type FormCompanyBilling = NonNullable<EditCompanyBillingById['companyBilling']>

interface CompanyBillingFormProps {
  companyBilling?: EditCompanyBillingById['companyBilling']
  onSave: (
    data: UpdateCompanyBillingInput,
    id?: FormCompanyBilling['id']
  ) => void
  error: RWGqlError
  loading: boolean
}

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
}))

const CompanyBillingForm = (props: CompanyBillingFormProps) => {
  const [renewalFrequency, setRenewalFrequency] = useState('monthly')

  const handleRenewalFrequencyChange = (event) => {
    setRenewalFrequency(event.target.value)
  }
  const { data: companyData } = useQuery(FETCH_COMPANIES)

  const formMethods = useForm<FormCompanyBilling>()

  const onSubmit = (data: FormCompanyBilling) => {
    const inputData = {
      ...data,
      billingAmount: parseInt(data.billingAmount),
      renewalDate: new Date(data.renewalDate),
      renewalFrequency,
    }
    props.onSave(inputData, props?.companyBilling?.id)
  }
  return (
    <StyledCard>
      <CardContent>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="billingPeriod"
                label="Billing period"
                defaultValue={props.companyBilling?.billingPeriod}
                fullWidth
                required
                {...formMethods.register('billingPeriod', { required: true })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="billingAmount"
                label="Billing amount"
                defaultValue={props.companyBilling?.billingAmount}
                fullWidth
                required
                type="number"
                {...formMethods.register('billingAmount', { required: true })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="renewalDate"
                label="Renewal date"
                defaultValue={formatDatetime(props.companyBilling?.renewalDate)}
                fullWidth
                required
                type="datetime-local"
                InputLabelProps={{
                  shrink: true,
                }}
                {...formMethods.register('renewalDate', { required: true })}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Renewal Frequency</InputLabel>
              <Select
                value={renewalFrequency}
                onChange={handleRenewalFrequencyChange}
                label="Renewal Frequency"
                fullWidth
              >
                <MenuItem value="monthly">Monthly</MenuItem>
                <MenuItem value="yearly">Yearly</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="companyId"
                control={formMethods.control}
                defaultValue={props.companyBilling?.companyId || ''}
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

export default CompanyBillingForm
