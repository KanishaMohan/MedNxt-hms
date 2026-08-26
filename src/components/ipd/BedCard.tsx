import {
  Box,
  Button,
  Chip,
  Typography,
} from '@mui/material';

import {
  ArrowRightLeft,
  BarChart3,
  Check,
  House,
  Settings,
  UserRound,
} from 'lucide-react';

import type {
  Bed,
  BedStatus,
} from '@/types';

import type {
  ViewMode,
} from './IpdTabs';

interface BedCardProps {
  bed: Bed;

  viewMode: ViewMode;

  onAdmit: (
    bed: Bed
  ) => void;

  onDischarge: (
    bed: Bed
  ) => void;

  onTransfer: (
    bed: Bed
  ) => void;

  onRounds: (
    bed: Bed
  ) => void;

  onMarkClean: (
    bed: Bed
  ) => void;

  onMarkMaintenance: (
    bed: Bed
  ) => void;
}

export function BedCard({
  bed,
  viewMode,

  onAdmit,
  onDischarge,
  onTransfer,
  onRounds,
  onMarkClean,
  onMarkMaintenance,
}: BedCardProps) {
  const status = bed.status;

  const wardLabel =
    getWardLabel(bed.ward);

  const price =
    getBedPrice(bed.ward);

  const isList =
    viewMode === 'LIST';

  return (
    <Box
      sx={{
        minHeight: isList
          ? 170
          : 258,

        borderRadius: '14px',

        border:
          '1px solid #e8ebf1',

        borderLeft:
          status === 'OCCUPIED'
            ? '4px solid #6b6df6'
            : status === 'AVAILABLE'
              ? '4px solid #16b98a'
              : status ===
                  'CLEANING'
                ? '4px solid #f97316'
                : '4px solid #94a3b8',

        bgcolor: '#fff',

        overflow: 'hidden',

        boxShadow:
          '0 1px 3px rgba(20,30,60,.04)',

        display: 'flex',

        flexDirection:
          isList
            ? 'row'
            : 'column',

        transition:
          'box-shadow 0.15s ease, transform 0.15s ease',

        '&:hover': {
          boxShadow:
            '0 4px 14px rgba(20,30,60,.08)',
        },
      }}
    >
      {/* =================================================
          CONTENT
      ================================================= */}

      <Box
        sx={{
          flex: 1,

          px: 2,

          pt: isList
            ? 2
            : 1.8,

          pb:
            status === 'OCCUPIED'
              ? 1.5
              : 1,

          minWidth: 0,
        }}
      >
        {/* ================= HEADER ================= */}

        <Box
          sx={{
            display: 'flex',
            alignItems:
              'flex-start',
            justifyContent:
              'space-between',
            gap: 1,
          }}
        >
          <Box
            sx={{
              minWidth: 0,
            }}
          >
            <Typography
              sx={{
                fontSize: 23,
                fontWeight: 700,
                color: '#202938',
                lineHeight: 1,
              }}
            >
              {bed.number}
            </Typography>

            <Typography
              sx={{
                mt: 0.65,
                fontSize: 11,
                fontWeight: 400,
                color: '#9aa3b2',
                textTransform:
                  'uppercase',
              }}
            >
              {wardLabel}
            </Typography>

            <Typography
              sx={{
                mt: 0.35,
                fontSize: 12,
                color: '#9aa3b2',
              }}
            >
              ₹{price}/day
            </Typography>
          </Box>

          <StatusChip
            status={status}
          />
        </Box>

        {/* ================= OCCUPIED ================= */}

        {status ===
          'OCCUPIED' && (
          <OccupiedPatient
            bed={bed}
          />
        )}

        {/* ================= AVAILABLE ================= */}

        {status ===
          'AVAILABLE' && (
          <AvailableState />
        )}

        {/* ================= CLEANING ================= */}

        {status ===
          'CLEANING' && (
          <CleaningState />
        )}

        {/* ================= MAINTENANCE ================= */}

        {status ===
          'MAINTENANCE' && (
          <MaintenanceState />
        )}
      </Box>

      {/* =================================================
          ACTIONS
      ================================================= */}

      <Box
        sx={{
          width: isList
            ? 300
            : 'auto',

          mt: isList
            ? 0
            : 'auto',

          bgcolor:
            status ===
            'OCCUPIED'
              ? '#f5f6ff'
              : '#fff',

          px: 1.5,
          py: 1.2,

          display: 'flex',

          flexDirection:
            'column',

          justifyContent:
            'center',
        }}
      >
        {/* ================= AVAILABLE ================= */}

        {status ===
          'AVAILABLE' && (
          <Button
            fullWidth
            variant="outlined"
            onClick={() =>
              onAdmit(bed)
            }
            startIcon={
              <UserRound
                size={15}
              />
            }
            sx={actionButton(
              '#16a34a'
            )}
          >
            Assign Patient

            <Box
              component="span"
              sx={{
                ml: 0.5,
                fontSize: 18,
                fontWeight: 400,
              }}
            >
              +
            </Box>
          </Button>
        )}

        {/* ================= OCCUPIED ================= */}

        {status ===
          'OCCUPIED' && (
          <>
            <Box
              sx={{
                display: 'flex',
                gap: 0.8,
                mb: 0.7,
              }}
            >
              <Button
                fullWidth
                variant="outlined"
                startIcon={
                  <BarChart3
                    size={14}
                  />
                }
                onClick={() =>
                  onRounds(bed)
                }
                sx={smallActionButton(
                  '#5146e5'
                )}
              >
                Rounds
              </Button>

              <Button
                fullWidth
                variant="outlined"
                startIcon={
                  <ArrowRightLeft
                    size={14}
                  />
                }
                onClick={() =>
                  onTransfer(bed)
                }
                sx={smallActionButton(
                  '#5146e5'
                )}
              >
                Transfer
              </Button>
            </Box>

            <Button
              fullWidth
              variant="outlined"
              onClick={() =>
                onDischarge(bed)
              }
              sx={{
                ...smallActionButton(
                  '#ef4444'
                ),

                height: 29,
              }}
            >
              → Discharge
            </Button>
          </>
        )}

        {/* ================= CLEANING ================= */}

        {status ===
          'CLEANING' && (
          <Button
            fullWidth
            variant="outlined"
            onClick={() =>
              onMarkClean(bed)
            }
            startIcon={
              <Check size={15} />
            }
            sx={actionButton(
              '#f97316'
            )}
          >
            Mark Ready
          </Button>
        )}

        {/* ================= MAINTENANCE ================= */}

        {status ===
          'MAINTENANCE' && (
          <Button
            fullWidth
            variant="outlined"
            onClick={() =>
              onMarkMaintenance(
                bed
              )
            }
            startIcon={
              <Check size={15} />
            }
            sx={smallActionButton(
              '#64748b'
            )}
          >
            Mark Repaired
          </Button>
        )}
      </Box>
    </Box>
  );
}

/* =========================================================
   STATUS CHIP
========================================================= */

function StatusChip({
  status,
}: {
  status: BedStatus;
}) {
  const config: Record<
    BedStatus,
    {
      label: string;
      color: string;
      bg: string;
      border: string;
    }
  > = {
    AVAILABLE: {
      label: 'AVAILABLE',
      color: '#16a34a',
      bg: '#effcf4',
      border: '#c9f2d7',
    },

    OCCUPIED: {
      label: 'OCCUPIED',
      color: '#5146e5',
      bg: '#eef0ff',
      border: '#d9dcff',
    },

    CLEANING: {
      label: 'CLEANING',
      color: '#f97316',
      bg: '#fff7ed',
      border: '#fed7aa',
    },

    MAINTENANCE: {
      label: 'MAINTENANCE',
      color: '#687386',
      bg: '#f5f6f8',
      border: '#e5e7eb',
    },
  };

  const currentConfig =
    config[status];

  return (
    <Chip
      label={
        currentConfig.label
      }
      size="small"
      sx={{
        height: 26,
        borderRadius: '5px',

        bgcolor:
          currentConfig.bg,

        border:
          `1px solid ${currentConfig.border}`,

        color:
          currentConfig.color,

        fontSize: 11,
        fontWeight: 800,

        '& .MuiChip-label': {
          px: 1,
        },
      }}
    />
  );
}

/* =========================================================
   OCCUPIED PATIENT
========================================================= */

function OccupiedPatient({
  bed,
}: {
  bed: Bed;
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        mt: 1.6,
      }}
    >
      <Box
        sx={{
          width: 38,
          height: 38,
          borderRadius: '50%',
          bgcolor: '#eef1f7',
          display: 'grid',
          placeItems: 'center',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        <UserRound
          size={20}
          color="#7b8798"
        />
      </Box>

      <Box
        sx={{
          minWidth: 0,
        }}
      >
        <Typography
          sx={{
            fontSize: 15,
            fontWeight: 700,
            color: '#202938',

            whiteSpace:
              'nowrap',

            overflow: 'hidden',

            textOverflow:
              'ellipsis',
          }}
        >
          {bed.patientName ||
            'Patient'}
        </Typography>

        <Typography
          sx={{
            fontSize: 12,
            color: '#9aa3b2',
          }}
        >
          Patient admitted
        </Typography>
      </Box>
    </Box>
  );
}

/* =========================================================
   AVAILABLE STATE
========================================================= */

function AvailableState() {
  return (
    <Box
      sx={{
        height: 105,

        display: 'flex',

        flexDirection:
          'column',

        alignItems:
          'center',

        justifyContent:
          'center',

        color: '#d6dbe4',
      }}
    >
      <BarChart3
        size={34}
        strokeWidth={2.5}
      />

      <Typography
        sx={{
          mt: 0.8,
          fontSize: 12,
          color: '#cfd5df',
        }}
      >
        Available
      </Typography>
    </Box>
  );
}

/* =========================================================
   CLEANING STATE
========================================================= */

function CleaningState() {
  return (
    <Box
      sx={{
        height: 105,

        display: 'flex',

        flexDirection:
          'column',

        alignItems:
          'center',

        justifyContent:
          'center',
      }}
    >
      <Box
        sx={{
          width: 50,
          height: 50,

          borderRadius: '50%',

          bgcolor: '#fff7ed',

          color: '#f97316',

          display: 'grid',

          placeItems: 'center',
        }}
      >
        <House size={22} />
      </Box>

      <Typography
        sx={{
          mt: 1,
          fontSize: 12,
          color: '#f97316',
        }}
      >
        Housekeeping in
        progress
      </Typography>
    </Box>
  );
}

/* =========================================================
   MAINTENANCE STATE
========================================================= */

function MaintenanceState() {
  return (
    <Box
      sx={{
        height: 105,

        display: 'flex',

        flexDirection:
          'column',

        alignItems:
          'center',

        justifyContent:
          'center',
      }}
    >
      <Settings
        size={34}
        color="#cfd5df"
        strokeWidth={1.5}
      />

      <Typography
        sx={{
          mt: 0.8,
          fontSize: 12,
          color: '#9aa3b2',
        }}
      >
        Under Maintenance
      </Typography>
    </Box>
  );
}

/* =========================================================
   WARD LABEL
========================================================= */

function getWardLabel(
  ward: string
) {
  const value =
    ward.toUpperCase();

  if (
    value.includes(
      'GENERAL'
    ) &&
    value.includes('MALE')
  ) {
    return 'GENERAL WARD MALE';
  }

  if (
    value.includes(
      'GENERAL'
    ) &&
    value.includes('FEMALE')
  ) {
    return 'GENERAL WARD FEMALE';
  }

  if (
    value.includes('PRIVATE')
  ) {
    return 'PRIVATE WARD';
  }

  if (value.includes('ICU')) {
    return 'ICU';
  }

  return value;
}

/* =========================================================
   BED PRICE
========================================================= */

function getBedPrice(
  ward: string
) {
  const value =
    ward.toUpperCase();

  if (
    value.includes('PRIVATE')
  ) {
    return 2500;
  }

  if (value.includes('ICU')) {
    return 5000;
  }

  return 500;
}

/* =========================================================
   ACTION BUTTON
========================================================= */

function actionButton(
  color: string
) {
  return {
    height: 38,

    borderRadius: '8px',

    borderColor: color,

    color,

    textTransform:
      'none',

    fontSize: 14,

    fontWeight: 700,

    boxShadow: 'none',

    '&:hover': {
      borderColor: color,
      bgcolor: `${color}08`,
    },
  };
}

/* =========================================================
   SMALL ACTION BUTTON
========================================================= */

function smallActionButton(
  color: string
) {
  return {
    height: 31,

    borderRadius: '6px',

    borderColor:
      `${color}55`,

    color,

    textTransform:
      'none',

    fontSize: 11,

    fontWeight: 700,

    boxShadow: 'none',

    '&:hover': {
      borderColor: color,
      bgcolor: `${color}08`,
    },
  };
}