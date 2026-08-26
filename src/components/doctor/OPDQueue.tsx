import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";

import {
  Search,
  UserRound,
  Video,
} from "lucide-react";

import type { Patient } from "@/types";

interface OPDQueueProps {
  patients: Patient[];
  selectedPatient: Patient | null;
  onSelectPatient: (patient: Patient) => void;
}

export function OPDQueue({
  patients,
  selectedPatient,
  onSelectPatient,
}: OPDQueueProps) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        bgcolor: "#ffffff",
        borderRight: "1px solid #eef2f7",
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
      }}
    >
      {/* =========================
          HEADER
      ========================== */}
      <Box
        sx={{
          px: 2,
          pt: 1.8,
          pb: 1.2,
        }}
      >
        <Box
          sx={{
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
              bgcolor: "#eff6ff",
              color: "#3b82f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <UserRound size={15} />
          </Box>

          <Typography
            sx={{
              fontSize: 15,
              fontWeight: 700,
              color: "#334155",
            }}
          >
            OPD Queue
          </Typography>

          <Box
            sx={{
              ml: "auto",
              minWidth: 22,
              height: 22,
              px: 0.7,
              borderRadius: 999,
              bgcolor: "#f1f5f9",
              color: "#94a3b8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 10,
              fontWeight: 700,
            }}
          >
            {patients.length}
          </Box>
        </Box>
      </Box>

      {/* =========================
          FILTERS
      ========================== */}
      <Box
        sx={{
          px: 2,
          pb: 1.2,
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            border: "1px solid #f1f5f9",
            borderRadius: 1,
            overflow: "hidden",
            bgcolor: "#fafbff",
          }}
        >
          <Button
            disableRipple
            sx={{
              minHeight: 30,
              px: 0.5,
              borderRadius: 0,
              bgcolor: "#ffffff",
              color: "#475569",
              fontSize: 9,
              fontWeight: 700,
              borderRight: "1px solid #f1f5f9",
              "&:hover": {
                bgcolor: "#ffffff",
              },
            }}
          >
            ALL
          </Button>

          <Button
            disableRipple
            sx={{
              minHeight: 30,
              px: 0.5,
              borderRadius: 0,
              color: "#94a3b8",
              fontSize: 9,
              fontWeight: 600,
              borderRight: "1px solid #f1f5f9",
              "&:hover": {
                bgcolor: "#f8fafc",
              },
            }}
          >
            CLINIC
          </Button>

          <Button
            disableRipple
            startIcon={<Video size={10} />}
            sx={{
              minHeight: 30,
              px: 0.3,
              borderRadius: 0,
              color: "#94a3b8",
              fontSize: 9,
              fontWeight: 600,
              "& .MuiButton-startIcon": {
                mr: 0.2,
              },
              "&:hover": {
                bgcolor: "#f8fafc",
              },
            }}
          >
            Remote
          </Button>
        </Box>
      </Box>

      {/* =========================
          SEARCH
      ========================== */}
      <Box
        sx={{
          px: 2,
          pb: 1.5,
        }}
      >
        <Box
          sx={{
            position: "relative",
          }}
        >
          <Search
            size={15}
            color="#94a3b8"
            style={{
              position: "absolute",
              left: 10,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 1,
            }}
          />

          <TextField
            fullWidth
            size="small"
            placeholder="Filter patient..."
            sx={{
              "& .MuiOutlinedInput-root": {
                height: 34,
                borderRadius: 1,
                bgcolor: "#ffffff",
                fontSize: 11,
                pl: 3.5,
              },

              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#eef2f7",
              },

              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#e2e8f0",
                },

              "& .MuiOutlinedInput-input": {
                py: 0.5,
              },
            }}
          />
        </Box>
      </Box>

      {/* =========================
          PATIENT LIST
      ========================== */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          minHeight: 0,

          "&::-webkit-scrollbar": {
            width: 5,
          },

          "&::-webkit-scrollbar-thumb": {
            bgcolor: "#e2e8f0",
            borderRadius: 999,
          },
        }}
      >
        {patients.length === 0 ? (
          <Box
            sx={{
              px: 2,
              py: 5,
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: 11,
                color: "#94a3b8",
              }}
            >
              No patients in queue.
            </Typography>
          </Box>
        ) : (
          patients.map((patient) => {
            const isSelected =
              selectedPatient?.id === patient.id;

            return (
              <Box
                key={patient.id}
                onClick={() =>
                  onSelectPatient(patient)
                }
                sx={{
                  position: "relative",
                  px: 2,
                  py: 1.35,
                  cursor: "pointer",

                  bgcolor: isSelected
                    ? "#f8faff"
                    : "#ffffff",

                  borderBottom:
                    "1px solid #f8fafc",

                  transition:
                    "background-color 0.15s ease",

                  "&:hover": {
                    bgcolor: "#f8faff",
                  },

                  ...(isSelected && {
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: 3,
                      bgcolor: "#3b82f6",
                    },
                  }),
                }}
              >
                {/* Patient Name */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.6,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#334155",
                      lineHeight: 1.3,
                    }}
                  >
                    {patient.firstName}{" "}
                    {patient.lastName}
                  </Typography>

                  {patient.status ===
                    "IN CONSULTATION" && (
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        bgcolor: "#22c55e",
                      }}
                    />
                  )}
                </Box>

                {/* UHID */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.7,
                    mt: 0.55,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 9,
                      color: "#94a3b8",
                      fontWeight: 600,
                    }}
                  >
                    {patient.gender === "Male"
                      ? "M"
                      : patient.gender ===
                          "Female"
                        ? "F"
                        : "O"}
                  </Typography>

                  <Box
                    sx={{
                      width: 1,
                      height: 10,
                      bgcolor: "#e2e8f0",
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize: 9,
                      color: "#94a3b8",
                    }}
                  >
                    {patient.uhid}
                  </Typography>
                </Box>

                {/* Status / Reason */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.6,
                    mt: 0.8,
                    flexWrap: "wrap",
                  }}
                >
                  {patient.priority === "High" && (
                    <Box
                      sx={{
                        px: 0.65,
                        py: 0.2,
                        borderRadius: 0.5,
                        bgcolor: "#fef2f2",
                        color: "#ef4444",
                        fontSize: 8,
                        fontWeight: 700,
                      }}
                    >
                      EMERG
                    </Box>
                  )}

                  {patient.reason && (
                    <Box
                      sx={{
                        maxWidth: "100%",
                        px: 0.65,
                        py: 0.2,
                        borderRadius: 0.5,
                        bgcolor: "#fafafa",
                        border:
                          "1px solid #f1f5f9",
                        color: "#94a3b8",
                        fontSize: 8,
                        fontWeight: 500,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {patient.reason}
                    </Box>
                  )}
                </Box>
              </Box>
            );
          })
        )}
      </Box>
    </Box>
  );
}