import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Box,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import {
  AlertCircle,
  Droplet,
  FileCheck,
  MapPin,
  MessageSquare,
  Search,
  UserRound,
} from "lucide-react";

import { useApp } from "@/context/AppContext";

import type { Patient } from "@/types";

// =========================================================
// FORM DATA
// =========================================================

export interface RegistrationFormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender:
    | ""
    | "Male"
    | "Female"
    | "Other";
  bloodGroup: string;
  mobile: string;
  email: string;
  address: string;
}

// =========================================================
// PROPS
// =========================================================

interface PatientDetailsFormProps {
  form: RegistrationFormData;

  errors: Record<string, string>;

  onChange: (
    field: keyof RegistrationFormData,
    value: string
  ) => void;

  onPatientSelect: (
    patient: Patient | null
  ) => void;
}

// =========================================================
// FIELD STYLE
// =========================================================

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    minHeight: 40,
    height: 40,
    borderRadius: 1.2,
    bgcolor: "#fff",

    "& fieldset": {
      borderColor: "#dbe3ef",
    },

    "&:hover fieldset": {
      borderColor: "#aebbd0",
    },

    "&.Mui-focused fieldset": {
      borderColor: "#5b55f5",
      borderWidth: 1,
    },
  },

  "& .MuiInputBase-input": {
    fontSize: 12,
    color: "#334155",
    py: 0.8,
  },

  "& .MuiFormHelperText-root": {
    fontSize: 10,
    marginTop: 0.3,
  },

  "& .MuiSelect-select": {
    fontSize: 12,
    py: 1,
  },
};

// =========================================================
// SECTION TITLE
// =========================================================

const sectionTitleSx = {
  fontSize: 11,
  fontWeight: 700,
  color: "#64748b",
  letterSpacing: 0.8,
  mb: 1,
};

// =========================================================
// LABEL
// =========================================================

const labelSx = {
  fontSize: 11,
  fontWeight: 700,
  color: "#475569",
  mb: 0.45,
};

// =========================================================
// COMPONENT
// =========================================================

export function PatientDetailsForm({
  form,
  errors,
  onChange,
  onPatientSelect,
}: PatientDetailsFormProps) {
  const { patients } = useApp();

  // =======================================================
  // SEARCH
  // =======================================================

  const [searchPatient, setSearchPatient] =
    useState("");

  const [showResults, setShowResults] =
    useState(false);

  // =======================================================
  // EMERGENCY MODE
  // =======================================================

  const [emergencyMode, setEmergencyMode] =
    useState(false);

  // =======================================================
  // EXTRA FIELDS
  // =======================================================

  const [aadhaar, setAadhaar] =
    useState("");

  const [alternateNumber, setAlternateNumber] =
    useState("");

  const [street, setStreet] =
    useState(form.address);

  const [city, setCity] =
    useState("");

  const [state, setState] =
    useState("");

  const [pincode, setPincode] =
    useState("");

  const [allergies, setAllergies] =
    useState("");

  const [department, setDepartment] =
    useState("General Medicine");

  const [doctor, setDoctor] =
    useState("");

  const [reason, setReason] =
    useState("");

  // =======================================================
  // LISTEN FOR EMERGENCY MODE
  // =======================================================

  useEffect(() => {
    const handleEmergencyToggle = () => {
      setEmergencyMode(
        (previous) => !previous
      );
    };

    window.addEventListener(
      "toggle-emergency-mode",
      handleEmergencyToggle
    );

    return () => {
      window.removeEventListener(
        "toggle-emergency-mode",
        handleEmergencyToggle
      );
    };
  }, []);

  // =======================================================
  // SEARCH RESULTS
  // =======================================================

  const filteredPatients = useMemo(() => {
    const search =
      searchPatient
        .trim()
        .toLowerCase();

    if (!search) {
      return [];
    }

    return patients.filter(
      (patient) => {
        const fullName =
          `${patient.firstName} ${patient.lastName}`
            .toLowerCase();

        return (
          fullName.includes(search) ||
          patient.mobile.includes(search) ||
          patient.uhid
            .toLowerCase()
            .includes(search)
        );
      }
    );
  }, [
    patients,
    searchPatient,
  ]);

  // =======================================================
  // SELECT EXISTING PATIENT
  // =======================================================

  const handleSelectPatient = (
    patient: Patient
  ) => {
    onChange(
      "firstName",
      patient.firstName
    );

    onChange(
      "lastName",
      patient.lastName
    );

    onChange(
      "dateOfBirth",
      patient.dateOfBirth
    );

    onChange(
      "gender",
      patient.gender
    );

    onChange(
      "bloodGroup",
      patient.bloodGroup
    );

    onChange(
      "mobile",
      patient.mobile
    );

    onChange(
      "email",
      patient.email
    );

    onChange(
      "address",
      patient.address
    );

    setStreet(patient.address);

    setSearchPatient(
      `${patient.firstName} ${patient.lastName}`
    );

    setShowResults(false);

    onPatientSelect(patient);
  };

  // =======================================================
  // AGE
  // =======================================================

  const age = useMemo(() => {
    if (!form.dateOfBirth) {
      return "";
    }

    const birthDate =
      new Date(form.dateOfBirth);

    const today = new Date();

    let calculatedAge =
      today.getFullYear() -
      birthDate.getFullYear();

    const monthDifference =
      today.getMonth() -
      birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 &&
        today.getDate() <
          birthDate.getDate())
    ) {
      calculatedAge--;
    }

    return calculatedAge >= 0
      ? String(calculatedAge)
      : "";
  }, [form.dateOfBirth]);

  // =======================================================
  // NORMAL MODE
  // =======================================================

  const renderNormalMode = () => (
    <>
      {/* ===================================================
          IDENTITY PROOFS
      ==================================================== */}

      <Box sx={{ mb: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent:
              "space-between",
            mb: 0.9,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.7,
            }}
          >
            <FileCheck
              size={14}
              color="#94a3b8"
            />

            <Typography
              sx={sectionTitleSx}
            >
              IDENTITY PROOFS
            </Typography>
          </Box>

          <Typography
            sx={{
              fontSize: 9.5,
              color: "#94a3b8",
            }}
          >
            (Optional)
          </Typography>
        </Box>

        <Grid
          container
          spacing={1.3}
        >
          {/* =================================================
              AADHAAR
          ================================================= */}

          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <Typography
              sx={labelSx}
            >
              Aadhaar Number / VIN Number
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 0.7,
              }}
            >
              <TextField
                fullWidth
                placeholder="12 digit Aadhaar number"
                value={aadhaar}
                error={
                  aadhaar.length > 0 &&
                  aadhaar.length !== 12
                }
                helperText={
                  aadhaar.length > 0 &&
                  aadhaar.length !== 12
                    ? "Aadhaar number must be 12 digits"
                    : ""
                }
                onChange={(e) =>
                  setAadhaar(
                    e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 12)
                  )
                }
                sx={fieldSx}
                slotProps={{
                  htmlInput: {
                    maxLength: 12,
                    inputMode: "numeric",
                  },
                }}
              />

              <Box
                component="button"
                type="button"
                sx={{
                  minWidth: 65,
                  height: 40,
                  border:
                    "1px solid #fed7aa",
                  bgcolor: "#fff7ed",
                  color: "#f97316",
                  borderRadius: 1.2,
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Verify
              </Box>
            </Box>
          </Grid>

          {/* =================================================
              ALTERNATE NUMBER
          ================================================= */}

          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <Typography
              sx={labelSx}
            >
              Alternate Number
            </Typography>

            <TextField
              fullWidth
              placeholder="10 digit alternate number"
              value={alternateNumber}
              onChange={(e) =>
                setAlternateNumber(
                  e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 10)
                )
              }
              sx={fieldSx}
              slotProps={{
                htmlInput: {
                  maxLength: 10,
                  inputMode: "numeric",
                },
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );

  // =======================================================
  // DEMOGRAPHICS
  // =======================================================

  const renderDemographics = () => (
    <Box sx={{ mb: 2 }}>
      <Typography
        sx={sectionTitleSx}
      >
        DEMOGRAPHICS
      </Typography>

      <Grid
        container
        spacing={1.3}
      >
        {/* =================================================
            FIRST NAME
        ================================================= */}

        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <Typography
            sx={labelSx}
          >
            First Name *
          </Typography>

          <TextField
            fullWidth
            placeholder="Eg: Rahul"
            value={form.firstName}
            error={
              !!errors.firstName
            }
            helperText={
              errors.firstName
            }
            onChange={(e) =>
              onChange(
                "firstName",
                e.target.value.replace(
                  /[^a-zA-Z\s]/g,
                  ""
                )
              )
            }
            sx={fieldSx}
            slotProps={{
              input: {
                startAdornment: (
                  <UserRound
                    size={15}
                    color="#94a3b8"
                    style={{
                      marginRight: 7,
                    }}
                  />
                ),
              },
            }}
          />
        </Grid>

        {/* =================================================
            LAST NAME
        ================================================= */}

        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <Typography
            sx={labelSx}
          >
            Last Name *
          </Typography>

          <TextField
            fullWidth
            placeholder="Eg: Verma"
            value={form.lastName}
            error={
              !!errors.lastName
            }
            helperText={
              errors.lastName
            }
            onChange={(e) =>
              onChange(
                "lastName",
                e.target.value.replace(
                  /[^a-zA-Z\s]/g,
                  ""
                )
              )
            }
            sx={fieldSx}
          />
        </Grid>

        {/* =================================================
            AGE
        ================================================= */}

        <Grid
          size={{
            xs: 12,
            md: emergencyMode ? 4 : 3,
          }}
        >
          <Typography
            sx={labelSx}
          >
            Age
          </Typography>

          <TextField
            fullWidth
            value={age}
            placeholder="0"
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
            sx={fieldSx}
          />
        </Grid>

        {/* =================================================
            GENDER
        ================================================= */}

        <Grid
          size={{
            xs: 12,
            md: emergencyMode ? 4 : 4,
          }}
        >
          <Typography
            sx={labelSx}
          >
            Gender *
          </Typography>

          <TextField
            fullWidth
            select
            value={form.gender}
            error={
              !!errors.gender
            }
            helperText={
              errors.gender
            }
            onChange={(e) =>
              onChange(
                "gender",
                e.target.value
              )
            }
            sx={fieldSx}
          >
            <MenuItem value="">
              Select Gender
            </MenuItem>

            <MenuItem value="Male">
              Male
            </MenuItem>

            <MenuItem value="Female">
              Female
            </MenuItem>

            <MenuItem value="Other">
              Other
            </MenuItem>
          </TextField>
        </Grid>

        {/* =================================================
            DATE OF BIRTH
        ================================================= */}

        {!emergencyMode && (
          <Grid
            size={{
              xs: 12,
              md: 5,
            }}
          >
            <Typography
              sx={labelSx}
            >
              Date of Birth *
            </Typography>

            <TextField
              fullWidth
              type="date"
              value={
                form.dateOfBirth
              }
              error={
                !!errors.dateOfBirth
              }
              helperText={
                errors.dateOfBirth
              }
              onChange={(e) =>
                onChange(
                  "dateOfBirth",
                  e.target.value
                )
              }
              sx={fieldSx}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );

  // =======================================================
  // CONTACT DETAILS
  // =======================================================

  const renderContactDetails = () => (
    <Box sx={{ mb: 2 }}>
      <Typography
        sx={sectionTitleSx}
      >
        CONTACT DETAILS
      </Typography>

      <Grid
        container
        spacing={1.3}
      >
        {/* =================================================
            MOBILE
        ================================================= */}

        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <Typography
            sx={labelSx}
          >
            Mobile Number *
          </Typography>

          <TextField
            fullWidth
            placeholder="10 digit number"
            value={form.mobile}
            error={
              !!errors.mobile
            }
            helperText={
              errors.mobile
            }
            onChange={(e) =>
              onChange(
                "mobile",
                e.target.value
                  .replace(/\D/g, "")
                  .slice(0, 10)
              )
            }
            sx={fieldSx}
            slotProps={{
              htmlInput: {
                maxLength: 10,
                inputMode: "numeric",
              },
            }}
          />
        </Grid>

        {/* =================================================
            EMERGENCY CONTACT
        ================================================= */}

        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <Typography
            sx={labelSx}
          >
            Emergency Contact
          </Typography>

          <TextField
            fullWidth
            placeholder="Optional"
            sx={fieldSx}
          />
        </Grid>

        {/* =================================================
            EMAIL
        ================================================= */}

        <Grid
          size={{ xs: 12 }}
        >
          <Typography
            sx={labelSx}
          >
            Email Address
          </Typography>

          <TextField
            fullWidth
            placeholder="Optional"
            value={form.email}
            error={
              !!errors.email
            }
            helperText={
              errors.email
            }
            onChange={(e) =>
              onChange(
                "email",
                e.target.value
              )
            }
            sx={fieldSx}
          />
        </Grid>
      </Grid>
    </Box>
  );

  // =======================================================
  // ADDRESS
  // =======================================================

  const renderAddress = () => (
    <Box sx={{ mb: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.7,
          mb: 0.9,
        }}
      >
        <MapPin
          size={14}
          color="#94a3b8"
        />

        <Typography
          sx={sectionTitleSx}
        >
          ADDRESS & LOCATION
        </Typography>
      </Box>

      <Grid
        container
        spacing={1.3}
      >
        {/* =================================================
            STREET
        ================================================= */}

        <Grid
          size={{ xs: 12 }}
        >
          <Typography
            sx={labelSx}
          >
            Street Address *
          </Typography>

          <TextField
            fullWidth
            placeholder="House No., Street, Locality"
            value={street}
            error={
              !!errors.address
            }
            helperText={
              errors.address
            }
            onChange={(e) => {
              setStreet(
                e.target.value
              );

              onChange(
                "address",
                e.target.value
              );
            }}
            sx={fieldSx}
          />
        </Grid>

        {/* =================================================
            CITY
        ================================================= */}

        <Grid
          size={{
            xs: 12,
            md: 4,
          }}
        >
          <Typography
            sx={labelSx}
          >
            City
          </Typography>

          <TextField
            fullWidth
            value={city}
            onChange={(e) =>
              setCity(
                e.target.value.replace(
                  /[^a-zA-Z\s]/g,
                  ""
                )
              )
            }
            sx={fieldSx}
          />
        </Grid>

        {/* =================================================
            STATE
        ================================================= */}

        <Grid
          size={{
            xs: 12,
            md: 4,
          }}
        >
          <Typography
            sx={labelSx}
          >
            State
          </Typography>

          <TextField
            fullWidth
            value={state}
            onChange={(e) =>
              setState(
                e.target.value.replace(
                  /[^a-zA-Z\s]/g,
                  ""
                )
              )
            }
            sx={fieldSx}
          />
        </Grid>

        {/* =================================================
            PINCODE
        ================================================= */}

        <Grid
          size={{
            xs: 12,
            md: 4,
          }}
        >
          <Typography
            sx={labelSx}
          >
            Pincode
          </Typography>

          <TextField
            fullWidth
            value={pincode}
            onChange={(e) =>
              setPincode(
                e.target.value
                  .replace(/\D/g, "")
                  .slice(0, 6)
              )
            }
            sx={fieldSx}
            slotProps={{
              htmlInput: {
                maxLength: 6,
                inputMode: "numeric",
              },
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );

  // =======================================================
  // CLINICAL & CRITICAL INFO
  // =======================================================

  const renderClinicalInfo = () => (
    <Box
      sx={{
        mb: 2,
        p: 1.5,
        borderRadius: 1.3,
        bgcolor: "#fffbeb",
        borderLeft:
          "3px solid #fbbf24",
        borderTop:
          "1px solid #fde68a",
        borderRight:
          "1px solid #fde68a",
        borderBottom:
          "1px solid #fde68a",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.7,
          mb: 1,
        }}
      >
        <AlertCircle
          size={15}
          color="#f59e0b"
        />

        <Typography
          sx={{
            ...sectionTitleSx,
            color: "#475569",
            mb: 0,
          }}
        >
          CLINICAL & CRITICAL INFO
        </Typography>
      </Box>

      <Grid
        container
        spacing={1.3}
      >
        {/* =================================================
            ALLERGIES
        ================================================= */}

        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <Typography
            sx={labelSx}
          >
            Known Allergies
          </Typography>

          <TextField
            fullWidth
            placeholder="Eg: Penicillin, Peanuts"
            value={allergies}
            onChange={(e) =>
              setAllergies(
                e.target.value
              )
            }
            sx={fieldSx}
            slotProps={{
              input: {
                startAdornment: (
                  <AlertCircle
                    size={15}
                    color="#f97316"
                    style={{
                      marginRight: 7,
                    }}
                  />
                ),
              },
            }}
          />
        </Grid>

        {/* =================================================
            BLOOD GROUP
        ================================================= */}

        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <Typography
            sx={labelSx}
          >
            Blood Group *
          </Typography>

          <TextField
            fullWidth
            select
            value={
              form.bloodGroup
            }
            error={
              !!errors.bloodGroup
            }
            helperText={
              errors.bloodGroup
            }
            onChange={(e) =>
              onChange(
                "bloodGroup",
                e.target.value
              )
            }
            sx={fieldSx}
            slotProps={{
              input: {
                startAdornment: (
                  <Droplet
                    size={15}
                    color="#f87171"
                    style={{
                      marginRight: 7,
                    }}
                  />
                ),
              },
            }}
          >
            <MenuItem value="">
              Select Blood Group
            </MenuItem>

            {[
              "A+",
              "A-",
              "B+",
              "B-",
              "O+",
              "O-",
              "AB+",
              "AB-",
            ].map((group) => (
              <MenuItem
                key={group}
                value={group}
              >
                {group}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </Box>
  );

  // =======================================================
  // VISIT DETAILS
  // =======================================================

  const renderVisitDetails = () => (
    <Box sx={{ mb: 2 }}>
      <Typography
        sx={sectionTitleSx}
      >
        VISIT DETAILS
      </Typography>

      <Grid
        container
        spacing={1.3}
      >
        {/* =================================================
            TYPE
        ================================================= */}

        <Grid
          size={{
            xs: 12,
            md: 3,
          }}
        >
          <Typography
            sx={labelSx}
          >
            Type
          </Typography>

          <Box
            sx={{
              display: "flex",
              height: 40,
              bgcolor: "#f1f5f9",
              borderRadius: 1.2,
              p: 0.35,
            }}
          >
            <Box
              sx={{
                flex: 1,
                bgcolor: "#fff",
                borderRadius: 0.9,
                display: "flex",
                alignItems:
                  "center",
                justifyContent:
                  "center",
                color: "#4f46e5",
                fontSize: 11,
                fontWeight: 700,
                boxShadow:
                  "0 1px 3px rgba(0,0,0,0.05)",
              }}
            >
              OPD
            </Box>

            <Box
              sx={{
                flex: 1,
                display: "flex",
                alignItems:
                  "center",
                justifyContent:
                  "center",
                color: "#94a3b8",
                fontSize: 11,
                fontWeight: 600,
                cursor:
                  "not-allowed",
              }}
            >
              IPD
            </Box>
          </Box>
        </Grid>

        {/* =================================================
            DEPARTMENT
        ================================================= */}

        <Grid
          size={{
            xs: 12,
            md: 4,
          }}
        >
          <Typography
            sx={labelSx}
          >
            Department
          </Typography>

          <TextField
            fullWidth
            select
            value={department}
            onChange={(e) =>
              setDepartment(
                e.target.value
              )
            }
            sx={fieldSx}
          >
            <MenuItem value="General Medicine">
              General Medicine
            </MenuItem>

            <MenuItem value="Pediatrics">
              Pediatrics
            </MenuItem>

            <MenuItem value="Ortho">
              Ortho
            </MenuItem>

            <MenuItem value="ENT">
              ENT
            </MenuItem>

            <MenuItem value="Gynae">
              Gynae
            </MenuItem>
          </TextField>
        </Grid>

        {/* =================================================
            DOCTOR
        ================================================= */}

        <Grid
          size={{
            xs: 12,
            md: 5,
          }}
        >
          <Typography
            sx={labelSx}
          >
            Consulting Doctor
          </Typography>

          <TextField
            fullWidth
            select
            value={doctor}
            onChange={(e) =>
              setDoctor(
                e.target.value
              )
            }
            sx={fieldSx}
          >
            <MenuItem value="">
              Select Doctor
            </MenuItem>

            <MenuItem value="Dr. Sharma">
              Dr. Sharma
            </MenuItem>

            <MenuItem value="Dr. Priya">
              Dr. Priya
            </MenuItem>

            <MenuItem value="Dr. Kumar">
              Dr. Kumar
            </MenuItem>
          </TextField>
        </Grid>
      </Grid>
    </Box>
  );

  // =======================================================
  // REASON
  // =======================================================

  const renderReason = () => (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.7,
          mb: 0.8,
        }}
      >
        <MessageSquare
          size={14}
          color="#94a3b8"
        />

        <Typography
          sx={sectionTitleSx}
        >
          REASON FOR VISIT / SYMPTOMS
        </Typography>
      </Box>

      <TextField
        fullWidth
        multiline
        minRows={3}
        placeholder="Describe the main complaints or reason for visiting..."
        value={reason}
        onChange={(e) =>
          setReason(
            e.target.value
          )
        }
        sx={{
          ...fieldSx,

          "& .MuiOutlinedInput-root": {
            ...fieldSx[
              "& .MuiOutlinedInput-root"
            ],

            minHeight: 75,
            height: "auto",
            alignItems:
              "flex-start",
            pt: 0.8,
          },
        }}
      />
    </Box>
  );

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <Box>
      {/* ===================================================
          SEARCH EXISTING PATIENT
      ==================================================== */}

      <Box
        sx={{
          mb: 2,
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.7,
            mb: 0.7,
          }}
        >
          <Search
            size={15}
            color="#4f46e5"
          />

          <Typography
            sx={{
              fontSize: 11,
              fontWeight: 700,
              color: "#4f46e5",
              letterSpacing: 0.3,
            }}
          >
            SEARCH EXISTING PATIENT (AUTO-FILL)
          </Typography>
        </Box>

        <TextField
          fullWidth
          placeholder="Type Name, Mobile Number or UHID..."
          value={searchPatient}
          onFocus={() => {
            if (
              searchPatient.trim()
            ) {
              setShowResults(true);
            }
          }}
          onChange={(e) => {
            setSearchPatient(
              e.target.value
            );

            setShowResults(true);

            if (
              !e.target.value.trim()
            ) {
              onPatientSelect(null);
            }
          }}
          sx={{
            ...fieldSx,

            "& .MuiOutlinedInput-root":
              {
                ...fieldSx[
                  "& .MuiOutlinedInput-root"
                ],

                minHeight: 42,
                height: 42,
                bgcolor: "#fafbff",
              },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <Search
                  size={17}
                  color="#94a3b8"
                  style={{
                    marginRight: 7,
                  }}
                />
              ),
            },
          }}
        />

        {/* =================================================
            SEARCH RESULTS
        ================================================= */}

        {showResults &&
          searchPatient.trim() && (
            <Paper
              elevation={5}
              sx={{
                position: "absolute",
                zIndex: 20,
                left: 0,
                right: 0,
                mt: 0.5,
                maxHeight: 260,
                overflowY: "auto",
                borderRadius: 1.5,
                border:
                  "1px solid #e2e8f0",
              }}
            >
              {filteredPatients.length >
              0 ? (
                filteredPatients.map(
                  (patient) => (
                    <Box
                      key={patient.id}
                      onClick={() =>
                        handleSelectPatient(
                          patient
                        )
                      }
                      sx={{
                        px: 1.5,
                        py: 1.1,
                        cursor:
                          "pointer",
                        borderBottom:
                          "1px solid #f1f5f9",

                        "&:hover": {
                          bgcolor:
                            "#f8fafc",
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 12,
                          fontWeight: 700,
                          color:
                            "#334155",
                        }}
                      >
                        {
                          patient.firstName
                        }{" "}
                        {
                          patient.lastName
                        }
                      </Typography>

                      <Typography
                        sx={{
                          mt: 0.25,
                          fontSize: 10,
                          color:
                            "#64748b",
                        }}
                      >
                        UHID:{" "}
                        {
                          patient.uhid
                        }{" "}
                        • Mobile:{" "}
                        {
                          patient.mobile
                        }
                      </Typography>

                      <Typography
                        sx={{
                          mt: 0.15,
                          fontSize: 10,
                          color:
                            "#94a3b8",
                        }}
                      >
                        {
                          patient.gender
                        }{" "}
                        •{" "}
                        {
                          patient.bloodGroup
                        }{" "}
                        •{" "}
                        {
                          patient.address
                        }
                      </Typography>
                    </Box>
                  )
                )
              ) : (
                <Box
                  sx={{ p: 1.5 }}
                >
                  <Typography
                    sx={{
                      fontSize: 11,
                      color:
                        "#94a3b8",
                      textAlign:
                        "center",
                    }}
                  >
                    No existing patient found
                  </Typography>
                </Box>
              )}
            </Paper>
          )}
      </Box>

      {/* ===================================================
          EMERGENCY MODE INDICATOR
      ==================================================== */}

      {emergencyMode && (
        <Box
          sx={{
            mb: 1.75,
            px: 1.25,
            py: 0.8,
            borderRadius: 1.2,
            bgcolor: "#fef2f2",
            border:
              "1px solid #fecaca",
            display: "flex",
            alignItems: "center",
            gap: 0.7,
          }}
        >
          <AlertCircle
            size={15}
            color="#dc2626"
          />

          <Typography
            sx={{
              fontSize: 10.5,
              fontWeight: 700,
              color: "#b91c1c",
            }}
          >
            EMERGENCY MODE ACTIVE — Minimal registration details
          </Typography>
        </Box>
      )}

      {/* ===================================================
          NORMAL MODE
      ==================================================== */}

      {!emergencyMode &&
        renderNormalMode()}

      {/* ===================================================
          DEMOGRAPHICS
      ==================================================== */}

      {renderDemographics()}

      {/* ===================================================
          NORMAL MODE CONTACT
      ==================================================== */}

      {!emergencyMode &&
        renderContactDetails()}

      {/* ===================================================
          NORMAL MODE ADDRESS
      ==================================================== */}

      {!emergencyMode &&
        renderAddress()}

      {/* ===================================================
          CLINICAL & CRITICAL INFO
      ==================================================== */}

      {renderClinicalInfo()}

      {/* ===================================================
          VISIT DETAILS
      ==================================================== */}

      {renderVisitDetails()}

      {/* ===================================================
          REASON
      ==================================================== */}

      {renderReason()}
    </Box>
  );
}