import type { Email } from '@prisma/client'

import { emails, email, createEmail, updateEmail, deleteEmail } from './emails'
import type { StandardScenario } from './emails.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('emails', () => {
  scenario('returns all emails', async (scenario: StandardScenario) => {
    const result = await emails()

    expect(result.length).toEqual(Object.keys(scenario.email).length)
  })

  scenario('returns a single email', async (scenario: StandardScenario) => {
    const result = await email({ id: scenario.email.one.id })

    expect(result).toEqual(scenario.email.one)
  })

  scenario('creates a email', async (scenario: StandardScenario) => {
    const result = await createEmail({
      input: {
        conversationId: 'String808308',
        inbox: 'String',
        handleTime: 681100,
        dateReceived: '2023-04-03T19:42:47.066Z',
        subject: 'String',
        tags: 'String',
        updatedAt: '2023-04-03T19:42:47.066Z',
        customerId: scenario.email.two.customerId,
        customerEmail: scenario.email.two.customerEmail,
        companyId: scenario.email.two.companyId,
        companyName: scenario.email.two.companyName,
      },
    })

    expect(result.conversationId).toEqual('String808308')
    expect(result.inbox).toEqual('String')
    expect(result.handleTime).toEqual(681100)
    expect(result.dateReceived).toEqual(new Date('2023-04-03T19:42:47.066Z'))
    expect(result.subject).toEqual('String')
    expect(result.tags).toEqual('String')
    expect(result.updatedAt).toEqual(new Date('2023-04-03T19:42:47.066Z'))
    expect(result.customerId).toEqual(scenario.email.two.customerId)
    expect(result.customerEmail).toEqual(scenario.email.two.customerEmail)
    expect(result.companyId).toEqual(scenario.email.two.companyId)
    expect(result.companyName).toEqual(scenario.email.two.companyName)
  })

  scenario('updates a email', async (scenario: StandardScenario) => {
    const original = (await email({ id: scenario.email.one.id })) as Email
    const result = await updateEmail({
      id: original.id,
      input: { conversationId: 'String62962312' },
    })

    expect(result.conversationId).toEqual('String62962312')
  })

  scenario('deletes a email', async (scenario: StandardScenario) => {
    const original = (await deleteEmail({ id: scenario.email.one.id })) as Email
    const result = await email({ id: original.id })

    expect(result).toEqual(null)
  })
})
