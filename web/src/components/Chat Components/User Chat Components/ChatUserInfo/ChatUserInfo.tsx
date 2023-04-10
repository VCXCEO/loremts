import { Typography, Box, Paper } from '@mui/material'

const ChatUserInfo = ({ user }) => {
  return (
    <Paper elevation={2} style={{ minHeight: '100%' }}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        minHeight="100%"
      >
        <Box>
          <Typography variant="h6">User Information</Typography>
          <Box>
            <Typography variant="subtitle1">User ID: {user?.id}</Typography>
            <Typography variant="subtitle1">
              Name: {user?.firstName + user?.lastName}
            </Typography>
            <Typography variant="subtitle1">Email: {user?.email}</Typography>
            <Typography variant="subtitle1">
              Company ID: {user?.company.id} | Company Name:
              {user?.company.name}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  )
}

export default ChatUserInfo
