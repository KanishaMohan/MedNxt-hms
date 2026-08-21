import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { beds as initialBeds, patients as initialPatients, type Bed, type Patient, type PatientStatus } from '@/services/mockData';

interface AppContextValue { patients: Patient[]; beds: Bed[]; selectedPatient: Patient | null; selectPatient: (patient: Patient | null) => void; addPatient: (patient: Patient) => void; updatePatientStatus: (id: string, status: PatientStatus) => void; updateBed: (id: string, status: Bed['status'], patient?: Patient) => void; }
const AppContext = createContext<AppContextValue | undefined>(undefined);
export function AppProvider({ children }: { children: ReactNode }) {
  const [patients, setPatients] = useState(initialPatients); const [beds, setBeds] = useState(initialBeds); const [selectedPatient, setSelectedPatient] = useState<Patient | null>(initialPatients[0]);
  const value = useMemo(() => ({ patients, beds, selectedPatient, selectPatient: setSelectedPatient, addPatient: (patient: Patient) => setPatients((items) => [patient, ...items]), updatePatientStatus: (id: string, status: PatientStatus) => setPatients((items) => items.map((item) => item.id === id ? { ...item, status } : item)), updateBed: (id: string, status: Bed['status'], patient?: Patient) => setBeds((items) => items.map((bed) => bed.id === id ? { ...bed, status, patientId: patient?.id, patientName: patient ? `${patient.firstName} ${patient.lastName}` : undefined } : bed)) }), [patients, beds, selectedPatient]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
export function useApp() { const context = useContext(AppContext); if (!context) throw new Error('AppProvider is missing'); return context; }
