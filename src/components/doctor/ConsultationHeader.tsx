import {
  Avatar,
  Box,
  Button,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import {
  CalendarDays,
  Clock3,
  Phone,
  Save,
  UserRound,
} from "lucide-react";

import type { Patient } from "@/types";

interface ConsultationHeaderProps {
  patient: Patient;
  onSave?: () => void;
}

export function ConsultationHeader({
  patient,
  onSave,
}: ConsultationHeaderProps) {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#ffffff",
        borderBottom: "1px solid #eef2f7",
        px: { xs: 2, md: 3 },
        py: 1.8,
      }}
    >
      <Stack
        direction="row"
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        {/* Patient information */}
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Avatar
            src={patient.photoUrl || undefined}
            sx={{
              width: 48,
              height: 48,
              bgcolor: "#eff6ff",
              color: "#3b82f6",
              fontSize: 17,
              fontWeight: 700,
            }}
          >
            {patient.firstName?.charAt(0)}
            {patient.lastName?.charAt(0)}
          </Avatar>

          <Box>
            <Stack
              direction="row"
              sx={{
                alignItems: "center",
                gap: 1,
                flexWrap: "wrap",
              }}
            >
              <Typography
                sx={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: "#1e293b",
                }}
              >
                {patient.firstName}{" "}
                {patient.lastName}
              </Typography>

              <Chip
                label={patient.status}
                size="small"
                sx={{
                  height: 22,
                  borderRadius: 1,
                  bgcolor: "#eff6ff",
                  color: "#3b82f6",
                  fontSize: 9,
                  fontWeight: 700,
                }}
              />
            </Stack>

            <Stack
              direction="row"
              sx={{
                alignItems: "center",
                gap: 1.5,
                mt: 0.5,
                flexWrap: "wrap",
              }}
            >
              <Stack
                direction="row"
                sx={{
                  alignItems: "center",
                  gap: 0.4,
                }}
              >
                <UserRound
                  size={12}
                  color="#94a3b8"
                />

                <Typography
                  sx={{
                    fontSize: 10,
                    color: "#64748b",
                  }}
                >
                  {patient.uhid}
                </Typography>
              </Stack>

              <Typography
                sx={{
                  fontSize: 10,
                  color: "#cbd5e1",
                }}
              >
                •
              </Typography>

              <Typography
                sx={{
                  fontSize: 10,
                  color: "#64748b",
                }}
              >
                {patient.gender}
              </Typography>

              <Typography
                sx={{
                  fontSize: 10,
                  color: "#cbd5e1",
                }}
              >
                •
              </Typography>

              <Stack
                direction="row"
                sx={{
                  alignItems: "center",
                  gap: 0.4,
                }}
              >
                <Phone
                  size={11}
                  color="#94a3b8"
                />

                <Typography
                  sx={{
                    fontSize: 10,
                    color: "#64748b",
                  }}
                >
                  {patient.mobile}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Stack>

        {/* Consultation information + Save */}
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              gap: 0.5,
              px: 1,
              py: 0.7,
              borderRadius: 1,
              bgcolor: "#f8fafc",
            }}
          >
            <CalendarDays
              size={13}
              color="#94a3b8"
            />

            <Typography
              sx={{
                fontSize: 10,
                color: "#64748b",
              }}
            >
              {patient.arrival || "Today"}
            </Typography>
          </Stack>

          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              gap: 0.5,
              px: 1,
              py: 0.7,
              borderRadius: 1,
              bgcolor: "#f8fafc",
            }}
          >
            <Clock3
              size={13}
              color="#94a3b8"
            />

            <Typography
              sx={{
                fontSize: 10,
                color: "#64748b",
              }}
            >
              Consultation
            </Typography>
          </Stack>

          {onSave && (
            <Button
              variant="contained"
              size="small"
              startIcon={<Save size={14} />}
              onClick={onSave}
              sx={{
                minHeight: 34,
                px: 1.8,
                borderRadius: 1,
                textTransform: "none",
                fontSize: 11,
                fontWeight: 700,
                boxShadow: "none",
              }}
            >
              Save
            </Button>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}