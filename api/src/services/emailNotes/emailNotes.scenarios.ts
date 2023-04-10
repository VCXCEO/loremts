import type { Prisma, EmailNote } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.EmailNoteCreateArgs>({
  emailNote: {
    one: {
      data: {
        note: 'String',
        updatedAt: '2023-04-03T19:45:26.307Z',
        email: {
          create: {
            conversationId: 'String3401627',
            inbox: 'String',
            handleTime: 5274720,
            dateReceived: '2023-04-03T19:45:26.307Z',
            subject: 'String',
            tags: 'String',
            updatedAt: '2023-04-03T19:45:26.307Z',
            customer: {
              create: {
                transactionId: 'String',
                updatedAt: '2023-04-03T19:45:26.307Z',
              },
            },
            company: {
              create: {
                name: 'String3414816',
                industry: 'String',
                domain: 'String7560943',
                companyLogo: 'String',
                emailAddress: 'String',
                phoneNumber: 'String',
                chatIdentifier: 'String2534761',
                apiKey: 'String',
                updatedAt: '2023-04-03T19:45:26.307Z',
              },
            },
          },
        },
        customer: {
          create: {
            transactionId: 'String',
            updatedAt: '2023-04-03T19:45:26.307Z',
          },
        },
        user: {
          create: {
            email: 'String6143293',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
    two: {
      data: {
        note: 'String',
        updatedAt: '2023-04-03T19:45:26.307Z',
        email: {
          create: {
            conversationId: 'String6570185',
            inbox: 'String',
            handleTime: 3840027,
            dateReceived: '2023-04-03T19:45:26.307Z',
            subject: 'String',
            tags: 'String',
            updatedAt: '2023-04-03T19:45:26.307Z',
            customer: {
              create: {
                transactionId: 'String',
                updatedAt: '2023-04-03T19:45:26.307Z',
              },
            },
            company: {
              create: {
                name: 'String8532808',
                industry: 'String',
                domain: 'String5864366',
                companyLogo: 'String',
                emailAddress: 'String',
                phoneNumber: 'String',
                chatIdentifier: 'String5100023',
                apiKey: 'String',
                updatedAt: '2023-04-03T19:45:26.307Z',
              },
            },
          },
        },
        customer: {
          create: {
            transactionId: 'String',
            updatedAt: '2023-04-03T19:45:26.307Z',
          },
        },
        user: {
          create: {
            email: 'String9757527',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<EmailNote, 'emailNote'>
