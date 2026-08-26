import {
  Box,
  Card,
  Typography,
} from "@mui/material";

import {
  CheckCircle2,
  Clock3,
  FileText,
  UserRound,
} from "lucide-react";

import type { Patient } from "@/types";

interface PatientDetailsProps {
  patient: Patient;
}

export function PatientDetails({
  patient,
}: PatientDetailsProps) {
  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: 1.5,
        border: "1px solid #c7d2fe",
        bgcolor: "#f8f9ff",
        boxShadow: "none",
        p: 1.6,
      }}
    >
      {/* HEADER */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.8,
          mb: 1.2,
        }}
      >
        <UserRound
          size={16}
          color="#4f46e5"
        />

        <Typography
          sx={{
            fontSize: 11,
            fontWeight: 800,
            color: "#3730a3",
            letterSpacing: 0.4,
          }}
        >
          EXISTING PATIENT FOUND
        </Typography>
      </Box>

      {/* PATIENT NAME */}

      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 800,
          color: "#1e293b",
        }}
      >
        {patient.firstName}{" "}
        {patient.lastName}
      </Typography>

      {/* UHID */}

      <Typography
        sx={{
          mt: 0.25,
          fontSize: 10,
          color: "#64748b",
        }}
      >
        UHID: {patient.uhid}
      </Typography>

      {/* DIVIDER */}

      <Box
        sx={{
          height: "1px",
          bgcolor: "#e0e7ff",
          my: 1.2,
        }}
      />

      {/* STATUS */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.7,
          mb: 0.8,
        }}
      >
        <CheckCircle2
          size={13}
          color="#16a34a"
        />

        <Typography
          sx={{
            fontSize: 10,
            fontWeight: 700,
            color: "#475569",
          }}
        >
          Status
        </Typography>

        <Typography
          sx={{
            ml: "auto",
            fontSize: 10,
            fontWeight: 800,
            color: "#16a34a",
          }}
        >
          {patient.status}
        </Typography>
      </Box>

      {/* LAST VISIT / ARRIVAL */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.7,
          mb: 0.8,
        }}
      >
        <Clock3
          size={13}
          color="#6366f1"
        />

        <Typography
          sx={{
            fontSize: 10,
            color: "#64748b",
          }}
        >
          Arrival
        </Typography>

        <Typography
          sx={{
            ml: "auto",
            fontSize: 10,
            fontWeight: 700,
            color: "#334155",
          }}
        >
          {patient.arrival}
        </Typography>
      </Box>

      {/* REASON */}

      <Box
        sx={{
          mt: 1,
          p: 1,
          borderRadius: 1,
          bgcolor: "#ffffff",
          border:
            "1px solid #e2e8f0",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.6,
            mb: 0.35,
          }}
        >
          <FileText
            size={12}
            color="#64748b"
          />

          <Typography
            sx={{
              fontSize: 9.5,
              fontWeight: 700,
              color: "#64748b",
            }}
          >
            REASON
          </Typography>
        </Box>

        <Typography
          sx={{
            fontSize: 10,
            color: "#334155",
            lineHeight: 1.4,
          }}
        >
          {patient.reason || "No previous reason available"}
        </Typography>
      </Box>
    </Card>
  );
}