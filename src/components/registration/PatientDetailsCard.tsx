import {
  Box,
  Card,
  Typography,
} from "@mui/material";

import {
  UserRound,
  Clock3,
  FileText,
} from "lucide-react";

import type { Patient } from "@/types";

interface PatientDetailsCardProps {
  patient: Patient;
}

export function PatientDetailsCard({
  patient,
}: PatientDetailsCardProps) {
  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: 1.5,
        border:
          "1px solid #c7d2fe",
        bgcolor: "#eef2ff",
        boxShadow: "none",
        p: 1.5,
      }}
    >
      {/* =================================================
          HEADER
      ================================================= */}

      <Box
        sx={{
          display: "flex",
          justifyContent:
            "center",
          mb: 0.8,
        }}
      >
        <Box
          sx={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            bgcolor: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent:
              "center",
            border:
              "1px solid #c7d2fe",
          }}
        >
          <UserRound
            size={20}
            color="#4f46e5"
          />
        </Box>
      </Box>

      <Typography
        sx={{
          textAlign: "center",
          fontSize: 11,
          fontWeight: 800,
          color: "#3730a3",
        }}
      >
        Existing Patient Found
      </Typography>

      <Typography
        sx={{
          textAlign: "center",
          mt: 0.25,
          fontSize: 9.5,
          color: "#64748b",
        }}
      >
        UHID: {patient.uhid}
      </Typography>

      {/* =================================================
          DETAILS
      ================================================= */}

      <Box
        sx={{
          mt: 1.2,
          p: 1,
          bgcolor: "#ffffff",
          borderRadius: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems:
              "flex-start",
            gap: 0.6,
          }}
        >
          <Clock3
            size={12}
            color="#6366f1"
            style={{
              marginTop: 2,
              flexShrink: 0,
            }}
          />

          <Box>
            <Typography
              sx={{
                fontSize: 9.5,
                fontWeight: 700,
                color: "#475569",
              }}
            >
              Last Visit
            </Typography>

            <Typography
              sx={{
                mt: 0.2,
                fontSize: 9.5,
                color: "#64748b",
              }}
            >
              {patient.arrival ||
                "Previous Visit"}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            mt: 1,
            display: "flex",
            alignItems:
              "flex-start",
            gap: 0.6,
          }}
        >
          <FileText
            size={12}
            color="#6366f1"
            style={{
              marginTop: 2,
              flexShrink: 0,
            }}
          />

          <Box>
            <Typography
              sx={{
                fontSize: 9.5,
                fontWeight: 700,
                color: "#475569",
              }}
            >
              Reason
            </Typography>

            <Typography
              sx={{
                mt: 0.2,
                fontSize: 9.5,
                color: "#64748b",
              }}
            >
              {patient.reason ||
                "No previous reason"}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}