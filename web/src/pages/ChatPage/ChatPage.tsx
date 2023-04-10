import { useState } from 'react'

import { Box, Typography } from '@mui/material'

import { useParams, navigate, routes } from '@redwoodjs/router'

import CustomerChats from 'src/components/Chat Components/Customer Chat Components/CustomerChats/CustomerChats'
import UserChats from 'src/components/Chat Components/User Chat Components/UserChats/UserChats'
import Header from 'src/components/Header/Header'

const ChatPage = () => {
  const { chatId } = useParams()
  const userChatRoute = routes.userChat()
  const customerChatRoute = routes.internalCustomerChat()

  const chatType =
    window.location.pathname === userChatRoute
      ? 'user'
      : window.location.pathname === customerChatRoute
      ? 'customer'
      : 'user'

  const [activeComponent, setActiveComponent] = useState(chatType)

  const handleTextClick = (component) => {
    setActiveComponent(component)
    if (component === 'user') {
      navigate(userChatRoute)
    } else {
      navigate(customerChatRoute)
    }
  }

  return (
    <>
      <Header />
      <Box marginTop="75px">
        <Typography
          variant="h6"
          sx={{
            textAlign: 'center',
          }}
        >
          Chats
        </Typography>
        <Typography
          variant="h6"
          component="span"
          sx={{
            cursor: 'pointer',
            color: activeComponent === 'user' ? 'blue' : 'inherit',
            marginRight: '2px',
          }}
          onClick={() => handleTextClick('user')}
        >
          User
        </Typography>
        <Typography variant="h6" component="span">
          /
        </Typography>
        <Typography
          variant="h6"
          component="span"
          sx={{
            cursor: 'pointer',
            color: activeComponent === 'customer' ? 'blue' : 'inherit',
            marginLeft: '2px',
          }}
          onClick={() => handleTextClick('customer')}
        >
          Customer
        </Typography>
      </Box>
      {activeComponent === 'user' ? (
        <UserChats chatId={chatId} />
      ) : (
        <CustomerChats chatId={chatId} />
      )}
    </>
  )
}

export default ChatPage
