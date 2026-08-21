import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import { Brain } from "lucide-react";

export function CommandCenterHeader() {
  return (
    <Stack
      direction={{ xs: "column", lg: "row" }}
      spacing={{ xs: 1.5, lg: 2 }}
      sx={{
        justifyContent: "space-between",
        alignItems: { xs: "flex-start", lg: "center" },
        mb: 2.5,
        width: "100%",
      }}
    >
      {/* Left Section */}
      <Box sx={{ minWidth: 0 }}>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: 20, sm: 22 },
              fontWeight: 700,
              color: "#0f172a",
              lineHeight: 1.2,
            }}
          >
            Command Center
          </Typography>

          <Chip
            label="High Volume Alert"
            color="error"
            size="small"
            sx={{
              height: 22,
              fontSize: 10,
              fontWeight: 600,
            }}
          />
        </Stack>

        <Typography
          color="text.secondary"
          sx={{
            mt: 0.5,
            fontSize: 12,
          }}
        >
          Real-time monitoring of 312 active patient journeys
        </Typography>
      </Box>

      {/* Right Section */}
      <Stack
        direction="row"
        spacing={1}
        sx={{
          width: { xs: "100%", lg: "auto" },
          flexWrap: "wrap",
          justifyContent: { xs: "flex-start", lg: "flex-end" },
          alignItems: "center",
        }}
      >
        {/* Temperature */}
        <Box
          sx={{
            px: 1.25,
            py: 0.75,
            bgcolor: "#f8fafc",
            border: "1px solid #e5e7eb",
            borderRadius: 1.5,
            minWidth: 78,
          }}
        >
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 700,
              color: "#0f172a",
              lineHeight: 1.2,
            }}
          >
            23.5°C
          </Typography>

          <Typography
            sx={{
              fontSize: 10,
              color: "#64748b",
              mt: 0.25,
            }}
          >
            Rainy
          </Typography>
        </Box>

        {/* Average TAT */}
        <Box
          sx={{
            px: 1.25,
            py: 0.75,
            bgcolor: "#f8fafc",
            border: "1px solid #e5e7eb",
            borderRadius: 1.5,
            minWidth: 78,
          }}
        >
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 700,
              color: "#0f172a",
              lineHeight: 1.2,
            }}
          >
            55 min
          </Typography>

          <Typography
            sx={{
              fontSize: 10,
              color: "#64748b",
              mt: 0.25,
            }}
          >
            Avg TAT
          </Typography>
        </Box>

        {/* AI Button */}
        <Button
          variant="contained"
          startIcon={<Brain size={14} />}
          sx={{
            minHeight: 34,
            px: 1.5,
            fontSize: 11,
            fontWeight: 600,
            whiteSpace: "nowrap",
            borderRadius: 1.5,
          }}
        >
          AI Traffic Audit
        </Button>
      </Stack>
    </Stack>
  );
}