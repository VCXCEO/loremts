import type { EmailMessageSent } from '@prisma/client'

import {
  emailMessageSents,
  emailMessageSent,
  createEmailMessageSent,
  updateEmailMessageSent,
  deleteEmailMessageSent,
} from './emailMessageSents'
import type { StandardScenario } from './emailMessageSents.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('emailMessageSents', () => {
  scenario(
    'returns all emailMessageSents',
    async (scenario: StandardScenario) => {
      const result = await emailMessageSents()

      expect(result.length).toEqual(
        Object.keys(scenario.emailMessageSent).length
      )
    }
  )

  scenario(
    'returns a single emailMessageSent',
    async (scenario: StandardScenario) => {
      const result = await emailMessageSent({
        id: scenario.emailMessageSent.one.id,
      })

      expect(result).toEqual(scenario.emailMessageSent.one)
    }
  )

  scenario('creates a emailMessageSent', async (scenario: StandardScenario) => {
    const result = await createEmailMessageSent({
      input: {
        messageId: 'String6608617',
        conversationId: 'String',
        extract: 'String',
        handleTime: 1102324,
        dateReceived: '2023-04-03T19:42:59.210Z',
        emailId: scenario.emailMessageSent.two.emailId,
        emailConversationId: scenario.emailMessageSent.two.emailConversationId,
      },
    })

    expect(result.messageId).toEqual('String6608617')
    expect(result.conversationId).toEqual('String')
    expect(result.extract).toEqual('String')
    expect(result.handleTime).toEqual(1102324)
    expect(result.dateReceived).toEqual(new Date('2023-04-03T19:42:59.210Z'))
    expect(result.emailId).toEqual(scenario.emailMessageSent.two.emailId)
    expect(result.emailConversationId).toEqual(
      scenario.emailMessageSent.two.emailConversationId
    )
  })

  scenario('updates a emailMessageSent', async (scenario: StandardScenario) => {
    const original = (await emailMessageSent({
      id: scenario.emailMessageSent.one.id,
    })) as EmailMessageSent
    const result = await updateEmailMessageSent({
      id: original.id,
      input: { messageId: 'String97230602' },
    })

    expect(result.messageId).toEqual('String97230602')
  })

  scenario('deletes a emailMessageSent', async (scenario: StandardScenario) => {
    const original = (await deleteEmailMessageSent({
      id: scenario.emailMessageSent.one.id,
    })) as EmailMessageSent
    const result = await emailMessageSent({ id: original.id })

    expect(result).toEqual(null)
  })
})
