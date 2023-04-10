import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/EmailMessageSent/EmailMessageSentsCell'
import { timeTag, truncate } from 'src/lib/formatters'

import type {
  DeleteEmailMessageSentMutationVariables,
  FindEmailMessageSents,
} from 'types/graphql'

const DELETE_EMAIL_MESSAGE_SENT_MUTATION = gql`
  mutation DeleteEmailMessageSentMutation($id: Int!) {
    deleteEmailMessageSent(id: $id) {
      id
    }
  }
`

const EmailMessageSentsList = ({
  emailMessageSents,
}: FindEmailMessageSents) => {
  const [deleteEmailMessageSent] = useMutation(
    DELETE_EMAIL_MESSAGE_SENT_MUTATION,
    {
      onCompleted: () => {
        toast.success('EmailMessageSent deleted')
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

  const onDeleteClick = (id: DeleteEmailMessageSentMutationVariables['id']) => {
    if (
      confirm('Are you sure you want to delete emailMessageSent ' + id + '?')
    ) {
      deleteEmailMessageSent({ variables: { id } })
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
          {emailMessageSents.map((emailMessageSent) => (
            <tr key={emailMessageSent.id}>
              <td>{truncate(emailMessageSent.id)}</td>
              <td>{truncate(emailMessageSent.messageId)}</td>
              <td>{truncate(emailMessageSent.conversationId)}</td>
              <td>{truncate(emailMessageSent.extract)}</td>
              <td>{truncate(emailMessageSent.handleTime)}</td>
              <td>{timeTag(emailMessageSent.dateReceived)}</td>
              <td>{truncate(emailMessageSent.emailId)}</td>
              <td>{truncate(emailMessageSent.emailConversationId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.emailMessageSent({ id: emailMessageSent.id })}
                    title={
                      'Show emailMessageSent ' + emailMessageSent.id + ' detail'
                    }
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editEmailMessageSent({
                      id: emailMessageSent.id,
                    })}
                    title={'Edit emailMessageSent ' + emailMessageSent.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete emailMessageSent ' + emailMessageSent.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(emailMessageSent.id)}
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

export default EmailMessageSentsList
