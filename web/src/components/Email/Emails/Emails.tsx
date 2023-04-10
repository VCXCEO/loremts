import { Grid, Paper } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import type { DeleteEmailMutationVariables, FindEmails } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Email/EmailsCell'

const DELETE_EMAIL_MUTATION = gql`
  mutation DeleteEmailMutation($id: Int!) {
    deleteEmail(id: $id) {
      id
    }
  }
`

const EmailsList = ({ emails }: FindEmails) => {
  const [deleteEmail] = useMutation(DELETE_EMAIL_MUTATION, {
    onCompleted: () => {
      toast.success('Email deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteEmailMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete email ' + id + '?')) {
      deleteEmail({ variables: { id } })
    }
  }

  const renderShowAction = (params) => {
    const emailId = params.id

    return (
      <Link
        to={routes.email({ id: emailId })}
        title={'Show email ' + emailId + ' detail'}
        className="rw-button rw-button-small"
      >
        Show
      </Link>
    )
  }

  const renderEditAction = (params) => {
    const emailId = params.id

    return (
      <Link
        to={routes.editEmail({ id: emailId })}
        title={'Edit email ' + emailId}
        className="rw-button rw-button-small rw-button-blue"
      >
        Edit
      </Link>
    )
  }

  const renderDeleteAction = (params) => {
    const emailId = params.id

    return (
      <button
        type="button"
        title={'Delete email ' + emailId}
        className="rw-button rw-button-small rw-button-red"
        onClick={(event) => {
          event.stopPropagation() // Prevent triggering onCellClick
          onDeleteClick(emailId)
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
    // Add more columns as needed
    { field: 'id', headerName: 'Id', flex: 1 },
    { field: 'messageId', headerName: 'Message id', flex: 1 },
    { field: 'conversationId', headerName: 'Conversation id', flex: 1 },
    { field: 'direction', headerName: 'Direction', flex: 1 },
    { field: 'inbox', headerName: 'Inbox', flex: 1 },
    { field: 'handleTime', headerName: 'Handle time', flex: 1 },
    { field: 'dateReceived', headerName: 'Date received', flex: 1 },
    { field: 'tags', headerName: 'Tags', flex: 1 },
    { field: 'satisfactionRating', headerName: 'Satisfaction rating', flex: 1 },
    { field: 'createdAt', headerName: 'Created at', flex: 1 },
    { field: 'updatedAt', headerName: 'Updated at', flex: 1 },
    { field: 'customerId', headerName: 'Customer id', flex: 1 },
    { field: 'customerEmail', headerName: 'Customer email', flex: 1 },
    { field: 'companyId', headerName: 'Company id', flex: 1 },
    { field: 'companyName', headerName: 'Company name', flex: 1 },
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

  const rows = emails.map((email) => ({
    id: email.id,
    messageId: email.messageId,
    conversationId: email.conversationId,
    direction: email.direction,
    inbox: email.inbox,
    handleTime: email.handleTime,
    dateReceived: formatDate(email.dateReceived),
    tags: email.tags,
    satisfactionRating: email.satisfactionRating,
    createdAt: formatDate(email.createdAt),
    updatedAt: formatDate(email.updatedAt),
    customerId: email.customerId,
    customerEmail: email.customerEmail,
    companyId: email.companyId,
    companyName: email.companyName,
    userId: email.userId,
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

export default EmailsList
