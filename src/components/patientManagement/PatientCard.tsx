import {
  Avatar,
  Box,
  IconButton,
  Typography,
} from "@mui/material";

import {
  Clock3,
  MoreVertical,
  RotateCcw,
  UserRound,
} from "lucide-react";

import type { Patient } from "@/services/mockData";

interface PatientCardProps {
  patient: Patient;
  selected: boolean;
  onClick: () => void;
}

export function PatientCard({
  patient,
  selected,
  onClick,
}: PatientCardProps) {
  const initials =
    `${patient.firstName?.[0] ?? ""}${patient.lastName?.[0] ?? ""}`;

  return (
    <Box
      onClick={onClick}
      sx={{
        display: "grid",
        gridTemplateColumns:
          "100px minmax(200px, 1.3fr) minmax(170px, 1.1fr) 120px 115px 75px",

        alignItems: "center",

        /* Reduced row height */
        minHeight: 68,

        /* Reduced left/right padding */
        px: 1.5,

        borderBottom: "1px solid #eef2f7",

        bgcolor: selected ? "#f8faff" : "#ffffff",

        cursor: "pointer",

        transition: "background-color 0.15s ease",

        "&:hover": {
          bgcolor: "#f8faff",
        },
      }}
    >
      {/* =========================
          PROFILE
      ========================== */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            position: "relative",
          }}
        >
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: "#eef2ff",
              color: "#4f46e5",
              border: "1px solid #e0e7ff",
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            {initials || <UserRound size={18} />}
          </Avatar>

          {/* OPD / IPD */}
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              bottom: -6,
              transform: "translateX(-50%)",

              px: 0.7,
              height: 15,

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              borderRadius: 999,

              bgcolor:
                patient.reason?.toUpperCase().includes("IPD")
                  ? "#f97316"
                  : "#0284c7",

              color: "#ffffff",

              fontSize: 7.5,
              fontWeight: 800,
            }}
          >
            {patient.reason?.toUpperCase().includes("IPD")
              ? "IPD"
              : "OPD"}
          </Box>
        </Box>
      </Box>

      {/* =========================
          PATIENT DETAILS
      ========================== */}
      <Box>
        <Typography
          sx={{
            fontSize: 14,
            lineHeight: 1.25,
            fontWeight: 700,
            color: "#172033",
          }}
        >
          {patient.firstName} {patient.lastName}
        </Typography>

        <Typography
          sx={{
            mt: 0.25,
            fontSize: 10.5,
            color: "#94a3b8",
          }}
        >
          {patient.gender}, {getAge(patient.dateOfBirth)}y • {patient.uhid}
        </Typography>
      </Box>

      {/* =========================
          REASON & DOCTOR
      ========================== */}
      <Box>
        <Typography
          sx={{
            fontSize: 12.5,
            fontWeight: 700,
            color: "#172033",
            lineHeight: 1.25,
          }}
        >
          {patient.reason}
        </Typography>

        <Typography
          sx={{
            mt: 0.25,
            fontSize: 10,
            color: "#94a3b8",
          }}
        >
          ♙ {patient.doctor}
        </Typography>
      </Box>

      {/* =========================
          STATUS
      ========================== */}
      <Box>
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",

            minWidth: 86,
            height: 23,
            px: 1,

            borderRadius: 0.8,

            bgcolor: getStatusBackground(patient.status),
            color: getStatusColor(patient.status),

            fontSize: 9,
            fontWeight: 800,
            letterSpacing: 0.25,
          }}
        >
          {patient.status}
        </Box>
      </Box>

      {/* =========================
          ARRIVAL
      ========================== */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.6,
        }}
      >
        <Clock3
          size={14}
          color="#cbd5e1"
        />

        <Typography
          sx={{
            fontSize: 10.5,
            fontWeight: 600,
            color: "#64748b",
          }}
        >
          {patient.arrival}
        </Typography>
      </Box>

      {/* =========================
          ACTIONS
      ========================== */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.2,
        }}
      >
        <IconButton
          size="small"
          onClick={(event) => {
            event.stopPropagation();
          }}
          sx={{
            width: 26,
            height: 26,
            color: "#cbd5e1",
          }}
        >
          <RotateCcw size={15} />
        </IconButton>

        <IconButton
          size="small"
          onClick={(event) => {
            event.stopPropagation();
          }}
          sx={{
            width: 26,
            height: 26,
            color: "#cbd5e1",
          }}
        >
          <MoreVertical size={16} />
        </IconButton>
      </Box>
    </Box>
  );
}

/* =========================================================
   HELPERS
========================================================= */

function getAge(dateOfBirth: string) {
  if (!dateOfBirth) return "--";

  const birthDate = new Date(dateOfBirth);
  const today = new Date();

  let age =
    today.getFullYear() -
    birthDate.getFullYear();

  const monthDifference =
    today.getMonth() -
    birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 &&
      today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

function getStatusBackground(status: string) {
  switch (status) {
    case "WAITING":
      return "#fff1dc";

    case "VITALS DONE":
      return "#dbeafe";

    case "DISCHARGED":
      return "#f1f5f9";

    case "IN CONSULTATION":
      return "#dcfce7";

    case "COMPLETED":
      return "#dcfce7";

    default:
      return "#f1f5f9";
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "WAITING":
      return "#f97316";

    case "VITALS DONE":
      return "#3b82f6";

    case "DISCHARGED":
      return "#64748b";

    case "IN CONSULTATION":
      return "#059669";

    case "COMPLETED":
      return "#059669";

    default:
      return "#64748b";
  }
}