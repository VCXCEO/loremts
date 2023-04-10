import { Grid, TextField, Button, Box, Card, CardContent } from '@mui/material'
import { styled } from '@mui/system'
import { useForm } from 'react-hook-form'
import { UploadButton } from 'react-uploader'
import type { EditCompanyById, UpdateCompanyInput } from 'types/graphql'
import { Uploader } from 'uploader'

import type { RWGqlError } from '@redwoodjs/forms'

type FormCompany = NonNullable<EditCompanyById['company']>

interface CompanyFormProps {
  company?: EditCompanyById['company']
  onSave: (data: UpdateCompanyInput, id?: FormCompany['id']) => void
  error: RWGqlError
  loading: boolean
}

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
}))

const uploader = Uploader({ apiKey: process.env.UPLOAD_IO_API_KEY })

const CompanyForm = (props: CompanyFormProps) => {
  const formMethods = useForm<FormCompany>()

  const onSubmit = (data: FormCompany) => {
    props.onSave(data, props?.company?.id)
  }

  return (
    <StyledCard>
      <CardContent>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="name"
                label="Name"
                defaultValue={props.company?.name}
                fullWidth
                required
                {...formMethods.register('name', { required: true })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="industry"
                label="Industry"
                defaultValue={props.company?.industry}
                fullWidth
                required
                {...formMethods.register('industry', { required: true })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="domain"
                label="Domain"
                defaultValue={props.company?.domain}
                fullWidth
                required
                {...formMethods.register('domain', { required: true })}
              />
            </Grid>
            <Grid item xs={12}>
              <UploadButton
                uploader={uploader}
                options={{ multi: false }}
                onComplete={(files) => {
                  formMethods.setValue('companyLogo', files[0].fileUrl)
                }}
              >
                {({ onClick }) => (
                  <Button onClick={onClick} variant="outlined">
                    {props.company?.companyLogo
                      ? 'Replace company logo'
                      : 'Upload company logo'}
                  </Button>
                )}
              </UploadButton>
              {props.company?.companyLogo && (
                <Box mt={1}>
                  <img
                    src={props.company?.companyLogo}
                    alt="Company logo"
                    width="100"
                  />
                </Box>
              )}
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

export default CompanyForm
