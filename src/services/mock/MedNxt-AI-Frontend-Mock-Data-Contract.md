# MedNxt-AI HMS — Frontend Assessment Data & Mock API Contract

## Purpose

This document provides the minimum mock data contract for the frontend assessment.

The candidate should implement the UI and frontend workflows against mock data. No real backend or database is required for this assessment.

---

# 1. Patient

```json
{
  "id": "patient-001",
  "uhid": "MNX000001",
  "firstName": "Arun",
  "lastName": "Kumar",
  "dateOfBirth": "1984-06-15",
  "gender": "Male",
  "bloodGroup": "B+",
  "mobile": "9876543210",
  "email": "arun@example.com",
  "address": "12 Main Road",
  "city": "Chennai",
  "state": "Tamil Nadu",
  "pincode": "600001",
  "emergencyContactName": "Priya Kumar",
  "emergencyContactNumber": "9876500000",
  "priority": "High",
  "status": "Waiting",
  "doctorId": "doctor-001"
}
```

---

# 2. Vital

```json
{
  "id": "vital-001",
  "patientId": "patient-001",
  "temperature": 101.2,
  "bloodPressure": "140/90",
  "pulse": 96,
  "spo2": 97,
  "weight": 72,
  "height": 170,
  "recordedAt": "2026-08-17T09:30:00"
}
```

---

# 3. Doctor

```json
{
  "id": "doctor-001",
  "name": "Dr. Ahmed",
  "department": "General Medicine"
}
```

---

# 4. Clinical Note

```json
{
  "id": "note-001",
  "patientId": "patient-001",
  "doctorId": "doctor-001",
  "subjective": "Patient reports fever and cough for three days.",
  "objective": "Temperature 101.2 F, pulse 96.",
  "assessment": "Upper respiratory infection.",
  "plan": "Hydration, rest and symptomatic treatment.",
  "createdAt": "2026-08-17T10:00:00"
}
```

---

# 5. Diagnosis

```json
{
  "id": "diagnosis-001",
  "name": "Upper respiratory infection"
}
```

---

# 6. Medication

```json
{
  "id": "medication-001",
  "patientId": "patient-001",
  "medicine": "Paracetamol",
  "dosage": "500 mg",
  "frequency": "1-0-1",
  "duration": "5 Days",
  "route": "Oral",
  "instructions": "After food"
}
```

---

# 7. Laboratory Order

```json
{
  "id": "lab-order-001",
  "patientId": "patient-001",
  "test": "Complete Blood Count",
  "priority": "Routine",
  "clinicalNotes": "Evaluate fever.",
  "status": "Ordered"
}
```

---

# 8. Laboratory Result

```json
{
  "id": "lab-result-001",
  "patientId": "patient-001",
  "test": "Complete Blood Count",
  "parameter": "WBC",
  "value": "12500",
  "unit": "/uL",
  "status": "Abnormal",
  "reportedAt": "2026-08-16T15:30:00"
}
```

---

# 9. EHR Event

```json
{
  "id": "ehr-001",
  "patientId": "patient-001",
  "type": "CONSULTATION",
  "title": "Doctor Consultation",
  "description": "Consultation for fever and cough.",
  "doctor": "Dr. Ahmed",
  "date": "2026-08-17T10:00:00"
}
```

Supported types:

```text
CONSULTATION
PRESCRIPTION
LABORATORY
ADMISSION
DISCHARGE
VITALS
```

---

# 10. Ward

```json
{
  "id": "ward-001",
  "name": "General Ward A",
  "floor": 1,
  "type": "General"
}
```

---

# 11. Bed

```json
{
  "id": "bed-101",
  "number": "101",
  "wardId": "ward-001",
  "floor": 1,
  "type": "General",
  "status": "AVAILABLE",
  "patientId": null
}
```

Supported statuses:

```text
AVAILABLE
OCCUPIED
CLEANING
MAINTENANCE
```

---

# 12. Admission

```json
{
  "id": "admission-001",
  "patientId": "patient-001",
  "wardId": "ward-001",
  "bedId": "bed-101",
  "doctorId": "doctor-001",
  "admissionDate": "2026-08-17T11:00:00",
  "status": "ACTIVE"
}
```

---

# 13. Suggested Mock API Methods

The frontend should be designed as though these methods were backend APIs.

## Patients

```text
GET    /api/patients
GET    /api/patients/:id
POST   /api/patients
PUT    /api/patients/:id
```

## Vitals

```text
GET    /api/patients/:id/vitals
POST   /api/patients/:id/vitals
```

## Clinical

```text
GET    /api/patients/:id/clinical-history
POST   /api/consultations
```

## Laboratory

```text
GET    /api/patients/:id/labs
POST   /api/lab-orders
```

## IPD

```text
GET    /api/wards
GET    /api/beds
POST   /api/admissions
POST   /api/bed-transfers
POST   /api/discharges
```

These are conceptual mock endpoints. You do not need to create an actual HTTP server.

---

# 14. Mock AI Response

The frontend may simulate:

```text
POST /api/ai/clinical-note
```

with:

```json
{
  "chiefComplaint": "Fever and cough",
  "diagnosis": [
    "Upper respiratory infection"
  ],
  "plan": [
    "Hydration",
    "Rest"
  ],
  "medications": [
    "Paracetamol 500mg"
  ],
  "riskLevel": "Low"
}
```

The UI must treat this as AI-generated assistance requiring clinician review, not as an automatically approved clinical decision.

---

# 15. State Transition Rules

## Bed

```text
AVAILABLE → OCCUPIED
OCCUPIED → CLEANING
CLEANING → AVAILABLE
AVAILABLE → MAINTENANCE
MAINTENANCE → AVAILABLE
```

Do not allow:

```text
OCCUPIED → OCCUPIED
MAINTENANCE → OCCUPIED
CLEANING → OCCUPIED
```

unless the required business workflow has first changed the status.

---

# 16. Mock Authentication

Use:

```json
{
  "userId": "user-001",
  "name": "Demo User",
  "role": "Doctor"
}
```

Supported roles:

```text
Reception
Doctor
Nurse
Admin
```

Role information should control frontend navigation/UI visibility.

It must not be presented as production security.
