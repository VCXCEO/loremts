import type {
  QueryResolvers,
  MutationResolvers,
  UserToUserChatMessageRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import pusher from 'src/lib/pusherConfig'

export const userToUserChatMessages: QueryResolvers['userToUserChatMessages'] =
  () => {
    return db.userToUserChatMessage.findMany()
  }

export const userToUserChatMessage: QueryResolvers['userToUserChatMessage'] = ({
  id,
}) => {
  return db.userToUserChatMessage.findUnique({
    where: { id },
  })
}

export const createUserToUserChatMessage: MutationResolvers['createUserToUserChatMessage'] =
  async ({ input }) => {
    const message = await db.userToUserChatMessage.create({
      data: {
        ...input,
        isRead: false,
      },
    })

    pusher.trigger(`chat-${input.userToUserChatId}`, 'newMessage', {
      ...message,
      userId: input.userId,
    })
    pusher.trigger(`unread-messages`, 'newMessage', {
      ...message,
      userId: input.userId,
    })

    const otherUser = await db.user.findFirst({
      where: {
        id: {
          not: input.userId,
        },
      },
    })

    const otherUserEmail = otherUser?.email

    return message
  }

export const updateUserToUserChatMessage: MutationResolvers['updateUserToUserChatMessage'] =
  ({ id, input }) => {
    return db.userToUserChatMessage.update({
      data: input,
      where: { id },
    })
  }

export const deleteUserToUserChatMessage: MutationResolvers['deleteUserToUserChatMessage'] =
  ({ id }) => {
    return db.userToUserChatMessage.delete({
      where: { id },
    })
  }

export const UserToUserChatMessage: UserToUserChatMessageRelationResolvers = {
  userToUserChat: (_obj, { root }) => {
    return db.userToUserChatMessage
      .findUnique({ where: { id: root?.id } })
      .userToUserChat()
  },
  user: (_obj, { root }) => {
    return db.userToUserChatMessage
      .findUnique({ where: { id: root?.id } })
      .user()
  },
}

export const markMessagesAsRead: MutationResolvers['markMessagesAsRead'] =
  async ({ userToUserChatId }) => {
    const currentUser = context.currentUser.id
    const currentUserCompanyId = context.currentUser.companyId

    const isCurrentUserInCompany1 = currentUserCompanyId === 1

    let updatedMessages
    let otherUser

    if (isCurrentUserInCompany1) {
      updatedMessages = await db.userToUserChatMessage.updateMany({
        where: {
          userToUserChatId,
          userId: {
            not: currentUser,
          },
          user: {
            companyId: {
              not: 1,
            },
          },
          isRead: false,
        },
        data: {
          isRead: true,
        },
      })

      otherUser = await db.user.findFirst({
        where: {
          companyId: {
            not: 1,
          },
        },
      })
    } else {
      updatedMessages = await db.userToUserChatMessage.updateMany({
        where: {
          userToUserChatId,
          userId: {
            not: currentUser,
          },
          user: {
            companyId: 1,
          },
          isRead: false,
        },
        data: {
          isRead: true,
        },
      })

      otherUser = await db.user.findFirst({
        where: {
          companyId: 1,
        },
      })
    }

    if (updatedMessages.count > 0) {
      // Add this line to trigger the new event
      pusher.trigger(`unread-messages`, 'messages-marked-read', {
        userToUserChatId,
        userId: currentUser,
      })
    }

    return updatedMessages.count > 0
  }
