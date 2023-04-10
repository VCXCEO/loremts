import type {
  QueryResolvers,
  MutationResolvers,
  UserToUserChatNoteRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const userToUserChatNotes: QueryResolvers['userToUserChatNotes'] =
  () => {
    return db.userToUserChatNote.findMany()
  }

export const userToUserChatNote: QueryResolvers['userToUserChatNote'] = ({
  id,
}) => {
  return db.userToUserChatNote.findUnique({
    where: { id },
  })
}

export const createUserToUserChatNote: MutationResolvers['createUserToUserChatNote'] =
  ({ input }) => {
    return db.userToUserChatNote.create({
      data: input,
    })
  }

export const updateUserToUserChatNote: MutationResolvers['updateUserToUserChatNote'] =
  ({ id, input }) => {
    return db.userToUserChatNote.update({
      data: input,
      where: { id },
    })
  }

export const deleteUserToUserChatNote: MutationResolvers['deleteUserToUserChatNote'] =
  ({ id }) => {
    return db.userToUserChatNote.delete({
      where: { id },
    })
  }

export const UserToUserChatNote: UserToUserChatNoteRelationResolvers = {
  userToUserChat: (_obj, { root }) => {
    return db.userToUserChatNote
      .findUnique({ where: { id: root?.id } })
      .userToUserChat()
  },
  user: (_obj, { root }) => {
    return db.userToUserChatNote.findUnique({ where: { id: root?.id } }).user()
  },
}

export const userToUserChatNoteByChatId = ({ userToUserChatId }) => {
  return db.userToUserChatNote.findMany({
    where: {
      userToUserChatId,
    },
  })
}
