import type {
  QueryResolvers,
  MutationResolvers,
  UserToUserChatRelationResolvers,
} from 'types/graphql'

import { context } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
export const userToUserChats: QueryResolvers['userToUserChats'] = () => {
  return db.userToUserChat.findMany()
}

export const createUserToUserChat: MutationResolvers['createUserToUserChat'] =
  async ({ input }) => {
    // Get the current user from the context
    const currentUser = context.currentUser

    // Check if the current user is defined and has an ID
    if (!currentUser || !currentUser.id) {
      throw new Error('Current user is not available or has no ID')
    }

    const usersOfCompany = await db.user.findMany({
      where: { companyId: 1 },
    })

    const userIds = usersOfCompany.map((user) => user.id)

    // Add the current user to the list of users
    userIds.push(currentUser.id)

    // Create a new chat
    const connectUserIds = userIds.map((id) => ({ id }))

    return db.userToUserChat.create({
      data: {
        ...input,
        users: {
          connect: connectUserIds,
        },
      },
    })
  }

export const updateUserToUserChat: MutationResolvers['updateUserToUserChat'] =
  ({ id, input }) => {
    return db.userToUserChat.update({
      data: input,
      where: { id },
    })
  }

export const deleteUserToUserChat: MutationResolvers['deleteUserToUserChat'] =
  ({ id }) => {
    return db.userToUserChat.delete({
      where: { id },
    })
  }

export const UserToUserChat: UserToUserChatRelationResolvers = {
  users: (_obj, { root }) => {
    return db.userToUserChat.findUnique({ where: { id: root?.id } }).users()
  },
  userToUserChatMessages: (_obj, { root }) => {
    return db.userToUserChat
      .findUnique({ where: { id: root?.id } })
      .userToUserChatMessages()
  },
  userToUserChatNotes: (_obj, { root }) => {
    return db.userToUserChat
      .findUnique({ where: { id: root?.id } })
      .userToUserChatNotes()
  },
  Company: (_obj, { root }) => {
    return db.userToUserChat.findUnique({ where: { id: root?.id } }).Company()
  },
}

export const filteredUserToUserChats = async () => {
  // If the current user is a LoremAdmin or belongs to company1, fetch all chat rooms
  if (context.currentUser.companyId === 1) {
    return db.userToUserChat.findMany()
  }

  // If the user does not meet the criteria, fetch only the chat rooms they are a part of
  return db.userToUserChat.findMany({
    where: {
      users: {
        some: {
          id: context.currentUser.id,
        },
      },
    },
  })
}
