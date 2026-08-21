import { Box, CircularProgress, Typography } from '@mui/material';

export function LoadingState({ message = 'Loading...' }: { message?: string }) {
  return <Box sx={{ display: 'grid', placeItems: 'center', py: 6, gap: 2 }}><CircularProgress size={32} /><Typography color="text.secondary" sx={{ fontSize: 13 }}>{message}</Typography></Box>;
}
