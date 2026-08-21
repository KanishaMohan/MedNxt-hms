import { Box, Typography } from "@mui/material";

interface VitalCardProps {
  label: string;
  value: string;
  unit: string;
  icon: React.ElementType;
}

export function VitalCard({
  label,
  value,
  unit,
  icon: Icon,
}: VitalCardProps) {
  return (
    <Box
      sx={{
        minHeight: 68,
px: 1,
py: 0.8,

        border: "1px solid #e5e7eb",
        borderRadius: 1.2,
        bgcolor: "#ffffff",

        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Box
        sx={{
          width: 28,
          height: 28,
          borderRadius: 1,
          bgcolor: "#eef2ff",
          color: "#4f46e5",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          flexShrink: 0,
        }}
      >
        <Icon size={15} />
      </Box>

      <Box sx={{ minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: 9,
            color: "#94a3b8",
            fontWeight: 600,
          }}
        >
          {label}
        </Typography>

        <Typography
          sx={{
            mt: 0.2,
            fontSize: 14,
            fontWeight: 700,
            color: "#172033",
          }}
        >
          {value}{" "}
          <Box
            component="span"
            sx={{
              fontSize: 9,
              fontWeight: 600,
              color: "#94a3b8",
            }}
          >
            {unit}
          </Box>
        </Typography>
      </Box>
    </Box>
  );
}