import { Typography, Box, Paper } from '@mui/material'

const CustomerInfo = ({ company, customer, currentUser }) => {
  return (
    <Paper elevation={2} style={{ minHeight: '100%' }}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        minHeight="100%"
      >
        <Box>
          <Typography variant="h6">Customer Information</Typography>
          <Box>
            <Typography variant="subtitle1">
              Customer ID: {customer?.id}
            </Typography>
            <Typography variant="subtitle1">
              Name: {customer?.firstName + customer?.lastName}
            </Typography>
            <Typography variant="subtitle1">
              Email: {customer?.email}
            </Typography>
            {currentUser.roles?.includes('LoremAdmin') && (
              <Typography variant="subtitle1">
                Company ID: {company?.id} | Company Name:
                {company?.name}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Paper>
  )
}

export default CustomerInfo
