import type {
  QueryResolvers,
  MutationResolvers,
  CustomerToUserChatMessageRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import pusher from 'src/lib/pusherConfig'

export const customerToUserChatMessages: QueryResolvers['customerToUserChatMessages'] =
  () => {
    return db.customerToUserChatMessage.findMany()
  }

export const customerToUserChatMessage: QueryResolvers['customerToUserChatMessage'] =
  ({ id }) => {
    return db.customerToUserChatMessage.findUnique({
      where: { id },
    })
  }

export const createCustomerToUserChatMessage: MutationResolvers['createCustomerToUserChatMessage'] =
  async ({ input }) => {
    console.log('Input:', input)
    const message = await db.customerToUserChatMessage.create({
      data: input,
    })

    try {
      await pusher.trigger(
        `chat-${input.customerToUserChatId}`,
        'newMessage',
        message
      )
    } catch (error) {
      console.error('Failed to trigger Pusher event:', error)
    }

    return message
  }

export const updateCustomerToUserChatMessage: MutationResolvers['updateCustomerToUserChatMessage'] =
  ({ id, input }) => {
    return db.customerToUserChatMessage.update({
      data: input,
      where: { id },
    })
  }

export const deleteCustomerToUserChatMessage: MutationResolvers['deleteCustomerToUserChatMessage'] =
  ({ id }) => {
    return db.customerToUserChatMessage.delete({
      where: { id },
    })
  }

export const CustomerToUserChatMessage: CustomerToUserChatMessageRelationResolvers =
  {
    customerToUserChat: (_obj, { root }) => {
      return db.customerToUserChatMessage
        .findUnique({ where: { id: root?.id } })
        .customerToUserChat()
    },
    user: (_obj, { root }) => {
      return db.customerToUserChatMessage
        .findUnique({ where: { id: root?.id } })
        .user()
    },
  }
