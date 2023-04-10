import { Grid, Paper } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import type {
  DeleteCustomerToUserChatMutationVariables,
  FindCustomerToUserChats,
} from 'types/graphql'

import { Link, navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/CustomerToUserChat/CustomerToUserChatsCell'

const DELETE_CUSTOMER_TO_USER_CHAT_MUTATION = gql`
  mutation DeleteCustomerToUserChatMutation($id: Int!) {
    deleteCustomerToUserChat(id: $id) {
      id
    }
  }
`

const CustomerToUserChatsList = ({
  customerToUserChats,
}: FindCustomerToUserChats) => {
  const [deleteCustomerToUserChat] = useMutation(
    DELETE_CUSTOMER_TO_USER_CHAT_MUTATION,
    {
      onCompleted: () => {
        toast.success('CustomerToUserChat deleted')
      },
      onError: (error) => {
        toast.error(error.message)
      },
      refetchQueries: [{ query: QUERY }],
      awaitRefetchQueries: true,
    }
  )

  const onDeleteClick = (
    id: DeleteCustomerToUserChatMutationVariables['id']
  ) => {
    if (
      confirm('Are you sure you want to delete customerToUserChat ' + id + '?')
    ) {
      deleteCustomerToUserChat({ variables: { id } })
    }
  }

  const renderShowAction = (params) => {
    const customerToUserChatId = params.id
    return (
      <Link
        to={routes.customerToUserChat({ id: customerToUserChatId })}
        title={'Show customerToUserChat ' + customerToUserChatId + ' detail'}
        className="rw-button rw-button-small"
      >
        Show
      </Link>
    )
  }

  const renderEditAction = (params) => {
    const customerToUserChatId = params.id
    return (
      <Link
        to={routes.editCustomerToUserChat({ id: customerToUserChatId })}
        title={'Edit customerToUserChat ' + customerToUserChatId}
        className="rw-button rw-button-small rw-button-blue"
      >
        Edit
      </Link>
    )
  }

  const renderDeleteAction = (params) => {
    const customerToUserChatId = params.id
    return (
      <button
        type="button"
        title={'Delete customerToUserChat ' + customerToUserChatId}
        className="rw-button rw-button-small rw-button-red"
        onClick={(event) => {
          event.stopPropagation()
          onDeleteClick(customerToUserChatId)
        }}
      >
        Delete
      </button>
    )
  }

  const columns = [
    { field: 'id', headerName: 'Id', flex: 1 },
    { field: 'tags', headerName: 'Tags', flex: 1 },
    { field: 'satisfactionRating', headerName: 'Satisfaction rating', flex: 1 },
    { field: 'createdAt', headerName: 'Created at', flex: 1 },
    { field: 'updatedAt', headerName: 'Updated at', flex: 1 },
    { field: 'customerId', headerName: 'Customer id', flex: 1 },
    { field: 'customerEmail', headerName: 'Customer email', flex: 1 },
    { field: 'companyId', headerName: 'Company id', flex: 1 },
    { field: 'companyName', headerName: 'Company name', flex: 1 },
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

  const rows = customerToUserChats.map((customerToUserChat) => ({
    id: customerToUserChat.id,
    tags: customerToUserChat.tags,
    satisfactionRating: customerToUserChat.satisfactionRating,
    createdAt: customerToUserChat.createdAt.toString(),
    updatedAt: customerToUserChat.updatedAt.toString(),
    customerId: customerToUserChat.customerId,
    customerEmail: customerToUserChat.customerEmail,
    companyId: customerToUserChat.companyId,
    companyName: customerToUserChat.companyName,
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

export default CustomerToUserChatsList
