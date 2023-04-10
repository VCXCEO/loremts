import type {
  QueryResolvers,
  MutationResolvers,
  EmailMessageReceivedRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const emailMessageReceiveds: QueryResolvers['emailMessageReceiveds'] =
  () => {
    return db.emailMessageReceived.findMany()
  }

export const emailMessageReceived: QueryResolvers['emailMessageReceived'] = ({
  id,
}) => {
  return db.emailMessageReceived.findUnique({
    where: { id },
  })
}

export const createEmailMessageReceived: MutationResolvers['createEmailMessageReceived'] =
  ({ input }) => {
    return db.emailMessageReceived.create({
      data: input,
    })
  }

export const updateEmailMessageReceived: MutationResolvers['updateEmailMessageReceived'] =
  ({ id, input }) => {
    return db.emailMessageReceived.update({
      data: input,
      where: { id },
    })
  }

export const deleteEmailMessageReceived: MutationResolvers['deleteEmailMessageReceived'] =
  ({ id }) => {
    return db.emailMessageReceived.delete({
      where: { id },
    })
  }

export const EmailMessageReceived: EmailMessageReceivedRelationResolvers = {
  Email: (_obj, { root }) => {
    return db.emailMessageReceived
      .findUnique({ where: { id: root?.id } })
      .Email()
  },
}
