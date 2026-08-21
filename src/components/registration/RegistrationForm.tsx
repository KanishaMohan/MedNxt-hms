import {
  Box,
  Button,
  Card,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { UserPlus } from "lucide-react";

import { PatientPhotoCard } from "./PatientPhotoCard";
import { QuickStatsCard } from "./QuickStatsCard";

import {
  PatientDetailsForm,
  type RegistrationFormData,
} from "./PatientDetailsForm";

export type { RegistrationFormData } from "./PatientDetailsForm";

interface RegistrationFormProps {
  form: RegistrationFormData;
  errors: Record<string, string>;

  onChange: (
    field: keyof RegistrationFormData,
    value: string
  ) => void;

  onSave: () => void;
  onClear: () => void;
}

export function RegistrationForm({
  form,
  errors,
  onChange,
  onSave,
  // onClear,
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
        size={{ xs: 12, lg: 3 }}
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
          <PatientPhotoCard />

          <QuickStatsCard />
        </Stack>
      </Grid>

      {/* =====================================================
          RIGHT COLUMN
      ====================================================== */}
      <Grid size={{ xs: 12, lg: 9 }}>
        <Card
          sx={{
            width: "100%",
            borderRadius: 1.5,
            border: "1px solid #e2e8f0",
            boxShadow: "0 1px 4px rgba(15, 23, 42, 0.04)",
            overflow: "hidden",
          }}
        >
          {/* =================================================
              HEADER
          ================================================= */}
          <Box
            sx={{
              px: { xs: 1.75, md: 2 },
              pt: 1.75,
              pb: 1.25,

              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
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

            {/* Emergency Mode */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.7,
              }}
            >
              <Typography
                sx={{
                  fontSize: 9.5,
                  fontWeight: 700,
                  color: "#94a3b8",
                  letterSpacing: 0.35,
                }}
              >
                EMERGENCY MODE
              </Typography>

              <Box
                sx={{
                  width: 40,
                  height: 21,
                  borderRadius: 20,
                  bgcolor: "#cbd5e1",
                  p: "2px",
                }}
              >
                <Box
                  sx={{
                    width: 17,
                    height: 17,
                    borderRadius: "50%",
                    bgcolor: "#fff",
                  }}
                />
              </Box>
            </Box>
          </Box>

          {/* =================================================
              FORM CONTENT
          ================================================= */}
          <Box
            sx={{
              px: { xs: 1.75, md: 2 },
              pb: 1.75,
            }}
          >
            <PatientDetailsForm
              form={form}
              errors={errors}
              onChange={onChange}
            />

            {/* =================================================
                BOTTOM ACTIONS
            ================================================= */}
            <Box
              sx={{
                mt: 1.75,
                pt: 1.25,
                borderTop: "1px solid #eef2f7",

                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 0.8,
              }}
            >
              {/* <Button
                variant="outlined"
                onClick={onClear}
                sx={{
                  minWidth: 85,
                  height: 36,
                  borderRadius: 1.1,
                  textTransform: "none",
                  fontSize: 11.5,
                  fontWeight: 700,
                  borderColor: "#cbd5e1",
                  color: "#475569",
                  px: 1.5,
                }}
              >
                Clear
              </Button> */}

              <Button
                variant="contained"
                startIcon={<UserPlus size={15} />}
                onClick={onSave}
                sx={{
                  minWidth: 225,
                  height: 36,
                  borderRadius: 1.1,
                  textTransform: "none",
                  fontSize: 11.5,
                  fontWeight: 700,
                  bgcolor: "#3730a3",
                  boxShadow: "none",
                  px: 2,

                  "&:hover": {
                    bgcolor: "#312e81",
                    boxShadow: "none",
                  },
                }}
              >
                Create Patient Profile & Add to Queue
              </Button>
            </Box>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}

