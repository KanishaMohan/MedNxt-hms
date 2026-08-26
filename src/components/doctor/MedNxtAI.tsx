import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";

import {
  Brain,
  Sparkles,
  Stethoscope,
} from "lucide-react";

import type { Patient } from "@/types";

interface MedNxtAIProps {
  patient: Patient;
  soap?: {
    subjective: string;
    objective: string;
    assessment: string;
    plan: string;
  };
  diagnoses?: string[];
  medications?: string[];
  labs?: string[];
  onGenerate?: () => void;
  loading?: boolean;
  result?: string;
}

export function MedNxtAI({
  patient,
  soap,
  diagnoses = [],
  medications = [],
  labs = [],
  onGenerate,
  loading = false,
  result = "",
}: MedNxtAIProps) {
  const hasConsultationData =
    Boolean(
      soap?.subjective ||
        soap?.objective ||
        soap?.assessment ||
        soap?.plan ||
        diagnoses.length ||
        medications.length ||
        labs.length
    );

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 2,
          py: 1.7,
          background:
            "linear-gradient(135deg, #f5f3ff 0%, #eff6ff 100%)",
          borderBottom: "1px solid #eef2f7",
        }}
      >
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 1.2,
                bgcolor: "#ffffff",
                color: "#6366f1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow:
                  "0 2px 8px rgba(99,102,241,0.08)",
              }}
            >
              <Brain size={17} />
            </Box>

            <Box>
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#334155",
                }}
              >
                MedNxt AI
              </Typography>

              <Typography
                sx={{
                  fontSize: 9,
                  color: "#94a3b8",
                  mt: 0.2,
                }}
              >
                Clinical assistant
              </Typography>
            </Box>
          </Stack>

          <Sparkles
            size={16}
            color="#6366f1"
          />
        </Stack>
      </Box>

      {/* Patient context */}
      <Box
        sx={{
          px: 2,
          py: 1.5,
          borderBottom: "1px solid #f1f5f9",
        }}
      >
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            gap: 1,
          }}
        >
          <Stethoscope
            size={14}
            color="#64748b"
          />

          <Typography
            sx={{
              fontSize: 10,
              color: "#64748b",
            }}
          >
            Clinical context:
          </Typography>

          <Typography
            sx={{
              fontSize: 10,
              fontWeight: 700,
              color: "#334155",
            }}
          >
            {patient.firstName}{" "}
            {patient.lastName}
          </Typography>
        </Stack>
      </Box>

      {/* Generate section */}
      <Box sx={{ p: 2 }}>
        <Typography
          sx={{
            fontSize: 11,
            color: "#64748b",
            lineHeight: 1.6,
            mb: 1.5,
          }}
        >
          Generate a concise clinical summary
          using the patient's consultation
          information, assessment, diagnosis,
          medications and investigations.
        </Typography>

        <Button
          fullWidth
          variant="contained"
          onClick={onGenerate}
          disabled={loading}
          startIcon={
            loading ? (
              <CircularProgress
                size={14}
                color="inherit"
              />
            ) : (
              <Sparkles size={15} />
            )
          }
          sx={{
            minHeight: 36,
            borderRadius: 1,
            textTransform: "none",
            fontSize: 11,
            fontWeight: 700,
            boxShadow: "none",
            background:
              "linear-gradient(135deg, #6366f1, #4f46e5)",
            "&:hover": {
              boxShadow:
                "0 4px 12px rgba(79,70,229,0.18)",
            },
          }}
        >
          {loading
            ? "Generating..."
            : "Generate AI Clinical Note"}
        </Button>

        {!hasConsultationData && (
          <Typography
            sx={{
              mt: 1,
              fontSize: 9,
              color: "#94a3b8",
              textAlign: "center",
            }}
          >
            Add consultation details for a
            better clinical summary.
          </Typography>
        )}

        {/* AI Result */}
        {result && (
          <Alert
            severity="info"
            icon={<Sparkles size={15} />}
            sx={{
              mt: 1.5,
              borderRadius: 1.5,
              fontSize: 10,
              lineHeight: 1.6,
              alignItems: "flex-start",
              "& .MuiAlert-message": {
                width: "100%",
              },
            }}
          >
            <Typography
              sx={{
                fontSize: 10,
                fontWeight: 700,
                color: "#334155",
                mb: 0.5,
              }}
            >
              AI Clinical Note
            </Typography>

            <Typography
              component="div"
              sx={{
                fontSize: 10,
                color: "#475569",
                lineHeight: 1.7,
                whiteSpace: "pre-wrap",
              }}
            >
              {result}
            </Typography>
          </Alert>
        )}
      </Box>
    </Box>
  );
}