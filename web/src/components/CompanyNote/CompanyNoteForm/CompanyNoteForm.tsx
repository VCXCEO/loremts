import { Grid, Card, CardContent, TextField, Button, Box } from '@mui/material'
import { Autocomplete } from '@mui/material'
import { styled } from '@mui/system'
import { Controller, useForm } from 'react-hook-form'
import type { EditCompanyNoteById, UpdateCompanyNoteInput } from 'types/graphql'

import { Form, FormError } from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'
import { useQuery } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

const FETCH_COMPANIES = gql`
  query FetchCompanies {
    companies {
      id
      name
    }
  }
`

type FormCompanyNote = NonNullable<EditCompanyNoteById['companyNote']>

interface CompanyNoteFormProps {
  companyNote?: EditCompanyNoteById['companyNote']
  onSave: (data: UpdateCompanyNoteInput, id?: FormCompanyNote['id']) => void
  error: RWGqlError
  loading: boolean
}

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
}))

const CompanyNoteForm = (props: CompanyNoteFormProps) => {
  const { currentUser } = useAuth()
  const { data: companyData } = useQuery(FETCH_COMPANIES)

  const formMethods = useForm<FormCompanyNote>()

  const onSubmit = (data: FormCompanyNote) => {
    props.onSave(data, props?.companyNote?.id)
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
                name="companyId"
                control={formMethods.control}
                defaultValue={props.companyNote?.companyId || ''}
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
                defaultValue={props.companyNote?.companyName || ''}
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
            <Controller
              name="userId"
              control={formMethods.control}
              defaultValue={currentUser?.id || ''}
              render={({ field }) => <input type="hidden" {...field} />}
            />
            <Grid item xs={12}>
              <Controller
                name="note"
                control={formMethods.control}
                defaultValue={props.companyNote?.note || ''}
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

export default CompanyNoteForm
