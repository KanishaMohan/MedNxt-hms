import { Box, Button, Typography } from '@mui/material';
import {
  BedDouble,
  ClipboardList,
  Grid2X2,
  List,
  Plus,
  Pill,
  UsersRound,
} from 'lucide-react';

export type WardFilter =
  | 'ALL'
  | 'GENERAL WARD MALE'
  | 'GENERAL WARD FEMALE'
  | 'PRIVATE WARD'
  | 'ICU';

interface IpdTabsProps {
  wardFilter: WardFilter;
  onWardFilterChange: (value: WardFilter) => void;
}

const wardFilters: WardFilter[] = [
  'ALL',
  'GENERAL WARD MALE',
  'GENERAL WARD FEMALE',
  'PRIVATE WARD',
  'ICU',
];

export function IpdTabs({
  wardFilter,
  onWardFilterChange,
}: IpdTabsProps) {
  return (
    <Box
      sx={{
        mt: 2,
        height: 72,
        borderBottom: '1px solid #edf0f5',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1.5,
          flexWrap: 'nowrap',
          minWidth: 0,
        }}
      >
        {/* ================= MAIN TABS ================= */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2.2,
            flexWrap: 'nowrap',
            whiteSpace: 'nowrap',
            minWidth: 0,
          }}
        >
          <TabItem
  active
  icon={<BedDouble size={14} />}
  label={`Bed
Management`}
/>

          <TabItem
            icon={<ClipboardList size={14} />}
            label="Admissions List"
          />

          <TabItem
            icon={<UsersRound size={14} />}
            label="Nurse Schedule"
          />

          <TabItem
            icon={<Pill size={14} />}
            label="Ward Pharmacy"
          />
        </Box>

        {/* ================= RIGHT SIDE ================= */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            flexShrink: 0,
            whiteSpace: 'nowrap',
          }}
        >
          {/* ================= WARD FILTER BOX ================= */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              bgcolor: '#edeff5',
              borderRadius: '10px',
              padding: '4px',
              height: 56,
              gap: '2px',
            }}
          >
            {wardFilters.map((filter) => {
              const active = wardFilter === filter;

              return (
                <Box
                  key={filter}
                  onClick={() => onWardFilterChange(filter)}
                  sx={{
                    height: 48,

                    minWidth:
                      filter === 'ALL'
                        ? 46
                        : filter === 'ICU'
                        ? 50
                        : 82,

                    px: 1,

                    borderRadius: '7px',

                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',

                    cursor: 'pointer',

                    bgcolor: active ? '#ffffff' : 'transparent',

                    color: active
                      ? '#5146e5'
                      : '#697386',

                    boxShadow: active
                      ? '0 1px 3px rgba(0,0,0,0.08)'
                      : 'none',

                    transition: 'all 0.15s ease',

                    '&:hover': {
                      bgcolor: '#ffffff',
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 11.5,
                      fontWeight: active ? 700 : 600,
                      lineHeight: 1.1,
                      textAlign: 'center',
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {formatWardFilter(filter)}
                  </Typography>
                </Box>
              );
            })}
          </Box>

          {/* ================= GRID / LIST ================= */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.8,
              color: '#9aa3b2',
              px: 0.3,
            }}
          >
            <Grid2X2 size={16} />
            <List size={16} />
          </Box>

          {/* ================= ADD BED ================= */}
          <Button
            variant="contained"
            startIcon={<Plus size={14} />}
            sx={{
              height: 52,
              minWidth: 80,
              px: 1.5,
              borderRadius: '9px',
              textTransform: 'none',
              fontSize: 12.5,
              fontWeight: 700,
              bgcolor: '#5146e5',
              boxShadow: 'none',
              lineHeight: 1.2,

              '&:hover': {
                bgcolor: '#4439d4',
                boxShadow: 'none',
              },

              '& .MuiButton-startIcon': {
                marginRight: 0.5,
              },
            }}
          >
            <Box component="span">
              Add
              <br />
              Bed
            </Box>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

/* =========================================================
   MAIN TAB
========================================================= */

function TabItem({
  active = false,
  icon,
  label,
}: {
  active?: boolean;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Box
      sx={{
        height: 72,
        display: 'flex',
        alignItems: 'center',
        gap: 0.65,
        color: active ? '#5146e5' : '#9aa3b2',
        borderBottom: active
          ? '2px solid #5146e5'
          : '2px solid transparent',
        cursor: 'pointer',
        flexShrink: 0,
      }}
    >
      {icon}

      <Typography
        sx={{
          fontSize: 12.5,
          fontWeight: active ? 700 : 500,
          lineHeight: 1.1,
          whiteSpace: 'pre-line',
          textAlign: 'left',
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}
/* =========================================================
   WARD FILTER LABEL
========================================================= */

function formatWardFilter(value: WardFilter) {
  switch (value) {
    case 'ALL':
      return 'All';

    case 'GENERAL WARD MALE':
      return 'General\nWard\nMale';

    case 'GENERAL WARD FEMALE':
      return 'General\nWard\nFemale';

    case 'PRIVATE WARD':
      return 'Private\nWard';

    case 'ICU':
      return 'ICU';

    default:
      return value;
  }
}