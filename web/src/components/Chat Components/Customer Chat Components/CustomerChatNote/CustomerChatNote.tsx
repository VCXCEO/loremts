import { useEffect, useMemo, useRef, useState } from 'react'

import { Box, Typography, TextField, Button } from '@mui/material'
import { motion } from 'framer-motion'

import { useMutation, useQuery } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

const GET_CUSTOMER_TO_USER_CHAT_NOTES = gql`
  query GetCustomerToUserChatNoteByChatId($customerToUserChatId: Int!) {
    customerToUserChat(id: $customerToUserChatId) {
      customer {
        id
        email
      }
      chatNotes: customerToUserChatNotes {
        id
        note
        createdAt
        updatedAt
      }
    }
  }
`

const CUSTOMER_TO_USER_CHAT_NOTE_MUTATION = gql`
  mutation CustomerToUserChatNoteMutation(
    $input: CreateCustomerToUserChatNoteInput!
  ) {
    createCustomerToUserChatNote(input: $input) {
      id
    }
  }
`

const CustomerChatNote = ({ customerToUserChatId }) => {
  const { currentUser } = useAuth()

  console.log('customerToUserChatId', customerToUserChatId)
  const { loading, error, data } = useQuery(GET_CUSTOMER_TO_USER_CHAT_NOTES, {
    variables: { customerToUserChatId },
  })
  const refetchNotes = useQuery(GET_CUSTOMER_TO_USER_CHAT_NOTES).refetch
  const [createNote, { loading: createLoading }] = useMutation(
    CUSTOMER_TO_USER_CHAT_NOTE_MUTATION,
    {
      onCompleted: () => {
        setNote('')
      },
      update: (cache, { data: { createCustomerToUserChatNote } }) => {
        const existingNotes = cache.readQuery({
          query: GET_CUSTOMER_TO_USER_CHAT_NOTES,
          variables: { customerToUserChatId },
        })

        cache.writeQuery({
          query: GET_CUSTOMER_TO_USER_CHAT_NOTES,
          variables: { customerToUserChatId },
          data: {
            customerToUserChat: {
              ...existingNotes.customerToUserChat,
              chatNotes: [
                ...existingNotes.customerToUserChat.chatNotes,
                createCustomerToUserChatNote,
              ],
            },
          },
        })
      },
    }
  )

  const [note, setNote] = useState('')
  const customerId = data?.customerToUserChat?.customer?.id || null
  const customerEmail = data?.customerToUserChat?.customer?.email || null

  const handleChange = (event) => {
    setNote(event.target.value)
  }

  const notesBoxRef = useRef(null)
  const filteredNotes = useMemo(() => {
    return (
      data?.customerToUserChat?.chatNotes
        // Create a new array before sorting it
        .slice()
        .sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
    )
  }, [data, customerToUserChatId])

  useEffect(() => {
    if (notesBoxRef.current) {
      notesBoxRef.current.scrollTop = notesBoxRef.current.scrollHeight
    }
  }, [filteredNotes])

  useEffect(() => {
    refetchNotes()
  }, [customerToUserChatId]) // Add this useEffect to refetch notes when userToUserChatId changes

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(customerEmail)
    if (!customerEmail) return
    await createNote({
      variables: {
        input: {
          note,
          userId: currentUser?.id,
          customerId: customerId,
          customerEmail: customerEmail,
          customerToUserChatId: customerToUserChatId,
        },
      },
    })
    setNote('')
  }

  if (loading) return <p>Loading notes...</p>
  if (error) return <p>Error loading notes :(</p>

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
        <Typography variant="h6">Chat Notes</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          gap: 2,
          flexGrow: 1,
          padding: 2,
        }}
        ref={notesBoxRef}
      >
        {filteredNotes?.map((note) => {
          const createdAtDate = new Date(note.createdAt).toLocaleString()
          return (
            <Box
              key={note.id}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
              }}
            >
              <Box
                sx={{
                  alignSelf: 'flex-start',
                  width: '100%',
                }}
              >
                <motion.div
                  initial={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                  sx={{
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
                      bgcolor: 'grey.300',
                      maxWidth: '100%',
                      wordBreak: 'break-word',
                    }}
                  >
                    <Typography variant="body1" color="black">
                      {note.note}
                    </Typography>
                  </Box>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  sx={{
                    alignSelf: 'flex-start',
                  }}
                >
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    {createdAtDate}
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
          label="Note"
          value={note}
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
          Add Note
        </Button>
      </Box>
    </Box>
  )
}

export default CustomerChatNote
