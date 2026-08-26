import { Box, Chip, InputAdornment, TextField, Typography } from "@mui/material";
import { Search, Clock3 } from "lucide-react";

import type { Patient } from "@/types";
interface PatientHistorySidebarProps {
  patients: Patient[];
  selectedPatient: Patient | null;
  search: string;
  onSearchChange: (value: string) => void;
  onSelect: (patient: Patient) => void;
}

export function PatientHistorySidebar({
  patients,
  selectedPatient,
  search,
  onSearchChange,
  onSelect,
}: PatientHistorySidebarProps) {
  return (
    <Box
      sx={{
        width: 394,
        flexShrink: 0,
        borderRight: "1px solid #e5e7eb",
        bgcolor: "#ffffff",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 2.5,
          pt: 2.5,
          pb: 1.5,
        }}
      >
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: 700,
            color: "#172033",
            mb: 2,
          }}
        >
          Patient Records
        </Typography>

        {/* Search */}
        <TextField
          fullWidth
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search Name, UHID or Mobile..."
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              height: 44,
              borderRadius: 1.2,
              bgcolor: "#ffffff",
              fontSize: 13,
            },

            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#dfe5ee",
            },

            "& .MuiInputBase-input::placeholder": {
              color: "#94a3b8",
              opacity: 1,
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={17} color="#94a3b8" />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      {/* Patient List */}
      <Box
        sx={{
          overflowY: "auto",
          height: "calc(100% - 130px)",
        }}
      >
        {patients.map((patient) => {
          const selected = selectedPatient?.id === patient.id;

          return (
            <Box
              key={patient.id}
              onClick={() => onSelect(patient)}
              sx={{
                px: 2.5,
                py: 2,
                minHeight: 112,
                cursor: "pointer",

                bgcolor: selected ? "#f5f7ff" : "#ffffff",

                borderBottom: "1px solid #eef2f7",

                borderLeft: selected
                  ? "4px solid #4f46e5"
                  : "4px solid transparent",

                "&:hover": {
                  bgcolor: selected ? "#f5f7ff" : "#fafbff",
                },
              }}
            >
              {/* Name + UHID */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 1,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#172033",
                  }}
                >
                  {patient.firstName} {patient.lastName}
                </Typography>

                <Chip
                  label={patient.uhid}
                  size="small"
                  sx={{
                    height: 25,
                    borderRadius: 0.8,
                    bgcolor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    color: "#64748b",
                    fontSize: 10,
                    fontWeight: 500,
                  }}
                />
              </Box>

              {/* Age / Gender / Mobile */}
              <Typography
                sx={{
                  mt: 0.6,
                  fontSize: 13,
                  color: "#64748b",
                }}
              >
                {patient.gender} • {patient.mobile}
              </Typography>

              {/* Status + event count */}
              <Box
                sx={{
                  mt: 1.2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Chip
                  label={patient.status}
                  size="small"
                  sx={{
                    height: 22,
                    borderRadius: 1,
                    fontSize: 9,
                    fontWeight: 700,
                    bgcolor:
                      patient.status === "WAITING"
                        ? "#dbeafe"
                        : patient.status === "DISCHARGED"
                        ? "#e5e7eb"
                        : patient.status === "VITALS DONE"
                        ? "#dcfce7"
                        : "#e0e7ff",
                    color:
                      patient.status === "WAITING"
                        ? "#2563eb"
                        : patient.status === "DISCHARGED"
                        ? "#475569"
                        : patient.status === "VITALS DONE"
                        ? "#16a34a"
                        : "#4f46e5",
                  }}
                />

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.4,
                    color: "#94a3b8",
                  }}
                >
                  <Clock3 size={13} />
                  <Typography sx={{ fontSize: 11 }}>
                    0
                  </Typography>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}