import { Grid, Card, CardContent, TextField, Button, Box } from '@mui/material'
import { styled } from '@mui/system'
import { useForm, Controller } from 'react-hook-form'
import type { EditCustomerById, UpdateCustomerInput } from 'types/graphql'

import { Form, FormError } from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'

type FormCustomer = NonNullable<EditCustomerById['customer']>

interface CustomerFormProps {
  customer?: EditCustomerById['customer']
  onSave: (data: UpdateCustomerInput, id?: FormCustomer['id']) => void
  error: RWGqlError
  loading: boolean
}

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
}))

const CustomerForm = (props: CustomerFormProps) => {
  const formMethods = useForm<FormCustomer>()

  const onSubmit = (data: FormCustomer) => {
    props.onSave(data, props?.customer?.id)
  }

  return (
    <StyledCard>
      <CardContent>
        <Form<FormCustomer>
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
                name="firstName"
                control={formMethods.control}
                defaultValue={props.customer?.firstName}
                render={({ field }) => (
                  <TextField {...field} label="First name" fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="lastName"
                control={formMethods.control}
                defaultValue={props.customer?.lastName}
                render={({ field }) => (
                  <TextField {...field} label="Last name" fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="email"
                control={formMethods.control}
                defaultValue={props.customer?.email}
                render={({ field }) => (
                  <TextField {...field} label="Email" fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="phone"
                control={formMethods.control}
                defaultValue={props.customer?.phone}
                render={({ field }) => (
                  <TextField {...field} label="Phone" fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="interactionRatingAggregate"
                control={formMethods.control}
                defaultValue={props.customer?.interactionRatingAggregate}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Interaction rating aggregate"
                    type="number"
                    fullWidth
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="transactionId"
                control={formMethods.control}
                defaultValue={props.customer?.transactionId}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField {...field} label="Transaction id" fullWidth />
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

export default CustomerForm
