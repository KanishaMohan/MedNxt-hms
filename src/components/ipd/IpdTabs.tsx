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

export type IpdTab =
  | 'BED_MANAGEMENT'
  | 'ADMISSIONS'
  | 'NURSE_SCHEDULE'
  | 'WARD_PHARMACY';

export type ViewMode = 'GRID' | 'LIST';

interface IpdTabsProps {
  activeTab: IpdTab;
  wardFilter: WardFilter;
  viewMode: ViewMode;

  onTabChange: (value: IpdTab) => void;
  onWardFilterChange: (value: WardFilter) => void;
  onViewModeChange: (value: ViewMode) => void;
  onAddBed: () => void;
}

const wardFilters: WardFilter[] = [
  'ALL',
  'GENERAL WARD MALE',
  'GENERAL WARD FEMALE',
  'PRIVATE WARD',
  'ICU',
];

export function IpdTabs({
  activeTab,
  wardFilter,
  viewMode,
  onTabChange,
  onWardFilterChange,
  onViewModeChange,
  onAddBed,
}: IpdTabsProps) {
  const isBedManagement =
    activeTab === 'BED_MANAGEMENT';

  return (
    <Box
      sx={{
        mt: 2,
        minHeight: 72,
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
          minWidth: 0,
        }}
      >
        {/* =====================================================
            MAIN IPD TABS
        ===================================================== */}

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2.2,
            flexShrink: 0,
            whiteSpace: 'nowrap',
          }}
        >
          <TabItem
            active={activeTab === 'BED_MANAGEMENT'}
            icon={<BedDouble size={14} />}
            label={`Bed\nManagement`}
            onClick={() =>
              onTabChange('BED_MANAGEMENT')
            }
          />

          <TabItem
            active={activeTab === 'ADMISSIONS'}
            icon={<ClipboardList size={14} />}
            label={`Admissions\nList`}
            onClick={() =>
              onTabChange('ADMISSIONS')
            }
          />

          <TabItem
            active={activeTab === 'NURSE_SCHEDULE'}
            icon={<UsersRound size={14} />}
            label={`Nurse\nSchedule`}
            onClick={() =>
              onTabChange('NURSE_SCHEDULE')
            }
          />

          <TabItem
            active={activeTab === 'WARD_PHARMACY'}
            icon={<Pill size={14} />}
            label={`Ward\nPharmacy`}
            onClick={() =>
              onTabChange('WARD_PHARMACY')
            }
          />
        </Box>

        {/* =====================================================
            BED MANAGEMENT CONTROLS
            These are intentionally hidden for other tabs.
        ===================================================== */}

        {isBedManagement && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              flexShrink: 0,
              whiteSpace: 'nowrap',
            }}
          >
            {/* =================================================
                WARD FILTERS
            ================================================= */}

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
                const active =
                  wardFilter === filter;

                return (
                  <Box
                    key={filter}
                    onClick={() =>
                      onWardFilterChange(filter)
                    }
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

                      bgcolor: active
                        ? '#ffffff'
                        : 'transparent',

                      color: active
                        ? '#5146e5'
                        : '#697386',

                      boxShadow: active
                        ? '0 1px 3px rgba(0,0,0,0.08)'
                        : 'none',

                      transition:
                        'all 0.15s ease',

                      '&:hover': {
                        bgcolor: '#ffffff',
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 11.5,
                        fontWeight: active
                          ? 700
                          : 600,
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

            {/* =================================================
                GRID / LIST
            ================================================= */}

            <Box
              sx={{
                height: 42,
                display: 'flex',
                alignItems: 'center',
                gap: 0.2,
                border: '1px solid #edf0f5',
                borderRadius: '8px',
                p: '3px',
                bgcolor: '#fff',
              }}
            >
              <Box
                onClick={() =>
                  onViewModeChange('GRID')
                }
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: '6px',
                  display: 'grid',
                  placeItems: 'center',
                  cursor: 'pointer',
                  color:
                    viewMode === 'GRID'
                      ? '#5146e5'
                      : '#9aa3b2',
                  bgcolor:
                    viewMode === 'GRID'
                      ? '#eef0ff'
                      : 'transparent',
                  transition:
                    'all 0.15s ease',

                  '&:hover': {
                    bgcolor: '#eef0ff',
                  },
                }}
              >
                <Grid2X2 size={16} />
              </Box>

              <Box
                onClick={() =>
                  onViewModeChange('LIST')
                }
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: '6px',
                  display: 'grid',
                  placeItems: 'center',
                  cursor: 'pointer',
                  color:
                    viewMode === 'LIST'
                      ? '#5146e5'
                      : '#9aa3b2',
                  bgcolor:
                    viewMode === 'LIST'
                      ? '#eef0ff'
                      : 'transparent',
                  transition:
                    'all 0.15s ease',

                  '&:hover': {
                    bgcolor: '#eef0ff',
                  },
                }}
              >
                <List size={17} />
              </Box>
            </Box>

            {/* =================================================
                ADD BED
            ================================================= */}

            <Button
              variant="outlined"
              startIcon={<Plus size={15} />}
              onClick={onAddBed}
              sx={{
                height: 52,
                minWidth: 108,
                px: 1.5,
                borderRadius: '9px',
                borderColor: '#e3e6ee',
                color: '#202938',
                bgcolor: '#fff',
                textTransform: 'none',
                fontSize: 13,
                fontWeight: 700,
                boxShadow:
                  '0 1px 3px rgba(20,30,60,.04)',

                '&:hover': {
                  borderColor: '#5146e5',
                  bgcolor: '#fafaff',
                },

                '& .MuiButton-startIcon': {
                  marginRight: 0.5,
                },
              }}
            >
              Add Bed
            </Button>
          </Box>
        )}
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
  onClick,
}: {
  active?: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <Box
      onClick={onClick}
      sx={{
        height: 72,
        display: 'flex',
        alignItems: 'center',
        gap: 0.65,

        color: active
          ? '#5146e5'
          : '#9aa3b2',

        borderBottom: active
          ? '2px solid #5146e5'
          : '2px solid transparent',

        cursor: 'pointer',

        flexShrink: 0,

        transition:
          'color 0.15s ease',

        '&:hover': {
          color: '#5146e5',
        },
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

function formatWardFilter(
  value: WardFilter
) {
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