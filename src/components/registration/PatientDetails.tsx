import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";

export function PatientDetails() {
  return (
    <Card
      sx={{
        borderRadius: 1.5,
        border: "1px solid #f1f5f9",
        boxShadow: "0 1px 5px rgba(15, 23, 42, 0.06)",
      }}
    >
      <CardContent>
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 700,
            color: "#334155",
          }}
        >
          Patient Details
        </Typography>

        <Typography
          sx={{
            mt: 0.5,
            fontSize: 11,
            color: "#94a3b8",
          }}
        >
          Patient information will appear here after registration.
        </Typography>
      </CardContent>
    </Card>
  );
}