import React, { useState } from 'react'

import {
  AppBar,
  Toolbar,
  Grid,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Box,
} from '@mui/material'
import { styled } from '@mui/system'

import { Link } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import MagicBellComponent from 'src/components/MagicBell/MagicBell'

import ChatButton from '../Chat Components/ChatButton/ChatButton'
import Sidebar from '../Sidebar/Sidebar'

const CustomAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#6087D3',
  maxHeight: '75px',
}))

const Logo = styled('img')({
  width: '20vw',
  height: '100%',
})

const RightSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: theme.spacing(4),
}))

const Header = () => {
  const { currentUser } = useAuth()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <CustomAppBar position="fixed">
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Sidebar />
            </IconButton>
          </Grid>
          <Grid item xs>
            <Box display="flex" justifyContent="center" height="100%">
              <Logo
                src="https://cdn.filestackcontent.com/NYFRhqyiRliXF8v1VYbk"
                alt="logo"
              />
            </Box>
          </Grid>
          <Grid item>
            <RightSection>
              <ChatButton />
              <MagicBellComponent />

              <Box position="relative">
                <IconButton onClick={handleAvatarClick}>
                  <Avatar
                    src={currentUser?.profilePicture || ''}
                    alt={currentUser?.firstName}
                    defaultSrc="/placeholder-avatar.png"
                  />
                </IconButton>
              </Box>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                PaperProps={{
                  style: {
                    marginTop: '48px',
                    borderRadius: '8px',
                    transformOrigin: 'top left',
                  },
                }}
              >
                <Link to="/my/profile" style={{ textDecoration: 'none' }}>
                  <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                </Link>
                <Link to="/my/company" style={{ textDecoration: 'none' }}>
                  <MenuItem onClick={handleMenuClose}>Company Profile</MenuItem>
                </Link>
              </Menu>
            </RightSection>
          </Grid>
        </Grid>
      </Toolbar>
    </CustomAppBar>
  )
}

export default Header
