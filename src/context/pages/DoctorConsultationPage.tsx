import {
  Activity,
  FlaskConical,
  Loader,
  Plus,
  Sparkles,
  Stethoscope,
  Trash2,
} from "lucide-react";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
  Divider,
  Chip,
} from "@mui/material";

import { useState } from "react";

import { PageHeader } from "@/components/PageHeader";
import { PatientHeader } from "@/components/PatientHeader";
import { LoadingState } from "@/components/LoadingState";
import { OPDQueue } from "@/components/doctor/OPDQueue";
import { useApp } from "@/context/AppContext";

export function DoctorConsultationPage() {
  const {
    patients,
    selectedPatient,
    selectPatient,
  } = useApp();

  const patient = selectedPatient || patients[0] || null;

  const [soap, setSoap] = useState({
    subjective: "",
    objective: "",
    assessment: "",
    plan: "",
  });

  const [diagnoses, setDiagnoses] = useState<string[]>([]);
  const [newDx, setNewDx] = useState("");

  const [meds, setMeds] = useState<string[]>([]);
  const [newMed, setNewMed] = useState("");

  const [labs, setLabs] = useState<string[]>([]);
  const [newLab, setNewLab] = useState("");

  const [aiLoading, setAiLoading] = useState(false);
  const [aiNote, setAiNote] = useState("");
  const [saved, setSaved] = useState(false);

  if (!patient) {
    return (
      <Card>
        <CardContent>
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Stethoscope size={32} color="#94a3b8" />

            <Typography color="text.secondary" sx={{ mt: 1 }}>
              No patients available.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  const addDx = () => {
    if (!newDx.trim()) return;

    setDiagnoses((prev) => [...prev, newDx.trim()]);
    setNewDx("");
  };

  const addMed = () => {
    if (!newMed.trim()) return;

    setMeds((prev) => [...prev, newMed.trim()]);
    setNewMed("");
  };

  const addLab = () => {
    if (!newLab.trim()) return;

    setLabs((prev) => [...prev, newLab.trim()]);
    setNewLab("");
  };

  const generateAi = () => {
    setAiLoading(true);
    setAiNote("");

    setTimeout(() => {
      setAiNote(
        `CLINICAL SUMMARY: ${patient.firstName} ${
          patient.lastName
        } (${patient.uhid}) presented with ${
          patient.reason
        }. ${
          patient.vitals
            ? `Vitals: Temp ${patient.vitals.temperature}°F, BP ${patient.vitals.bloodPressure}, Pulse ${patient.vitals.pulse}, SpO2 ${patient.vitals.spo2}%.`
            : "Vitals not recorded."
        } ${
          diagnoses.length
            ? `Working diagnoses: ${diagnoses.join(", ")}.`
            : ""
        } ${
          soap.assessment
            ? `Assessment: ${soap.assessment}.`
            : ""
        } ${
          soap.plan
            ? `Plan: ${soap.plan}.`
            : ""
        } ${
          meds.length
            ? `Medications prescribed: ${meds.join(", ")}.`
            : ""
        } ${
          labs.length
            ? `Lab orders: ${labs.join(", ")}.`
            : ""
        } Follow-up recommended in 7 days.`
      );

      setAiLoading(false);
    }, 1800);
  };

  const save = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  const updateSoap = (
    field: keyof typeof soap,
    value: string
  ) => {
    setSoap((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Box sx={{ pb: 4 }}>
      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <PageHeader
        eyebrow="DOCTOR STATION"
        title="Doctor Consultation"
        description="Review patient information, document consultation, and manage treatment."
        actionLabel="Save Consultation"
        onAction={save}
      />

      {/* =====================================================
          SUCCESS MESSAGE
      ====================================================== */}

      {saved && (
        <Alert
          severity="success"
          sx={{
            mb: 2,
            borderRadius: 2,
          }}
        >
          Consultation saved successfully for{" "}
          <strong>
            {patient.firstName} {patient.lastName}
          </strong>
          .
        </Alert>
      )}

      {/* =====================================================
          PATIENT HEADER
      ====================================================== */}

      <Box sx={{ mb: 2 }}>
        <PatientHeader patient={patient} />
      </Box>

      {/* =====================================================
          MAIN CONSULTATION AREA
      ====================================================== */}

      <Grid container spacing={2.5}>
        {/* =================================================
            LEFT SIDE
        ================================================== */}

        <Grid size={{ xs: 12, lg: 8 }}>
          <Stack spacing={2.5}>
            {/* =============================================
                CONSULTATION NAVIGATION
            ============================================== */}

            <Card
              sx={{
                borderRadius: 3,
                border: "1px solid #e7eaf3",
                boxShadow: "0 4px 18px rgba(30, 41, 59, 0.04)",
              }}
            >
              <CardContent sx={{ py: 1.25 }}>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    alignItems: "center",
                    overflowX: "auto",
                  }}
                >
                  {[
                    "Overview",
                    "SOAP Notes",
                    "Diagnosis",
                    "Medications",
                    "Lab Orders",
                  ].map((item, index) => (
                    <Button
                      key={item}
                      variant={index === 0 ? "contained" : "text"}
                      size="small"
                      sx={{
                        minWidth: "auto",
                        px: 2,
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                        boxShadow:
                          index === 0
                            ? "0 4px 12px rgba(79, 70, 229, .18)"
                            : "none",
                      }}
                    >
                      {item}
                    </Button>
                  ))}
                </Stack>
              </CardContent>
            </Card>

            {/* =============================================
                VITALS
            ============================================== */}

            <Card
              sx={{
                borderRadius: 3,
                border: "1px solid #e7eaf3",
                boxShadow: "0 4px 18px rgba(30, 41, 59, 0.04)",
              }}
            >
              <CardHeader
                avatar={
                  <Box
                    sx={{
                      width: 38,
                      height: 38,
                      borderRadius: 2,
                      bgcolor: "#eef4ff",
                      color: "#3b82f6",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <Activity size={19} />
                  </Box>
                }
                title="Latest Vitals"
                subheader="Most recent patient readings"
                titleTypographyProps={{
                  fontWeight: 800,
                }}
                subheaderTypographyProps={{
                  fontSize: 12,
                }}
              />

              <CardContent sx={{ pt: 0 }}>
                <Grid container spacing={1.5}>
                  {[
                    {
                      label: "Temperature",
                      value: patient.vitals?.temperature ?? "--",
                      unit: "°F",
                    },
                    {
                      label: "Blood Pressure",
                      value: patient.vitals?.bloodPressure ?? "--",
                      unit: "",
                    },
                    {
                      label: "Pulse",
                      value: patient.vitals?.pulse ?? "--",
                      unit: "bpm",
                    },
                    {
                      label: "SpO₂",
                      value: patient.vitals?.spo2 ?? "--",
                      unit: "%",
                    },
                    {
                      label: "Weight",
                      value: patient.vitals?.weight ?? "--",
                      unit: "kg",
                    },
                  ].map((vital) => (
                    <Grid
                      key={vital.label}
                      size={{
                        xs: 6,
                        sm: 4,
                        md: 2.4,
                      }}
                    >
                      <Box
                        sx={{
                          p: 1.5,
                          minHeight: 88,
                          borderRadius: 2.5,
                          bgcolor: "#f8faff",
                          border: "1px solid #e8edf7",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 11,
                            color: "#64748b",
                            mb: 0.75,
                          }}
                        >
                          {vital.label}
                        </Typography>

                        <Typography
                          sx={{
                            fontSize: 19,
                            fontWeight: 800,
                            color: "#172554",
                          }}
                        >
                          {vital.value}

                          <Typography
                            component="span"
                            sx={{
                              ml: 0.4,
                              fontSize: 11,
                              fontWeight: 600,
                              color: "#64748b",
                            }}
                          >
                            {vital.unit}
                          </Typography>
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>

            {/* =============================================
                REASON FOR VISIT
            ============================================== */}

            <Card
              sx={{
                borderRadius: 3,
                border: "1px solid #e7eaf3",
                boxShadow: "0 4px 18px rgba(30, 41, 59, 0.04)",
              }}
            >
              <CardContent>
                <Typography
                  sx={{
                    fontSize: 19,
                    fontWeight: 800,
                    color: "#172554",
                    mb: 1,
                  }}
                >
                  Reason for Visit
                </Typography>

                <Box
                  sx={{
                    p: 1.75,
                    borderRadius: 2,
                    bgcolor: "#f8faff",
                    border: "1px solid #e8edf7",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 14,
                      color: "#475569",
                      lineHeight: 1.7,
                    }}
                  >
                    {patient.reason || "No reason recorded."}
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            {/* =============================================
                SOAP NOTES
            ============================================== */}

            <Card
              sx={{
                borderRadius: 3,
                border: "1px solid #e7eaf3",
                boxShadow: "0 4px 18px rgba(30, 41, 59, 0.04)",
              }}
            >
              <CardHeader
                title="SOAP Notes"
                subheader="Structured clinical documentation"
                titleTypographyProps={{
                  fontWeight: 800,
                }}
                subheaderTypographyProps={{
                  fontSize: 12,
                }}
              />

              <CardContent sx={{ pt: 0 }}>
                <Stack spacing={2}>
                  {[
                    {
                      key: "subjective" as const,
                      label: "Subjective",
                      placeholder:
                        "Patient-reported symptoms and complaints...",
                    },
                    {
                      key: "objective" as const,
                      label: "Objective",
                      placeholder:
                        "Observable findings and test results...",
                    },
                    {
                      key: "assessment" as const,
                      label: "Assessment",
                      placeholder:
                        "Clinical impression and differential diagnosis...",
                    },
                    {
                      key: "plan" as const,
                      label: "Plan",
                      placeholder:
                        "Treatment plan, medications, follow-up...",
                    },
                  ].map((field) => (
                    <TextField
                      key={field.key}
                      fullWidth
                      label={field.label}
                      multiline
                      minRows={3}
                      value={soap[field.key]}
                      onChange={(e) =>
                        updateSoap(field.key, e.target.value)
                      }
                      placeholder={field.placeholder}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2.5,
                          bgcolor: "#fff",
                        },
                      }}
                    />
                  ))}
                </Stack>
              </CardContent>
            </Card>

            {/* =============================================
                DIAGNOSIS / MEDICATION / LAB
            ============================================== */}

            <Grid container spacing={2}>
              {/* Diagnosis */}

              <Grid size={{ xs: 12, md: 4 }}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 3,
                    border: "1px solid #e7eaf3",
                  }}
                >
                  <CardHeader
                    title="Diagnosis"
                    titleTypographyProps={{
                      fontWeight: 800,
                    }}
                  />

                  <CardContent sx={{ pt: 0 }}>
                    <Stack
                      direction="row"
                      spacing={1}
                    >
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="Add diagnosis..."
                        value={newDx}
                        onChange={(e) =>
                          setNewDx(e.target.value)
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            addDx();
                          }
                        }}
                      />

                      <IconButton
                        color="primary"
                        onClick={addDx}
                        sx={{
                          borderRadius: 2,
                          bgcolor: "#eef2ff",
                        }}
                      >
                        <Plus size={18} />
                      </IconButton>
                    </Stack>

                    <Stack spacing={1} sx={{ mt: 1.5 }}>
                      {diagnoses.map((d, i) => (
                        <Stack
                          key={i}
                          direction="row"
                          sx={{
                            alignItems: "center",
                            justifyContent:
                              "space-between",
                            p: 1,
                            borderRadius: 2,
                            bgcolor: "#eef2ff",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: 12,
                              fontWeight: 700,
                            }}
                          >
                            {d}
                          </Typography>

                          <IconButton
                            size="small"
                            onClick={() =>
                              setDiagnoses(
                                diagnoses.filter(
                                  (_, idx) =>
                                    idx !== i
                                )
                              )
                            }
                          >
                            <Trash2 size={14} />
                          </IconButton>
                        </Stack>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              {/* Medications */}

              <Grid size={{ xs: 12, md: 4 }}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 3,
                    border: "1px solid #e7eaf3",
                  }}
                >
                  <CardHeader
                    title="Medications"
                    titleTypographyProps={{
                      fontWeight: 800,
                    }}
                  />

                  <CardContent sx={{ pt: 0 }}>
                    <Stack
                      direction="row"
                      spacing={1}
                    >
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="Add medication..."
                        value={newMed}
                        onChange={(e) =>
                          setNewMed(e.target.value)
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            addMed();
                          }
                        }}
                      />

                      <IconButton
                        color="success"
                        onClick={addMed}
                        sx={{
                          borderRadius: 2,
                          bgcolor: "#ecfdf5",
                        }}
                      >
                        <Plus size={18} />
                      </IconButton>
                    </Stack>

                    <Stack spacing={1} sx={{ mt: 1.5 }}>
                      {meds.map((m, i) => (
                        <Stack
                          key={i}
                          direction="row"
                          sx={{
                            alignItems: "center",
                            justifyContent:
                              "space-between",
                            p: 1,
                            borderRadius: 2,
                            bgcolor: "#ecfdf5",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: 12,
                              fontWeight: 700,
                            }}
                          >
                            {m}
                          </Typography>

                          <IconButton
                            size="small"
                            onClick={() =>
                              setMeds(
                                meds.filter(
                                  (_, idx) =>
                                    idx !== i
                                )
                              )
                            }
                          >
                            <Trash2 size={14} />
                          </IconButton>
                        </Stack>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              {/* Labs */}

              <Grid size={{ xs: 12, md: 4 }}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 3,
                    border: "1px solid #e7eaf3",
                  }}
                >
                  <CardHeader
                    title="Lab Orders"
                    titleTypographyProps={{
                      fontWeight: 800,
                    }}
                  />

                  <CardContent sx={{ pt: 0 }}>
                    <Stack
                      direction="row"
                      spacing={1}
                    >
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="Add lab order..."
                        value={newLab}
                        onChange={(e) =>
                          setNewLab(e.target.value)
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            addLab();
                          }
                        }}
                      />

                      <IconButton
                        color="warning"
                        onClick={addLab}
                        sx={{
                          borderRadius: 2,
                          bgcolor: "#fffbeb",
                        }}
                      >
                        <FlaskConical size={18} />
                      </IconButton>
                    </Stack>

                    <Stack spacing={1} sx={{ mt: 1.5 }}>
                      {labs.map((l, i) => (
                        <Stack
                          key={i}
                          direction="row"
                          sx={{
                            alignItems: "center",
                            justifyContent:
                              "space-between",
                            p: 1,
                            borderRadius: 2,
                            bgcolor: "#fffbeb",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: 12,
                              fontWeight: 700,
                            }}
                          >
                            {l}
                          </Typography>

                          <IconButton
                            size="small"
                            onClick={() =>
                              setLabs(
                                labs.filter(
                                  (_, idx) =>
                                    idx !== i
                                )
                              )
                            }
                          >
                            <Trash2 size={14} />
                          </IconButton>
                        </Stack>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Stack>
        </Grid>

        {/* =================================================
            RIGHT SIDE
        ================================================== */}

        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack
            spacing={2.5}
            sx={{
              position: {
                lg: "sticky",
              },
              top: {
                lg: 20,
              },
            }}
          >
            {/* =============================================
                AI ASSISTANT
            ============================================== */}

            <Card
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                border: "1px solid #dfe2ff",
                boxShadow:
                  "0 8px 30px rgba(79,70,229,.10)",
              }}
            >
              <Box
                sx={{
                  p: 2,
                  background:
                    "linear-gradient(135deg,#4338CA,#6366F1)",
                  color: "#fff",
                }}
              >
                <Stack
                  direction="row"
                  sx={{
                    alignItems: "center",
                    justifyContent:
                      "space-between",
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ alignItems: "center" }}
                  >
                    <Box
                      sx={{
                        width: 38,
                        height: 38,
                        borderRadius: 2,
                        bgcolor:
                          "rgba(255,255,255,.16)",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <Sparkles size={19} />
                    </Box>

                    <Box>
                      <Typography
                        sx={{
                          fontWeight: 800,
                          fontSize: 16,
                        }}
                      >
                        MedNxt AI
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: 11,
                          opacity: 0.8,
                        }}
                      >
                        Clinical assistant
                      </Typography>
                    </Box>
                  </Stack>

                  <Sparkles size={18} />
                </Stack>
              </Box>

              <CardContent>
                <Stack spacing={1.5}>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: 11,
                        color: "#64748b",
                      }}
                    >
                      Clinical context
                    </Typography>

                    <Typography
                      sx={{
                        fontWeight: 800,
                        color: "#172554",
                      }}
                    >
                      {patient.firstName}{" "}
                      {patient.lastName}
                    </Typography>
                  </Box>

                  <Divider />

                  <Typography
                    sx={{
                      fontSize: 13,
                      color: "#64748b",
                      lineHeight: 1.7,
                    }}
                  >
                    Generate a concise clinical
                    summary using the patient's
                    consultation information,
                    assessment, diagnosis,
                    medications and
                    investigations.
                  </Typography>

                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={
                      aiLoading ? (
                        <Loader
                          size={16}
                          className="animate-spin"
                        />
                      ) : (
                        <Sparkles size={16} />
                      )
                    }
                    onClick={generateAi}
                    disabled={aiLoading}
                    sx={{
                      py: 1.25,
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: 800,
                    }}
                  >
                    {aiLoading
                      ? "Generating..."
                      : "Generate AI Clinical Note"}
                  </Button>

                  {aiLoading && (
                    <LoadingState message="Analyzing consultation data..." />
                  )}

                  {aiNote && (
                    <Alert
                      severity="info"
                      sx={{
                        borderRadius: 2,
                        fontSize: 12,
                        lineHeight: 1.6,
                      }}
                    >
                      {aiNote}
                    </Alert>
                  )}
                </Stack>
              </CardContent>
            </Card>

            {/* =============================================
                OPD QUEUE
            ============================================== */}

            <Card
              sx={{
                borderRadius: 3,
                border: "1px solid #e7eaf3",
                overflow: "hidden",
                boxShadow:
                  "0 4px 18px rgba(30,41,59,.05)",
              }}
            >
              <Box
                sx={{
                  px: 2,
                  py: 1.75,
                  bgcolor: "#fafbff",
                  borderBottom:
                    "1px solid #edf0f6",
                }}
              >
                <Stack
                  direction="row"
                  sx={{
                    alignItems: "center",
                    justifyContent:
                      "space-between",
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize: 15,
                        fontWeight: 800,
                        color: "#172554",
                      }}
                    >
                      OPD Queue
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 11,
                        color: "#64748b",
                        mt: 0.25,
                      }}
                    >
                      Patients waiting for
                      consultation
                    </Typography>
                  </Box>

                  <Chip
                    label={patients.length}
                    size="small"
                    color="primary"
                    sx={{
                      fontWeight: 800,
                    }}
                  />
                </Stack>
              </Box>

              <Box
                sx={{
                  maxHeight: 470,
                  overflowY: "auto",
                }}
              >
                <OPDQueue
                  patients={patients}
                  selectedPatient={patient}
                  onSelectPatient={selectPatient}
                />
              </Box>
            </Card>

            {/* =============================================
                QUICK ACTION
            ============================================== */}

            <Card
              sx={{
                borderRadius: 3,
                border: "1px solid #e7eaf3",
              }}
            >
              <CardContent>
                <Stack spacing={1.25}>
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 800,
                      color: "#172554",
                    }}
                  >
                    Consultation Status
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ alignItems: "center" }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: "#22c55e",
                      }}
                    />

                    <Typography
                      sx={{
                        fontSize: 12,
                        color: "#64748b",
                      }}
                    >
                      Consultation in progress
                    </Typography>
                  </Stack>

                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<Activity size={16} />}
                    onClick={save}
                    sx={{
                      mt: 0.5,
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: 700,
                    }}
                  >
                    Save Current Consultation
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}