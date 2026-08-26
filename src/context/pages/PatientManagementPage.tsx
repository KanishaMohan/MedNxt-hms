import { useMemo, useState } from "react";

import {
  Box,
  Button,
  Card,
  Grid,
  Typography,
} from "@mui/material";

import {
  CheckCircle,
  Clock3,
  HeartPulse,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { PatientFilters } from "@/components/patientManagement/PatientFilters";
import { PatientList } from "@/components/patientManagement/PatientList";
import { PatientDetailsDialog } from "@/components/patientManagement/PatientDetailsDialog";

import { useApp } from "@/context/AppContext";

export function PatientManagementPage() {
  const navigate = useNavigate();
  const {
    patients,
    selectedPatient,
    selectPatient,
    loading,
  } = useApp();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] =
    useState("PRIORITY_HIGH");

  const filtered = useMemo(() => {
    const query = search
      .toLowerCase()
      .trim();

    const priorityOrder: Record<
      string,
      number
    > = {
      High: 1,
      Medium: 2,
      Low: 3,
    };

    return [...patients]
      .filter((patient) => {
        const fullName =
          `${patient.firstName} ${patient.lastName}`.toLowerCase();

        const matchesSearch =
          !query ||
          fullName.includes(query) ||
          patient.uhid
            .toLowerCase()
            .includes(query) ||
          patient.mobile.includes(query);

        const matchesStatus =
          !statusFilter ||
          patient.status === statusFilter;

        return (
          matchesSearch &&
          matchesStatus
        );
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "PRIORITY_HIGH":
            return (
              (priorityOrder[a.priority] ??
                99) -
              (priorityOrder[b.priority] ??
                99)
            );

          case "PRIORITY_LOW":
            return (
              (priorityOrder[b.priority] ??
                99) -
              (priorityOrder[a.priority] ??
                99)
            );

          case "ARRIVAL_EARLY":
            return a.arrival.localeCompare(
              b.arrival
            );

          case "ARRIVAL_LATEST":
            return b.arrival.localeCompare(
              a.arrival
            );

          case "NAME":
            return `${a.firstName} ${a.lastName}`.localeCompare(
              `${b.firstName} ${b.lastName}`
            );

          default:
            return 0;
        }
      });
  }, [
    patients,
    search,
    statusFilter,
    sortBy,
  ]);

  if (loading) {
    return (
      <Box sx={{ p: 2 }}>
        Loading patients...
      </Box>
    );
  }

  const waitingCount =
    patients.filter(
      (patient) =>
        patient.status === "WAITING"
    ).length;

  const inConsultCount =
    patients.filter(
      (patient) =>
        patient.status ===
        "IN CONSULTATION"
    ).length;

  const completedCount =
    patients.filter(
      (patient) =>
        patient.status === "COMPLETED"
    ).length;

  const totalPatients = patients.length;

  return (
    <Box>
      {/* =================================================
          STATISTICS
      ================================================== */}
      <Grid
        container
        spacing={1.5}
        sx={{ mb: 1.5 }}
      >
        <Grid
          size={{
            xs: 12,
            sm: 6,
            lg: 3,
          }}
        >
          <StatCard
            label="WAITING"
            value={waitingCount}
            icon={<Clock3 size={18} />}
            iconColor="#f97316"
            iconBg="#fff7ed"
            iconBorder="#fed7aa"
          />
        </Grid>

        <Grid
          size={{
            xs: 12,
            sm: 6,
            lg: 3,
          }}
        >
          <StatCard
            label="IN CONSULT"
            value={inConsultCount}
            icon={
              <HeartPulse size={18} />
            }
            iconColor="#10b981"
            iconBg="#ecfdf5"
            iconBorder="#a7f3d0"
          />
        </Grid>

        <Grid
          size={{
            xs: 12,
            sm: 6,
            lg: 3,
          }}
        >
          <StatCard
            label="COMPLETED"
            value={completedCount}
            icon={
              <CheckCircle size={18} />
            }
            iconColor="#3b82f6"
            iconBg="#eff6ff"
            iconBorder="#bfdbfe"
          />
        </Grid>

        <Grid
          size={{
            xs: 12,
            sm: 6,
            lg: 3,
          }}
        >
          <StatCard
            label="TOTAL PATIENTS"
            value={totalPatients}
            icon={<Clock3 size={18} />}
            iconColor="#8b5cf6"
            iconBg="#faf5ff"
            iconBorder="#e9d5ff"
          />
        </Grid>
      </Grid>

      {/* =================================================
          PATIENT QUEUE
      ================================================== */}
      <Card
        sx={{
          borderRadius: 1.25,
          border: "1px solid #e5e7eb",
          boxShadow:
            "0 1px 4px rgba(15, 23, 42, 0.04)",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            px: {
              xs: 1.5,
              md: 2,
            },
            py: 1.25,
            borderBottom:
              "1px solid #eef2f7",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                lg: "row",
              },
              alignItems: {
                xs: "stretch",
                lg: "center",
              },
              justifyContent:
                "space-between",
              gap: 1.5,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  xl: "row",
                },
                alignItems: {
                  xs: "flex-start",
                  xl: "center",
                },
                gap: {
                  xs: 1,
                  xl: 1.5,
                },
                minWidth: 0,
              }}
            >
              <Typography
                sx={{
                  fontSize: 18,
                  lineHeight: 1.2,
                  fontWeight: 700,
                  color: "#172033",
                  whiteSpace: "nowrap",
                }}
              >
                Patient Queue
              </Typography>

              <Box
                sx={{
                  width: "100%",
                  minWidth: 0,
                }}
              >
                <PatientFilters
                  search={search}
                  statusFilter={
                    statusFilter
                  }
                  sortBy={sortBy}
                  onSearchChange={
                    setSearch
                  }
                  onStatusChange={
                    setStatusFilter
                  }
                  onSortChange={
                    setSortBy
                  }
                />
              </Box>
            </Box>

            <Button
              variant="contained"
              startIcon={
                <Plus size={15} />
              }
              onClick={() => navigate("/registration")}
              sx={{
                minWidth: 105,
                height: 34,
                px: 1.5,
                flexShrink: 0,
                borderRadius: 1,
                bgcolor: "#4f46e5",
                textTransform: "none",
                fontSize: 11,
                fontWeight: 700,
                boxShadow: "none",

                "&:hover": {
                  bgcolor: "#4338ca",
                  boxShadow: "none",
                },
              }}
            >
              Add Patient
            </Button>
          </Box>
        </Box>

        <PatientList
          patients={filtered}
          selectedPatient={
            selectedPatient
          }
          onSelect={selectPatient}
        />
      </Card>

      {/* =================================================
          PATIENT DETAILS DIALOG
      ================================================== */}
      <PatientDetailsDialog
        patient={selectedPatient}
        open={Boolean(
          selectedPatient
        )}
        onClose={() =>
          selectPatient(null)
        }
      />
    </Box>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  iconColor: string;
  iconBg: string;
  iconBorder: string;
}

function StatCard({
  label,
  value,
  icon,
  iconColor,
  iconBg,
  iconBorder,
}: StatCardProps) {
  return (
    <Card
      sx={{
        height: 82,
        borderRadius: 1.25,
        border: "1px solid #e5e7eb",
        boxShadow:
          "0 1px 4px rgba(15, 23, 42, 0.04)",
      }}
    >
      <Box
        sx={{
          height: "100%",
          px: 1.75,
          display: "flex",
          alignItems: "center",
          justifyContent:
            "space-between",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: 9.5,
              lineHeight: 1.2,
              fontWeight: 700,
              color: "#94a3b8",
              letterSpacing: 0.6,
              mb: 0.4,
            }}
          >
            {label}
          </Typography>

          <Typography
            sx={{
              fontSize: 25,
              lineHeight: 1,
              fontWeight: 700,
              color: "#172033",
            }}
          >
            {value}
          </Typography>
        </Box>

        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: 1,
            bgcolor: iconBg,
            border: `1px solid ${iconBorder}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: iconColor,
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>
      </Box>
    </Card>
  );
}