import { Grid, TextField, Button, Box, Card, CardContent } from '@mui/material'
import { Autocomplete } from '@mui/material'
import { styled } from '@mui/system'
import { Controller, useForm } from 'react-hook-form'
import { UploadButton } from 'react-uploader'
import type { EditUserById, UpdateUserInput } from 'types/graphql'
import { Uploader } from 'uploader'

import { useQuery } from '@redwoodjs/web'

type FormUser = NonNullable<EditUserById['user']>

interface UserFormProps {
  user?: EditUserById['user']
  onSave: (data: UpdateUserInput, id?: FormUser['id']) => void
  error: any
  loading: boolean
}

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
}))

const FETCH_COMPANIES = gql`
  query FetchCompanies {
    companies {
      id
      name
    }
  }
`
const uploader = Uploader({ apiKey: process.env.UPLOAD_IO_API_KEY })

const UserForm = (props: UserFormProps) => {
  const { data: companyData } = useQuery(FETCH_COMPANIES)

  const formMethods = useForm<FormUser>()

  const onSubmit = (data: FormUser) => {
    props.onSave(data, props?.user?.id)
  }

  return (
    <StyledCard>
      <CardContent>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="firstName"
                label="First name"
                defaultValue={props.user?.firstName}
                fullWidth
                {...formMethods.register('firstName')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="lastName"
                label="Last name"
                defaultValue={props.user?.lastName}
                fullWidth
                {...formMethods.register('lastName')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                label="Email"
                defaultValue={props.user?.email}
                fullWidth
                required
                {...formMethods.register('email', { required: true })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="roles"
                label="Roles"
                defaultValue={props.user?.roles}
                fullWidth
                required
                {...formMethods.register('roles', { required: true })}
              />
            </Grid>
            <Grid item xs={12}>
              <UploadButton
                uploader={uploader}
                options={{ multi: false }}
                onComplete={(files) => {
                  formMethods.setValue('profilePicture', files[0].fileUrl)
                }}
              >
                {({ onClick }) => (
                  <Button onClick={onClick} variant="outlined">
                    {props.user?.profilePicture
                      ? 'Replace profile picture'
                      : 'Upload profile picture'}
                  </Button>
                )}
              </UploadButton>
              {props.user?.profilePicture && (
                <Box mt={1}>
                  <img
                    src={props.user?.profilePicture}
                    alt="Profile picture"
                    width="100"
                  />
                </Box>
              )}
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="companyId"
                control={formMethods.control}
                defaultValue={props.user?.companyId || ''}
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
                defaultValue={props.user?.companyName || ''}
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
        </form>
      </CardContent>
    </StyledCard>
  )
}

export default UserForm
