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
import { useQuery } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

import CustomerChatList from '../CustomerChatList/CustomerChatList'
import CustomerChatMessages from '../CustomerChatMessages/CustomerChatMessages'
import CustomerChatNote from '../CustomerChatNote/CustomerChatNote'
import CustomerInfo from '../CustomerInfo/CustomerInfo'

const GET_CHATS = gql`
  query GetChats {
    customerToUserChats {
      id
      customer {
        id
        firstName
        lastName
        email
        companies {
          id
          name
        }
      }
      company {
        id
        name
      }
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
      customerToUserChatMessages {
        id
        createdAt
      }
      createdAt
      updatedAt
    }
  }
`

const CustomerChats = () => {
  const { chatId: urlChatId } = useParams()

  const { currentUser } = useAuth()
  const { loading, error, data } = useQuery(GET_CHATS)

  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState('chatId')
  const [sortOrder, setSortOrder] = useState('asc')

  const [selectedChatData, setSelectedChatData] = useState({
    chatId: urlChatId ? parseInt(urlChatId) : null,
    customer: null,
    customerId: null,
    customerEmail: null,
    company: null,
    companyId: null,
    companyName: null,
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
    if (selectedChatData.chatId) {
      const cleanup = initPusher(selectedChatData.chatId)
      return cleanup
    }
  }, [selectedChatData.chatId])

  useEffect(() => {
    if (urlChatId && data) {
      const chat = data.customerToUserChats.find(
        (c) => c.id === parseInt(urlChatId)
      )
      const company = chat?.company

      // Get the last message date
      const lastMessageDate = getLastMessageDate(chat)

      setSelectedChatData({
        chatId: parseInt(urlChatId),
        userIds: chat?.users.map((user) => user.id),
        customer: chat?.customer,
        customerId: chat?.customer?.id,
        customerEmail: chat?.customer?.email,
        company,
        companyId: company?.id,
        companyName: company?.name,
        lastMessageDate,
      })
    }
  }, [data, urlChatId])

  const getLastMessageDate = (chat) => {
    if (!chat?.customerToUserChatMessages?.length) {
      return null
    }
    return chat?.customerToUserChatMessages.reduce((a, b) =>
      new Date(a.createdAt) > new Date(b.createdAt) ? a : b
    ).createdAt
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

  const handleChatClick = (chatId) => {
    const chat = data?.customerToUserChats?.find((c) => c?.id === chatId)
    const company = chat?.company

    // Get the last message date
    const lastMessageDate = getLastMessageDate(chat)

    setSelectedChatData({
      chatId,
      userIds: chat?.users.map((user) => user.id),
      customer: chat?.customer,
      customerId: chat?.customer?.id,
      customerEmail: chat?.customer?.email,
      company,
      companyId: company?.id,
      companyName: company?.name,
      lastMessageDate, // Add the last message date to the selectedChatData state
    })
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const searchValue = searchTerm.toLowerCase()

  const filteredChats = data?.customerToUserChats?.filter((chat) => {
    const isUserInCompany =
      currentUser.roles.includes('LoremAdmin') ||
      chat.company?.id === currentUser?.companyId

    const isMatchingSearch =
      chat?.id?.toString().includes(searchValue) ||
      chat?.customer?.email?.toLowerCase().includes(searchValue) || // Filter based on customer email
      chat?.createdAt?.toLowerCase().includes(searchValue) ||
      chat?.updatedAt?.toLowerCase().includes(searchValue) ||
      chat?.company?.name?.toLowerCase().includes(searchValue) ||
      chat?.company?.id?.toString().includes(searchValue)

    return isUserInCompany && isMatchingSearch
  })

  const sortedChats = filteredChats.sort((a, b) => {
    let comparison = 0

    switch (sortField) {
      case 'chatId':
        comparison = a.id - b.id
        break
      case 'customerId':
        comparison = a.customer.id - b.customer.id
        break
      case 'customerEmail':
        comparison = a.customer.email.localeCompare(b.customer.email)
        break
      case 'createdAt':
        comparison = new Date(a.createdAt) - new Date(b.createdAt)
        break
      case 'companyId':
        comparison = a.company.id - b.company.id
        break
      case 'companyName':
        comparison = a.company.name.localeCompare(b.company.name)
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

  return (
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
              <MenuItem value="customerId">Customer ID</MenuItem>
              <MenuItem value="customerEmail">Customer Email</MenuItem>
              <MenuItem value="companyId">Company ID</MenuItem>
              <MenuItem value="companyName">Company Name</MenuItem>
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
          <CustomerChatList chats={sortedChats} onChatClick={handleChatClick} />
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
            <CustomerChatMessages
              customerToUserChatId={selectedChatData.chatId}
            />
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
          {selectedChatData?.customer && (
            <CustomerInfo
              customer={selectedChatData?.customer}
              company={selectedChatData?.company}
              currentUser={currentUser}
            />
          )}
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
          {selectedChatData.chatId &&
            currentUser.roles?.includes('LoremAdmin') && (
              <CustomerChatNote
                customerToUserChatId={selectedChatData.chatId}
              />
            )}
        </Box>
      </Grid>
    </Grid>
  )
}

export default CustomerChats
