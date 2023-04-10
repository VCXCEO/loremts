import type { Call } from '@prisma/client'

import { calls, call, createCall, updateCall, deleteCall } from './calls'
import type { StandardScenario } from './calls.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('calls', () => {
  scenario('returns all calls', async (scenario: StandardScenario) => {
    const result = await calls()

    expect(result.length).toEqual(Object.keys(scenario.call).length)
  })

  scenario('returns a single call', async (scenario: StandardScenario) => {
    const result = await call({ id: scenario.call.one.id })

    expect(result).toEqual(scenario.call.one)
  })

  scenario('creates a call', async (scenario: StandardScenario) => {
    const result = await createCall({
      input: {
        callDirection: 'String',
        callDuration: 7057589,
        record: 'String',
        dateReceived: '2023-04-03T19:37:36.634Z',
        tags: 'String',
        updatedAt: '2023-04-03T19:37:36.634Z',
        customerId: scenario.call.two.customerId,
        customerPhone: scenario.call.two.customerPhone,
        companyId: scenario.call.two.companyId,
        companyName: scenario.call.two.companyName,
      },
    })

    expect(result.callDirection).toEqual('String')
    expect(result.callDuration).toEqual(7057589)
    expect(result.record).toEqual('String')
    expect(result.dateReceived).toEqual(new Date('2023-04-03T19:37:36.634Z'))
    expect(result.tags).toEqual('String')
    expect(result.updatedAt).toEqual(new Date('2023-04-03T19:37:36.634Z'))
    expect(result.customerId).toEqual(scenario.call.two.customerId)
    expect(result.customerPhone).toEqual(scenario.call.two.customerPhone)
    expect(result.companyId).toEqual(scenario.call.two.companyId)
    expect(result.companyName).toEqual(scenario.call.two.companyName)
  })

  scenario('updates a call', async (scenario: StandardScenario) => {
    const original = (await call({ id: scenario.call.one.id })) as Call
    const result = await updateCall({
      id: original.id,
      input: { callDirection: 'String2' },
    })

    expect(result.callDirection).toEqual('String2')
  })

  scenario('deletes a call', async (scenario: StandardScenario) => {
    const original = (await deleteCall({ id: scenario.call.one.id })) as Call
    const result = await call({ id: original.id })

    expect(result).toEqual(null)
  })
})
