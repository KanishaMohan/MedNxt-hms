
import { useState, type MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Popover,
  Stack,
  Typography,
} from '@mui/material';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import InfoIcon from '@mui/icons-material/Info';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import CloseIcon from '@mui/icons-material/Close';

interface TopHeaderProps {
  onMenuClick: () => void;
}

export function TopHeader({ onMenuClick }: TopHeaderProps) {
  const navigate = useNavigate();

  const [notificationAnchor, setNotificationAnchor] =
    useState<HTMLElement | null>(null);

  const [profileAnchor, setProfileAnchor] =
    useState<HTMLElement | null>(null);

  const notificationsOpen = Boolean(notificationAnchor);
  const profileOpen = Boolean(profileAnchor);

  const handleNotificationsClick = (
    event: MouseEvent<HTMLElement>,
  ) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleProfileClick = (event: MouseEvent<HTMLElement>) => {
    setProfileAnchor(event.currentTarget);
  };

  const closeNotifications = () => {
    setNotificationAnchor(null);
  };

  const closeProfile = () => {
    setProfileAnchor(null);
  };

  const goToPage = (path: string) => {
    closeProfile();
    navigate(path);
  };

  const showHelp = () => {
    closeProfile();
    window.alert(
      'MedNxt Help\n\nThis is a frontend demo. A support service is not connected yet.',
    );
  };

  return (
    <Box
      component="header"
      sx={{
        width: '100%',
        minHeight: 76,
        px: { xs: 1.5, sm: 3, md: 4 },
        py: 1.5,
        bgcolor: '#FFFFFF',
        borderBottom: '1px solid #E8EAF0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        boxSizing: 'border-box',
      }}
    >
      {/* Left section */}
      <Stack
  direction="row"
  spacing={1.5}
  sx={{
    minWidth: 0,
    flex: 1,
    alignItems: 'center',
  }}
>
        <IconButton
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          sx={{
            display: { xs: 'inline-flex', md: 'none' },
            color: '#4F46A5',
            bgcolor: '#F3F1FF',
            borderRadius: 2,
            '&:hover': { bgcolor: '#E9E5FF' },
          }}
        >
          <MenuIcon />
        </IconButton>

        <Box
          sx={{
            width: 42,
            height: 42,
            borderRadius: 2.5,
            bgcolor: '#EEECFF',
            color: '#5546A8',
            display: { xs: 'none', sm: 'flex' },
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <LocalHospitalIcon />
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              fontSize: { xs: 16, sm: 19 },
              color: '#25233A',
              lineHeight: 1.3,
            }}
          >
            MedNxt
          </Typography>

          <Typography
            variant="caption"
            sx={{
              display: { xs: 'none', sm: 'block' },
              color: '#85849A',
              fontSize: 11,
              letterSpacing: 0.5,
            }}
          >
            Hospital Management System
          </Typography>
        </Box>
      </Stack>

      {/* Right section */}
      
<Stack
  direction="row"
  spacing={{ xs: 0.5, sm: 1.5 }}
  sx={{ alignItems: 'center' }}
>
  {/* Demo status */}
        {/* Demo status */}
        <Box
          sx={{
            display: { xs: 'none', lg: 'flex' },
            alignItems: 'center',
            gap: 1,
            px: 1.5,
            py: 0.8,
            bgcolor: '#F4F3FA',
            border: '1px solid #EAE8F4',
            borderRadius: 20,
          }}
        >
          <Box
            sx={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              bgcolor: '#E6A23C',
            }}
          />
          <Typography
            sx={{
              fontSize: 10,
              fontWeight: 700,
              color: '#696681',
              letterSpacing: 0.6,
            }}
          >
            DEMO MODE
          </Typography>
        </Box>

        {/* Notifications */}
        <IconButton
          onClick={handleNotificationsClick}
          aria-label="View notifications"
          aria-expanded={notificationsOpen}
          sx={{
            width: 42,
            height: 42,
            color: '#62617A',
            border: '1px solid #ECEBF2',
            borderRadius: 2.5,
            '&:hover': {
              bgcolor: '#F6F4FF',
              color: '#5546A8',
            },
          }}
        >
          <Badge
            variant="dot"
            color="error"
            overlap="circular"
          >
            <NotificationsNoneIcon />
          </Badge>
        </IconButton>

        {/* Notification popover */}
        <Popover
          open={notificationsOpen}
          anchorEl={notificationAnchor}
          onClose={closeNotifications}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          slotProps={{
            paper: {
              sx: {
                mt: 1.5,
                width: { xs: 290, sm: 340 },
                maxWidth: 'calc(100vw - 24px)',
                borderRadius: 3,
                border: '1px solid #ECEBF2',
                boxShadow: '0 12px 40px rgba(35, 30, 80, 0.12)',
              },
            },
          }}
        >
          <Box sx={{ p: 2 }}>
            <Stack
  direction="row"
  sx={{
    alignItems: 'center',
    justifyContent: 'space-between',
  }}
>
              <Typography sx={{ fontWeight: 800, color: '#292640' }}>
                Notifications
              </Typography>

              <IconButton
                size="small"
                onClick={closeNotifications}
                aria-label="Close notifications"
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Stack>

            <Typography
              variant="caption"
              sx={{ color: '#85849A' }}
            >
              Sample notifications for the demo
            </Typography>
          </Box>

          <Divider />

          <Box sx={{ p: 2 }}>
            <Stack
  direction="row"
  spacing={1.5}
  sx={{ alignItems: 'flex-start' }}
>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: 2,
                  bgcolor: '#EEECFF',
                  color: '#5546A8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <LocalHospitalIcon fontSize="small" />
              </Box>

              <Box>
                <Typography
                  sx={{ fontSize: 13, fontWeight: 700, color: '#292640' }}
                >
                  Welcome to MedNxt
                </Typography>
                <Typography
                  sx={{ fontSize: 12, color: '#77758B', mt: 0.5 }}
                >
                  Explore the hospital management dashboard.
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Divider />

          <Box sx={{ p: 2 }}>
            <Stack
  direction="row"
  spacing={1.5}
  sx={{ alignItems: 'flex-start' }}
>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: 2,
                  bgcolor: '#E9F7EF',
                  color: '#278653',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <AdminPanelSettingsOutlinedIcon fontSize="small" />
              </Box>

              <Box>
                <Typography
                  sx={{ fontSize: 13, fontWeight: 700, color: '#292640' }}
                >
                  Admin Panel
                </Typography>
                <Typography
                  sx={{ fontSize: 12, color: '#77758B', mt: 0.5 }}
                >
                  Review demo user management features.
                </Typography>

                <Button
                  size="small"
                  onClick={() => {
                    closeNotifications();
                    navigate('/admin');
                  }}
                  sx={{
                    mt: 0.5,
                    px: 0,
                    textTransform: 'none',
                    fontWeight: 700,
                  }}
                >
                  Open Admin Panel
                </Button>
              </Box>
            </Stack>
          </Box>
        </Popover>

        {/* Profile button */}
        <Button
          onClick={handleProfileClick}
          aria-label="Open user profile menu"
          aria-expanded={profileOpen}
          endIcon={<KeyboardArrowDownIcon />}
          sx={{
            textTransform: 'none',
            minWidth: 0,
            px: { xs: 0.5, sm: 1 },
            py: 0.5,
            borderRadius: 2.5,
            color: '#292640',
            '&:hover': { bgcolor: '#F7F6FC' },
          }}
        >
          <Stack
  direction="row"
  spacing={1}
  sx={{ alignItems: 'center' }}
>
            <Avatar
              sx={{
                width: 38,
                height: 38,
                bgcolor: '#5546A8',
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              AU
            </Avatar>

            <Box
              sx={{
                display: { xs: 'none', sm: 'block' },
                textAlign: 'left',
              }}
            >
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 800,
                  lineHeight: 1.4,
                }}
              >
                Admin User
              </Typography>

              <Typography
                sx={{
                  fontSize: 11,
                  color: '#85849A',
                  lineHeight: 1.4,
                }}
              >
                Administrator
              </Typography>
            </Box>
          </Stack>
        </Button>

        {/* Profile menu */}
        <Menu
          anchorEl={profileAnchor}
          open={profileOpen}
          onClose={closeProfile}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          slotProps={{
            paper: {
              sx: {
                mt: 1.5,
                minWidth: 220,
                borderRadius: 3,
                border: '1px solid #ECEBF2',
                boxShadow: '0 12px 40px rgba(35, 30, 80, 0.12)',
              },
            },
          }}
        >
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography sx={{ fontWeight: 800, color: '#292640' }}>
              Admin User
            </Typography>
            <Typography sx={{ fontSize: 12, color: '#85849A' }}>
              Demo administrator
            </Typography>
          </Box>

          <Divider />

          <MenuItem onClick={() => goToPage('/')}>
            <ListItemIcon>
              <DashboardOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Dashboard</ListItemText>
          </MenuItem>

          <MenuItem onClick={() => goToPage('/admin')}>
            <ListItemIcon>
              <AdminPanelSettingsOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Admin Panel</ListItemText>
          </MenuItem>

          <MenuItem onClick={showHelp}>
            <ListItemIcon>
              <InfoIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Help & Information</ListItemText>
          </MenuItem>

          <Divider />

          <MenuItem onClick={closeProfile}>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Close Menu</ListItemText>
          </MenuItem>
        </Menu>
      </Stack>
    </Box>
  );
}

export default TopHeader;
