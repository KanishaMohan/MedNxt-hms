import { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";

import { dashboardService } from "@/services/dashboardService";

import { CommandCenterHeader } from "@/components/dashboard/CommandCenterHeader";
import { KPISection } from "@/components/dashboard/KPISection";
import { PipelineSection } from "@/components/dashboard/PipelineSection";
import { PatientArrivalTrend } from "@/components/dashboard/PatientArrivalTrend";
import { DepartmentLoad } from "@/components/dashboard/DepartmentLoad";
import { RevenueClassification } from "@/components/dashboard/RevenueClassification";
import { PatientClassification } from "@/components/dashboard/PatientClassification";

export function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<any>(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [
          dashboardKpis,
          patientFlowPipeline,
          patientArrivalTrend,
          departmentLoad,
          resourceStatus,
          revenueClassification,
          patientClassification,
        ] = await Promise.all([
          dashboardService.getDashboardKpis(),
          dashboardService.getPatientFlowPipeline(),
          dashboardService.getPatientArrivalTrend(),
          dashboardService.getDepartmentLoad(),
          dashboardService.getResourceStatus(),
          dashboardService.getRevenueClassification(),
          dashboardService.getPatientClassification(),
        ]);

        setDashboardData({
          dashboardKpis,
          patientFlowPipeline,
          patientArrivalTrend,
          departmentLoad,
          resourceStatus,
          revenueClassification,
          patientClassification,
        });
      } catch (error) {
        console.error(
          "Failed to load dashboard data:",
          error
        );
      }
    };

    loadDashboardData();
  }, []);

  // Wait until dashboard data is loaded
  if (!dashboardData) {
    return (
      <Box
        sx={{
          p: 3,
          color: "#64748b",
          fontSize: 14,
        }}
      >
        Loading dashboard...
      </Box>
    );
  }

  return (
    <Box>
      {/* Command Center Header */}
      <CommandCenterHeader />

      {/* KPI Cards */}
      <KPISection
  dashboardKpis={dashboardData.dashboardKpis}
/>

      {/* Patient Flow Pipeline */}
      <PipelineSection
  patientFlowPipeline={dashboardData.patientFlowPipeline}
/>

      {/* Dashboard Analytics */}
      <Grid container spacing={2}>
        {/* Patient Arrival Trend */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <PatientArrivalTrend
  patientArrivalTrend={
    dashboardData.patientArrivalTrend
  }
/>
        </Grid>

        {/* Department Load */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <DepartmentLoad
  departmentLoad={dashboardData.departmentLoad}
  resourceStatus={dashboardData.resourceStatus}
/>
        </Grid>

        {/* Revenue Classification */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <RevenueClassification />
        </Grid>

        {/* Patient Classification */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <PatientClassification />
        </Grid>
      </Grid>
    </Box>
  );
}