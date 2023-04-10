import { mockHttpEvent } from '@redwoodjs/testing/api'

import { handler } from './initializeCustomerChat'

const createEvent = (body) => {
  return mockHttpEvent({
    httpMethod: 'POST',
    path: '/.redwood/functions/externalChatRequest',
    body: JSON.stringify(body),
  })
}

const createExpectedResponse = (statusCode, body) => ({
  statusCode,
  body: JSON.stringify(body),
})

describe('externalChatRequest function', () => {
  it('returns a 400 status code when the request body is invalid', async () => {
    const event = createEvent('invalid json string')
    const expectedResponse = createExpectedResponse(400, {
      message: 'Invalid request body',
    })

    const response = await handler(event, {})

    expect(response).toEqual(expectedResponse)
  })

  // Add other test cases here
})
