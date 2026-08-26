import { useRef, useState } from "react";

import {
  Box,
  Button,
  Card,
  IconButton,
  Typography,
} from "@mui/material";

import {
  Camera,
  RotateCcw,
  UserRound,
  X,
} from "lucide-react";

interface PatientPhotoCardProps {
  photoUrl?: string | null;
  onPhotoChange?: (photoUrl: string | null) => void;
}

export function PatientPhotoCard({
  photoUrl,
  onPhotoChange,
}: PatientPhotoCardProps) {
  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<
    string | null
  >(photoUrl ?? null);

  const handleTakePhoto = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const imageUrl =
      URL.createObjectURL(file);

    setPreview(imageUrl);
    onPhotoChange?.(imageUrl);
  };

  const handleRemovePhoto = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setPreview(null);
    onPhotoChange?.(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRetakePhoto = () => {
    handleRemovePhoto();
    fileInputRef.current?.click();
  };

  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: 1.5,
        border: "1px solid #e2e8f0",
        boxShadow:
          "0 1px 4px rgba(15, 23, 42, 0.04)",
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

      {/* PHOTO */}
      <Box
        sx={{
          position: "relative",
          width: 150,
          height: 150,
          maxWidth: "100%",
          mx: "auto",
          borderRadius: "50%",
          border: preview
            ? "3px solid #dbe3ef"
            : "3px dashed #dbe3ef",
          bgcolor: "#f8fafc",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {preview ? (
          <>
            <Box
              component="img"
              src={preview}
              alt="Patient"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />

            {/* REMOVE PHOTO */}
            <IconButton
              size="small"
              onClick={handleRemovePhoto}
              sx={{
                position: "absolute",
                top: 5,
                right: 5,
                width: 25,
                height: 25,
                bgcolor: "rgba(255,255,255,0.9)",
                color: "#475569",

                "&:hover": {
                  bgcolor: "#fff",
                },
              }}
            >
              <X size={14} />
            </IconButton>
          </>
        ) : (
          <UserRound
            size={52}
            strokeWidth={1.2}
            color="#d7dee8"
          />
        )}
      </Box>

      {/* HIDDEN FILE INPUT */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="user"
        hidden
        onChange={handlePhotoChange}
      />

      {/* ACTION */}
      <Button
        variant="contained"
        startIcon={
          preview ? (
            <RotateCcw size={15} />
          ) : (
            <Camera size={15} />
          )
        }
        onClick={
          preview
            ? handleRetakePhoto
            : handleTakePhoto
        }
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
        {preview
          ? "Retake Photo"
          : "Take Photo"}
      </Button>
    </Card>
  );
}