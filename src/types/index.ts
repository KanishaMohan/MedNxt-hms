export type Role =
  | 'Reception'
  | 'Doctor'
  | 'Nurse'
  | 'Admin';

export type PatientStatus =
  | 'WAITING'
  | 'IN CONSULTATION'
  | 'COMPLETED'
  | 'DISCHARGED'
  | 'VITALS DONE'
  | 'CHECKED IN';

export type BedStatus =
  | 'AVAILABLE'
  | 'OCCUPIED'
  | 'CLEANING'
  | 'MAINTENANCE';

export type Gender =
  | 'Male'
  | 'Female'
  | 'Other';

export type PatientPriority =
  | 'High'
  | 'Medium'
  | 'Low';

export interface Vital {
  temperature: number;
  bloodPressure: string;
  pulse: number;
  spo2: number;
  weight: number;
  height: number;
}

export interface Patient {
  id: string;
  uhid: string;

  firstName: string;
  lastName: string;

  dateOfBirth: string;

  gender: Gender;

  bloodGroup: string;

  mobile: string;
  email: string;
  address: string;
  photoUrl?: string | null;

  priority: PatientPriority;

  status: PatientStatus;

  doctor: string;
  reason: string;
  arrival: string;

  vitals?: Vital;
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

export interface DashboardKpis {
  totalWalkIns: number;
  walkInsChange: string;
  activeInFacility: number;
  activeInFacilityLabel: string;
  averageWaitTime: string;
  averageWaitTarget: string;
  estimatedRevenue: string;
  revenuePerPatient: string;
}
export interface RevenueClassificationItem {
  name: string;
  amount: number;
  percentage: number;
  color: string;
}
export interface PatientClassificationItem {
  name: string;
  value: number;
  color: string;
}
export interface DashboardHeaderData {
  alertLabel: string;
  activePatientMessage: string;
  temperature: string;
  weather: string;
  averageTat: string;
}
export interface AITrafficAuditInsight {
  title: string;
  description: string;
}

export interface AITrafficAudit {
  title: string;
  summary: string;
  insights: AITrafficAuditInsight[];
}