import {
  Card,
  Box,
  Typography,
} from "@mui/material";

import {
  UserPlus,
  Zap,
  Stethoscope,
  Activity,
  Pill,
} from "lucide-react";

import { patientFlowPipeline } from "@/services/mockData";

const stageIcons = [
  UserPlus,
  Zap,
  Stethoscope,
  Activity,
  Pill,
];

export function PipelineSection() {
  return (
    <Card
      sx={{
        p: { xs: 2, sm: 2.25 },
        borderRadius: 1.5,
        mb: 2.5,

        border: "1px solid #f1f5f9",
        boxShadow: "0 1px 5px rgba(15, 23, 42, 0.06)",
      }}
    >
      {/* Header */}
      <Typography
        sx={{
          fontSize: 16,
          fontWeight: 700,
          color: "#0f172a",
          mb: 2.5,
        }}
      >
        Patient Flow Pipeline
      </Typography>

      {/* Pipeline */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr 1fr",
            sm: "repeat(3, 1fr)",
            md: "repeat(5, 1fr)",
          },
          gap: { xs: 2, sm: 2.5 },
        }}
      >
        {patientFlowPipeline.map((stage, index) => {
          const Icon = stageIcons[index];

          return (
            <Box
              key={stage.name}
              sx={{
                position: "relative",
                textAlign: "center",
                minWidth: 0,
              }}
            >
              {/* Connecting Line */}
              {index < patientFlowPipeline.length - 1 && (
                <Box
                  sx={{
                    display: {
                      xs: "none",
                      md: "block",
                    },

                    position: "absolute",
                    top: 18,
                    left: "calc(50% + 18px)",
                    width: "calc(100% - 36px)",

                    height: 2,
                    bgcolor: "#e2e8f0",

                    zIndex: 0,
                  }}
                />
              )}

              {/* Icon Circle */}
              <Box
                sx={{
                  position: "relative",
                  zIndex: 1,

                  width: 36,
                  height: 36,

                  mx: "auto",
                  mb: 0.8,

                  borderRadius: "50%",

                  bgcolor:
                    stage.alert
                      ? "#fef2f2"
                      : "#eef2ff",

                  border: `2px solid ${stage.color}`,

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  color: stage.color,
                }}
              >
                <Icon size={16} strokeWidth={1} />
              </Box>

              {/* Alert */}
              {stage.alert && (
                <Box
                  sx={{
                    position: "absolute",
                    top: -8,
                    left: "50%",
                    transform: "translateX(-50%)",

                    px: 0.7,
                    py: 0.15,

                    borderRadius: 0.5,

                    bgcolor: "#ef4444",
                    color: "#fff",

                    fontSize: 7,
                    fontWeight: 700,

                    lineHeight: 1.4,

                    zIndex: 2,
                  }}
                >
                  ALERT
                </Box>
              )}

              {/* Stage Name */}
              <Typography
                sx={{
                  fontSize: 11,
                  fontWeight: 500,
                  color: "#64748b",
                  lineHeight: 1.25,

                  whiteSpace: "nowrap",
                }}
              >
                {stage.name}
              </Typography>

              {/* Value */}
              <Typography
                sx={{
                  fontSize: 20,
                  lineHeight: 1.15,

                  fontWeight: 800,

                  color: stage.color,

                  mt: 0.35,
                }}
              >
                {stage.value}
              </Typography>

              {/* Capacity Bar */}
              <Box
                sx={{
                  width: "100%",
                  maxWidth: 120,

                  height: 3,

                  mx: "auto",
                  mt: 0.8,

                  borderRadius: 999,

                  bgcolor: "#e2e8f0",
                }}
              >
                <Box
                  sx={{
                    width: `${stage.capacity}%`,
                    height: "100%",

                    borderRadius: 999,

                    bgcolor: stage.color,
                  }}
                />
              </Box>

              {/* Capacity Text */}
              <Typography
                sx={{
                  mt: 0.45,

                  fontSize: 9,

                  color: stage.color,

                  fontWeight: 600,
                }}
              >
                {stage.capacity}% Capacity
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Card>
  );
}