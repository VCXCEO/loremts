import { useEffect, useMemo, useRef, useState } from 'react'

import { Box, Typography, TextField, Button } from '@mui/material'
import { motion } from 'framer-motion'

import { useMutation, useQuery } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

const GET_USER_TO_USER_CHAT_NOTES = gql`
  query GetUserToUserChatNoteByChatId($userToUserChatId: Int!) {
    userToUserChatNoteByChatId(userToUserChatId: $userToUserChatId) {
      id
      note
      createdAt
      updatedAt
      userToUserChat {
        id
      }
    }
  }
`

const USER_TO_USER_CHAT_NOTE_MUTATION = gql`
  mutation UserToUserChatNoteMutation($input: CreateUserToUserChatNoteInput!) {
    createUserToUserChatNote(input: $input) {
      id
    }
  }
`

const ChatNote = ({ userToUserChatId }) => {
  const { loading, error, data } = useQuery(GET_USER_TO_USER_CHAT_NOTES, {
    variables: { userToUserChatId },
  })
  const refetchNotes = useQuery(GET_USER_TO_USER_CHAT_NOTES).refetch
  const [createNote, { loading: createLoading }] = useMutation(
    USER_TO_USER_CHAT_NOTE_MUTATION,
    {
      onCompleted: () => {
        setNote('')
      },
      update: (cache, { data: { createUserToUserChatNote } }) => {
        const existingNotes = cache.readQuery({
          query: GET_USER_TO_USER_CHAT_NOTES,
          variables: { userToUserChatId },
        })

        cache.writeQuery({
          query: GET_USER_TO_USER_CHAT_NOTES,
          variables: { userToUserChatId },
          data: {
            userToUserChatNoteByChatId: [
              ...existingNotes.userToUserChatNoteByChatId,
              createUserToUserChatNote,
            ],
          },
        })
      },
    }
  )

  const [note, setNote] = useState('')
  const { currentUser } = useAuth()

  const handleChange = (event) => {
    setNote(event.target.value)
  }

  const notesBoxRef = useRef(null)

  const filteredNotes = useMemo(() => {
    return data?.userToUserChatNoteByChatId
      .filter((note) => note?.userToUserChat?.id === userToUserChatId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
  }, [data, userToUserChatId])

  useEffect(() => {
    if (notesBoxRef.current) {
      notesBoxRef.current.scrollTop = notesBoxRef.current.scrollHeight
    }
  }, [filteredNotes])

  useEffect(() => {
    refetchNotes()
  }, [userToUserChatId]) // Add this useEffect to refetch notes when userToUserChatId changes

  const handleSubmit = async (event) => {
    event.preventDefault()
    await createNote({
      variables: {
        input: {
          note,
          userToUserChatId: userToUserChatId,
          userId: currentUser?.id,
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
        {filteredNotes.map((note) => {
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

export default ChatNote
