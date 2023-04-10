import * as React from 'react'

import {
  Dashboard,
  Phone,
  Chat,
  EmojiPeople,
  Email,
  Fireplace,
  ExitToApp,
} from '@mui/icons-material'
import { Divider, Button, IconButton, Menu } from '@mui/material'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import { useLocation } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

type Anchor = 'left'

const menuItems = [
  { text: 'Dashboard', icon: <Dashboard />, route: '/dashboard' },
  { text: 'Calls', icon: <Phone />, route: '/dashboard/calls' },
  { text: 'Chats', icon: <Chat />, route: '/dashboard/chats' },
  { text: 'Customers', icon: <EmojiPeople />, route: '/dashboard/customers' },
  { text: 'Emails', icon: <Email />, route: '/dashboard/emails' },
  { text: 'Escalations', icon: <Fireplace />, route: '/dashboard/escalations' },
]

export default function TemporaryDrawer() {
  const { logOut } = useAuth()

  const location = useLocation()
  const [state, setState] = React.useState({
    left: false,
  })

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }

      setState({ ...state, [anchor]: open })
    }

  const list = (anchor: Anchor) => (
    <Box
      sx={{
        width: 250,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 64,
          backgroundColor: '#6087D3',
        }}
      >
        <img
          src="https://cdn.filestackcontent.com/aF7Da8I9Qp4fSfdoNyxn"
          alt="Logo"
          style={{ height: 50 }}
        />
      </Box>
      <Divider />
      <List
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
        }}
      >
        {menuItems.map(({ text, icon, route }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              component="a"
              href={route}
              selected={location.pathname === route}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ padding: 2 }}>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<ExitToApp />}
          onClick={logOut}
          fullWidth
        >
          Logout
        </Button>
      </Box>
    </Box>
  )

  return (
    <div>
      {(['left'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton onClick={toggleDrawer(anchor, true)}>
            <Menu />
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            ModalProps={{ BackdropProps: { invisible: true } }}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  )
}
