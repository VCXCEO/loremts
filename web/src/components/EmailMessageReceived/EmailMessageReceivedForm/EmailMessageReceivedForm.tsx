import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  DatetimeLocalField,
  Submit,
} from '@redwoodjs/forms'

import type {
  EditEmailMessageReceivedById,
  UpdateEmailMessageReceivedInput,
} from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

type FormEmailMessageReceived = NonNullable<
  EditEmailMessageReceivedById['emailMessageReceived']
>

interface EmailMessageReceivedFormProps {
  emailMessageReceived?: EditEmailMessageReceivedById['emailMessageReceived']
  onSave: (
    data: UpdateEmailMessageReceivedInput,
    id?: FormEmailMessageReceived['id']
  ) => void
  error: RWGqlError
  loading: boolean
}

const EmailMessageReceivedForm = (props: EmailMessageReceivedFormProps) => {
  const onSubmit = (data: FormEmailMessageReceived) => {
    props.onSave(data, props?.emailMessageReceived?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormEmailMessageReceived> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="messageId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Message id
        </Label>

        <TextField
          name="messageId"
          defaultValue={props.emailMessageReceived?.messageId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="messageId" className="rw-field-error" />

        <Label
          name="conversationId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Conversation id
        </Label>

        <TextField
          name="conversationId"
          defaultValue={props.emailMessageReceived?.conversationId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="conversationId" className="rw-field-error" />

        <Label
          name="extract"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Extract
        </Label>

        <TextField
          name="extract"
          defaultValue={props.emailMessageReceived?.extract}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="extract" className="rw-field-error" />

        <Label
          name="handleTime"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Handle time
        </Label>

        <NumberField
          name="handleTime"
          defaultValue={props.emailMessageReceived?.handleTime}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="handleTime" className="rw-field-error" />

        <Label
          name="dateReceived"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Date received
        </Label>

        <DatetimeLocalField
          name="dateReceived"
          defaultValue={formatDatetime(
            props.emailMessageReceived?.dateReceived
          )}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="dateReceived" className="rw-field-error" />

        <Label
          name="emailId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Email id
        </Label>

        <NumberField
          name="emailId"
          defaultValue={props.emailMessageReceived?.emailId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="emailId" className="rw-field-error" />

        <Label
          name="emailConversationId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Email conversation id
        </Label>

        <TextField
          name="emailConversationId"
          defaultValue={props.emailMessageReceived?.emailConversationId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="emailConversationId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default EmailMessageReceivedForm
