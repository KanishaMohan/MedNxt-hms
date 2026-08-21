import { useState } from 'react';

export function usePatientSelection() {
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  return { selectedPatientId, setSelectedPatientId };
}
