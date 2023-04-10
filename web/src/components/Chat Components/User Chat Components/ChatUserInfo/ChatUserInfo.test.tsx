import { render } from '@redwoodjs/testing/web'

import ChatUserInfo from './ChatUserInfo'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ChatUserInfo', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ChatUserInfo />)
    }).not.toThrow()
  })
})
