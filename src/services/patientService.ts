import {
  patients as mockPatients,
} from './mockData';

import type {
  Patient,
  PatientStatus,
} from '@/types';

/**
 * Patient Service
 *
 * Currently uses mock data.
 * Later this service can be connected to
 * the real backend API without changing
 * the UI components.
 */

export const patientService = {
  async getPatients(): Promise<Patient[]> {
    return [...mockPatients];
  },

  async getPatientById(
    patientId: string
  ): Promise<Patient | undefined> {
    return mockPatients.find(
      (patient) => patient.id === patientId
    );
  },

  async createPatient(
    patient: Patient
  ): Promise<Patient> {
    return patient;
  },

  async updatePatientStatus(
    patientId: string,
    status: PatientStatus
  ): Promise<Patient | undefined> {
    const patient = mockPatients.find(
      (patient) => patient.id === patientId
    );

    if (!patient) {
      return undefined;
    }

    return {
      ...patient,
      status,
    };
  },
};