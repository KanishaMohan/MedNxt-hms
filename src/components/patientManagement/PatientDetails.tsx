import {
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import type { Patient } from "@/types";
import {
  HeartPulse,
  Ruler,
  Scale,
  Thermometer,
  Wind,
} from "lucide-react";

import { VitalCard } from "./VitalCard";

interface PatientDetailsProps {
  patient: Patient;
}

export function PatientDetails({
  patient,
}: PatientDetailsProps) {
  return (
    <Stack spacing={1.5}>
      {/* =========================
          PATIENT DETAILS
      ========================== */}
      <Card
        sx={{
          borderRadius: 1.5,
          border: "1px solid #e5e7eb",
          boxShadow: "0 1px 4px rgba(15,23,42,0.04)",
        }}
      >
        <CardContent
  sx={{
    p: 1.5,
    "&:last-child": {
      pb: 1.5,
    },
  }}
>
          <Typography
            sx={{
              fontSize: 15,
              fontWeight: 700,
              color: "#172033",
              mb: 1.2,
            }}
          >
            Patient Details
          </Typography>

          <Grid container spacing={1.2}>
            <DetailItem
              label="Name"
              value={`${patient.firstName} ${patient.lastName}`}
            />

            <DetailItem
              label="UHID"
              value={patient.uhid}
            />

            <DetailItem
              label="Mobile"
              value={patient.mobile}
            />

            <DetailItem
              label="Gender"
              value={patient.gender}
            />

            <DetailItem
              label="Blood Group"
              value={patient.bloodGroup}
            />

            <DetailItem
              label="Doctor"
              value={patient.doctor}
            />
          </Grid>
        </CardContent>
      </Card>

      {/* =========================
          VITALS
      ========================== */}
      <Card
        sx={{
          borderRadius: 1.5,
          border: "1px solid #e5e7eb",
          boxShadow: "0 1px 4px rgba(15,23,42,0.04)",
        }}
      >
        <CardContent
          sx={{
            p: 1.5,
            "&:last-child": {
              pb: 1.5,
            },
          }}
        >
          <Typography
            sx={{
              fontSize: 15,
              fontWeight: 700,
              color: "#172033",
              mb: 1.2,
            }}
          >
            Vitals
          </Typography>

          {patient.vitals ? (
            <Grid container spacing={1}>
              <Grid size={{ xs: 6, sm: 4 }}>
                <VitalCard
                  label="Temperature"
                  value={String(patient.vitals.temperature)}
                  unit="°F"
                  icon={Thermometer}
                />
              </Grid>

              <Grid size={{ xs: 6, sm: 4 }}>
                <VitalCard
                  label="Blood Pressure"
                  value={patient.vitals.bloodPressure}
                  unit="mmHg"
                  icon={HeartPulse}
                />
              </Grid>

              <Grid size={{ xs: 6, sm: 4 }}>
                <VitalCard
                  label="Pulse"
                  value={String(patient.vitals.pulse)}
                  unit="bpm"
                  icon={HeartPulse}
                />
              </Grid>

              <Grid size={{ xs: 6, sm: 4 }}>
                <VitalCard
                  label="SpO2"
                  value={String(patient.vitals.spo2)}
                  unit="%"
                  icon={Wind}
                />
              </Grid>

              <Grid size={{ xs: 6, sm: 4 }}>
                <VitalCard
                  label="Weight"
                  value={String(patient.vitals.weight)}
                  unit="kg"
                  icon={Scale}
                />
              </Grid>

              <Grid size={{ xs: 6, sm: 4 }}>
                <VitalCard
                  label="Height"
                  value={String(patient.vitals.height)}
                  unit="cm"
                  icon={Ruler}
                />
              </Grid>
            </Grid>
          ) : (
            <Typography
              sx={{
                py: 1.5,
                textAlign: "center",
                fontSize: 12,
                color: "#94a3b8",
              }}
            >
              No vitals recorded yet.
            </Typography>
          )}
        </CardContent>
      </Card>

      {/* =========================
          VISIT DETAILS
      ========================== */}
      <Card
        sx={{
          borderRadius: 1.5,
          border: "1px solid #e5e7eb",
          boxShadow: "0 1px 4px rgba(15,23,42,0.04)",
        }}
      >
        <CardContent
          sx={{
            p: 1.5,
            "&:last-child": {
              pb: 1.5,
            },
          }}
        >
          <Typography
            sx={{
              fontSize: 15,
              fontWeight: 700,
              color: "#172033",
              mb: 1.2,
            }}
          >
            Visit Details
          </Typography>

          <Stack spacing={0.6}>
            <DetailLine
              label="Reason"
              value={patient.reason}
            />

            <DetailLine
              label="Doctor"
              value={patient.doctor}
            />

            <DetailLine
              label="Arrival"
              value={patient.arrival}
            />

            <DetailLine
              label="Priority"
              value={patient.priority}
            />
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}

/* =========================================================
   SMALL HELPERS
========================================================= */

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <Grid size={{ xs: 6, md: 4 }}>
      <Box>
        <Typography
          sx={{
            fontSize: 9,
            fontWeight: 700,
            color: "#94a3b8",
            mb: 0.2,
          }}
        >
          {label}
        </Typography>

        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 600,
            color: "#334155",
          }}
        >
          {value || "--"}
        </Typography>
      </Box>
    </Grid>
  );
}

function DetailLine({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <Typography
      sx={{
        fontSize: 12,
        lineHeight: 1.35,
        color: "#64748b",
      }}
    >
      <Box
        component="span"
        sx={{
          fontWeight: 700,
          color: "#334155",
        }}
      >
        {label}:
      </Box>{" "}
      {value}
    </Typography>
  );
}