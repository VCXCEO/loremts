import { PrismaClient } from '@prisma/client'
import type { APIGatewayEvent, Context } from 'aws-lambda'

import { logger } from 'src/lib/logger'
import { randomPassword } from 'src/lib/userCreationUtils'

/**
 * The handler function is your code that processes http request events.
 * You can use return and throw to send a response or error, respectively.
 *
 * Important: When deployed, a custom serverless function is an open API endpoint and
 * is your responsibility to secure appropriately.
 *
 * @see {@link https://redwoodjs.com/docs/serverless-functions#security-considerations|Serverless Function Considerations}
 * in the RedwoodJS documentation for more information.
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } context - contains information about the invocation,
 * function, and execution environment.
 */

const prisma = new PrismaClient()

export const handler = async (event: APIGatewayEvent, _context: Context) => {
  logger.info(
    `${event.httpMethod} ${event.path}: externalChatRequest function ${event.body}`
  )

  let requestBody
  try {
    requestBody = JSON.parse(event.body)
  } catch (error) {
    console.error('Error parsing request body:', error)
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid request body' }),
    }
  }

  const chatToken = randomPassword

  const receivedChatIdentifier = requestBody.chatIdentifier
  const receivedEmail = requestBody.email
  const receivedFirstName = requestBody.firstName
  const receivedLastName = requestBody.lastName
  const receivedPhone = requestBody.phone

  const usersOfCompany = await prisma.user.findMany({
    where: {
      companyId: 1,
    },
    select: {
      id: true,
    },
  })

  // Map the users to an array of objects suitable for the connect field
  const usersToConnect = usersOfCompany.map((user) => ({
    id: user.id,
  }))

  const customerCompany = await prisma.company.findUnique({
    where: {
      chatIdentifier: receivedChatIdentifier,
    },
  })
  const encodedCompanyName = encodeURIComponent(customerCompany.name)

  const existingCustomer = await prisma.customer.findUnique({
    where: {
      email: receivedEmail,
    },
  })

  if (existingCustomer) {
    const beginChat = await prisma.customerToUserChat.create({
      data: {
        token: chatToken, // Add the generated token to the chat session data
        users: {
          connect: usersToConnect, // Connect all users of the company to the chat
        },
        customer: {
          connect: {
            email: existingCustomer.email,
          },
        },
        company: {
          connect: {
            name: encodedCompanyName,
          },
        },
      },
    })
    return {
      statusCode: 200,
      body: JSON.stringify({
        chatUrl: `http://localhost:8910/customer-chat/${customerCompany.name}/${beginChat.id}/${chatToken}`,
      }),
    }
  } else {
    const newCustomer = await prisma.customer.create({
      data: {
        firstName: receivedFirstName,
        lastName: receivedLastName,
        email: receivedEmail,
        phone: receivedPhone,
        companies: {
          connect: {
            name: customerCompany.name,
          },
        },
      },
    })
    const beginChat = await prisma.customerToUserChat.create({
      data: {
        token: chatToken, // Add the generated token to the chat session data
        users: {
          connect: usersToConnect, // Connect all users of the company to the chat
        },
        customer: {
          connect: {
            email: newCustomer.email,
          },
        },
        company: {
          connect: {
            name: customerCompany.name,
          },
        },
      },
    })
    return {
      statusCode: 200,
      body: JSON.stringify({
        chatUrl: `http://localhost:8910/customer-chat/${encodedCompanyName}/${beginChat.id}/${chatToken}`,
      }),
    }
  }
}
