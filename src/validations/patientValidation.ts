import type { RegistrationFormData } from "@/components/registration/PatientDetailsForm";

export type PatientValidationErrors = Partial<
  Record<keyof RegistrationFormData, string>
>;

export function validatePatientRegistration(
  form: RegistrationFormData
): PatientValidationErrors {
  const errors: PatientValidationErrors = {};

  if (!form.firstName.trim()) {
    errors.firstName = "First name is required";
  }

  if (!form.lastName.trim()) {
    errors.lastName = "Last name is required";
  }

  if (!form.dateOfBirth) {
    errors.dateOfBirth = "Date of birth is required";
  }

  if (!form.gender) {
    errors.gender = "Gender is required";
  }

  if (!form.bloodGroup) {
    errors.bloodGroup = "Blood group is required";
  }

  if (!form.mobile) {
    errors.mobile = "Mobile number is required";
  } else if (!/^\d{10}$/.test(form.mobile)) {
    errors.mobile =
      "Enter a valid 10-digit mobile number";
  }

  if (
    form.email &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
  ) {
    errors.email = "Enter a valid email address";
  }

  if (!form.address.trim()) {
    errors.address = "Address is required";
  }

  return errors;
}