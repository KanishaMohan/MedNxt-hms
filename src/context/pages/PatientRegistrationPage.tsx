import { useState } from "react";

import { Alert, Box } from "@mui/material";

import { PageHeader } from "@/components/PageHeader";

import {
  RegistrationForm,
  type RegistrationFormData,
} from "@/components/registration/RegistrationForm";

import { useApp } from "@/context/AppContext";
import type { Patient } from "@/services/mockData";

/* =========================================================
   EMPTY FORM
========================================================= */

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

/* =========================================================
   PAGE
========================================================= */

export function PatientRegistrationPage() {
  const { addPatient } = useApp();

  const [form, setForm] =
    useState<RegistrationFormData>(emptyForm);

  const [errors, setErrors] =
    useState<Record<string, string>>({});

  const [success, setSuccess] = useState("");

  /* =======================================================
     HANDLE FORM CHANGE
  ======================================================= */

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
  };

  /* =======================================================
     VALIDATION
  ======================================================= */

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!form.firstName.trim()) {
      newErrors.firstName = "Required";
    }

    if (!form.lastName.trim()) {
      newErrors.lastName = "Required";
    }

    if (!form.dateOfBirth) {
      newErrors.dateOfBirth = "Required";
    }

    if (!form.gender) {
      newErrors.gender = "Required";
    }

    if (!form.bloodGroup) {
      newErrors.bloodGroup = "Required";
    }

    if (!form.mobile) {
      newErrors.mobile = "Required";
    } else if (!/^\d{10}$/.test(form.mobile)) {
      newErrors.mobile =
        "Enter a valid 10-digit mobile number";
    }

    if (
      form.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      newErrors.email =
        "Enter a valid email address";
    }

    if (!form.address.trim()) {
      newErrors.address = "Required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* =======================================================
     SAVE PATIENT
  ======================================================= */

  const handleSave = () => {
    if (!validate()) return;

    const uhid = `ABHA-${Math.floor(
      1000 + Math.random() * 9000
    )}`;

    const patient: Patient = {
      id: `patient-${Date.now()}`,

      uhid,

      firstName: form.firstName,

      lastName: form.lastName,

      dateOfBirth: form.dateOfBirth,

      gender:
        form.gender as
          | "Male"
          | "Female"
          | "Other",

      bloodGroup: form.bloodGroup,

      mobile: form.mobile,

      email: form.email,

      address: form.address,

      priority: "Medium",

      status: "CHECKED IN",

      doctor: "Dr. Sharma",

      reason: "New Registration",

      arrival: new Date().toLocaleTimeString(
        [],
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      ),
    };

    addPatient(patient);

    setSuccess(
      `Patient registered successfully. UHID: ${uhid}`
    );

    setForm(emptyForm);

    setErrors({});
  };

  /* =======================================================
     CLEAR FORM
  ======================================================= */

  const handleClear = () => {
    setForm(emptyForm);

    setErrors({});

    setSuccess("");
  };

  /* =======================================================
     UI
  ======================================================= */

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
      }}
    >
      {/* PAGE HEADER */}

      <PageHeader
        // eyebrow="FRONT DESK"
        title="Front Desk & Registration"
        description="Manage patient intake, general registration, and schedule appointments."
        actionLabel="New Registration"
        onAction={handleClear}
      />

      {/* SUCCESS MESSAGE */}

      {success && (
        <Alert
          severity="success"
          onClose={() => setSuccess("")}
          sx={{
            mb: 1.5,
            py: 0.4,
            px: 1.2,
            borderRadius: 1.25,
            fontSize: 10,

            "& .MuiAlert-message": {
              fontSize: 10,
            },

            "& .MuiAlert-icon": {
              fontSize: 18,
            },
          }}
        >
          {success}
        </Alert>
      )}

      {/* REGISTRATION FORM */}

      <RegistrationForm
        form={form}
        errors={errors}
        onChange={handleChange}
        onSave={handleSave}
        onClear={handleClear}
      />
    </Box>
  );
}