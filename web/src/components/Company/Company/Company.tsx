import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Avatar,
  CardMedia,
} from '@mui/material'
import type {
  DeleteCompanyMutationVariables,
  FindCompanyById,
} from 'types/graphql'

import { Link, navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_COMPANY_MUTATION = gql`
  mutation DeleteCompanyMutation($id: Int!) {
    deleteCompany(id: $id) {
      id
    }
  }
`

interface Props {
  company: NonNullable<FindCompanyById['company']>
}

const Company = ({ company }: Props) => {
  const [deleteCompany] = useMutation(DELETE_COMPANY_MUTATION, {
    onCompleted: () => {
      toast.success('Company deleted')
      navigate(routes.companies())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteCompanyMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete company ' + id + '?')) {
      deleteCompany({ variables: { id } })
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card elevation={5}>
        <CardMedia
          component="img"
          height="140"
          image={company.companyLogo}
          alt={company.name}
        />
        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>{company.id}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{company.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Industry</TableCell>
                <TableCell>{company.industry}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Domain</TableCell>
                <TableCell>{company.domain}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Company logo</TableCell>
                <TableCell>{company.companyLogo}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Created at</TableCell>
                <TableCell>{timeTag(company.createdAt)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Updated at</TableCell>
                <TableCell>{timeTag(company.updatedAt)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <nav
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '1rem',
            }}
          >
            <Link to={routes.editCompany({ id: company.id })}>
              <Button color="primary" variant="contained">
                Edit
              </Button>
            </Link>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => onDeleteClick(company.id)}
            >
              Delete
            </Button>
          </nav>
        </CardContent>
      </Card>
    </div>
  )
}

export default Company
