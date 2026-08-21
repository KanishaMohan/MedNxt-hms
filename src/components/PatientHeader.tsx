import { Avatar, Box, Chip, Stack, Typography } from '@mui/material';
import type { Patient } from '@/services/mockData';

export function PatientHeader({ patient }: { patient: Patient }) {
  return (
    <Box sx={{ p: 2.5, bgcolor: 'primary.light', borderRadius: 2 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ alignItems: 'center' }}>
        <Avatar sx={{ width: 56, height: 56, bgcolor: 'primary.main', fontSize: 18 }}>{patient.firstName[0]}{patient.lastName[0]}</Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h3">{patient.firstName} {patient.lastName}</Typography>
          <Typography sx={{ fontSize: 12, color: 'text.secondary', mt: .5 }}>{patient.uhid} · {patient.gender}, {patient.bloodGroup} · {patient.mobile}</Typography>
        </Box>
        <Chip label={patient.reason} size="small" sx={{ bgcolor: '#fff', fontWeight: 700, fontSize: 11 }} />
      </Stack>
    </Box>
  );
}
