import { render } from '@redwoodjs/testing/web'

import CustomerChatPage from './CustomerChatPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('CustomerChatPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CustomerChatPage />)
    }).not.toThrow()
  })
})
