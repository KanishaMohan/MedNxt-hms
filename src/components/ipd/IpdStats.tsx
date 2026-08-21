import { Box, Paper, Typography } from '@mui/material';
import { Activity, BedDouble, Clock3, IndianRupee } from 'lucide-react';

interface IpdStatsProps {
  occupancy: number;
  available: number;
  avgStay: number;
  revenue: number;
}

const stats = [
  {
    key: 'occupancy',
    label: 'OCCUPANCY',
    icon: Activity,
  },
  {
    key: 'available',
    label: 'AVAILABLE',
    icon: BedDouble,
  },
  {
    key: 'avgStay',
    label: 'AVG STAY',
    icon: Clock3,
  },
  {
    key: 'revenue',
    label: 'DAILY EST. REV',
    icon: IndianRupee,
  },
];

export function IpdStats({
  occupancy,
  available,
  avgStay,
  revenue,
}: IpdStatsProps) {
  const values: Record<string, React.ReactNode> = {
    occupancy: (
      <>
        <Typography
          component="span"
          sx={{
            fontSize: 25,
            fontWeight: 700,
            color: '#1f2937',
            lineHeight: 1,
          }}
        >
          {occupancy}%
        </Typography>

        <Typography
          component="span"
          sx={{
            ml: 1,
            fontSize: 14,
            color: '#9aa3b2',
          }}
        >
          Capacity
        </Typography>
      </>
    ),

    available: (
      <Typography
        sx={{
          fontSize: 25,
          fontWeight: 700,
          color: '#1f2937',
          lineHeight: 1,
        }}
      >
        {available}
      </Typography>
    ),

    avgStay: (
      <Typography
        sx={{
          fontSize: 25,
          fontWeight: 700,
          color: '#f97316',
          lineHeight: 1,
        }}
      >
        {avgStay} Days
      </Typography>
    ),

    revenue: (
      <Typography
        sx={{
          fontSize: 25,
          fontWeight: 700,
          color: '#1f2937',
          lineHeight: 1,
        }}
      >
        ₹{revenue}
      </Typography>
    ),
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: '1fr 1fr',
          lg: 'repeat(4, 1fr)',
        },
        gap: 2,
      }}
    >
      {stats.map(({ key, label, icon: Icon }) => (
        <Paper
          key={key}
          elevation={0}
          sx={{
            height: 104,
            border: '1px solid #edf0f5',
            borderRadius: '16px',
            px: 2.5,
            py: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 2px 5px rgba(20, 30, 60, 0.06)',
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '1px',
                color: '#9aa3b2',
                mb: 1,
              }}
            >
              {label}
            </Typography>

            <Box>{values[key]}</Box>
          </Box>

          <Box
            sx={{
              width: 46,
              height: 46,
              borderRadius: '11px',
              display: 'grid',
              placeItems: 'center',
              bgcolor:
                key === 'occupancy'
                  ? '#eef1ff'
                  : key === 'available'
                    ? '#effcf4'
                    : key === 'avgStay'
                      ? '#fff6eb'
                      : '#eef5ff',
              color:
                key === 'occupancy'
                  ? '#5961f5'
                  : key === 'available'
                    ? '#22c55e'
                    : key === 'avgStay'
                      ? '#ff7a18'
                      : '#3b82f6',
            }}
          >
            <Icon size={22} strokeWidth={1.7} />
          </Box>
        </Paper>
      ))}
    </Box>
  );
}