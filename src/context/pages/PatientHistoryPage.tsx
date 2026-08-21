import { Box, Typography } from "@mui/material";
import { useMemo, useState } from "react";

import { useApp } from "@/context/AppContext";
import { ehrEvents } from "@/services/mockData";
import type { EhrEvent, Patient } from "@/services/mockData";

import { PatientHistorySidebar } from "@/components/patientHistory/PatientHistorySidebar";
import { PatientHistoryHeader } from "@/components/patientHistory/PatientHistoryHeader";
import { HistoryFilters } from "@/components/patientHistory/HistoryFilters";
import { HistoryTimeline } from "@/components/patientHistory/HistoryTimeline";

export function PatientHistoryPage() {
  const { patients } = useApp();

  const [search, setSearch] = useState("");
  const [selectedPatient, setSelectedPatient] =
    useState<Patient | null>(patients[0] ?? null);

  const [activeTab, setActiveTab] =
    useState("TIMELINE");

  const [eventFilter, setEventFilter] =
    useState("");

  /* ================================
     PATIENT SEARCH
  ================================= */
  const filteredPatients = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) {
      return patients;
    }

    return patients.filter((patient) => {
      const name =
        `${patient.firstName} ${patient.lastName}`.toLowerCase();

      return (
        name.includes(query) ||
        patient.uhid.toLowerCase().includes(query) ||
        patient.mobile.includes(query)
      );
    });
  }, [patients, search]);

  /* ================================
     TIMELINE EVENTS
  ================================= */
  const filteredEvents = useMemo(() => {
    if (!selectedPatient) {
      return [];
    }

    return ehrEvents
      .filter((event: EhrEvent) => {
        const matchesPatient =
          event.patientId === selectedPatient.id;

        const matchesType =
          !eventFilter ||
          event.type === eventFilter;

        return matchesPatient && matchesType;
      })
      .sort(
        (a, b) =>
          new Date(b.date).getTime() -
          new Date(a.date).getTime()
      );
  }, [selectedPatient, eventFilter]);

  /* ================================
     PATIENT CHANGE
  ================================= */
  const handlePatientSelect = (patient: Patient) => {
    setSelectedPatient(patient);
    setEventFilter("");
    setActiveTab("TIMELINE");
  };

  return (
    <Box
      sx={{
        height: "100%",
        minHeight: "calc(100vh - 88px)",
        bgcolor: "#ffffff",
        display: "flex",
        overflow: "hidden",
      }}
    >
      {/* =====================================
          LEFT PATIENT RECORDS
      ====================================== */}
      <PatientHistorySidebar
        patients={filteredPatients}
        selectedPatient={selectedPatient}
        search={search}
        onSearchChange={setSearch}
        onSelect={handlePatientSelect}
      />

      {/* =====================================
          RIGHT PATIENT HISTORY
      ====================================== */}
      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          overflowY: "auto",
          bgcolor: "#ffffff",
        }}
      >
        {selectedPatient ? (
          <>
            {/* Patient Header */}
            <PatientHistoryHeader
              patient={selectedPatient}
            />

            {/* Tabs + Filters */}
            <HistoryFilters
              activeTab={activeTab}
              eventFilter={eventFilter}
              onTabChange={setActiveTab}
              onFilterChange={setEventFilter}
            />

            {/* Timeline */}
            {activeTab === "TIMELINE" ? (
              filteredEvents.length > 0 ? (
                <HistoryTimeline
                  events={filteredEvents}
                  patients={patients}
                />
              ) : (
                <Box
                  sx={{
                    py: 8,
                    textAlign: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 14,
                      color: "#94a3b8",
                    }}
                  >
                    No history events found.
                  </Typography>
                </Box>
              )
            ) : (
              <Box
                sx={{
                  py: 8,
                  textAlign: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 14,
                    color: "#94a3b8",
                  }}
                >
                  Vitals Trend will be added here.
                </Typography>
              </Box>
            )}
          </>
        ) : (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
                color: "#94a3b8",
              }}
            >
              Select a patient to view history.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}