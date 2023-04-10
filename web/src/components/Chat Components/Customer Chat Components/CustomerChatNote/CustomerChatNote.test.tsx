import { render } from '@redwoodjs/testing/web'

import CustomerChatNote from './CustomerChatNote'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CustomerChatNote', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CustomerChatNote />)
    }).not.toThrow()
  })
})
