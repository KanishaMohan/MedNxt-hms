import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from '@/layouts/AppLayout';
import { DashboardPage } from '@/context/pages/DashboardPage';
import { DoctorConsultationPage } from '@/context/pages/DoctorConsultationPage';
import { IpdBedManagementPage } from '@/context/pages/IpdBedManagementPage';
import { PatientHistoryPage } from '@/context/pages/PatientHistoryPage';
import { PatientManagementPage } from '@/context/pages/PatientManagementPage';
import { PatientRegistrationPage } from '@/context/pages/PatientRegistrationPage';
import AdminPanelPage from "@/context/pages/AdminPanelPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/registration" element={<PatientRegistrationPage />} />
        <Route path="/patients" element={<PatientManagementPage />} />
        <Route path="/doctor" element={<DoctorConsultationPage />} />
        <Route path="/history" element={<PatientHistoryPage />} />
        <Route path="/ipd" element={<IpdBedManagementPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/admin" element={<AdminPanelPage />} />
      </Route>
    </Routes>
  );
}
