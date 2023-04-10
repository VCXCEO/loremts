import axios from 'axios'
import cron from 'node-cron'

import { db } from 'src/lib/db'

const checkUnreadMessagesAndSendNotifications = async () => {
  console.log('Scheduler started - Checking for unread messages...')

  // Query the database for unread messages older than 5 minutes
  const fiveMinutesAgo = new Date(Date.now() - 1 * 60 * 1000)
  const unreadMessages = await db.userToUserChatMessage.findMany({
    where: {
      isRead: false,
      createdAt: {
        lt: fiveMinutesAgo,
      },
    },
    include: {
      user: true,
    },
  })

  // Extract the recipients' email addresses
  for (const message of unreadMessages) {
    const otherUsers = await db.user.findMany({
      where: {
        userToUserChats: {
          some: {
            id: message.userToUserChatId,
          },
        },
        id: {
          not: message.userId,
        },
      },
    })

    const recipientsEmails = otherUsers.map((user) => user.email)
    const uniqueRecipientEmails = [...new Set(recipientsEmails)]

    for (const email of uniqueRecipientEmails) {
      const headers = {
        'X-MAGICBELL-API-SECRET': process.env.MAGICBELL_API_SECRET,
        'X-MAGICBELL-API-KEY': process.env.MAGICBELL_API_KEY,
      }

      const data = {
        notification: {
          title: 'Unread Message for 5 minutes',
          content:
            'Hi there, there is a message that has been unread for 5 minutes, please respond to it at your earliest convenience.',
          recipients: [{ email }],
          category: 'unread-messages',
        },
      }

      axios.post('https://api.magicbell.com/notifications', data, { headers })
    }
  }
}
// Schedule the task to run every 5 minutes
cron.schedule('*/5 * * * *', checkUnreadMessagesAndSendNotifications)
