import type {
  QueryResolvers,
  MutationResolvers,
  EmailRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const emails: QueryResolvers['emails'] = () => {
  return db.email.findMany()
}

export const email: QueryResolvers['email'] = ({ id }) => {
  return db.email.findUnique({
    where: { id },
  })
}

export const createEmail: MutationResolvers['createEmail'] = ({ input }) => {
  return db.email.create({
    data: input,
  })
}

export const updateEmail: MutationResolvers['updateEmail'] = ({
  id,
  input,
}) => {
  return db.email.update({
    data: input,
    where: { id },
  })
}

export const deleteEmail: MutationResolvers['deleteEmail'] = ({ id }) => {
  return db.email.delete({
    where: { id },
  })
}

export const Email: EmailRelationResolvers = {
  customer: (_obj, { root }) => {
    return db.email.findUnique({ where: { id: root?.id } }).customer()
  },
  company: (_obj, { root }) => {
    return db.email.findUnique({ where: { id: root?.id } }).company()
  },
  user: (_obj, { root }) => {
    return db.email.findUnique({ where: { id: root?.id } }).user()
  },
  emailNotes: (_obj, { root }) => {
    return db.email.findUnique({ where: { id: root?.id } }).emailNotes()
  },
  emailMessagesSent: (_obj, { root }) => {
    return db.email.findUnique({ where: { id: root?.id } }).emailMessagesSent()
  },
  emailMessagesReceived: (_obj, { root }) => {
    return db.email
      .findUnique({ where: { id: root?.id } })
      .emailMessagesReceived()
  },
}
