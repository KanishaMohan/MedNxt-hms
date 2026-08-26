import { useEffect, useState } from "react";
import { Card, Box, Typography } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

import { dashboardService } from "@/services/dashboardService";
import type { PatientClassificationItem } from "@/types";

export function PatientClassification() {
  const [patientClassification, setPatientClassification] =
    useState<PatientClassificationItem[]>([]);

  useEffect(() => {
    const loadPatientClassification = async () => {
      try {
        const data =
          await dashboardService.getPatientClassification();

        setPatientClassification(data);
      } catch (error) {
        console.error(
          "Failed to load patient classification:",
          error
        );
      }
    };

    loadPatientClassification();
  }, []);

  const totalPercentage = patientClassification.reduce(
    (total, item) => total + item.value,
    0
  );

  return (
    <Card
      sx={{
        height: "100%",
        minHeight: 365,
        p: { xs: 2, sm: 2.5 },
        borderRadius: 1.5,
        border: "1px solid #f1f5f9",
        boxShadow: "0 1px 5px rgba(15, 23, 42, 0.06)",
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 1 }}>
        <Typography
          sx={{
            fontSize: { xs: 15, sm: 16 },
            fontWeight: 700,
            color: "#334155",
          }}
        >
          Patient Classification
        </Typography>

        <Typography
          sx={{
            mt: 0.4,
            fontSize: 11,
            color: "#94a3b8",
          }}
        >
          New vs returning patients for today.
        </Typography>
      </Box>

      {/* Donut Chart */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 220,
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={patientClassification}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={62}
              outerRadius={82}
              paddingAngle={2}
              startAngle={90}
              endAngle={-270}
              stroke="none"
            >
              {patientClassification.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={entry.color}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Text */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            pointerEvents: "none",
          }}
        >
          <Typography
            sx={{
              fontSize: 26,
              lineHeight: 1,
              fontWeight: 800,
              color: "#334155",
            }}
          >
            {totalPercentage}%
          </Typography>

          <Typography
            sx={{
              mt: 0.4,
              fontSize: 10,
              color: "#94a3b8",
              fontWeight: 600,
            }}
          >
            Total Patients
          </Typography>
        </Box>
      </Box>

      {/* Legend */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: { xs: 2, sm: 3 },
          mt: 0.5,
        }}
      >
        {patientClassification.map((item) => (
          <Box
            key={item.name}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.7,
            }}
          >
            {/* Color Dot */}
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: item.color,
              }}
            />

            {/* Name */}
            <Typography
              sx={{
                fontSize: 10,
                color: "#64748b",
                fontWeight: 600,
              }}
            >
              {item.name}
            </Typography>

            {/* Percentage */}
            <Typography
              sx={{
                fontSize: 10,
                color: "#334155",
                fontWeight: 800,
              }}
            >
              {item.value}%
            </Typography>
          </Box>
        ))}
      </Box>
    </Card>
  );
}