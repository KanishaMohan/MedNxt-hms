import {
  Box,
  Button,
  Card,
  Typography,
} from "@mui/material";

import { Camera, UserRound } from "lucide-react";

export function PatientPhotoCard() {
  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: 1.5,
        border: "1px solid #e2e8f0",
        boxShadow: "0 1px 4px rgba(15, 23, 42, 0.04)",
        p: 2,
        textAlign: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: 11,
          fontWeight: 700,
          color: "#94a3b8",
          letterSpacing: 0.8,
          mb: 1.5,
        }}
      >
        PATIENT PHOTO
      </Typography>

      <Box
        sx={{
          width: 150,
          height: 150,
          maxWidth: "100%",
          mx: "auto",

          borderRadius: "50%",
          border: "3px dashed #dbe3ef",
          bgcolor: "#f8fafc",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <UserRound
          size={52}
          strokeWidth={1.2}
          color="#d7dee8"
        />
      </Box>

      <Button
        variant="contained"
        startIcon={<Camera size={15} />}
        sx={{
          mt: 1.5,
          px: 2,
          height: 34,
          borderRadius: 1.5,
          textTransform: "none",
          fontSize: 12,
          fontWeight: 700,

          bgcolor: "#111827",
          boxShadow: "none",

          "&:hover": {
            bgcolor: "#1f2937",
            boxShadow: "none",
          },
        }}
      >
        Take Photo
      </Button>
    </Card>
  );
}