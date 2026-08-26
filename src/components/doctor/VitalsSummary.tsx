import { Box, Grid, Typography } from "@mui/material";
import {
  Activity,
  Droplets,
  HeartPulse,
  Scale,
  Thermometer,
} from "lucide-react";

import type { Patient } from "@/types";

interface VitalsSummaryProps {
  patient: Patient;
}

interface VitalItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit?: string;
}

function VitalItem({
  icon,
  label,
  value,
  unit,
}: VitalItemProps) {
  return (
    <Box
      sx={{
        border: "1px solid #eef2f7",
        borderRadius: 1.5,
        px: 1.5,
        py: 1.3,
        bgcolor: "#ffffff",
        minHeight: 76,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.7,
          mb: 0.8,
        }}
      >
        <Box
          sx={{
            width: 24,
            height: 24,
            borderRadius: 1,
            bgcolor: "#f8fafc",
            color: "#64748b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </Box>

        <Typography
          sx={{
            fontSize: 9,
            color: "#94a3b8",
            fontWeight: 600,
          }}
        >
          {label}
        </Typography>
      </Box>

      <Typography
        sx={{
          fontSize: 16,
          fontWeight: 700,
          color: "#334155",
          lineHeight: 1,
        }}
      >
        {value}

        {unit && (
          <Typography
            component="span"
            sx={{
              ml: 0.4,
              fontSize: 9,
              color: "#94a3b8",
              fontWeight: 500,
            }}
          >
            {unit}
          </Typography>
        )}
      </Typography>
    </Box>
  );
}

export function VitalsSummary({
  patient,
}: VitalsSummaryProps) {
  const vitals = patient.vitals;

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#ffffff",
        border: "1px solid #eef2f7",
        borderRadius: 1.5,
        p: 2,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1.5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.8,
          }}
        >
          <Activity
            size={16}
            color="#3b82f6"
          />

          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 700,
              color: "#334155",
            }}
          >
            Latest Vitals
          </Typography>
        </Box>

        <Typography
          sx={{
            fontSize: 9,
            color: "#94a3b8",
          }}
        >
          Most recent reading
        </Typography>
      </Box>

      {!vitals ? (
        <Box
          sx={{
            py: 3,
            textAlign: "center",
            bgcolor: "#f8fafc",
            borderRadius: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: 11,
              color: "#94a3b8",
            }}
          >
            No vitals recorded for this
            patient.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={1.2}>
          <Grid size={{ xs: 6, sm: 4, md: 2.4 }}>
            <VitalItem
              icon={
                <Thermometer size={13} />
              }
              label="Temperature"
              value={String(
                vitals.temperature
              )}
              unit="°F"
            />
          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 2.4 }}>
            <VitalItem
              icon={
                <HeartPulse size={13} />
              }
              label="Blood Pressure"
              value={vitals.bloodPressure}
            />
          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 2.4 }}>
            <VitalItem
              icon={
                <HeartPulse size={13} />
              }
              label="Pulse"
              value={String(vitals.pulse)}
              unit="bpm"
            />
          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 2.4 }}>
            <VitalItem
              icon={
                <Droplets size={13} />
              }
              label="SpO₂"
              value={String(vitals.spo2)}
              unit="%"
            />
          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 2.4 }}>
            <VitalItem
              icon={<Scale size={13} />}
              label="Weight"
              value={String(vitals.weight)}
              unit="kg"
            />
          </Grid>
        </Grid>
      )}
    </Box>
  );
}