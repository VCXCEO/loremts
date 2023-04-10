import MagicBell, {
  FloatingNotificationInbox,
} from '@magicbell/magicbell-react'
import { Box } from '@mui/material'

import { useAuth } from 'src/auth'

const theme = {
  icon: { borderColor: '#FFFFFF', width: '24px' },
  banner: {
    fontSize: '14px',
    backgroundColor: '#F8F5FF',
    textColor: '#3A424D',
    backgroundOpacity: 1,
  },
  unseenBadge: { backgroundColor: '#F80808' },
  header: {
    fontSize: '15px',
    backgroundColor: '#FFFFFF',
    textColor: '#6087D3',
    borderRadius: '16px',
  },
  footer: {
    fontSize: '15px',
    backgroundColor: '#FFFFFF',
    textColor: '#6087D3',
    borderRadius: '16px',
  },
  notification: {
    default: {
      fontSize: '14px',
      textColor: '#000',
      borderRadius: '16px',
      backgroundColor: '#FFFFFF',
      hover: { backgroundColor: '#b0c8f1' },
      state: { color: 'transparent' },
      margin: '8px',
    },
    unseen: {
      textColor: '#000',
      backgroundColor: '#F8F5FF',
      hover: { backgroundColor: '#b0c8f1' },
      state: { color: '#6087D3' },
    },
    unread: {
      textColor: '#000',
      backgroundColor: '#F8F5FF',
      hover: { backgroundColor: '#b0c8f1' },
      state: { color: '#6087D3' },
    },
  },
}

const MagicBellComponent = () => {
  const { currentUser } = useAuth()
  return (
    <Box>
      <MagicBell
        apiKey="b5805857c220e2de45ed2206c87c39acc66e3467"
        userEmail={currentUser?.email}
        theme={theme}
      >
        {(props) => (
          <FloatingNotificationInbox width={400} height={500} {...props} />
        )}
      </MagicBell>
    </Box>
  )
}

export default MagicBellComponent
