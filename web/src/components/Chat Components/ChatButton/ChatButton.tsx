import { useState, useEffect } from 'react'

import { useQuery } from '@apollo/client'
import { gql } from '@apollo/client'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'
import MarkChatUnreadOutlinedIcon from '@mui/icons-material/MarkChatUnreadOutlined'
import { IconButton } from '@mui/material'
import { motion } from 'framer-motion'
import Pusher from 'pusher-js'

import { navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

const GET_USER_TO_USER_CHATS = gql`
  query GetUserToUserChats {
    userToUserChats {
      id
      users {
        id
      }
      userToUserChatMessages {
        id
        isRead
        user {
          id
          company {
            id
          }
        }
      }
    }
  }
`

const CREATE_USER_TO_USER_CHAT = gql`
  mutation CreateUserToUserChat($input: CreateUserToUserChatInput!) {
    createUserToUserChat(input: $input) {
      id
    }
  }
`

const ChatButton = () => {
  const { currentUser } = useAuth()
  const { loading, data, error } = useQuery(GET_USER_TO_USER_CHATS)
  const [createUserToUserChat] = useMutation(CREATE_USER_TO_USER_CHAT)
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false)

  const checkUnreadMessages = (chats, currentUser) => {
    const isCurrentUserInCompany1 = currentUser.companyId === 1

    return chats.some((chat) =>
      chat.userToUserChatMessages.some((message) => {
        const isSenderInCompany1 = message?.user?.company?.id === 1
        const isSenderCurrentUser = message?.user?.id === currentUser.id

        // If currentUser is in company1, ignore messages sent by users of company1
        if (isCurrentUserInCompany1 && isSenderInCompany1) {
          return false
        }

        // If currentUser is not in company1 and is the sender, ignore their messages
        if (!isCurrentUserInCompany1 && isSenderCurrentUser) {
          return false
        }

        return !message.isRead
      })
    )
  }

  useEffect(() => {
    if (!loading && data) {
      setHasUnreadMessages(
        checkUnreadMessages(data?.userToUserChats, currentUser)
      )
    }
  }, [loading, data, currentUser])

  const initPusher = () => {
    const pusher = new Pusher(process.env.PUSHER_APP_KEY, {
      cluster: process.env.PUSHER_APP_CLUSTER,
    })

    const channel = pusher.subscribe('unread-messages')

    channel.bind('newMessage', (data) => {
      if (data.userId !== currentUser.id) {
        setHasUnreadMessages(true)
      }
    })

    // Add this event listener to handle the 'messages-marked-read' event
    channel.bind('messages-marked-read', (data) => {
      if (data.userId === currentUser.id) {
        setHasUnreadMessages(false)
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

  const handleClick = async () => {
    if (loading || error) return

    const existingChat = data?.userToUserChats?.find((chat) =>
      chat?.users?.some((user) => user?.id === currentUser?.id)
    )
    if (existingChat) {
      navigate(`/chat`)
    } else {
      try {
        const input = {
          companyId: currentUser.companyId,
          companyName: currentUser.companyName,
        }

        const { data } = await createUserToUserChat({ variables: { input } })

        navigate(`/chat`)
      } catch (error) {
        console.error('Error creating chat:', error)
      }
    }
  }

  const bounceAnimation = {
    initial: { y: 0 },
    animate: { y: [-10, 0, -10, 0] },
    transition: { duration: 0.4, times: [0, 0.25, 0.5, 1] },
  }

  return (
    <IconButton onClick={handleClick}>
      {hasUnreadMessages ? (
        <motion.div
          initial="initial"
          animate="animate"
          transition="transition"
          {...bounceAnimation}
        >
          <MarkChatUnreadOutlinedIcon />
        </motion.div>
      ) : (
        <ChatBubbleOutlineOutlinedIcon />
      )}
    </IconButton>
  )
}

export default ChatButton
