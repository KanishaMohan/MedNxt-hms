import {
  Box,
  Button,
  Chip,
  Typography,
} from "@mui/material";
import { ehrEvents } from "@/services/mockData";
import { Download, UserRound } from "lucide-react";

import type { Patient } from "@/types";
interface PatientHistoryHeaderProps {
  patient: Patient | null;
}

export function PatientHistoryHeader({
  patient,
}: PatientHistoryHeaderProps) {
  if (!patient) return null;

  const fullName = `${patient.firstName} ${patient.lastName}`;

  return (
    <Box
  sx={{
    height: 175,
    px: { xs: 2, md: 3 },
    pt: 2.5,
    pb: 1,

        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",

        borderBottom: "1px solid #eef2f7",
        bgcolor: "#ffffff",
      }}
    >
      {/* =====================================================
          LEFT - PATIENT INFORMATION
      ====================================================== */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 2,
          minWidth: 0,
        }}
      >
        {/* Avatar */}
        <Box
          sx={{
            width: 54,
            height: 54,
            borderRadius: "50%",

            bgcolor: "#eef2ff",
            border: "1px solid #e2e8f0",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            flexShrink: 0,
          }}
        >
          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 500,
              color: "#4f46e5",
            }}
          >
            {patient.firstName?.charAt(0)?.toUpperCase()}
          </Typography>
        </Box>

        {/* Patient Info */}
        <Box sx={{ minWidth: 0 }}>
          {/* Name */}
          <Typography
            sx={{
              fontSize: 22,
              lineHeight: 1.1,
              fontWeight: 700,
              color: "#172033",
              mb: 0.8,
            }}
          >
            {fullName}
          </Typography>

          {/* UHID + Gender */}
          <Box
  sx={{
    display: "flex",
    alignItems: "center",
    gap: 1.2,
    flexWrap: "wrap",
    mb: 1,
  }}
>
            <Box
              sx={{
                px: 1.1,
                py: 0.45,
                borderRadius: 0.8,
                bgcolor: "#f8fafc",
              }}
            >
              <Typography
                sx={{
                  fontSize: 11,
                  color: "#64748b",
                  fontWeight: 500,
                }}
              >
                {patient.uhid}
              </Typography>
            </Box>

            <Typography
              sx={{
                fontSize: 11,
                color: "#64748b",
              }}
            >
              •
            </Typography>

            <Typography
              sx={{
                fontSize: 11,
                color: "#64748b",
              }}
            >
              {patient.gender}
            </Typography>

            <Typography
              sx={{
                fontSize: 11,
                color: "#64748b",
              }}
            >
              •
            </Typography>

            {/* Use existing mock-data field instead of department */}
            <Box
  sx={{
    display: "flex",
    alignItems: "center",
    gap: 0.6,
  }}
>
              <UserRound
                size={15}
                strokeWidth={1.7}
                color="#94a3b8"
              />

              <Typography
                sx={{
                  fontSize: 13,
                  color: "#64748b",
                }}
              >
                {patient.doctor}
              </Typography>
            </Box>
          </Box>

          {/* Allergy */}
          <Chip
            label={
              patient.bloodGroup
                ? `BLOOD GROUP: ${patient.bloodGroup}`
                : "NO ALLERGY RECORDED"
            }
            size="small"
            sx={{
              height: 28,
              borderRadius: 1,

              bgcolor: "#fff1f2",
              border: "1px solid #fecdd3",
              color: "#dc2626",

              fontSize: 10,
              fontWeight: 700,

              "& .MuiChip-label": {
                px: 1.2,
              },
            }}
          />
        </Box>
      </Box>

      {/* =====================================================
          RIGHT - EXPORT
      ====================================================== */}
      <Button
  variant="contained"
  startIcon={<Download size={17} />}
  onClick={() => {
    const patientEvents = ehrEvents.filter(
      (event) => event.patientId === patient.id
    );

    const content = `
MEDNXt HOSPITALS
PATIENT EMR
==============================

Patient Name: ${fullName}
UHID: ${patient.uhid}
Gender: ${patient.gender}
Doctor: ${patient.doctor || "Not Available"}
Blood Group: ${patient.bloodGroup || "Not Available"}
Mobile: ${patient.mobile}

MEDICAL HISTORY
==============================

${patientEvents
  .map(
    (event) => `
${event.title}
Type: ${event.type}
Doctor: ${event.doctor}
Date: ${new Date(event.date).toLocaleString()}
Description: ${event.description}
`
  )
  .join("\n------------------------------\n")}

==============================
Generated by MedNxt Hospitals
`;

    const blob = new Blob([content], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${fullName.replace(/\s+/g, "_")}_EMR.txt`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }}
  sx={{
    minWidth: 140,
    height: 40,
    px: 2,
    borderRadius: 1,
    bgcolor: "#172033",
    textTransform: "none",
    fontSize: 13,
    fontWeight: 700,
    boxShadow: "none",
    flexShrink: 0,

    "&:hover": {
      bgcolor: "#111827",
      boxShadow: "none",
    },
  }}
>
  Export EMR
</Button>
    </Box>
  );
}