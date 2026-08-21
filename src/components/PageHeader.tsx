import { Box, Button, Stack, Typography } from '@mui/material';
import { Plus } from 'lucide-react';

interface PageHeaderProps { eyebrow?: string; title: string; description: string; actionLabel?: string; onAction?: () => void; }

export function PageHeader({ eyebrow, title, description, actionLabel, onAction }: PageHeaderProps) {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'space-between', alignItems: { sm: 'center' }, mb: 3 }}>
      <Box><Typography variant="caption" color="primary.main" sx={{ fontWeight: 800 }}>{eyebrow}</Typography><Typography variant="h2" sx={{ mt: .4 }}>{title}</Typography><Typography color="text.secondary" sx={{ mt: .6 }}>{description}</Typography></Box>
      {actionLabel && <Button variant="contained" startIcon={<Plus size={16} />} onClick={onAction}>{actionLabel}</Button>}
    </Stack>
  );
}
