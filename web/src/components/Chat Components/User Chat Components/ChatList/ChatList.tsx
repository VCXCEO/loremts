import React, { useState, useEffect } from 'react'

import { List, ListItem, ListItemText, Typography, Box } from '@mui/material'
import Pusher from 'pusher-js'

const ChatListItem = ({ chat, chatUser, onClick, hasUnreadMessages }) => {
  const lastMessageDate = chat?.userToUserChatMessages?.length
    ? chat?.userToUserChatMessages.reduce((a, b) =>
        new Date(a.createdAt) > new Date(b.createdAt) ? a : b
      ).createdAt
    : null
  console.log(hasUnreadMessages)
  return (
    <ListItem
      button
      onClick={onClick}
      sx={{
        borderRadius: 1,
        marginBottom: 1,
        border: '1px solid',
        borderColor: 'divider',
        padding: 1,
        '&:hover': {
          backgroundColor: 'action.hover',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <ListItemText
          primary={chatUser?.email}
          secondary={
            <>
              <Typography component="span" variant="body2" color="text.primary">
                Chat ID: {chat?.id} | User ID: {chatUser?.id}
              </Typography>
              <br />
              <Typography component="span" variant="body2" color="text.primary">
                Created At: {new Date(chat?.createdAt).toLocaleString()}
              </Typography>
              <br />
              <Typography component="span" variant="body2" color="text.primary">
                Last Message:{' '}
                {lastMessageDate
                  ? new Date(lastMessageDate).toLocaleString()
                  : 'N/A'}
              </Typography>
            </>
          }
        />
        {hasUnreadMessages && (
          <Box
            sx={{
              marginLeft: 2,
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: 'error.main',
            }}
          />
        )}
      </Box>
    </ListItem>
  )
}

const ChatList = ({ chats = [], onChatClick, currentUser }) => {
  const [unreadChats, setUnreadChats] = useState(new Set())

  const initPusher = () => {
    const pusher = new Pusher(process.env.PUSHER_APP_KEY, {
      cluster: process.env.PUSHER_APP_CLUSTER,
    })

    const channel = pusher.subscribe('unread-messages')

    channel.bind('newMessage', (data) => {
      if (data.userId !== currentUser.id) {
        setUnreadChats((prevUnreadChats) => {
          const updatedUnreadChats = new Set(prevUnreadChats)
          updatedUnreadChats.add(data.userToUserChatId)
          return updatedUnreadChats
        })
      }
    })

    channel.bind('messages-marked-read', (data) => {
      if (data.userId === currentUser.id) {
        setUnreadChats((prevUnreadChats) => {
          const updatedUnreadChats = new Set(prevUnreadChats)
          updatedUnreadChats.delete(data.userToUserChatId)
          return updatedUnreadChats
        })
      }
    })

    return () => {
      channel.unbind_all()
      pusher.unsubscribe('unread-messages')
    }
  }

  useEffect(() => {
    const cleanup = initPusher()
    return cleanup
  }, [])

  return (
    <Box>
      <List>
        {chats.map((chat) => {
          const chatUser = chat?.users?.find((user) => user?.company?.id !== 1)
          const hasUnreadMessages = unreadChats.has(chat?.id)
          return (
            <ChatListItem
              key={chat?.id}
              chat={chat}
              chatUser={chatUser}
              onClick={() => onChatClick(chat?.id)}
              hasUnreadMessages={hasUnreadMessages}
            />
          )
        })}
      </List>
    </Box>
  )
}

export default ChatList
