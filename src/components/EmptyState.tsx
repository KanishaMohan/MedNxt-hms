import { Box, Typography } from '@mui/material';
import type { LucideIcon } from 'lucide-react';

interface EmptyStateProps { icon: LucideIcon; title: string; description?: string; }

export function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
  return (
    <Box sx={{ display: 'grid', placeItems: 'center', textAlign: 'center', py: 8, px: 3 }}>
      <Box sx={{ width: 64, height: 64, borderRadius: 2, bgcolor: 'primary.light', color: 'primary.dark', display: 'grid', placeItems: 'center', mb: 2 }}><Icon size={28} /></Box>
      <Typography variant="h3">{title}</Typography>
      {description && <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 420 }}>{description}</Typography>}
    </Box>
  );
}
