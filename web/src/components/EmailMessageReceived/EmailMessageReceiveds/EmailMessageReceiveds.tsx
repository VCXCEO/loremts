import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/EmailMessageReceived/EmailMessageReceivedsCell'
import { timeTag, truncate } from 'src/lib/formatters'

import type {
  DeleteEmailMessageReceivedMutationVariables,
  FindEmailMessageReceiveds,
} from 'types/graphql'

const DELETE_EMAIL_MESSAGE_RECEIVED_MUTATION = gql`
  mutation DeleteEmailMessageReceivedMutation($id: Int!) {
    deleteEmailMessageReceived(id: $id) {
      id
    }
  }
`

const EmailMessageReceivedsList = ({
  emailMessageReceiveds,
}: FindEmailMessageReceiveds) => {
  const [deleteEmailMessageReceived] = useMutation(
    DELETE_EMAIL_MESSAGE_RECEIVED_MUTATION,
    {
      onCompleted: () => {
        toast.success('EmailMessageReceived deleted')
      },
      onError: (error) => {
        toast.error(error.message)
      },
      // This refetches the query on the list page. Read more about other ways to
      // update the cache over here:
      // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
      refetchQueries: [{ query: QUERY }],
      awaitRefetchQueries: true,
    }
  )

  const onDeleteClick = (
    id: DeleteEmailMessageReceivedMutationVariables['id']
  ) => {
    if (
      confirm(
        'Are you sure you want to delete emailMessageReceived ' + id + '?'
      )
    ) {
      deleteEmailMessageReceived({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Message id</th>
            <th>Conversation id</th>
            <th>Extract</th>
            <th>Handle time</th>
            <th>Date received</th>
            <th>Email id</th>
            <th>Email conversation id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {emailMessageReceiveds.map((emailMessageReceived) => (
            <tr key={emailMessageReceived.id}>
              <td>{truncate(emailMessageReceived.id)}</td>
              <td>{truncate(emailMessageReceived.messageId)}</td>
              <td>{truncate(emailMessageReceived.conversationId)}</td>
              <td>{truncate(emailMessageReceived.extract)}</td>
              <td>{truncate(emailMessageReceived.handleTime)}</td>
              <td>{timeTag(emailMessageReceived.dateReceived)}</td>
              <td>{truncate(emailMessageReceived.emailId)}</td>
              <td>{truncate(emailMessageReceived.emailConversationId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.emailMessageReceived({
                      id: emailMessageReceived.id,
                    })}
                    title={
                      'Show emailMessageReceived ' +
                      emailMessageReceived.id +
                      ' detail'
                    }
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editEmailMessageReceived({
                      id: emailMessageReceived.id,
                    })}
                    title={
                      'Edit emailMessageReceived ' + emailMessageReceived.id
                    }
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={
                      'Delete emailMessageReceived ' + emailMessageReceived.id
                    }
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(emailMessageReceived.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default EmailMessageReceivedsList
