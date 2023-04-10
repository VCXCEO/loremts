import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

import type {
  EditEscalationNoteById,
  UpdateEscalationNoteInput,
} from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

type FormEscalationNote = NonNullable<EditEscalationNoteById['escalationNote']>

interface EscalationNoteFormProps {
  escalationNote?: EditEscalationNoteById['escalationNote']
  onSave: (
    data: UpdateEscalationNoteInput,
    id?: FormEscalationNote['id']
  ) => void
  error: RWGqlError
  loading: boolean
}

const EscalationNoteForm = (props: EscalationNoteFormProps) => {
  const onSubmit = (data: FormEscalationNote) => {
    props.onSave(data, props?.escalationNote?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormEscalationNote> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="note"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Note
        </Label>

        <TextField
          name="note"
          defaultValue={props.escalationNote?.note}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="note" className="rw-field-error" />

        <Label
          name="escalationId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Escalation id
        </Label>

        <NumberField
          name="escalationId"
          defaultValue={props.escalationNote?.escalationId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="escalationId" className="rw-field-error" />

        <Label
          name="userId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User id
        </Label>

        <NumberField
          name="userId"
          defaultValue={props.escalationNote?.userId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="userId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default EscalationNoteForm
