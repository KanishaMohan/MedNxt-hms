import { Box, Typography } from '@mui/material';

import type { Bed } from '@/types';

import { BedCard } from './BedCard';

import type {
  WardFilter,
  ViewMode,
} from './IpdTabs';

interface BedGridProps {
  beds: Bed[];

  wardFilter: WardFilter;

  viewMode: ViewMode;

  onAdmit: (bed: Bed) => void;

  onDischarge: (bed: Bed) => void;

  onTransfer: (bed: Bed) => void;

  onRounds: (bed: Bed) => void;

  onMarkClean: (
    bed: Bed
  ) => void;

  onMarkMaintenance: (
    bed: Bed
  ) => void;
}

export function BedGrid({
  beds,
  wardFilter,
  viewMode,

  onAdmit,
  onDischarge,
  onTransfer,
  onRounds,
  onMarkClean,
  onMarkMaintenance,
}: BedGridProps) {
  /* =====================================================
     FILTER BEDS
  ===================================================== */

  const filteredBeds =
    beds.filter((bed) => {
      if (
        wardFilter === 'ALL'
      ) {
        return true;
      }

      const ward =
        bed.ward.toUpperCase();

      if (
        wardFilter ===
        'GENERAL WARD MALE'
      ) {
        return (
          ward.includes(
            'GENERAL'
          ) &&
          ward.includes('MALE')
        );
      }

      if (
        wardFilter ===
        'GENERAL WARD FEMALE'
      ) {
        return (
          ward.includes(
            'GENERAL'
          ) &&
          ward.includes('FEMALE')
        );
      }

      if (
        wardFilter ===
        'PRIVATE WARD'
      ) {
        return ward.includes(
          'PRIVATE'
        );
      }

      if (
        wardFilter === 'ICU'
      ) {
        return ward.includes(
          'ICU'
        );
      }

      return true;
    });

  /* =====================================================
     EMPTY STATE
  ===================================================== */

  if (
    filteredBeds.length === 0
  ) {
    return (
      <Box
        sx={{
          py: 8,
          textAlign: 'center',
        }}
      >
        <Typography
          sx={{
            fontSize: 15,
            color: '#9aa3b2',
          }}
        >
          No beds available
          for this ward.
        </Typography>
      </Box>
    );
  }

  /* =====================================================
     GRID / LIST
  ===================================================== */

  return (
    <Box
      sx={{
        mt: 3,

        display: 'grid',

        gridTemplateColumns:
          viewMode === 'LIST'
            ? '1fr'
            : {
                xs: '1fr',

                sm: 'repeat(2, minmax(0, 1fr))',

                md: 'repeat(3, minmax(0, 1fr))',

                xl: 'repeat(4, minmax(0, 1fr))',
              },

        gap: 2,

        alignItems: 'stretch',
      }}
    >
      {filteredBeds.map(
        (bed) => (
          <BedCard
            key={bed.id}
            bed={bed}
            viewMode={viewMode}
            onAdmit={onAdmit}
            onDischarge={
              onDischarge
            }
            onTransfer={
              onTransfer
            }
            onRounds={onRounds}
            onMarkClean={
              onMarkClean
            }
            onMarkMaintenance={
              onMarkMaintenance
            }
          />
        )
      )}
    </Box>
  );
}