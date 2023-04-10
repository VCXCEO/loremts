import type { Prisma, Customer } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.CustomerCreateArgs>({
  customer: {
    one: {
      data: { transactionId: 'String', updatedAt: '2023-04-03T19:37:00.242Z' },
    },
    two: {
      data: { transactionId: 'String', updatedAt: '2023-04-03T19:37:00.242Z' },
    },
  },
})

export type StandardScenario = ScenarioData<Customer, 'customer'>
