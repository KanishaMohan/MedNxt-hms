import {
  Box,
} from '@mui/material';

import {
  useMemo,
  useState,
} from 'react';

import {
  useApp,
} from '@/context/AppContext';

import type {
  Bed,
  Patient,
  EhrEvent,
} from '@/types';

import {
  IpdStats,
} from '@/components/ipd/IpdStats';

import {
  IpdTabs,
  type IpdTab,
  type ViewMode,
  type WardFilter,
} from '@/components/ipd/IpdTabs';

import {
  BedGrid,
} from '@/components/ipd/BedGrid';

import {
  IpdBedDialogs,
  type IpdDialogType,
} from '@/components/ipd/IpdBedDialogs';

export function IpdBedManagementPage() {
  const {
    beds,
    patients,
    ehrEvents,
    updateBed,
    updatePatientStatus,
    addEhrEvent,
  } = useApp();

  /* =======================================================
     SAVE ROUND
  ======================================================= */

  const saveRound = async (
    event: EhrEvent
  ) => {
    try {
      await addEhrEvent(event);
    } catch (error) {
      console.error(
        'Failed to save round:',
        error
      );
    }
  };

  /* =======================================================
     FILTER
  ======================================================= */

  const [wardFilter, setWardFilter] =
    useState<WardFilter>('ALL');

  /* =======================================================
     TAB
  ======================================================= */

  const [activeTab, setActiveTab] =
  useState<IpdTab>('BED_MANAGEMENT');

  /* =======================================================
     VIEW MODE
  ======================================================= */

  const [viewMode, setViewMode] =
    useState<ViewMode>('GRID');

  /* =======================================================
     DIALOG
  ======================================================= */

  const [dialog, setDialog] =
    useState<IpdDialogType | null>(
      null
    );

  const [selectedBed, setSelectedBed] =
    useState<Bed | null>(null);

  const [selectedPatient, setSelectedPatient] =
    useState<Patient | null>(null);

  /* =======================================================
     STATS
  ======================================================= */

  const stats = useMemo(() => {
    const occupied =
      beds.filter(
        (bed) =>
          bed.status === 'OCCUPIED'
      ).length;

    const available =
      beds.filter(
        (bed) =>
          bed.status === 'AVAILABLE'
      ).length;

    const occupancy =
      beds.length > 0
        ? Math.round(
            (occupied /
              beds.length) *
              100
          )
        : 0;

    return {
      available,
      occupancy,
    };
  }, [beds]);

  /* =======================================================
     OPEN DIALOG
  ======================================================= */

  const openDialog = (
    type: IpdDialogType,
    bed: Bed,
    patient?: Patient | null
  ) => {
    setSelectedBed(bed);

    setSelectedPatient(
      patient ?? null
    );

    setDialog(type);
  };

  /* =======================================================
     CLOSE DIALOG
  ======================================================= */

  const closeDialog = () => {
    setDialog(null);

    setSelectedBed(null);

    setSelectedPatient(null);
  };

  /* =======================================================
     ASSIGN PATIENT
  ======================================================= */

  const admit = (
    bed: Bed
  ) => {
    openDialog(
      'ASSIGN',
      bed
    );
  };

  const confirmAdmission = async (
    patient: Patient
  ) => {
    if (!selectedBed) {
      return;
    }

    try {
      await updateBed(
        selectedBed.id,
        'OCCUPIED',
        patient
      );

      await updatePatientStatus(
        patient.id,
        'IN CONSULTATION'
      );

      closeDialog();
    } catch (error) {
      console.error(
        'Failed to admit patient:',
        error
      );
    }
  };

  /* =======================================================
     ROUNDS
  ======================================================= */

  const rounds = (
    bed: Bed
  ) => {
    const patient =
      patients.find(
        (item) =>
          item.id ===
          bed.patientId
      ) ?? null;

    openDialog(
      'ROUNDS',
      bed,
      patient
    );
  };

  /* =======================================================
     TRANSFER
  ======================================================= */

  const transfer = (
    bed: Bed
  ) => {
    const patient =
      patients.find(
        (item) =>
          item.id ===
          bed.patientId
      ) ?? null;

    openDialog(
      'TRANSFER',
      bed,
      patient
    );
  };

  const confirmTransfer = async (
    targetBed: Bed
  ) => {
    if (!selectedBed) {
      return;
    }

    if (!selectedBed.patientId) {
      return;
    }

    const patient =
      patients.find(
        (item) =>
          item.id ===
          selectedBed.patientId
      );

    if (!patient) {
      return;
    }

    try {
      await updateBed(
        targetBed.id,
        'OCCUPIED',
        patient
      );

      await updateBed(
        selectedBed.id,
        'CLEANING'
      );

      closeDialog();
    } catch (error) {
      console.error(
        'Failed to transfer patient:',
        error
      );
    }
  };

  /* =======================================================
     DISCHARGE
  ======================================================= */

  const discharge = (
    bed: Bed
  ) => {
    const patient =
      patients.find(
        (item) =>
          item.id ===
          bed.patientId
      ) ?? null;

    openDialog(
      'DISCHARGE',
      bed,
      patient
    );
  };

  const confirmDischarge =
    async () => {
      if (!selectedBed) {
        return;
      }

      try {
        if (
          selectedBed.patientId
        ) {
          await updatePatientStatus(
            selectedBed.patientId,
            'DISCHARGED'
          );
        }

        await updateBed(
          selectedBed.id,
          'CLEANING'
        );

        closeDialog();
      } catch (error) {
        console.error(
          'Failed to discharge patient:',
          error
        );
      }
    };

  /* =======================================================
     MARK CLEAN
  ======================================================= */

  const markClean = async (
    bed: Bed
  ) => {
    try {
      await updateBed(
        bed.id,
        'AVAILABLE'
      );
    } catch (error) {
      console.error(
        'Failed to mark bed available:',
        error
      );
    }
  };

  /* =======================================================
     MARK MAINTENANCE
  ======================================================= */

  const markMaintenance =
    async (
      bed: Bed
    ) => {
      try {
        await updateBed(
          bed.id,
          'MAINTENANCE'
        );
      } catch (error) {
        console.error(
          'Failed to mark bed maintenance:',
          error
        );
      }
    };

  /* =======================================================
     ADD BED
  ======================================================= */

  const addBed = () => {
    console.log(
      'Add bed clicked'
    );
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <IpdStats
        occupancy={
          stats.occupancy
        }
        available={
          stats.available
        }
        avgStay={0}
        revenue={0}
      />

      <IpdTabs
        activeTab={
          activeTab
        }
        viewMode={
          viewMode
        }
        wardFilter={
          wardFilter
        }
        onTabChange={
          setActiveTab
        }
        onViewModeChange={
          setViewMode
        }
        onWardFilterChange={
          setWardFilter
        }
        onAddBed={
          addBed
        }
      />

      <BedGrid
        beds={beds}
        wardFilter={
          wardFilter
        }
        viewMode={
          viewMode
        }
        onAdmit={
          admit
        }
        onDischarge={
          discharge
        }
        onTransfer={
          transfer
        }
        onRounds={
          rounds
        }
        onMarkClean={
          markClean
        }
        onMarkMaintenance={
          markMaintenance
        }
      />

      <IpdBedDialogs
        type={dialog}
        bed={selectedBed}
        patient={
          selectedPatient
        }
        patients={patients}
        beds={beds}
        ehrEvents={ehrEvents}
        onClose={
          closeDialog
        }
        onAssign={
          confirmAdmission
        }
        onTransfer={
          confirmTransfer
        }
        onDischarge={
          confirmDischarge
        }
        onSaveRound={
          saveRound
        }
      />
    </Box>
  );
}