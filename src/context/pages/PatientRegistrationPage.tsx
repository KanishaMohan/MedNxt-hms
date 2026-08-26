import { useState } from "react";

import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

import { CheckCircle2 } from "lucide-react";

import { PageHeader } from "@/components/PageHeader";

import {
  RegistrationForm,
  type RegistrationFormData,
} from "@/components/registration/RegistrationForm";

import { useApp } from "@/context/AppContext";

import type { Patient } from "@/types";

import {
  validatePatientRegistration,
} from "@/validations/patientValidation";

// =========================================================
// EMPTY FORM
// =========================================================

const emptyForm: RegistrationFormData = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "",
  bloodGroup: "",
  mobile: "",
  email: "",
  address: "",
};

// =========================================================
// PAGE
// =========================================================

export function PatientRegistrationPage() {
  const { addPatient } = useApp();

  const [form, setForm] =
    useState<RegistrationFormData>(emptyForm);

  const [errors, setErrors] =
    useState<Record<string, string>>({});

  const [success, setSuccess] =
    useState("");

  const [submitError, setSubmitError] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  const [successDialogOpen, setSuccessDialogOpen] =
    useState(false);

  const [selectedPatient, setSelectedPatient] =
    useState<Patient | null>(null);

  // =======================================================
  // HANDLE FORM CHANGE
  // =======================================================

  const handleChange = (
    field: keyof RegistrationFormData,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: "",
    }));

    setSuccess("");
    setSubmitError("");
  };

  // =======================================================
  // CREATE PATIENT + ADD TO QUEUE
  // =======================================================

  const handleSave = async () => {
    setSuccess("");
    setSubmitError("");

    // -------------------------------------------------------
    // VALIDATION
    // -------------------------------------------------------

    const validationErrors =
      validatePatientRegistration(form);

    setErrors(validationErrors);

    if (
      Object.keys(validationErrors).length > 0
    ) {
      return;
    }

    // -------------------------------------------------------
    // CREATE PATIENT
    // -------------------------------------------------------

    try {
      setSaving(true);

      const uhid = `ABHA-${Math.floor(
        1000 + Math.random() * 9000
      )}`;

      const patient: Patient = {
        id: `patient-${Date.now()}`,

        uhid,

        firstName:
          form.firstName.trim(),

        lastName:
          form.lastName.trim(),

        dateOfBirth:
          form.dateOfBirth,

        gender:
          form.gender as
            | "Male"
            | "Female"
            | "Other",

        bloodGroup:
          form.bloodGroup,

        mobile:
          form.mobile,

        email:
          form.email.trim(),

        address:
          form.address.trim(),

        priority:
          "Medium",

        status:
          "WAITING",

        doctor:
          "Dr. Sharma",

        reason:
          "New Registration",

        arrival:
          new Date().toLocaleTimeString(
            [],
            {
              hour: "2-digit",
              minute: "2-digit",
            }
          ),
      };

      // -----------------------------------------------------
      // SEND TO APP CONTEXT / SERVICE
      // -----------------------------------------------------

      await addPatient(patient);

      // -----------------------------------------------------
      // SUCCESS
      // -----------------------------------------------------

      const successMessage =
        `Patient profile created successfully. ` +
        `UHID: ${uhid}. ` +
        `Patient has been added to the queue.`;

      setSuccess(successMessage);

      setSuccessDialogOpen(true);

      // Clear form after successful registration
      setForm(emptyForm);

      setErrors({});

      setSelectedPatient(null);

    } catch (error) {
      console.error(
        "Failed to register patient:",
        error
      );

      setSubmitError(
        "Unable to register patient. Please try again."
      );

    } finally {
      setSaving(false);
    }
  };

  // =======================================================
  // CLEAR / NEW REGISTRATION
  // =======================================================

  const handleClear = () => {
    setForm(emptyForm);

    setErrors({});

    setSuccess("");

    setSubmitError("");

    setSelectedPatient(null);
  };

  // =======================================================
  // CLOSE SUCCESS DIALOG
  // =======================================================

  const handleCloseSuccessDialog = () => {
    setSuccessDialogOpen(false);
    setSuccess("");
  };

  // =======================================================
  // UI
  // =======================================================

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
      }}
    >
      {/* ===================================================
          PAGE HEADER
      =================================================== */}

      <PageHeader
        title="Front Desk & Registration"
        description="Manage patient intake, general registration, and schedule appointments."
        actionLabel="New Registration"
        onAction={handleClear}
      />

      {/* ===================================================
          ERROR MESSAGE
      =================================================== */}

      {submitError && (
        <Alert
          severity="error"
          onClose={() =>
            setSubmitError("")
          }
          sx={{
            mb: 1.5,
            py: 0.4,
            px: 1.2,
            borderRadius: 1.25,
            fontSize: 11,

            "& .MuiAlert-message": {
              fontSize: 11,
            },

            "& .MuiAlert-icon": {
              fontSize: 18,
            },
          }}
        >
          {submitError}
        </Alert>
      )}

      {/* ===================================================
          REGISTRATION FORM
      =================================================== */}

      <RegistrationForm
        form={form}
        errors={errors}
        onChange={handleChange}
        onSave={handleSave}
        onClear={handleClear}
        saving={saving}
        selectedPatient={selectedPatient}
        onPatientSelect={setSelectedPatient}
      />

      {/* ===================================================
          SUCCESS DIALOG
      =================================================== */}

      <Dialog
        open={successDialogOpen}
        onClose={handleCloseSuccessDialog}
        maxWidth="xs"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: 2,
            p: 0.5,
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            pt: 2.5,
            pb: 1,
          }}
        >
          <CheckCircle2
            size={42}
            color="#16a34a"
            strokeWidth={1.8}
          />

          <Typography
            sx={{
              mt: 1,
              fontSize: 17,
              fontWeight: 800,
              color: "#172033",
            }}
          >
            Registration Successful
          </Typography>
        </DialogTitle>

        <DialogContent
          sx={{
            textAlign: "center",
            px: 3,
            pb: 1.5,
          }}
        >
          <Typography
            sx={{
              fontSize: 12,
              lineHeight: 1.6,
              color: "#64748b",
            }}
          >
            {success}
          </Typography>
        </DialogContent>

        <DialogActions
          sx={{
            justifyContent: "center",
            pb: 2.5,
          }}
        >
          <Button
            variant="contained"
            onClick={
              handleCloseSuccessDialog
            }
            sx={{
              minWidth: 100,
              height: 36,
              borderRadius: 1.2,
              textTransform: "none",
              fontSize: 11.5,
              fontWeight: 700,
              bgcolor: "#3730a3",
              boxShadow: "none",

              "&:hover": {
                bgcolor: "#312e81",
                boxShadow: "none",
              },
            }}
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}