import { Grid, Paper } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import type {
  DeleteCompanyMutationVariables,
  FindCompanies,
} from 'types/graphql'

import { Link, navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Company/CompaniesCell'

const DELETE_COMPANY_MUTATION = gql`
  mutation DeleteCompanyMutation($id: Int!) {
    deleteCompany(id: $id) {
      id
    }
  }
`

const CompaniesList = ({ companies }: FindCompanies) => {
  const [deleteCompany] = useMutation(DELETE_COMPANY_MUTATION, {
    onCompleted: () => {
      toast.success('Company deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteCompanyMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete company ' + id + '?')) {
      deleteCompany({ variables: { id } })
    }
  }

  const renderShowAction = (params) => {
    const companyId = params.id

    return (
      <Link
        to={routes.company({ id: companyId })}
        title={'Show company ' + companyId + ' detail'}
        className="rw-button rw-button-small"
      >
        Show
      </Link>
    )
  }

  const renderEditAction = (params) => {
    const companyId = params.id

    return (
      <Link
        to={routes.editCompany({ id: companyId })}
        title={'Edit company ' + companyId}
        className="rw-button rw-button-small rw-button-blue"
      >
        Edit
      </Link>
    )
  }

  const renderDeleteAction = (params) => {
    const companyId = params.id

    return (
      <button
        type="button"
        title={'Delete company ' + companyId}
        className="rw-button rw-button-small rw-button-red"
        onClick={(event) => {
          event.stopPropagation() // Prevent triggering onCellClick
          onDeleteClick(companyId)
        }}
      >
        Delete
      </button>
    )
  }

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'industry', headerName: 'Industry', flex: 1 },
    { field: 'domain', headerName: 'Domain', flex: 1 },
    { field: 'companyLogo', headerName: 'Company Logo', flex: 1 },
    {
      field: 'companyLogoImage',
      headerName: 'Company Logo Image',
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <img src={params.value} alt="Company Logo" width="150" height="50" />
      ),
    },
    { field: 'createdAt', headerName: 'Created At', flex: 1 },
    { field: 'updatedAt', headerName: 'Updated At', flex: 1 },
    {
      field: 'showAction',
      headerName: ' ',
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: renderShowAction,
    },
    {
      field: 'editAction',
      headerName: ' ',
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: renderEditAction,
    },
    {
      field: 'deleteAction',
      headerName: ' ',
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: renderDeleteAction,
    },
  ]

  const rows = companies.map((company) => ({
    id: company.id,
    name: company.name,
    industry: company.industry,
    domain: company.domain,
    companyLogo: company.companyLogo,
    companyLogoImage: company.companyLogo,
    createdAt: company.createdAt.toString(),
    updatedAt: company.updatedAt.toString(),
  }))

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={12}>
        <Paper>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            getRowId={(row) => row.id}
            onCellClick={(params, event) => {
              if (params.colDef.field === 'action_column') {
                event.stopPropagation()
              }
            }}
            disableSelectionOnClick
            autoHeight
            maxHeight={600}
            resizable
          />
        </Paper>
      </Grid>
    </Grid>
  )
}

export default CompaniesList
