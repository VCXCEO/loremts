import { render } from '@redwoodjs/testing/web'

import ChatButton from './ChatButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ChatButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ChatButton />)
    }).not.toThrow()
  })
})
