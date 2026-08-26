import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import type {
  Bed,
  Patient,
  PatientStatus,
  EhrEvent,
} from '@/types';

import { patientService } from '@/services/patientService';
import { bedService } from '@/services/bedService';

import { ehrEvents as mockEhrEvents } from '@/services/mockData';

interface AppContextValue {
  patients: Patient[];
  beds: Bed[];
  ehrEvents: EhrEvent[];

  selectedPatient: Patient | null;

  loading: boolean;

  selectPatient: (
    patient: Patient | null
  ) => void;

  addPatient: (
    patient: Patient
  ) => Promise<void>;

  updatePatientStatus: (
    id: string,
    status: PatientStatus
  ) => Promise<void>;

  updateBed: (
    id: string,
    status: Bed['status'],
    patient?: Patient
  ) => Promise<void>;

  addEhrEvent: (
    event: EhrEvent
  ) => Promise<void>;
}

const AppContext =
  createContext<AppContextValue | undefined>(
    undefined
  );

export function AppProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [patients, setPatients] =
    useState<Patient[]>([]);

  const [beds, setBeds] =
    useState<Bed[]>([]);

  const [ehrEvents, setEhrEvents] =
    useState<EhrEvent[]>(
      [...mockEhrEvents]
    );

  const [selectedPatient, setSelectedPatient] =
    useState<Patient | null>(null);

  const [loading, setLoading] =
    useState(true);

  // ==============================
  // INITIAL DATA LOAD
  // ==============================

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        const [
          patientData,
          bedData,
        ] = await Promise.all([
          patientService.getPatients(),
          bedService.getBeds(),
        ]);

        setPatients(patientData);
        setBeds(bedData);

        // if (patientData.length > 0) {
        //   setSelectedPatient(
        //     patientData[0]
        //   );
        // }
      } catch (error) {
        console.error(
          'Failed to load application data:',
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // ==============================
  // PATIENT
  // ==============================

  const addPatient = async (
    patient: Patient
  ) => {
    try {
      const newPatient =
        await patientService.createPatient(
          patient
        );

      setPatients(
        (currentPatients) => [
          newPatient,
          ...currentPatients,
        ]
      );
    } catch (error) {
      console.error(
        'Failed to add patient:',
        error
      );

      throw error;
    }
  };

  const updatePatientStatus = async (
    id: string,
    status: PatientStatus
  ) => {
    try {
      const updatedPatient =
        await patientService.updatePatientStatus(
          id,
          status
        );

      if (!updatedPatient) {
        return;
      }

      setPatients(
        (currentPatients) =>
          currentPatients.map(
            (patient) =>
              patient.id === id
                ? updatedPatient
                : patient
          )
      );

      setSelectedPatient(
        (currentPatient) =>
          currentPatient?.id === id
            ? updatedPatient
            : currentPatient
      );
    } catch (error) {
      console.error(
        'Failed to update patient status:',
        error
      );

      throw error;
    }
  };

  // ==============================
  // BED
  // ==============================

  const updateBed = async (
    id: string,
    status: Bed['status'],
    patient?: Patient
  ) => {
    try {
      const updatedBed =
        await bedService.updateBed(
          id,
          status,
          patient
        );

      if (!updatedBed) {
        return;
      }

      setBeds(
        (currentBeds) =>
          currentBeds.map(
            (bed) =>
              bed.id === id
                ? updatedBed
                : bed
          )
      );
    } catch (error) {
      console.error(
        'Failed to update bed:',
        error
      );

      throw error;
    }
  };

  // ==============================
  // EHR / TREATMENT HISTORY
  // ==============================

  const addEhrEvent = async (
    event: EhrEvent
  ) => {
    setEhrEvents(
      (currentEvents) => [
        event,
        ...currentEvents,
      ]
    );
  };

  // ==============================
  // CONTEXT VALUE
  // ==============================

  const value =
    useMemo<AppContextValue>(
      () => ({
        patients,
        beds,
        ehrEvents,

        selectedPatient,

        loading,

        selectPatient:
          setSelectedPatient,

        addPatient,

        updatePatientStatus,

        updateBed,

        addEhrEvent,
      }),
      [
        patients,
        beds,
        ehrEvents,
        selectedPatient,
        loading,
      ]
    );

  return (
    <AppContext.Provider
      value={value}
    >
      {children}
    </AppContext.Provider>
  );
}

// ==============================
// CUSTOM HOOK
// ==============================

export function useApp() {
  const context =
    useContext(AppContext);

  if (!context) {
    throw new Error(
      'useApp must be used inside AppProvider'
    );
  }

  return context;
}