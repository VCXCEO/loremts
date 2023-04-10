import type {
  QueryResolvers,
  MutationResolvers,
  CustomerToUserChatRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const customerToUserChats: QueryResolvers['customerToUserChats'] =
  () => {
    return db.customerToUserChat.findMany()
  }

export const customerToUserChat: QueryResolvers['customerToUserChat'] = ({
  id,
}) => {
  return db.customerToUserChat.findUnique({
    where: { id },
  })
}

export const createCustomerToUserChat: MutationResolvers['createCustomerToUserChat'] =
  ({ input }) => {
    return db.customerToUserChat.create({
      data: input,
    })
  }

export const updateCustomerToUserChat: MutationResolvers['updateCustomerToUserChat'] =
  ({ id, input }) => {
    return db.customerToUserChat.update({
      data: input,
      where: { id },
    })
  }

export const deleteCustomerToUserChat: MutationResolvers['deleteCustomerToUserChat'] =
  ({ id }) => {
    return db.customerToUserChat.delete({
      where: { id },
    })
  }

export const CustomerToUserChat: CustomerToUserChatRelationResolvers = {
  customer: (_obj, { root }) => {
    return db.customerToUserChat
      .findUnique({ where: { id: root?.id } })
      .customer()
  },
  company: (_obj, { root }) => {
    return db.customerToUserChat
      .findUnique({ where: { id: root?.id } })
      .company()
  },
  users: (_obj, { root }) => {
    return db.customerToUserChat.findUnique({ where: { id: root?.id } }).users()
  },
  customerToUserChatMessages: (_obj, { root }) => {
    return db.customerToUserChat
      .findUnique({ where: { id: root?.id } })
      .customerToUserChatMessages()
  },
  customerToUserChatNotes: (_obj, { root }) => {
    return db.customerToUserChat
      .findUnique({ where: { id: root?.id } })
      .customerToUserChatNotes()
  },
}

export const filteredCustomerToUserChats = async () => {
  // If the current user is a LoremAdmin or belongs to company1, fetch all chat rooms
  if (context.currentUser.companyId === 1) {
    return db.customerToUserChat.findMany()
  }

  // If the user does not meet the criteria, fetch only the chat rooms they are a part of
  return db.customerToUserChat.findMany({
    where: {
      users: {
        some: {
          id: context.currentUser.id,
        },
      },
    },
  })
}
