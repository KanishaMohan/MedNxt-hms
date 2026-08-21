import { Card, Box, Typography, LinearProgress } from "@mui/material";

import {
  departmentLoad,
  resourceStatus,
} from "@/services/mockData";

export function DepartmentLoad() {
  return (
    <Card
      sx={{
        height: "100%",
        minHeight: 250,
        p: { xs: 2, sm: 2.5 },

        // Same corner style as KPI, Pipeline and Arrival Trend
        borderRadius: 1.5,

        border: "1px solid #f1f5f9",
        boxShadow: "0 1px 5px rgba(15, 23, 42, 0.06)",
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
          Department Load
        </Typography>

        <Typography
          sx={{
            mt: 0.4,
            fontSize: 11,
            color: "#94a3b8",
          }}
        >
          Current patient distribution across departments.
        </Typography>
      </Box>

      {/* Departments */}
      <Box>
        {departmentLoad.map((department) => (
          <Box
            key={department.name}
            sx={{
              mb: 1.6,
            }}
          >
            {/* Department Name + Patient Count */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 0.55,
              }}
            >
              <Typography
                sx={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#475569",
                }}
              >
                {department.name}
              </Typography>

              <Typography
                sx={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#334155",
                }}
              >
                {department.patients}
              </Typography>
            </Box>

            {/* Load Progress */}
            <LinearProgress
              variant="determinate"
              value={Math.min(
                (department.patients / 150) * 100,
                100
              )}
              sx={{
                height: 5,
                borderRadius: 999,
                bgcolor: "#eef2f7",

                "& .MuiLinearProgress-bar": {
                  borderRadius: 999,
                  bgcolor: department.color,
                },
              }}
            />

            {/* Status */}
            <Typography
              sx={{
                mt: 0.35,
                fontSize: 9,
                fontWeight: 600,
                color: department.color,
              }}
            >
              {department.status}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Divider */}
      <Box
        sx={{
          height: 1,
          bgcolor: "#eef2f7",
          my: 1.8,
        }}
      />

      {/* Resource Status */}
      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 700,
          color: "#475569",
          mb: 1.2,
        }}
      >
        Resource Status
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 1.5,
        }}
      >
        {/* Doctors */}
        <Box
          sx={{
            p: 1.2,
            borderRadius: 1.5,
            bgcolor: "#f8fafc",
          }}
        >
          <Typography
            sx={{
              fontSize: 9,
              color: "#94a3b8",
              fontWeight: 600,
            }}
          >
            Doctors
          </Typography>

          <Typography
            sx={{
              mt: 0.3,
              fontSize: 18,
              fontWeight: 800,
              color: "#334155",
            }}
          >
            {resourceStatus.doctors.available}

            <Typography
              component="span"
              sx={{
                fontSize: 10,
                color: "#94a3b8",
                fontWeight: 600,
              }}
            >
              {" "}
              / {resourceStatus.doctors.total}
            </Typography>
          </Typography>
        </Box>

        {/* Beds */}
        <Box
          sx={{
            p: 1.2,
            borderRadius: 1.5,
            bgcolor: "#fff7ed",
          }}
        >
          <Typography
            sx={{
              fontSize: 9,
              color: "#94a3b8",
              fontWeight: 600,
            }}
          >
            Beds (IPD)
          </Typography>

          <Typography
            sx={{
              mt: 0.3,
              fontSize: 18,
              fontWeight: 800,
              color: "#f97316",
            }}
          >
            {resourceStatus.beds.occupiedPercentage}%
          </Typography>

          <Typography
            sx={{
              fontSize: 9,
              color: "#f97316",
              fontWeight: 600,
            }}
          >
            Full
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}