import CryptoJS from 'crypto-js'
import type {
  QueryResolvers,
  MutationResolvers,
  UserRelationResolvers,
} from 'types/graphql'

import { addUserToCompanyChat } from 'src/lib/addUserToCompanyChat'
import { db } from 'src/lib/db'
import { randomPassword, sendTemplateMail } from 'src/lib/userCreationUtils'

export const users: QueryResolvers['users'] = () => {
  return db.user.findMany()
}

export const user: QueryResolvers['user'] = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const createUser: MutationResolvers['createUser'] = async ({
  input,
}) => {
  const CryptoJS = require('crypto-js')
  const password = randomPassword
  console.log(`Generated password: ${password}`)
  const salt = CryptoJS.lib.WordArray.random(128 / 8).toString()
  const hashedPassword = CryptoJS.PBKDF2(password, salt, {
    keySize: 256 / 32,
  }).toString()

  await sendTemplateMail({
    to: input.email,
    templateId: process.env.ACCOUNT_CREATION_EMAIL_TEMPLATE_ID,
    dynamicTemplateData: {
      // Include any dynamic data your template requires
      password: password,
      firstName: input.firstName,
      companyName: input.companyName,
    },
  })

  const newUser = await db.user.create({
    data: {
      ...input,
      hashedPassword,
      salt,
      firstLogin: true,
    },
  })

  // If the new user belongs to the specified company, add them to the existing chat
  if (newUser.companyId === 1) {
    await addUserToCompanyChat(newUser.id, newUser.companyId)
  }

  return newUser
}

export const updateUser: MutationResolvers['updateUser'] = async (
  { id, input },
  _,
  context
) => {
  const currentUser = await db.user.findUnique({ where: { id } })

  if (currentUser.firstLogin && input.password) {
    const salt = CryptoJS.lib.WordArray.random(128 / 8).toString()
    const hashedPassword = CryptoJS.PBKDF2(input.password, salt, {
      keySize: 256 / 32,
    }).toString()

    // Destructure the password field from the input object
    const { password, ...restInput } = input

    return db.user.update({
      data: {
        ...restInput,
        salt,
        hashedPassword,
        firstLogin: false,
      },
      where: { id },
    })
  } else {
    // Destructure the password field from the input object
    const { password, ...restInput } = input

    return db.user.update({
      data: restInput,
      where: { id },
    })
  }
}

export const deleteUser: MutationResolvers['deleteUser'] = ({ id }) => {
  return db.user.delete({
    where: { id },
  })
}

export const User: UserRelationResolvers = {
  company: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).company()
  },
  calls: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).calls()
  },
  emails: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).emails()
  },
  customerToUserChats: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).customerToUserChats()
  },
  userToUserChats: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).userToUserChats()
  },
  userToUserChatMessage: (_obj, { root }) => {
    return db.user
      .findUnique({ where: { id: root?.id } })
      .userToUserChatMessage()
  },
  customerToUserChatMessage: (_obj, { root }) => {
    return db.user
      .findUnique({ where: { id: root?.id } })
      .customerToUserChatMessage()
  },
  companyNotes: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).companyNotes()
  },
  customerNotes: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).customerNotes()
  },
  callNotes: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).callNotes()
  },
  userToUserChatNotes: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).userToUserChatNotes()
  },
  customerToUserChatNotes: (_obj, { root }) => {
    return db.user
      .findUnique({ where: { id: root?.id } })
      .customerToUserChatNotes()
  },
  emailNotes: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).emailNotes()
  },
  escalationNotes: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).escalationNotes()
  },
}
