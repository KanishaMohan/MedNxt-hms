import {
  Box,
  Card,
  Typography,
} from "@mui/material";

export function QuickStatsCard() {
  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: 1.5,
        border: "1px solid #c7d2fe",
        bgcolor: "#eef2ff",
        boxShadow: "none",
        p: 1.8,
      }}
    >
      <Typography
        sx={{
          textAlign: "center",
          fontSize: 11,
          fontWeight: 700,
          color: "#3730a3",
          letterSpacing: 0.8,
          mb: 1.2,
        }}
      >
        QUICK STATS
      </Typography>

      <Box
        sx={{
          height: "1px",
          bgcolor: "#c7d2fe",
          mb: 1.5,
        }}
      />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            borderRight: "1px solid #c7d2fe",
          }}
        >
          <Typography
            sx={{
              fontSize: 22,
              lineHeight: 1.1,
              fontWeight: 800,
              color: "#3730a3",
            }}
          >
            12
          </Typography>

          <Typography
            sx={{
              fontSize: 10,
              color: "#64748b",
              mt: 0.3,
            }}
          >
            Today's
          </Typography>
        </Box>

        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: 22,
              lineHeight: 1.1,
              fontWeight: 800,
              color: "#3730a3",
            }}
          >
            4
          </Typography>

          <Typography
            sx={{
              fontSize: 10,
              color: "#64748b",
              mt: 0.3,
            }}
          >
            This Month
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}