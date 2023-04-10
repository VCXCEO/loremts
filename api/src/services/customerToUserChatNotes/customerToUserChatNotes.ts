import type {
  QueryResolvers,
  MutationResolvers,
  CustomerToUserChatNoteRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const customerToUserChatNotes: QueryResolvers['customerToUserChatNotes'] =
  () => {
    return db.customerToUserChatNote.findMany()
  }

export const customerToUserChatNote: QueryResolvers['customerToUserChatNote'] =
  ({ id }) => {
    return db.customerToUserChatNote.findUnique({
      where: { id },
    })
  }

export const createCustomerToUserChatNote: MutationResolvers['createCustomerToUserChatNote'] =
  ({ input }) => {
    return db.customerToUserChatNote.create({
      data: input,
    })
  }

export const updateCustomerToUserChatNote: MutationResolvers['updateCustomerToUserChatNote'] =
  ({ id, input }) => {
    return db.customerToUserChatNote.update({
      data: input,
      where: { id },
    })
  }

export const deleteCustomerToUserChatNote: MutationResolvers['deleteCustomerToUserChatNote'] =
  ({ id }) => {
    return db.customerToUserChatNote.delete({
      where: { id },
    })
  }

export const CustomerToUserChatNote: CustomerToUserChatNoteRelationResolvers = {
  customerToUserChat: (_obj, { root }) => {
    return db.customerToUserChatNote
      .findUnique({ where: { id: root?.id } })
      .customerToUserChat()
  },
  customer: (_obj, { root }) => {
    return db.customerToUserChatNote
      .findUnique({ where: { id: root?.id } })
      .customer()
  },
  user: (_obj, { root }) => {
    return db.customerToUserChatNote
      .findUnique({ where: { id: root?.id } })
      .user()
  },
}

export const customerToUserChatNoteByChatId = ({ customerToUserChatId }) => {
  return db.customerToUserChatNote.findMany({
    where: {
      customerToUserChatId,
    },
  })
}
