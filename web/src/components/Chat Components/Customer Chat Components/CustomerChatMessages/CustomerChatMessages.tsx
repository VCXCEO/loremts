import { useEffect, useMemo, useRef, useState } from 'react'

import { Box, Typography, TextField, Button } from '@mui/material'
import { motion } from 'framer-motion'
import Pusher from 'pusher-js'

import { Link, routes } from '@redwoodjs/router'
import { useMutation, useQuery } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

const GET_CHAT_MESSAGES = gql`
  query GetChatMessages {
    customerToUserChatMessages {
      id
      customerToUserChat {
        id
        customer {
          id
          firstName
          email
        }
      }
      user {
        id
        firstName
        company {
          id
        }
      }
      messageText
      createdAt
    }
  }
`
const CREATE_CHAT_MESSAGE = gql`
  mutation CreateChatMessage($input: CreateCustomerToUserChatMessageInput!) {
    createCustomerToUserChatMessage(input: $input) {
      id
    }
  }
`

const CustomerChatMessages = ({ customerToUserChatId }) => {
  const { currentUser } = useAuth()
  const userId = currentUser ? currentUser.id : null
  const lastMessageRef = useRef(null)
  const { loading, error, data } = useQuery(GET_CHAT_MESSAGES)
  const refetchMessages = useQuery(GET_CHAT_MESSAGES).refetch
  const [createMessage, { loading: createLoading }] = useMutation(
    CREATE_CHAT_MESSAGE,
    {
      onCompleted: () => {
        refetchMessages()
      },
    }
  )

  const [messageText, setMessageText] = useState('')

  const pusher = useMemo(() => {
    const pusherInstance = new Pusher(process.env.PUSHER_APP_KEY, {
      cluster: process.env.PUSHER_APP_CLUSTER,
    })

    return pusherInstance
  }, [])

  useEffect(() => {
    if (!pusher) return

    const channel = pusher.subscribe(`chat-${customerToUserChatId}`)

    channel.bind('newMessage', () => {
      refetchMessages()
    })

    return () => {
      channel.unbind('newMessage')
      pusher.unsubscribe(`chat-${customerToUserChatId}`)
    }
  }, [pusher, refetchMessages, customerToUserChatId])

  const handleChange = (event) => {
    setMessageText(event.target.value)
  }

  const messagesBoxRef = useRef(null)

  const filteredMessages = useMemo(() => {
    console.log('customerToUserChatId:', customerToUserChatId)

    return data?.customerToUserChatMessages
      .filter((message) => {
        console.log(
          'message.customerToUserChat.id:',
          message.customerToUserChat.id
        )
        return message.customerToUserChat.id === parseInt(customerToUserChatId)
      })
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
  }, [data, customerToUserChatId])

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [customerToUserChatId, filteredMessages?.length])

  useEffect(() => {
    refetchMessages()
  }, [customerToUserChatId])

  console.log('Data:', data)
  console.log('Filtered Messages:', filteredMessages)

  const handleSubmit = async (event) => {
    event.preventDefault()
    await createMessage({
      variables: {
        input: {
          messageText,
          customerToUserChatId: parseInt(customerToUserChatId), // Convert to integer
          userId, // Use the modified userId variable
          isRead: false, // Add the missing isRead field
        },
      },
    })
    setMessageText('')
  }

  if (loading) return <p>Loading messages...</p>
  if (error) return <p>Error loading messages :(</p>

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
        paddingTop: 0,
      }}
    >
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: 1,
          backgroundColor: 'background.paper',
        }}
      >
        <Typography variant="h6">
          <Link to={routes.customerToUserChat({ id: customerToUserChatId })}>
            Chat Reference ID: {customerToUserChatId}
          </Link>
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          gap: 2,
          flexGrow: 1,
          padding: 2,
        }}
        ref={messagesBoxRef}
      >
        {filteredMessages.map((message, index) => {
          const isCurrentUser = message?.user?.id === currentUser?.id
          const isMessageFromUser = message?.user !== null
          const isMessageFromCustomer = message?.user === null
          const alignRight =
            (currentUser && isMessageFromUser) ||
            (!currentUser && isMessageFromCustomer)
          const createdAtDate = new Date(message.createdAt).toLocaleString()
          const senderName = currentUser
            ? isCurrentUser
              ? 'You'
              : message.user
              ? message.user.firstName
              : message.customerToUserChat.customer.firstName
            : isMessageFromUser
            ? 'Agent'
            : 'You'

          return (
            <Box
              key={message.id}
              ref={
                index === filteredMessages.length - 1 ? lastMessageRef : null
              }
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
              }}
            >
              <Box
                sx={{
                  alignSelf: alignRight ? 'flex-end' : 'flex-start',
                  width: '50%',
                }}
              >
                <motion.div
                  initial={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                  sx={{
                    maxWidth: '70%',
                    minWidth: '30%',
                    borderRadius: 2,
                    padding: 1,
                    overflow: 'hidden',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.nextSibling.style.opacity = 1
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.nextSibling.style.opacity = 0
                  }}
                >
                  <Box
                    sx={{
                      py: 1,
                      px: 2,
                      borderRadius: 2,
                      bgcolor: alignRight ? 'primary.main' : 'grey.300',
                      maxWidth: '100%',
                      wordBreak: 'break-word',
                    }}
                  >
                    <Typography
                      variant="body1"
                      color={alignRight ? 'white' : 'black'}
                    >
                      {message.messageText}
                    </Typography>
                  </Box>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  sx={{
                    alignSelf: alignRight ? 'flex-end' : 'flex-start',
                  }}
                >
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    {senderName} | {createdAtDate}
                  </Typography>
                </motion.div>
              </Box>
            </Box>
          )
        })}
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          position: 'sticky',
          bottom: 0,
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          padding: 1,
          backgroundColor: 'background.paper',
        }}
      >
        <TextField
          label="Message"
          value={messageText}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={createLoading}
        >
          Send
        </Button>
      </Box>
    </Box>
  )
}

export default CustomerChatMessages
