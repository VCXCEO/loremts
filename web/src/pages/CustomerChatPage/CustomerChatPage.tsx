import { useEffect, useState } from 'react'

import { Box, Grid } from '@mui/material'
import Pusher from 'pusher-js'

import { useParams } from '@redwoodjs/router'
import { useQuery } from '@redwoodjs/web'

import CustomerChatMessages from 'src/components/Chat Components/Customer Chat Components/CustomerChatMessages/CustomerChatMessages'

const GET_CHAT_DATA = gql`
  query GetChats {
    customerToUserChats {
      id
      customerToUserChatMessages {
        id
        createdAt
      }
      customer {
        id
        firstName
        lastName
        email
      }
    }
  }
`

const CustomerChatPage = () => {
  const { chatId, chatToken } = useParams()
  const { loading, error, data } = useQuery(GET_CHAT_DATA, {
    variables: { chatId, chatToken },
  })

  const initPusher = (chatId) => {
    const pusher = new Pusher(process.env.PUSHER_APP_KEY, {
      cluster: process.env.PUSHER_APP_CLUSTER,
    })

    const channel = pusher.subscribe(`chat-${chatId}`)

    channel.bind('newMessage', () => {
      // You can fetch new messages here or update your component state
    })

    return () => {
      channel.unbind_all()
      pusher.unsubscribe(`chat-${chatId}`)
    }
  }

  useEffect(() => {
    if (chatId) {
      const cleanup = initPusher(chatId)
      return cleanup
    }
  }, [chatId])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const exitChat = () => {
    if (currentUser) {
      logOut()
    }
    setChatExited(true)
  }

  return (
    <Grid
      container
      spacing={2}
      alignItems="flex-start"
      justifyContent="space-between"
    >
      <Grid
        item
        xs={12}
        paddingLeft={10}
        paddingRight={10}
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          flexGrow={1}
          sx={{
            height: '88vh',
            overflow: 'auto',
            '&::-webkit-scrollbar': { width: 0, background: 'transparent' },
            scrollbarWidth: 'none',
          }}
        >
          {chatId && <CustomerChatMessages customerToUserChatId={chatId} />}
        </Box>
      </Grid>
    </Grid>
  )
}

export default CustomerChatPage
