import { db } from './db'
async function addUserToCompanyChat(newUserId: number, companyId: number) {
  // Find all existing chats that include at least one user from the specified company
  const existingUserToUserChats = await db.userToUserChat.findMany({
    where: {
      users: {
        some: {
          companyId,
        },
      },
    },
  })

  // If there are existing chats, update them to include the new user
  if (existingUserToUserChats.length > 0) {
    await Promise.all(
      existingUserToUserChats.map(async (chat) => {
        await db.userToUserChat.update({
          where: { id: chat.id },
          data: {
            users: {
              connect: { id: newUserId },
            },
          },
        })
      })
    )
  }

  const existingCustomerToUserChats = await db.customerToUserChat.findMany({
    where: {
      users: {
        some: {
          companyId,
        },
      },
    },
  })

  // If there are existing chats, update them to include the new user
  if (existingCustomerToUserChats.length > 0) {
    await Promise.all(
      existingCustomerToUserChats.map(async (chat) => {
        await db.customerToUserChat.update({
          where: { id: chat.id },
          data: {
            users: {
              connect: { id: newUserId },
            },
          },
        })
      })
    )
  }
}

export { addUserToCompanyChat }
