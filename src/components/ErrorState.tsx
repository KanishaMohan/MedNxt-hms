import { Alert } from '@mui/material';

export function ErrorState({ message }: { message: string }) {
  return <Alert severity="error" sx={{ borderRadius: 2 }}>{message}</Alert>;
}
