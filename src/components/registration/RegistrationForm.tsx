import {
  Box,
  Button,
  Card,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import {
  AlertTriangle,
  UserPlus,
} from "lucide-react";

import type { Patient } from "@/types";

import { PatientPhotoCard } from "./PatientPhotoCard";
import { QuickStatsCard } from "./QuickStatsCard";
import { PatientDetails } from "./PatientDetails";

import {
  PatientDetailsForm,
  type RegistrationFormData,
} from "./PatientDetailsForm";

export type { RegistrationFormData } from "./PatientDetailsForm";

// =========================================================
// PROPS
// =========================================================

interface RegistrationFormProps {
  form: RegistrationFormData;

  errors: Record<string, string>;

  onChange: (
    field: keyof RegistrationFormData,
    value: string
  ) => void;

  onSave: () => void;

  onClear: () => void;

  saving?: boolean;

  selectedPatient: Patient | null;

  onPatientSelect: (
    patient: Patient | null
  ) => void;
}

// =========================================================
// COMPONENT
// =========================================================

export function RegistrationForm({
  form,
  errors,
  onChange,
  onSave,
  saving = false,
  selectedPatient,
  onPatientSelect,
}: RegistrationFormProps) {
  return (
    <Grid
      container
      spacing={1.5}
      sx={{
        alignItems: "flex-start",
      }}
    >
      {/* =====================================================
          LEFT COLUMN
      ====================================================== */}

      <Grid
        size={{
          xs: 12,
          lg: 3,
        }}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Stack
          spacing={1.5}
          sx={{
            width: "100%",
            maxWidth: 230,
          }}
        >
          {/* PATIENT PHOTO */}

          <PatientPhotoCard />

          {/* EXISTING PATIENT DETAILS / QUICK STATS */}

          {selectedPatient ? (
            <PatientDetails
              patient={selectedPatient}
            />
          ) : (
            <QuickStatsCard />
          )}
        </Stack>
      </Grid>

      {/* =====================================================
          RIGHT COLUMN
      ====================================================== */}

      <Grid
        size={{
          xs: 12,
          lg: 9,
        }}
      >
        <Card
          sx={{
            width: "100%",
            borderRadius: 1.5,
            border: "1px solid #e2e8f0",
            boxShadow:
              "0 1px 4px rgba(15, 23, 42, 0.04)",
            overflow: "hidden",
          }}
        >
          {/* =================================================
              HEADER
          ================================================= */}

          <Box
            sx={{
              px: {
                xs: 1.75,
                md: 2,
              },
              pt: 1.75,
              pb: 1.25,

              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1.5,
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 700,
                  lineHeight: 1.2,
                  color: "#172033",
                }}
              >
                Patient Details
              </Typography>

              <Typography
                sx={{
                  mt: 0.25,
                  fontSize: 10.5,
                  color: "#94a3b8",
                }}
              >
                Standard Registration
              </Typography>
            </Box>

            {/* EMERGENCY MODE */}

            <Button
              variant="outlined"
              startIcon={
                <AlertTriangle size={15} />
              }
              onClick={() => {
                const event =
                  new CustomEvent(
                    "toggle-emergency-mode"
                  );

                window.dispatchEvent(event);
              }}
              sx={{
                minWidth: 135,
                height: 36,
                borderRadius: 1.2,
                textTransform: "none",
                fontSize: 11,
                fontWeight: 700,

                borderColor: "#fca5a5",
                color: "#dc2626",
                bgcolor: "#fffafa",

                "&:hover": {
                  borderColor: "#ef4444",
                  bgcolor: "#fef2f2",
                },
              }}
            >
              Emergency Mode
            </Button>
          </Box>

          {/* =================================================
              FORM
          ================================================= */}

          <Box
            sx={{
              px: {
                xs: 1.75,
                md: 2,
              },
              pb: 1.75,
            }}
          >
            <PatientDetailsForm
              form={form}
              errors={errors}
              onChange={onChange}
              onPatientSelect={onPatientSelect}
            />

            {/* =================================================
                ACTION
            ================================================= */}

            <Box
              sx={{
                mt: 1.75,
                pt: 1.25,

                borderTop:
                  "1px solid #eef2f7",

                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                variant="contained"
                startIcon={
                  <UserPlus size={15} />
                }
                onClick={onSave}
                type="button"
                disabled={saving}
                sx={{
                  minWidth: 225,
                  height: 38,
                  borderRadius: 1.1,
                  textTransform: "none",
                  fontSize: 11.5,
                  fontWeight: 700,

                  bgcolor: "#3730a3",
                  boxShadow: "none",

                  "&:hover": {
                    bgcolor: "#312e81",
                    boxShadow: "none",
                  },

                  "&.Mui-disabled": {
                    bgcolor: "#a5b4fc",
                    color: "#ffffff",
                  },
                }}
              >
                {saving
                  ? "Creating Patient..."
                  : "Create Patient Profile & Add to Queue"}
              </Button>
            </Box>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}