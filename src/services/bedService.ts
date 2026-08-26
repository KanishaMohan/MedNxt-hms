import {
  beds as mockBeds,
} from './mockData';

import type {
  Bed,
  BedStatus,
  Patient,
} from '@/types';

/**
 * Bed Service
 *
 * Currently uses mock data.
 * Later this service can be connected
 * to the real backend API.
 */

export const bedService = {
  async getBeds(): Promise<Bed[]> {
    return [...mockBeds];
  },

  async getBedById(
    bedId: string
  ): Promise<Bed | undefined> {
    return mockBeds.find(
      (bed) => bed.id === bedId
    );
  },

  async updateBed(
    bedId: string,
    status: BedStatus,
    patient?: Patient
  ): Promise<Bed | undefined> {
    const bed = mockBeds.find(
      (bed) => bed.id === bedId
    );

    if (!bed) {
      return undefined;
    }

    return {
      ...bed,
      status,
      patientId: patient?.id,
      patientName: patient
        ? `${patient.firstName} ${patient.lastName}`
        : undefined,
    };
  },
};