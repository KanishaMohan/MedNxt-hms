import {
  Grid,
  Card,
  Box,
  Typography,
} from "@mui/material";

import {
  Users,
  Zap,
  Clock3,
  IndianRupee,
} from "lucide-react";

import type { DashboardKpis } from "@/types";

interface KPISectionProps {
  dashboardKpis: DashboardKpis;
}

export function KPISection({
  dashboardKpis,
}: KPISectionProps) {
  const cards = [
    {
      title: "TOTAL WALK-INS",
      value: dashboardKpis.totalWalkIns,
      sub: dashboardKpis.walkInsChange,
      color: "#22c55e",
      icon: Users,
      bg: "#5B5FEF",
    },
    {
      title: "ACTIVE IN-FACILITY",
      value: dashboardKpis.activeInFacility,
      sub: dashboardKpis.activeInFacilityLabel,
      color: "#94a3b8",
      icon: Zap,
      bg: "#5B5FEF",
    },
    {
      title: "AVG WAIT TIME",
      value: dashboardKpis.averageWaitTime,
      sub: dashboardKpis.averageWaitTarget,
      color: "#ef4444",
      icon: Clock3,
      bg: "#f97316",
    },
    {
      title: "EST. REVENUE",
      value: dashboardKpis.estimatedRevenue,
      sub: dashboardKpis.revenuePerPatient,
      color: "#94a3b8",
      icon: IndianRupee,
      bg: "#10b981",
    },
  ];

  return (
    <Grid container spacing={1.5} sx={{ mb: 2.5 }}>
      {cards.map((item) => {
        const Icon = item.icon;

        return (
          <Grid
            key={item.title}
            size={{ xs: 12, sm: 6, lg: 3 }}
          >
            <Card
              sx={{
                p: 2,
                height: 135,
                borderRadius: 1.5,
                boxShadow:
                  "0 1px 5px rgba(15, 23, 42, 0.06)",
                border: "1px solid #f1f5f9",
                display: "flex",
                flexDirection: "column",
                boxSizing: "border-box",
              }}
            >
              {/* Icon */}
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: 1,
                  bgcolor: item.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  mb: 1.15,
                }}
              >
                <Icon size={18} strokeWidth={2} />
              </Box>

              {/* Title */}
              <Typography
                sx={{
                  fontSize: 10,
                  fontWeight: 500,
                  color: "#94a3b8",
                  letterSpacing: 0.7,
                  lineHeight: 1.2,
                }}
              >
                {item.title}
              </Typography>

              {/* Main Value */}
              <Typography
                sx={{
                  fontSize: 26,
                  lineHeight: 1.15,
                  fontWeight: 800,
                  mt: 0.3,
                  color: "#0f172a",
                }}
              >
                {item.value}
              </Typography>

              {/* Bottom Text */}
              <Typography
                sx={{
                  mt: "auto",
                  fontSize: 10,
                  lineHeight: 1.2,
                  color: item.color,
                  fontWeight: 600,
                }}
              >
                {item.sub}
              </Typography>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}