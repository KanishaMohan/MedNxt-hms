import {
  Avatar,
  Box,
  Dialog,
  IconButton,
  Typography,
} from "@mui/material";

import {
  Activity,
  Droplets,
  HeartPulse,
  Mail,
  MapPin,
  Phone,
  UserRound,
  X,
} from "lucide-react";

import type { Patient } from "@/types";

interface PatientDetailsDialogProps {
  patient: Patient | null;
  open: boolean;
  onClose: () => void;
}

export function PatientDetailsDialog({
  patient,
  open,
  onClose,
}: PatientDetailsDialogProps) {
  if (!patient) {
    return null;
  }

  const fullName =
    `${patient.firstName} ${patient.lastName}`.trim();

  const initials =
    `${patient.firstName?.[0] ?? ""}${patient.lastName?.[0] ?? ""}`;

  const age = getAge(patient.dateOfBirth);

  const registrationType =
    patient.reason?.toUpperCase().includes("IPD")
      ? "IPD"
      : "OPD";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      sx={{
        "& .MuiDialog-container": {
          p: 1.5,
        },

        "& .MuiDialog-paper": {
          width: "760px",
          maxWidth: "calc(100vw - 32px)",
          maxHeight: "88vh",
          margin: 0,
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow:
            "0 24px 70px rgba(15, 23, 42, 0.28)",
        },
      }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor:
              "rgba(15, 23, 42, 0.58)",
            backdropFilter: "blur(2px)",
          },
        },
      }}
    >
      {/* =====================================================
          HEADER
      ====================================================== */}
      <Box
        sx={{
          position: "relative",
          px: 2.5,
          py: 2,
          background:
            "linear-gradient(135deg, #202060 0%, #4338ca 55%, #4f46e5 100%)",
          color: "#ffffff",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          {/* Avatar */}
          <Avatar
            sx={{
              width: 58,
              height: 58,
              bgcolor: "#eef2ff",
              color: "#4f46e5",
              border: "3px solid rgba(255,255,255,0.8)",
              fontSize: 19,
              fontWeight: 800,
              flexShrink: 0,
            }}
          >
            {initials || <UserRound size={24} />}
          </Avatar>

          {/* Patient name/details */}
          <Box
            sx={{
              minWidth: 0,
              flex: 1,
              pr: 4,
            }}
          >
            <Typography
              sx={{
                fontSize: 22,
                lineHeight: 1.15,
                fontWeight: 800,
                color: "#ffffff",
              }}
            >
              {fullName}
            </Typography>

            <Box
              sx={{
                mt: 0.65,
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 0.7,
              }}
            >
              <Typography
                sx={{
                  fontSize: 11,
                  color: "#dbeafe",
                  fontWeight: 600,
                }}
              >
                UHID: {patient.uhid}
              </Typography>

              <Dot />

              <Typography
                sx={{
                  fontSize: 11,
                  color: "#dbeafe",
                  fontWeight: 600,
                }}
              >
                {age} Yrs
              </Typography>

              <Dot />

              <Typography
                sx={{
                  fontSize: 11,
                  color: "#dbeafe",
                  fontWeight: 600,
                }}
              >
                {patient.gender}
              </Typography>

              <Dot />

              <Phone
                size={12}
                color="#dbeafe"
              />

              <Typography
                sx={{
                  fontSize: 11,
                  color: "#dbeafe",
                  fontWeight: 600,
                }}
              >
                {patient.mobile}
              </Typography>
            </Box>

            {/* Status badges */}
            <Box
              sx={{
                mt: 0.9,
                display: "flex",
                gap: 0.7,
                flexWrap: "wrap",
              }}
            >
              <StatusBadge status={patient.status} />

              <Box
                sx={{
                  px: 1,
                  py: 0.35,
                  borderRadius: 999,
                  bgcolor: "#ffffff",
                  color:
                    patient.priority === "High"
                      ? "#7c3aed"
                      : "#64748b",
                  fontSize: 9,
                  fontWeight: 800,
                }}
              >
                {patient.priority} Priority
              </Box>
            </Box>
          </Box>

          {/* Close */}
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              width: 32,
              height: 32,
              color: "#ffffff",

              "&:hover": {
                bgcolor:
                  "rgba(255,255,255,0.12)",
              },
            }}
          >
            <X size={20} />
          </IconButton>
        </Box>
      </Box>

      {/* =====================================================
          CONTENT
      ====================================================== */}
      <Box
        sx={{
          bgcolor: "#ffffff",
          overflowY: "auto",
          p: 1.75,

          "&::-webkit-scrollbar": {
            width: 7,
          },

          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#cbd5e1",
            borderRadius: 10,
          },
        }}
      >
        {/* =================================================
            CURRENT VISIT + PERSONAL INFO
        ================================================== */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1.7fr 1fr",
            },
            gap: 1.5,
          }}
        >
          {/* Current Visit */}
          <SectionCard>
            <SectionTitle
              icon={<Activity size={16} />}
              title="CURRENT VISIT DETAILS"
            />

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                columnGap: 2,
                rowGap: 1.5,
              }}
            >
              <InfoItem
                label="REASON FOR VISIT"
                value={patient.reason}
              />

              <InfoItem
                label="DEPARTMENT"
                value="General Medicine"
              />

              <InfoItem
                label="ASSIGNED DOCTOR"
                value={patient.doctor}
              />

              <InfoItem
                label="ARRIVAL TIME"
                value={patient.arrival}
              />

              <InfoItem
                label="REGISTRATION TYPE"
                value={registrationType}
              />

              <InfoItem
                label="QUEUE STATUS"
                value={patient.status}
              />
            </Box>
          </SectionCard>

          {/* Personal Info */}
          <SectionCard>
            <SectionTitle
              icon={<UserRound size={16} />}
              title="PERSONAL INFO"
            />

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 1.5,
              }}
            >
              <IconInfo
                icon={<Phone size={15} />}
                label="Mobile"
                value={patient.mobile}
              />

              <IconInfo
                icon={<Mail size={15} />}
                label="Email"
                value={patient.email || "Not Provided"}
              />

              <IconInfo
                icon={<MapPin size={15} />}
                label="Address"
                value={patient.address || "Not Provided"}
              />

              <IconInfo
                icon={<Droplets size={15} />}
                label="Blood Group"
                value={patient.bloodGroup || "Not Provided"}
              />
            </Box>
          </SectionCard>
        </Box>

        {/* =================================================
            CLINICAL SNAPSHOT
        ================================================== */}
        <SectionCard sx={{ mt: 1.5 }}>
          <SectionTitle
            icon={<HeartPulse size={16} />}
            title="CLINICAL SNAPSHOT"
          />

          {patient.vitals ? (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr 1fr",
                  sm: "repeat(3, 1fr)",
                },
                gap: 1,
              }}
            >
              <Vital
                label="Temperature"
                value={`${patient.vitals.temperature} °F`}
              />

              <Vital
                label="Blood Pressure"
                value={patient.vitals.bloodPressure}
              />

              <Vital
                label="Pulse"
                value={`${patient.vitals.pulse} bpm`}
              />

              <Vital
                label="SpO2"
                value={`${patient.vitals.spo2}%`}
              />

              <Vital
                label="Weight"
                value={`${patient.vitals.weight} kg`}
              />

              <Vital
                label="Height"
                value={`${patient.vitals.height} cm`}
              />
            </Box>
          ) : (
            <Typography
              sx={{
                py: 2,
                textAlign: "center",
                fontSize: 11,
                color: "#94a3b8",
              }}
            >
              No clinical vitals recorded.
            </Typography>
          )}
        </SectionCard>
      </Box>

      {/* =====================================================
          FOOTER
      ====================================================== */}
      <Box
        sx={{
          px: 1.75,
          py: 1,
          borderTop: "1px solid #eef2f7",
          display: "flex",
          justifyContent: "flex-end",
          bgcolor: "#ffffff",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          style={{
            border: "1px solid #e2e8f0",
            background: "#ffffff",
            color: "#475569",
            borderRadius: "7px",
            padding: "7px 18px",
            fontSize: "11px",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </Box>
    </Dialog>
  );
}

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function SectionCard({
  children,
  sx = {},
}: {
  children: React.ReactNode;
  sx?: Record<string, unknown>;
}) {
  return (
    <Box
      sx={{
        border: "1px solid #e5eaf2",
        borderRadius: 1.5,
        p: 1.5,
        bgcolor: "#ffffff",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

function SectionTitle({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.7,
        mb: 1.35,
        color: "#64748b",
      }}
    >
      {icon}

      <Typography
        sx={{
          fontSize: 11,
          fontWeight: 800,
          letterSpacing: 0.25,
          color: "#64748b",
        }}
      >
        {title}
      </Typography>
    </Box>
  );
}

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: 8.5,
          fontWeight: 800,
          color: "#94a3b8",
          mb: 0.25,
        }}
      >
        {label}
      </Typography>

      <Typography
        sx={{
          fontSize: 11.5,
          fontWeight: 600,
          color: "#334155",
          lineHeight: 1.3,
        }}
      >
        {value || "--"}
      </Typography>
    </Box>
  );
}

function IconInfo({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          color: "#94a3b8",
          mb: 0.2,
        }}
      >
        {icon}

        <Typography
          sx={{
            fontSize: 8.5,
            fontWeight: 700,
            color: "#94a3b8",
          }}
        >
          {label}
        </Typography>
      </Box>

      <Typography
        sx={{
          fontSize: 10.5,
          fontWeight: 600,
          color: "#334155",
          lineHeight: 1.3,
          wordBreak: "break-word",
        }}
      >
        {value || "--"}
      </Typography>
    </Box>
  );
}

function Vital({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <Box
      sx={{
        border: "1px solid #e8edf4",
        borderRadius: 1.1,
        px: 1.1,
        py: 0.9,
        minHeight: 52,
      }}
    >
      <Typography
        sx={{
          fontSize: 8.5,
          fontWeight: 700,
          color: "#94a3b8",
          mb: 0.25,
        }}
      >
        {label}
      </Typography>

      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 700,
          color: "#334155",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const colors: Record<
    string,
    { bg: string; color: string }
  > = {
    WAITING: {
      bg: "#dbeafe",
      color: "#2563eb",
    },

    "IN CONSULTATION": {
      bg: "#dcfce7",
      color: "#059669",
    },

    COMPLETED: {
      bg: "#dcfce7",
      color: "#059669",
    },

    DISCHARGED: {
      bg: "#dbeafe",
      color: "#2563eb",
    },

    "VITALS DONE": {
      bg: "#dbeafe",
      color: "#2563eb",
    },

    "CHECKED IN": {
      bg: "#dbeafe",
      color: "#2563eb",
    },
  };

  const style = colors[status] ?? {
    bg: "#f1f5f9",
    color: "#64748b",
  };

  return (
    <Box
      sx={{
        px: 1,
        py: 0.35,
        borderRadius: 999,
        bgcolor: style.bg,
        color: style.color,
        fontSize: 9,
        fontWeight: 800,
      }}
    >
      {status}
    </Box>
  );
}

function Dot() {
  return (
    <Box
      component="span"
      sx={{
        width: 3,
        height: 3,
        borderRadius: "50%",
        bgcolor: "#bfdbfe",
      }}
    />
  );
}

function getAge(dateOfBirth: string) {
  if (!dateOfBirth) {
    return "--";
  }

  const birthDate = new Date(dateOfBirth);
  const today = new Date();

  let age =
    today.getFullYear() -
    birthDate.getFullYear();

  const monthDifference =
    today.getMonth() -
    birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 &&
      today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}