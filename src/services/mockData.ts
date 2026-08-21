export type Role = 'Reception' | 'Doctor' | 'Nurse' | 'Admin';
export type PatientStatus = 'WAITING' | 'IN CONSULTATION' | 'COMPLETED' | 'DISCHARGED' | 'VITALS DONE' | 'CHECKED IN';
export type BedStatus = 'AVAILABLE' | 'OCCUPIED' | 'CLEANING' | 'MAINTENANCE';

export interface Patient { id: string; uhid: string; firstName: string; lastName: string; dateOfBirth: string; gender: 'Male' | 'Female' | 'Other'; bloodGroup: string; mobile: string; email: string; address: string; priority: 'High' | 'Medium' | 'Low'; status: PatientStatus; doctor: string; reason: string; arrival: string; vitals?: Vital; }
export interface Vital { temperature: number; bloodPressure: string; pulse: number; spo2: number; weight: number; height: number; }
export interface Bed { id: string; number: string; ward: string; type: string; floor: number; status: BedStatus; patientId?: string; patientName?: string; }
export interface EhrEvent { id: string; patientId: string; type: string; title: string; description: string; doctor: string; date: string; }

export const doctors = ['Dr. Sharma', 'Dr. Gupta', 'Dr. Ahmed'];
export const patients: Patient[] = [
  { id: 'patient-001', uhid: 'ABHA-1234', firstName: 'Rahul', lastName: 'Verma', dateOfBirth: '1990-05-12', gender: 'Male', bloodGroup: 'B+', mobile: '9876543210', email: 'rahul@example.com', address: 'Chennai', priority: 'High', status: 'DISCHARGED', doctor: 'Dr. Sharma', reason: 'High Fever & Chills', arrival: '09:15 AM', vitals: { temperature: 101.2, bloodPressure: '140/90', pulse: 96, spo2: 97, weight: 72, height: 170 } },
  { id: 'patient-002', uhid: 'ABHA-5678', firstName: 'Priya', lastName: 'Sharma', dateOfBirth: '1998-11-04', gender: 'Female', bloodGroup: 'O+', mobile: '9123456780', email: 'priya@example.com', address: 'Bengaluru', priority: 'High', status: 'WAITING', doctor: 'Dr. Sharma', reason: 'Severe Abdominal Pain', arrival: '09:30 AM' },
  { id: 'patient-003', uhid: 'ABHA-9012', firstName: 'Amit', lastName: 'Patel', dateOfBirth: '1961-08-21', gender: 'Male', bloodGroup: 'A+', mobile: '9988776655', email: 'amit@example.com', address: 'Mumbai', priority: 'Medium', status: 'VITALS DONE', doctor: 'Dr. Sharma', reason: 'Diabetes Follow-up', arrival: '09:45 AM' },
  { id: 'patient-004', uhid: 'ABHA-3456', firstName: 'Sujata', lastName: 'Rao', dateOfBirth: '1964-03-19', gender: 'Female', bloodGroup: 'AB+', mobile: '8877665544', email: 'sujata@example.com', address: 'Hyderabad', priority: 'Low', status: 'CHECKED IN', doctor: 'Dr. Gupta', reason: 'Joint Pain', arrival: '10:00 AM' },
  { id: 'patient-005', uhid: 'ABHA-7890', firstName: 'Vikram', lastName: 'Singh', dateOfBirth: '1972-06-22', gender: 'Male', bloodGroup: 'B+', mobile: '7766554433', email: 'vikram@example.com', address: 'Delhi', priority: 'High', status: 'WAITING', doctor: 'Dr. Sharma', reason: 'Chest Pain', arrival: '10:05 AM' },
];

export const beds: Bed[] = [
  { id: 'bed-101', number: 'G-101', ward: 'General Ward Male', type: 'General', floor: 1, status: 'AVAILABLE' },
  { id: 'bed-102', number: 'G-102', ward: 'General Ward Male', type: 'General', floor: 1, status: 'OCCUPIED', patientId: 'patient-005', patientName: 'Rahul Verma' },
  { id: 'bed-103', number: 'G-103', ward: 'General Ward Male', type: 'General', floor: 1, status: 'CLEANING' },
  { id: 'bed-104', number: 'G-104', ward: 'General Ward Male', type: 'General', floor: 1, status: 'AVAILABLE' },
  { id: 'bed-201', number: 'G-201', ward: 'General Ward Female', type: 'General', floor: 2, status: 'AVAILABLE' },
  { id: 'bed-202', number: 'G-202', ward: 'General Ward Female', type: 'General', floor: 2, status: 'AVAILABLE' },
  { id: 'bed-301', number: 'P-301', ward: 'Private Ward', type: 'Private', floor: 3, status: 'AVAILABLE' },
  { id: 'bed-302', number: 'P-302', ward: 'Private Ward', type: 'Private', floor: 3, status: 'OCCUPIED', patientId: 'patient-004', patientName: 'Vikram Singh' },
];

export const ehrEvents: EhrEvent[] = [
  { id: 'ehr-1', patientId: 'patient-001', type: 'DISCHARGE', title: 'Discharge', description: 'Patient discharged. Vitals stable. Prescribed home meds.', doctor: 'Dr. Sharma', date: '2023-10-15T20:00:00' },
  { id: 'ehr-2', patientId: 'patient-001', type: 'LABORATORY', title: 'Lab Report', description: 'Blood Test Results: WBC Normal, Platelets 1.5L, Malaria Negative.', doctor: 'Lab Tech', date: '2023-10-14T15:30:00' },
  { id: 'ehr-3', patientId: 'patient-001', type: 'CONSULTATION', title: 'Doctor Consultation', description: 'Consultation for fever and cough.', doctor: 'Dr. Sharma', date: '2023-10-13T10:00:00' },
  { id: 'ehr-4', patientId: 'patient-001', type: 'VITALS', title: 'Vitals Recorded', description: 'Temperature 101.2 F, pulse 96, blood pressure 140/90.', doctor: 'Nurse Anjali', date: '2023-10-13T09:30:00' },
];


// ===============================
// Dashboard Mock Data
// ===============================

export const dashboardKpis = {
  totalWalkIns: 312,
  walkInsChange: "+24% vs Avg Daily",

  activeInFacility: 145,
  activeInFacilityLabel: "Current Crowd Load",

  averageWaitTime: "55 min",
  averageWaitTarget: "Target: <45 min",

  estimatedRevenue: "₹2.45L",
  revenuePerPatient: "₹2100 Patient Avg",
};

export const patientFlowPipeline = [
  {
    name: "Registration",
    value: 312,
    capacity: 78,
    color: "#6366f1",
  },
  {
    name: "Vitals / Triage",
    value: 285,
    capacity: 85,
    color: "#6366f1",
  },
  {
    name: "Dr. Consult",
    value: 190,
    capacity: 98,
    color: "#ef4444",
    alert: true,
  },
  {
    name: "Diagnostics",
    value: 85,
    capacity: 60,
    color: "#6366f1",
  },
  {
    name: "Pharmacy",
    value: 120,
    capacity: 45,
    color: "#6366f1",
  },
];

export const patientArrivalTrend = [
  { time: "06:00", patients: 24 },
  { time: "07:00", patients: 29 },
  { time: "08:00", patients: 42 },
  { time: "09:00", patients: 65 },
  { time: "10:00", patients: 75 },
  { time: "11:00", patients: 50 },
  { time: "12:00", patients: 30 },
  { time: "13:00", patients: 28 },
  { time: "14:00", patients: 31 },
  { time: "15:00", patients: 33 },
  { time: "16:00", patients: 31 },
  { time: "17:00", patients: 27 },
  { time: "18:00", patients: 25 },
];

export const departmentLoad = [
  {
    name: "Gen Med",
    patients: 145,
    status: "Critical Load",
    color: "#ef4444",
  },
  {
    name: "Pediatrics",
    patients: 65,
    status: "High Load",
    color: "#f97316",
  },
  {
    name: "Ortho",
    patients: 45,
    status: "Normal Load",
    color: "#22c55e",
  },
  {
    name: "ENT",
    patients: 30,
    status: "Under Load",
    color: "#6366f1",
  },
  {
    name: "Gynae",
    patients: 27,
    status: "Normal Load",
    color: "#22c55e",
  },
];

export const resourceStatus = {
  doctors: {
    available: 12,
    total: 15,
  },
  beds: {
    occupiedPercentage: 98,
  },
};

export const revenueClassification = [
  {
    name: "OPD Consult",
    amount: 98000,
    percentage: 40,
    color: "#6366f1",
  },
  {
    name: "IPD Charges",
    amount: 65000,
    percentage: 27,
    color: "#8b5cf6",
  },
  {
    name: "Pharmacy",
    amount: 45000,
    percentage: 18,
    color: "#06b6d4",
  },
  {
    name: "Laboratory",
    amount: 37000,
    percentage: 15,
    color: "#22c55e",
  },
];

export const patientClassification = [
  {
    name: "New Patients",
    value: 58,
    color: "#6366f1",
  },
  {
    name: "Returning",
    value: 42,
    color: "#c7d2fe",
  },
];