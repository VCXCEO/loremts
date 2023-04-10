import { Grid, Paper } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import type {
  DeleteCustomerToUserChatMessageMutationVariables,
  FindCustomerToUserChatMessages,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/CustomerToUserChatMessage/CustomerToUserChatMessagesCell'

const DELETE_CUSTOMER_TO_USER_CHAT_MESSAGE_MUTATION = gql`
  mutation DeleteCustomerToUserChatMessageMutation($id: Int!) {
    deleteCustomerToUserChatMessage(id: $id) {
      id
    }
  }
`

const CustomerToUserChatMessagesList = ({
  customerToUserChatMessages,
}: FindCustomerToUserChatMessages) => {
  const [deleteCustomerToUserChatMessage] = useMutation(
    DELETE_CUSTOMER_TO_USER_CHAT_MESSAGE_MUTATION,
    {
      onCompleted: () => {
        toast.success('CustomerToUserChatMessage deleted')
      },
      onError: (error) => {
        toast.error(error.message)
      },
      refetchQueries: [{ query: QUERY }],
      awaitRefetchQueries: true,
    }
  )

  const onDeleteClick = (
    id: DeleteCustomerToUserChatMessageMutationVariables['id']
  ) => {
    if (
      confirm(
        'Are you sure you want to delete customerToUserChatMessage ' + id + '?'
      )
    ) {
      deleteCustomerToUserChatMessage({ variables: { id } })
    }
  }

  const renderShowAction = (params) => {
    const customerToUserChatMessageId = params.id
    return (
      <Link
        to={routes.customerToUserChatMessage({
          id: customerToUserChatMessageId,
        })}
        title={
          'Show customerToUserChatMessage ' +
          customerToUserChatMessageId +
          ' detail'
        }
        className="rw-button rw-button-small"
      >
        Show
      </Link>
    )
  }

  const renderEditAction = (params) => {
    const customerToUserChatMessageId = params.id
    return (
      <Link
        to={routes.editCustomerToUserChatMessage({
          id: customerToUserChatMessageId,
        })}
        title={'Edit customerToUserChatMessage ' + customerToUserChatMessageId}
        className="rw-button rw-button-small rw-button-blue"
      >
        Edit
      </Link>
    )
  }

  const renderDeleteAction = (params) => {
    const customerToUserChatMessageId = params.id
    return (
      <button
        type="button"
        title={
          'Delete customerToUserChatMessage ' + customerToUserChatMessageId
        }
        className="rw-button rw-button-small rw-button-red"
        onClick={(event) => {
          event.stopPropagation()
          onDeleteClick(customerToUserChatMessageId)
        }}
      >
        Delete
      </button>
    )
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    }).format(date)
  }

  const columns = [
    { field: 'id', headerName: 'Id', flex: 1 },
    { field: 'messageText', headerName: 'Message text', flex: 1 },
    { field: 'createdAt', headerName: 'Created at', flex: 1 },
    { field: 'updatedAt', headerName: 'Updated at', flex: 1 },
    {
      field: 'customerToUserChatId',
      headerName: 'Customer to user chat id',
      flex: 1,
    },
    { field: 'userId', headerName: 'User id', flex: 1 },
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

  const rows = customerToUserChatMessages.map((customerToUserChatMessage) => ({
    id: customerToUserChatMessage.id,
    messageText: customerToUserChatMessage.messageText,
    createdAt: formatDate(customerToUserChatMessage.createdAt),
    updatedAt: formatDate(customerToUserChatMessage.updatedAt),
    customerToUserChatId: customerToUserChatMessage.customerToUserChatId,
    userId: customerToUserChatMessage.userId,
  }))

  return (
    <Grid container>
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

export default CustomerToUserChatMessagesList
