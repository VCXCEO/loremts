import { List, ListItem, ListItemText, Typography, Box } from '@mui/material'

const CustomerChatListItem = ({ chat, chatCustomer, company, onClick }) => {
  const lastMessageDate = chat?.customerToUserChatMessages?.length
    ? chat?.customerToUserChatMessages.reduce((a, b) =>
        new Date(a.createdAt) > new Date(b.createdAt) ? a : b
      ).createdAt
    : null

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
      <ListItemText
        primary={chatCustomer?.email}
        secondary={
          <>
            <Typography component="span" variant="body2" color="text.primary">
              Chat ID: {chat?.id} | Customer ID: {chatCustomer?.id}
            </Typography>
            <br />
            <Typography component="span" variant="body2" color="text.primary">
              Company Name: {company?.name}
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
    </ListItem>
  )
}

const CustomerChatList = ({ chats = [], onChatClick }) => (
  <Box>
    <List>
      {chats.map((chat) => {
        return (
          <CustomerChatListItem
            key={chat?.id}
            chat={chat}
            onClick={() => onChatClick(chat?.id)}
            chatCustomer={chat?.customer}
            company={chat?.company}
          />
        )
      })}
    </List>
  </Box>
)

export default CustomerChatList
