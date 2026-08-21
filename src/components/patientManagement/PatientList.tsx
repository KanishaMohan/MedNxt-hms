import { Box, Typography } from "@mui/material";

import type { Patient } from "@/services/mockData";

import { PatientCard } from "./PatientCard";

interface PatientListProps {
  patients: Patient[];
  selectedPatient: Patient | null;
  onSelect: (patient: Patient) => void;
}

export function PatientList({
  patients,
  selectedPatient,
  onSelect,
}: PatientListProps) {
  return (
    <Box>
      {/* Table Header */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns:
            "110px minmax(210px, 1.3fr) minmax(180px, 1.1fr) 130px 120px 90px",
          alignItems: "center",
          minWidth: 900,
          px: 3,
          height: 44,
          borderBottom: "1px solid #eef2f7",
          bgcolor: "#ffffff",
        }}
      >
        {[
          "PROFILE",
          "PATIENT DETAILS",
          "REASON & DEPT",
          "STATUS",
          "ARRIVAL",
          "ACTIONS",
        ].map((heading) => (
          <Typography
            key={heading}
            sx={{
              fontSize: 9.5,
              fontWeight: 700,
              color: "#94a3b8",
              letterSpacing: 0.7,
            }}
          >
            {heading}
          </Typography>
        ))}
      </Box>

      {/* Rows */}
      <Box
        sx={{
          overflowX: "auto",
        }}
      >
        {patients.length > 0 ? (
          patients.map((patient) => (
            <PatientCard
              key={patient.id}
              patient={patient}
              selected={selectedPatient?.id === patient.id}
              onClick={() => onSelect(patient)}
            />
          ))
        ) : (
          <Box
            sx={{
              py: 6,
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: 13,
                color: "#94a3b8",
              }}
            >
              No patients found.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}