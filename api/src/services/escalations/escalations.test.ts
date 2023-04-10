import type { Escalation } from '@prisma/client'

import {
  escalations,
  escalation,
  createEscalation,
  updateEscalation,
  deleteEscalation,
} from './escalations'
import type { StandardScenario } from './escalations.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('escalations', () => {
  scenario('returns all escalations', async (scenario: StandardScenario) => {
    const result = await escalations()

    expect(result.length).toEqual(Object.keys(scenario.escalation).length)
  })

  scenario(
    'returns a single escalation',
    async (scenario: StandardScenario) => {
      const result = await escalation({ id: scenario.escalation.one.id })

      expect(result).toEqual(scenario.escalation.one)
    }
  )

  scenario('creates a escalation', async (scenario: StandardScenario) => {
    const result = await createEscalation({
      input: {
        type: 'String',
        record: 'String',
        reason: 'String',
        updatedAt: '2023-04-03T20:12:10.114Z',
        companyId: scenario.escalation.two.companyId,
        companyName: scenario.escalation.two.companyName,
      },
    })

    expect(result.type).toEqual('String')
    expect(result.record).toEqual('String')
    expect(result.reason).toEqual('String')
    expect(result.updatedAt).toEqual(new Date('2023-04-03T20:12:10.114Z'))
    expect(result.companyId).toEqual(scenario.escalation.two.companyId)
    expect(result.companyName).toEqual(scenario.escalation.two.companyName)
  })

  scenario('updates a escalation', async (scenario: StandardScenario) => {
    const original = (await escalation({
      id: scenario.escalation.one.id,
    })) as Escalation
    const result = await updateEscalation({
      id: original.id,
      input: { type: 'String2' },
    })

    expect(result.type).toEqual('String2')
  })

  scenario('deletes a escalation', async (scenario: StandardScenario) => {
    const original = (await deleteEscalation({
      id: scenario.escalation.one.id,
    })) as Escalation
    const result = await escalation({ id: original.id })

    expect(result).toEqual(null)
  })
})
