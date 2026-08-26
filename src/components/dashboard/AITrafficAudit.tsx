import {
  Box,
  Card,
  IconButton,
  Typography,
} from "@mui/material";

import {
  X,
  Brain,
  AlertTriangle,
  TrendingUp,
  Users,
} from "lucide-react";

interface AITrafficAuditProps {
  open: boolean;
  onClose: () => void;
}

const insights = [
  {
    title: "Operational Bottlenecks",
    description:
      "Critical average wait times (55 mins) and a capacity warning (312 walk-ins) are driven by significant backlogs in General Medicine OPD (45 patients) and a 25-minute lag in Pharmacy Dispensing.",
    icon: AlertTriangle,
  },
  {
    title: "Revenue Opportunities",
    description:
      "The high OPD volume is generating substantial daily revenue (₹2,45,000). Streamlining operations to reduce wait times and improve patient flow presents an opportunity to further enhance patient satisfaction and potentially increase patient throughput.",
    icon: TrendingUp,
  },
  {
    title: "Staffing Optimization",
    description:
      "The absence of 2 nurses is likely exacerbating current operational strain. A review of nurse staffing levels and doctor allocation, particularly for General Medicine, is critical to alleviate bottlenecks and improve service delivery.",
    icon: Users,
  },
];

export function AITrafficAudit({
  open,
  onClose,
}: AITrafficAuditProps) {
  if (!open) {
    return null;
  }

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 1300,

        display: "flex",
        justifyContent: "flex-end",

        bgcolor: "rgba(15, 23, 42, 0.18)",
      }}
      onClick={onClose}
    >
      <Card
        onClick={(event) => event.stopPropagation()}
        sx={{
          width: {
            xs: "100%",
            sm: 460,
          },

          height: "100%",

          borderRadius: 0,

          p: {
            xs: 2.5,
            sm: 3,
          },

          overflowY: "auto",

          boxShadow:
            "-4px 0 20px rgba(15, 23, 42, 0.12)",
        }}
      >
        {/* ==============================
            HEADER
        ============================== */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",

            mb: 2.5,
          }}
        >
          {/* Left */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.2,
            }}
          >
            {/* AI Icon */}
            <Box
              sx={{
                width: 38,
                height: 38,

                borderRadius: 1.5,

                bgcolor: "#eef2ff",
                color: "#6366f1",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                flexShrink: 0,
              }}
            >
              <Brain size={20} />
            </Box>

            {/* Title */}
            <Box>
              <Typography
                sx={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: "#0f172a",
                }}
              >
                AI Traffic Audit
              </Typography>

              <Typography
                sx={{
                  fontSize: 10,
                  color: "#94a3b8",
                  mt: 0.2,
                }}
              >
                AI-powered operational analysis
              </Typography>
            </Box>
          </Box>

          {/* Close */}
          <IconButton
            onClick={onClose}
            size="small"
            sx={{
              color: "#64748b",
            }}
          >
            <X size={18} />
          </IconButton>
        </Box>

        {/* ==============================
            SUMMARY
        ============================== */}

        <Box
          sx={{
            p: 1.8,

            mb: 2.5,

            borderRadius: 1.5,

            bgcolor: "#f8fafc",

            border:
              "1px solid #eef2f7",
          }}
        >
          <Typography
            sx={{
              fontSize: 11,

              color: "#64748b",

              lineHeight: 1.6,
            }}
          >
            Here is a 3-bullet point summary of
            insights:
          </Typography>
        </Box>

        {/* ==============================
            INSIGHTS
        ============================== */}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",

            gap: 1.5,
          }}
        >
          {insights.map((insight) => {
            const Icon = insight.icon;

            return (
              <Box
                key={insight.title}
                sx={{
                  p: 1.8,

                  borderRadius: 1.5,

                  border:
                    "1px solid #eef2f7",

                  bgcolor: "#ffffff",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",

                    gap: 1.2,
                  }}
                >
                  {/* Insight Icon */}
                  <Box
                    sx={{
                      width: 30,
                      height: 30,

                      flexShrink: 0,

                      borderRadius: 1,

                      bgcolor: "#f1f5f9",

                      color: "#6366f1",

                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={15} />
                  </Box>

                  {/* Insight Content */}
                  <Box>
                    <Typography
                      sx={{
                        fontSize: 12,

                        fontWeight: 700,

                        color: "#334155",

                        mb: 0.5,
                      }}
                    >
                      {insight.title}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 11,

                        lineHeight: 1.6,

                        color: "#64748b",
                      }}
                    >
                      {insight.description}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Card>
    </Box>
  );
}