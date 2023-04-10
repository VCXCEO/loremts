import { render } from '@redwoodjs/testing/web'

import CustomerChatMessages from './CustomerChatMessages'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CustomerChatMessages', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CustomerChatMessages />)
    }).not.toThrow()
  })
})
