import { Box, Chip, Typography } from "@mui/material";
import {
  CheckCircle,
  FlaskConical,
  HeartPulse,
  Home,
  Pill,
  Stethoscope,
} from "lucide-react";

import type { EhrEvent, Patient } from "@/services/mockData";

interface HistoryTimelineProps {
  events: EhrEvent[];
  patients: Patient[];
}

const typeIcon: Record<string, typeof Stethoscope> = {
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
        px: 4,
        pb: 4,
      }}
    >
      {events.map((event, index) => {
        const Icon =
          typeIcon[event.type] || Stethoscope;

        const color =
          typeColor[event.type] || "#4f46e5";

        const patient = patients.find(
          (p) => p.id === event.patientId
        );

        return (
          <Box
            key={event.id}
            sx={{
              display: "flex",
              gap: 2,
              position: "relative",
              pb: index === events.length - 1 ? 0 : 2.5,
            }}
          >
            {/* Timeline icon */}
            <Box
              sx={{
                width: 48,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  bgcolor: `${color}12`,
                  color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: `1px solid ${color}18`,
                  zIndex: 1,
                }}
              >
                <Icon size={18} />
              </Box>

              {index < events.length - 1 && (
                <Box
                  sx={{
                    width: 1.5,
                    flex: 1,
                    bgcolor: "#e5e7eb",
                    mt: 0.5,
                  }}
                />
              )}
            </Box>

            {/* Event */}
            <Box
              sx={{
                flex: 1,
                minWidth: 0,
                pb: 1,
              }}
            >
              {/* Title + type */}
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
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#172033",
                  }}
                >
                  {event.title}
                </Typography>

                <Chip
                  label={event.type}
                  size="small"
                  sx={{
                    height: 25,
                    borderRadius: 1,
                    bgcolor: `${color}12`,
                    color,
                    fontSize: 9,
                    fontWeight: 700,
                  }}
                />

                {event.type === "DISCHARGE" && (
                  <CheckCircle
                    size={16}
                    color="#22c55e"
                    fill="#22c55e"
                    strokeWidth={2}
                  />
                )}
              </Box>

              {/* Doctor */}
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
                  mt: 0.5,
                  fontSize: 13,
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
                  mt: 1,
                  fontSize: 14,
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
                {new Date(event.date).toLocaleString()}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}