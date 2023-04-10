import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/EscalationNote/EscalationNotesCell'
import { timeTag, truncate } from 'src/lib/formatters'

import type {
  DeleteEscalationNoteMutationVariables,
  FindEscalationNotes,
} from 'types/graphql'

const DELETE_ESCALATION_NOTE_MUTATION = gql`
  mutation DeleteEscalationNoteMutation($id: Int!) {
    deleteEscalationNote(id: $id) {
      id
    }
  }
`

const EscalationNotesList = ({ escalationNotes }: FindEscalationNotes) => {
  const [deleteEscalationNote] = useMutation(DELETE_ESCALATION_NOTE_MUTATION, {
    onCompleted: () => {
      toast.success('EscalationNote deleted')
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

  const onDeleteClick = (id: DeleteEscalationNoteMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete escalationNote ' + id + '?')) {
      deleteEscalationNote({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Note</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Escalation id</th>
            <th>User id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {escalationNotes.map((escalationNote) => (
            <tr key={escalationNote.id}>
              <td>{truncate(escalationNote.id)}</td>
              <td>{truncate(escalationNote.note)}</td>
              <td>{timeTag(escalationNote.createdAt)}</td>
              <td>{timeTag(escalationNote.updatedAt)}</td>
              <td>{truncate(escalationNote.escalationId)}</td>
              <td>{truncate(escalationNote.userId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.escalationNote({ id: escalationNote.id })}
                    title={
                      'Show escalationNote ' + escalationNote.id + ' detail'
                    }
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editEscalationNote({ id: escalationNote.id })}
                    title={'Edit escalationNote ' + escalationNote.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete escalationNote ' + escalationNote.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(escalationNote.id)}
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

export default EscalationNotesList
