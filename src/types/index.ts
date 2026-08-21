export type Role = 'Reception' | 'Doctor' | 'Nurse' | 'Admin';
export type PatientStatus = 'WAITING' | 'IN CONSULTATION' | 'COMPLETED' | 'DISCHARGED' | 'VITALS DONE' | 'CHECKED IN';
export type BedStatus = 'AVAILABLE' | 'OCCUPIED' | 'CLEANING' | 'MAINTENANCE';

export interface Patient {
  id: string;
  uhid: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup: string;
  mobile: string;
  email: string;
  address: string;
  priority: 'High' | 'Medium' | 'Low';
  status: PatientStatus;
  doctor: string;
  reason: string;
  arrival: string;
  vitals?: Vital;
}

export interface Vital {
  temperature: number;
  bloodPressure: string;
  pulse: number;
  spo2: number;
  weight: number;
  height: number;
}

export interface Bed {
  id: string;
  number: string;
  ward: string;
  type: string;
  floor: number;
  status: BedStatus;
  patientId?: string;
  patientName?: string;
}

export interface EhrEvent {
  id: string;
  patientId: string;
  type: string;
  title: string;
  description: string;
  doctor: string;
  date: string;
}
