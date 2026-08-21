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

import { PatientFilters } from "@/components/patientManagement/PatientFilters";
import { PatientList } from "@/components/patientManagement/PatientList";

import { useApp } from "@/context/AppContext";

export function PatientManagementPage() {
  const { patients, selectedPatient, selectPatient } = useApp();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim();

    return patients
      .filter((patient) => {
        const fullName =
          `${patient.firstName} ${patient.lastName}`.toLowerCase();

        const matchesSearch =
          !query ||
          fullName.includes(query) ||
          patient.uhid.toLowerCase().includes(query) ||
          patient.mobile.includes(query);

        const matchesStatus =
          !statusFilter || patient.status === statusFilter;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => a.arrival.localeCompare(b.arrival));
  }, [patients, search, statusFilter]);

  const waitingCount = patients.filter(
    (patient) => patient.status === "WAITING"
  ).length;

  const inConsultCount = patients.filter(
    (patient) => patient.status === "IN CONSULTATION"
  ).length;

  const completedCount = patients.filter(
    (patient) => patient.status === "COMPLETED"
  ).length;

  const totalPatients = patients.length;

  return (
    <Box>
      {/* =====================================================
          STATISTICS
      ====================================================== */}
      <Grid
        container
        spacing={1.5}
        sx={{
          mb: 1.5,
        }}
      >
        {/* Waiting */}
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            label="WAITING"
            value={waitingCount}
            icon={<Clock3 size={18} />}
            iconColor="#f97316"
            iconBg="#fff7ed"
            iconBorder="#fed7aa"
          />
        </Grid>

        {/* In Consult */}
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            label="IN CONSULT"
            value={inConsultCount}
            icon={<HeartPulse size={18} />}
            iconColor="#10b981"
            iconBg="#ecfdf5"
            iconBorder="#a7f3d0"
          />
        </Grid>

        {/* Completed */}
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            label="COMPLETED"
            value={completedCount}
            icon={<CheckCircle size={18} />}
            iconColor="#3b82f6"
            iconBg="#eff6ff"
            iconBorder="#bfdbfe"
          />
        </Grid>

        {/* Total */}
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
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

      {/* =====================================================
          PATIENT QUEUE CARD
      ====================================================== */}
      <Card
        sx={{
          borderRadius: 1.25,
          border: "1px solid #e5e7eb",
          boxShadow: "0 1px 4px rgba(15, 23, 42, 0.04)",
          overflow: "hidden",
        }}
      >
        {/* =================================================
            QUEUE HEADER
        ================================================== */}
        <Box
          sx={{
            px: { xs: 1.5, md: 2 },
            py: 1.25,
            borderBottom: "1px solid #eef2f7",
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
              justifyContent: "space-between",
              gap: 1.5,
            }}
          >
            {/* =================================================
                LEFT SIDE
            ================================================== */}
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
              {/* Patient Queue Title */}
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

              {/* Filters */}
              <Box
                sx={{
                  width: "100%",
                  minWidth: 0,
                }}
              >
                <PatientFilters
                  search={search}
                  statusFilter={statusFilter}
                  onSearchChange={setSearch}
                  onStatusChange={setStatusFilter}
                />
              </Box>
            </Box>

            {/* =================================================
                RIGHT SIDE
            ================================================== */}
            <Button
              variant="contained"
              startIcon={<Plus size={15} />}
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

        {/* =================================================
            PATIENT LIST
        ================================================== */}
        <PatientList
          patients={filtered}
          selectedPatient={selectedPatient}
          onSelect={selectPatient}
        />
      </Card>
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
        boxShadow: "0 1px 4px rgba(15, 23, 42, 0.04)",
      }}
    >
      <Box
        sx={{
          height: "100%",
          px: 1.75,

          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Text */}
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

        {/* Icon */}
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