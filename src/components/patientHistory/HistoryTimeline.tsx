import { Box, Chip, Typography } from "@mui/material";

import {
  CheckCircle,
  FlaskConical,
  HeartPulse,
  Home,
  Pill,
  Stethoscope,
} from "lucide-react";

import type {
  EhrEvent,
  Patient,
} from "@/types";

interface HistoryTimelineProps {
  events: EhrEvent[];
  patients: Patient[];
}

const typeIcon: Record<
  string,
  typeof Stethoscope
> = {
  CONSULTATION: Stethoscope,
  PRESCRIPTION: Pill,
  LABORATORY: FlaskConical,
  ADMISSION: Home,
  DISCHARGE: Home,
  VITALS: HeartPulse,
};

const typeColor: Record<string, string> = {
  CONSULTATION: "#4f46e5",
  PRESCRIPTION: "#16a34a",
  LABORATORY: "#f97316",
  ADMISSION: "#0e7490",
  DISCHARGE: "#16a34a",
  VITALS: "#dc2626",
};

export function HistoryTimeline({
  events,
  patients,
}: HistoryTimelineProps) {
  return (
    <Box
      sx={{
        px: {
          xs: 2,
          md: 3,
        },

        pt: 1,
        pb: 4,

        bgcolor: "#f8fafc",
      }}
    >
      {events.map((event, index) => {
        const Icon =
          typeIcon[event.type] ||
          Stethoscope;

        const color =
          typeColor[event.type] ||
          "#4f46e5";

        const patient =
          patients.find(
            (p) =>
              p.id === event.patientId
          );

        const isLast =
          index === events.length - 1;

        return (
          <Box
            key={event.id}
            sx={{
              display: "flex",
              position: "relative",

              minWidth: 0,

              mb: isLast ? 0 : 2,
            }}
          >
            {/* =================================================
                TIMELINE ICON + LINE
            ================================================== */}
            <Box
              sx={{
                width: 52,

                flexShrink: 0,

                display: "flex",
                flexDirection: "column",
                alignItems: "center",

                position: "relative",
              }}
            >
              {/* Icon Circle */}
              <Box
                sx={{
                  width: 38,
                  height: 38,

                  borderRadius: "50%",

                  bgcolor: `${color}12`,

                  color: color,

                  border:
                    `1px solid ${color}25`,

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  position: "relative",
                  zIndex: 2,
                }}
              >
                <Icon
                  size={18}
                  strokeWidth={1.8}
                />
              </Box>

              {/* Vertical Timeline Line */}
              {!isLast && (
                <Box
                  sx={{
                    position: "absolute",

                    top: 38,
                    bottom: -20,

                    width: "1px",

                    bgcolor: "#dbe2ea",
                  }}
                />
              )}
            </Box>

            {/* =================================================
                EVENT CARD
            ================================================== */}
            <Box
              sx={{
                flex: 1,
                minWidth: 0,

                bgcolor: "#ffffff",

                border:
                  "1px solid #edf0f4",

                borderRadius: 1.5,

                px: 2,
                py: 1.5,

                boxShadow:
                  "0 1px 2px rgba(15,23,42,0.03)",
              }}
            >
              {/* Title + Type */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",

                  gap: 0.8,

                  flexWrap: "wrap",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#172033",
                    lineHeight: 1.3,
                  }}
                >
                  {event.title}
                </Typography>

                <Chip
                  label={event.type}
                  size="small"
                  sx={{
                    height: 23,

                    borderRadius: 1,

                    bgcolor: `${color}12`,

                    color: color,

                    fontSize: 9,

                    fontWeight: 700,

                    "& .MuiChip-label": {
                      px: 1,
                    },
                  }}
                />

                {/* Discharge completed icon */}
                {event.type ===
                  "DISCHARGE" && (
                  <CheckCircle
                    size={16}
                    color="#22c55e"
                    fill="#22c55e"
                    strokeWidth={2}
                  />
                )}
              </Box>

              {/* Doctor / Staff */}
              <Typography
                sx={{
                  mt: 0.5,

                  fontSize: 12,

                  color: "#94a3b8",
                }}
              >
                {event.doctor}
              </Typography>

              {/* Patient */}
              <Typography
                sx={{
                  mt: 0.4,

                  fontSize: 12.5,

                  color: "#64748b",
                }}
              >
                {patient
                  ? `${patient.firstName} ${patient.lastName} · ${patient.uhid}`
                  : event.patientId}
              </Typography>

              {/* Description */}
              <Typography
                sx={{
                  mt: 0.8,

                  fontSize: 13.5,

                  lineHeight: 1.5,

                  color: "#334155",
                }}
              >
                {event.description}
              </Typography>

              {/* Date */}
              <Typography
                sx={{
                  mt: 0.7,

                  fontSize: 11,

                  color: "#94a3b8",
                }}
              >
                {new Date(
                  event.date
                ).toLocaleString()}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}