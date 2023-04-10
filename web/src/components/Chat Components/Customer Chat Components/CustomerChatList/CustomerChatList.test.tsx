import { render } from '@redwoodjs/testing/web'

import CustomerChatList from './CustomerChatList'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CustomerChatList', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CustomerChatList />)
    }).not.toThrow()
  })
})
