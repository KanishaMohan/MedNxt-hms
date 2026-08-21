import { Box } from '@mui/material';
import { useMemo, useState } from 'react';
import { useApp } from '@/context/AppContext';
import type { Bed } from '@/services/mockData';

import { IpdStats } from '@/components/ipd/IpdStats';
import {
  IpdTabs,
  type WardFilter,
} from '@/components/ipd/IpdTabs';
import { BedGrid } from '@/components/ipd/BedGrid';

export function IpdBedManagementPage() {
  const {
    beds,
    patients,
    updateBed,
    updatePatientStatus,
  } = useApp();

  const [wardFilter, setWardFilter] =
    useState<WardFilter>('ALL');

  const stats = useMemo(() => {
    const occupied = beds.filter(
      (bed) => bed.status === 'OCCUPIED',
    ).length;

    const available = beds.filter(
      (bed) => bed.status === 'AVAILABLE',
    ).length;

    const occupancy = beds.length
      ? Math.round((occupied / beds.length) * 100)
      : 0;

    return {
      available,
      occupancy,
    };
  }, [beds]);

  const admit = (bed: Bed) => {
    const patient = patients.find(
      (patient) => patient.status === 'WAITING',
    );

    if (!patient) return;

    updateBed(
      bed.id,
      'OCCUPIED',
      patient,
    );

    updatePatientStatus(
      patient.id,
      'IN CONSULTATION',
    );
  };

  const discharge = (bed: Bed) => {
    if (bed.patientId) {
      updatePatientStatus(
        bed.patientId,
        'DISCHARGED',
      );
    }

    updateBed(
      bed.id,
      'CLEANING',
    );
  };

  const transfer = (bed: Bed) => {
    if (!bed.patientId) return;

    const target = beds.find(
      (item) => item.status === 'AVAILABLE',
    );

    if (!target) return;

    const patient = patients.find(
      (item) => item.id === bed.patientId,
    );

    updateBed(
      target.id,
      'OCCUPIED',
      patient,
    );

    updateBed(
      bed.id,
      'CLEANING',
    );
  };

  const markClean = (bed: Bed) => {
    updateBed(
      bed.id,
      'AVAILABLE',
    );
  };

  const markMaintenance = (bed: Bed) => {
    updateBed(
      bed.id,
      'MAINTENANCE',
    );
  };

  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <IpdStats
        occupancy={stats.occupancy}
        available={stats.available}
        avgStay={0}
        revenue={0}
      />

      <IpdTabs
        wardFilter={wardFilter}
        onWardFilterChange={setWardFilter}
      />

      <BedGrid
        beds={beds}
        wardFilter={wardFilter}
        onAdmit={admit}
        onDischarge={discharge}
        onTransfer={transfer}
        onMarkClean={markClean}
        onMarkMaintenance={markMaintenance}
      />
    </Box>
  );
}