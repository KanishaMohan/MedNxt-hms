import { Box, Typography } from "@mui/material";
import { useMemo, useState } from "react";

import { useApp } from "@/context/AppContext";
import { ehrEvents } from "@/services/mockData";

import type { EhrEvent, Patient } from "@/types";

import { PatientHistorySidebar } from "@/components/patientHistory/PatientHistorySidebar";
import { PatientHistoryHeader } from "@/components/patientHistory/PatientHistoryHeader";
import { HistoryFilters } from "@/components/patientHistory/HistoryFilters";
import { HistoryTimeline } from "@/components/patientHistory/HistoryTimeline";

export function PatientHistoryPage() {
  const { patients, loading } = useApp();

  const [search, setSearch] = useState("");
  const [selectedPatient, setSelectedPatient] =
    useState<Patient | null>(null);

  const [activeTab, setActiveTab] = useState("TIMELINE");
  const [eventFilter, setEventFilter] = useState("");

  if (loading) {
    return (
      <Box
        sx={{
          p: 2,
          color: "#64748b",
          fontSize: 14,
        }}
      >
        Loading patient history...
      </Box>
    );
  }

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

  const filteredEvents = useMemo(() => {
    if (!selectedPatient) {
      return [];
    }

    return ehrEvents
      .filter((event: EhrEvent) => {
        const matchesPatient =
          event.patientId === selectedPatient.id;

        const matchesType =
          !eventFilter || event.type === eventFilter;

        return matchesPatient && matchesType;
      })
      .sort(
        (a, b) =>
          new Date(b.date).getTime() -
          new Date(a.date).getTime()
      );
  }, [selectedPatient, eventFilter]);

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
      {/* LEFT */}
      <PatientHistorySidebar
        patients={filteredPatients}
        selectedPatient={selectedPatient}
        search={search}
        onSearchChange={setSearch}
        onSelect={handlePatientSelect}
      />

      {/* RIGHT */}
      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          overflowY: "auto",
          bgcolor: "#f8fafc",
        }}
      >
        {selectedPatient ? (
          <>
            <PatientHistoryHeader patient={selectedPatient} />

            <HistoryFilters
              activeTab={activeTab}
              eventFilter={eventFilter}
              onTabChange={setActiveTab}
              onFilterChange={setEventFilter}
            />

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
          /* INITIAL EMPTY STATE */
          <Box
            sx={{
              height: "100%",
              minHeight: "calc(100vh - 88px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              textAlign: "center",
              px: 3,
            }}
          >
            <Box
              sx={{
                width: 96,
                height: 96,
                borderRadius: "50%",
                bgcolor: "#faf9ff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
              }}
            >
              <Typography
                sx={{
                  fontSize: 52,
                  color: "#d8d5ff",
                  lineHeight: 1,
                }}
              >
                ↩
              </Typography>
            </Box>

            <Typography
              sx={{
                fontSize: 22,
                fontWeight: 700,
                color: "#172033",
                mb: 1,
              }}
            >
              Select a Patient
            </Typography>

            <Typography
              sx={{
                fontSize: 15,
                lineHeight: 1.6,
                color: "#94a3b8",
                maxWidth: 560,
              }}
            >
              Search and select a patient from the left panel to
              view their complete medical history, timeline, and
              reports.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}