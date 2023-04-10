import type {
  QueryResolvers,
  MutationResolvers,
  EmailMessageSentRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const emailMessageSents: QueryResolvers['emailMessageSents'] = () => {
  return db.emailMessageSent.findMany()
}

export const emailMessageSent: QueryResolvers['emailMessageSent'] = ({
  id,
}) => {
  return db.emailMessageSent.findUnique({
    where: { id },
  })
}

export const createEmailMessageSent: MutationResolvers['createEmailMessageSent'] =
  ({ input }) => {
    return db.emailMessageSent.create({
      data: input,
    })
  }

export const updateEmailMessageSent: MutationResolvers['updateEmailMessageSent'] =
  ({ id, input }) => {
    return db.emailMessageSent.update({
      data: input,
      where: { id },
    })
  }

export const deleteEmailMessageSent: MutationResolvers['deleteEmailMessageSent'] =
  ({ id }) => {
    return db.emailMessageSent.delete({
      where: { id },
    })
  }

export const EmailMessageSent: EmailMessageSentRelationResolvers = {
  email: (_obj, { root }) => {
    return db.emailMessageSent.findUnique({ where: { id: root?.id } }).email()
  },
}
