import { Box, Stack } from '@mui/material';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';
import { TopHeader } from '@/components/TopHeader';

export function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        width: '100%',
        bgcolor: 'background.default',
        overflow: 'hidden',
      }}
    >
      <Sidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <TopHeader
          onMenuClick={() => setMobileOpen(true)}
        />

        <Box
          component="main"
          sx={{
            flex: 1,
            width: '100%',
            minWidth: 0,
            px: {
              xs: 1.5,
              sm: 2,
              md: 3,
            },
            py: {
              xs: 2,
              sm: 2.5,
              md: 3,
            },
            overflowX: 'hidden',
          }}
        >
          <Stack
            spacing={{
              xs: 2,
              md: 2.5,
            }}
            sx={{
              width: '100%',
              minWidth: 0,
            }}
          >
            <Outlet />
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}