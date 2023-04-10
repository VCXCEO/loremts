import { useEffect, useState } from 'react'

import {
  Box,
  FormControl,
  InputLabel,
  TextField,
  Grid,
  MenuItem,
  Select,
} from '@mui/material'
import Pusher from 'pusher-js'

import { useParams } from '@redwoodjs/router'
import { useMutation, useQuery } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

import ChatList from '../ChatList/ChatList'
import ChatMessages from '../ChatMessages/ChatMessages'
import ChatNote from '../ChatNote/ChatNote'
import ChatUserInfo from '../ChatUserInfo/ChatUserInfo'

const GET_CHATS = gql`
  query GetChats {
    userToUserChats {
      id
      users {
        id
        email
        firstName
        lastName
        company {
          id
          name
        }
      }
      userToUserChatMessages {
        id
        createdAt
      }
      createdAt
      updatedAt
    }
  }
`
const MARK_MESSAGES_AS_READ = gql`
  mutation MarkMessagesAsRead($userToUserChatId: Int!) {
    markMessagesAsRead(userToUserChatId: $userToUserChatId)
  }
`

const UserChats = () => {
  const { chatId: urlChatId } = useParams()

  const { currentUser } = useAuth()
  const { loading, error, data } = useQuery(GET_CHATS)
  const [markMessagesAsRead] = useMutation(MARK_MESSAGES_AS_READ)

  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState('chatId')
  const [sortOrder, setSortOrder] = useState('asc')

  const [selectedChatData, setSelectedChatData] = useState({
    chatId: urlChatId ? parseInt(urlChatId) : null,
    userId: null,
  })

  const initPusher = (chatId) => {
    const pusher = new Pusher(process.env.PUSHER_APP_KEY, {
      cluster: process.env.PUSHER_APP_CLUSTER,
    })

    const channel = pusher.subscribe(`chat-${chatId}`)

    channel.bind('newMessage', () => {
      // You can fetch new messages here or update your component state
    })

    channel.bind('messages-marked-read', () => {
      // You can update the component state or refresh the chat messages here
    })

    return () => {
      channel.unbind_all()
      pusher.unsubscribe(`chat-${chatId}`)
    }
  }

  useEffect(() => {
    if (selectedChatData.chatId) {
      const cleanup = initPusher(selectedChatData.chatId)
      return cleanup
    }
  }, [selectedChatData.chatId])

  useEffect(() => {
    if (urlChatId && data) {
      const chat = data.userToUserChats.find(
        (c) => c.id === parseInt(urlChatId)
      )
      const chatUser = findNonCompany1User(chat)
      setSelectedChatData((prev) => ({ ...prev, userId: chatUser?.id }))
    }
  }, [data, urlChatId])

  const getLastMessageDate = (chat) => {
    if (!chat?.userToUserChatMessages?.length) {
      return null
    }
    return chat?.userToUserChatMessages.reduce((a, b) =>
      new Date(a.createdAt) > new Date(b.createdAt) ? a : b
    ).createdAt
  }

  const findNonCompany1User = (chat) => {
    return chat?.users?.find((user) => user?.company?.id !== 1)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }
  const handleSortChange = (event) => {
    setSortField(event.target.value)
  }
  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value)
  }

  const markMessagesAsReadForCurrentUser = async (chatId) => {
    if (chatId) {
      await markMessagesAsRead({
        variables: {
          userToUserChatId: chatId,
        },
      })
    }
  }

  const handleChatClick = async (chatId) => {
    const chat = data?.userToUserChats?.find((c) => c?.id === chatId)
    const chatUser = findNonCompany1User(chat)
    setSelectedChatData({ chatId, userId: chatUser?.id })

    // Update the URL
    window.history.pushState({}, '', `/chat/user/${chatId}`)

    await markMessagesAsRead({
      variables: {
        userToUserChatId: chatId,
      },
    })
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const searchValue = searchTerm.toLowerCase()

  const filteredChats = data?.userToUserChats?.filter((chat) => {
    const chatUser = chat?.users?.find((user) => user?.company?.id !== 1)
    return (
      chat?.id?.toString().includes(searchValue) ||
      chatUser?.id?.toString().includes(searchValue) ||
      chatUser?.email?.toLowerCase().includes(searchValue) ||
      chat?.createdAt?.toLowerCase().includes(searchValue) ||
      chat?.updatedAt?.toLowerCase().includes(searchValue)
    )
  })

  const sortedChats = filteredChats.sort((a, b) => {
    const chatUserA = a.users.find((user) => user && user.companyId !== 1)
    const chatUserB = b.users.find((user) => user && user.companyId !== 1)

    let comparison = 0

    switch (sortField) {
      case 'chatId':
        comparison = a.id - b.id
        break
      case 'userId':
        if (!chatUserA) comparison = 1
        else if (!chatUserB) comparison = -1
        else comparison = chatUserA.id - chatUserB.id
        break
      case 'userEmail':
        if (!chatUserA) comparison = 1
        else if (!chatUserB) comparison = -1
        else comparison = chatUserA.email.localeCompare(chatUserB.email)
        break
      case 'createdAt':
        comparison = new Date(a.createdAt) - new Date(b.createdAt)
        break
      case 'lastMessage':
        const lastMessageDateA = getLastMessageDate(a)
        const lastMessageDateB = getLastMessageDate(b)
        if (lastMessageDateA === null) comparison = 1
        else if (lastMessageDateB === null) comparison = -1
        else
          comparison = new Date(lastMessageDateA) - new Date(lastMessageDateB)
        break
      default:
        comparison = 0
    }

    return sortOrder === 'asc' ? comparison : -comparison
  })

  const renderCurrentUserChatMessages = () => {
    const currentUserChat = data.userToUserChats.find((chat) =>
      chat.users.find((user) => user.id === currentUser.id)
    )

    if (currentUserChat) {
      markMessagesAsReadForCurrentUser(currentUserChat.id)
      return <ChatMessages userToUserChatId={currentUserChat.id} />
    }

    return null
  }

  return (
    <>
      {currentUser?.roles?.includes('LoremAdmin') ? (
        <Grid
          container
          spacing={2}
          alignItems="flex-start"
          justifyContent="space-between"
        >
          <Grid item xs={12} md={3} paddingLeft={10} paddingRight={10}>
            <Box>
              <TextField
                label="Search"
                value={searchTerm}
                onChange={handleSearchChange}
                fullWidth
                margin="normal"
              />
            </Box>
            <Box>
              <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortField}
                  onChange={handleSortChange}
                  label="Sort By"
                >
                  <MenuItem value="chatId">Chat ID</MenuItem>
                  <MenuItem value="userId">User ID</MenuItem>
                  <MenuItem value="userEmail">User Email</MenuItem>
                  <MenuItem value="createdAt">Created At</MenuItem>
                  <MenuItem value="lastMessage">Last Message</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box>
              <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel>Sort Order</InputLabel>
                <Select
                  value={sortOrder}
                  onChange={handleSortOrderChange}
                  label="Sort Order"
                >
                  <MenuItem value="asc">Ascending</MenuItem>
                  <MenuItem value="desc">Descending</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box
              flexGrow={1}
              sx={{
                height: '70vh',
                overflow: 'auto',
                '&::-webkit-scrollbar': { width: 0, background: 'transparent' },
                scrollbarWidth: 'none',
              }}
            >
              <ChatList
                chats={sortedChats}
                onChatClick={handleChatClick}
                currentUser={currentUser}
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
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
              {selectedChatData.chatId && (
                <ChatMessages userToUserChatId={selectedChatData.chatId} />
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={3} paddingLeft={10} paddingRight={10}>
            <Box
              flexGrow={1}
              sx={{
                height: '15vh',
                overflow: 'auto',
                '&::-webkit-scrollbar': { width: 0, background: 'transparent' },
                scrollbarWidth: 'none',
              }}
            >
              <ChatUserInfo
                user={data?.userToUserChats
                  ?.flatMap((chat) => chat?.users)
                  ?.find((user) => {
                    const chat = data.userToUserChats.find((c) =>
                      c.users.includes(user)
                    )
                    return (
                      user?.id === selectedChatData.userId &&
                      findNonCompany1User(chat)?.id === user.id
                    )
                  })}
              />
            </Box>

            <Box
              flexGrow={1}
              sx={{
                height: '73vh',
                overflow: 'auto',
                '&::-webkit-scrollbar': { width: 0, background: 'transparent' },
                scrollbarWidth: 'none',
              }}
            >
              {selectedChatData.chatId && (
                <ChatNote userToUserChatId={selectedChatData.chatId} />
              )}
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          spacing={2}
          alignItems="flex-start"
          justifyContent="space-between"
          marginTop={9}
        >
          <Grid
            item
            xs={12}
            md={9}
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
                height: '80vh',
                overflow: 'auto',
                width: '100%',
                '&::-webkit-scrollbar': {
                  width: 0,
                  background: 'transparent',
                },
                scrollbarWidth: 'none',
              }}
            >
              {renderCurrentUserChatMessages()}
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default UserChats
