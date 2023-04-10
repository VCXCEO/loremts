import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

import type {
  DeleteEscalationNoteMutationVariables,
  FindEscalationNoteById,
} from 'types/graphql'

const DELETE_ESCALATION_NOTE_MUTATION = gql`
  mutation DeleteEscalationNoteMutation($id: Int!) {
    deleteEscalationNote(id: $id) {
      id
    }
  }
`

interface Props {
  escalationNote: NonNullable<FindEscalationNoteById['escalationNote']>
}

const EscalationNote = ({ escalationNote }: Props) => {
  const [deleteEscalationNote] = useMutation(DELETE_ESCALATION_NOTE_MUTATION, {
    onCompleted: () => {
      toast.success('EscalationNote deleted')
      navigate(routes.escalationNotes())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteEscalationNoteMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete escalationNote ' + id + '?')) {
      deleteEscalationNote({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            EscalationNote {escalationNote.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{escalationNote.id}</td>
            </tr>
            <tr>
              <th>Note</th>
              <td>{escalationNote.note}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(escalationNote.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(escalationNote.updatedAt)}</td>
            </tr>
            <tr>
              <th>Escalation id</th>
              <td>{escalationNote.escalationId}</td>
            </tr>
            <tr>
              <th>User id</th>
              <td>{escalationNote.userId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editEscalationNote({ id: escalationNote.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(escalationNote.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default EscalationNote
