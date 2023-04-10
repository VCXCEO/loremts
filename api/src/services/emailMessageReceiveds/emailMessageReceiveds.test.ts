import type { EmailMessageReceived } from '@prisma/client'

import {
  emailMessageReceiveds,
  emailMessageReceived,
  createEmailMessageReceived,
  updateEmailMessageReceived,
  deleteEmailMessageReceived,
} from './emailMessageReceiveds'
import type { StandardScenario } from './emailMessageReceiveds.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('emailMessageReceiveds', () => {
  scenario(
    'returns all emailMessageReceiveds',
    async (scenario: StandardScenario) => {
      const result = await emailMessageReceiveds()

      expect(result.length).toEqual(
        Object.keys(scenario.emailMessageReceived).length
      )
    }
  )

  scenario(
    'returns a single emailMessageReceived',
    async (scenario: StandardScenario) => {
      const result = await emailMessageReceived({
        id: scenario.emailMessageReceived.one.id,
      })

      expect(result).toEqual(scenario.emailMessageReceived.one)
    }
  )

  scenario('creates a emailMessageReceived', async () => {
    const result = await createEmailMessageReceived({
      input: {
        messageId: 'String1519387',
        conversationId: 'String',
        extract: 'String',
        handleTime: 6632097,
        dateReceived: '2023-04-03T19:44:31.626Z',
      },
    })

    expect(result.messageId).toEqual('String1519387')
    expect(result.conversationId).toEqual('String')
    expect(result.extract).toEqual('String')
    expect(result.handleTime).toEqual(6632097)
    expect(result.dateReceived).toEqual(new Date('2023-04-03T19:44:31.626Z'))
  })

  scenario(
    'updates a emailMessageReceived',
    async (scenario: StandardScenario) => {
      const original = (await emailMessageReceived({
        id: scenario.emailMessageReceived.one.id,
      })) as EmailMessageReceived
      const result = await updateEmailMessageReceived({
        id: original.id,
        input: { messageId: 'String6608402' },
      })

      expect(result.messageId).toEqual('String6608402')
    }
  )

  scenario(
    'deletes a emailMessageReceived',
    async (scenario: StandardScenario) => {
      const original = (await deleteEmailMessageReceived({
        id: scenario.emailMessageReceived.one.id,
      })) as EmailMessageReceived
      const result = await emailMessageReceived({ id: original.id })

      expect(result).toEqual(null)
    }
  )
})
