import { Card, Box, Typography } from "@mui/material";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface PatientArrivalData {
  time: string;
  patients: number;
}

interface PatientArrivalTrendProps {
  patientArrivalTrend: PatientArrivalData[];
}

export function PatientArrivalTrend({
  patientArrivalTrend,
}: PatientArrivalTrendProps) {
  return (
    <Card
      sx={{
        height: "100%",
        minHeight: 365,
        p: { xs: 2, sm: 2.5 },
        borderRadius: 1.5,
        border: "1px solid #f1f5f9",
        boxShadow:
          "0 1px 5px rgba(15, 23, 42, 0.06)",
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 2 }}>
        <Typography
          sx={{
            fontSize: { xs: 15, sm: 16 },
            fontWeight: 700,
            color: "#334155",
          }}
        >
          Patient Arrival Trend
        </Typography>

        <Typography
          sx={{
            mt: 0.4,
            fontSize: 11,
            color: "#94a3b8",
          }}
        >
          Hourly footfall analysis for today. Peak identified at 10:00 AM.
        </Typography>
      </Box>

      {/* Chart */}
      <Box
        sx={{
          width: "100%",
          height: 285,
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={patientArrivalTrend}
            margin={{
              top: 8,
              right: 8,
              left: -20,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient
                id="arrivalGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#6366f1"
                  stopOpacity={0.28}
                />

                <stop
                  offset="100%"
                  stopColor="#6366f1"
                  stopOpacity={0.03}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              stroke="#eef2f7"
              strokeDasharray="0"
            />

            <XAxis
              dataKey="time"
              tick={{
                fontSize: 10,
                fill: "#94a3b8",
              }}
              axisLine={false}
              tickLine={false}
              interval={1}
            />

            <YAxis
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              tick={{
                fontSize: 10,
                fill: "#cbd5e1",
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              cursor={{
                stroke: "#c7d2fe",
                strokeWidth: 1,
              }}
              contentStyle={{
                border: "none",
                borderRadius: 8,
                boxShadow:
                  "0 4px 14px rgba(15, 23, 42, 0.12)",
                fontSize: 12,
              }}
            />

            <Area
              type="monotone"
              dataKey="patients"
              stroke="#6366f1"
              strokeWidth={2.5}
              fill="url(#arrivalGradient)"
              dot={false}
              activeDot={{
                r: 4,
                strokeWidth: 2,
                fill: "#ffffff",
                stroke: "#6366f1",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
}