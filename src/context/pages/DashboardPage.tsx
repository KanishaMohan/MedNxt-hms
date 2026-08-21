import { Box, Grid } from "@mui/material";

import { CommandCenterHeader } from "@/components/dashboard/CommandCenterHeader";
import { KPISection } from "@/components/dashboard/KPISection";
import { PipelineSection } from "@/components/dashboard/PipelineSection";
import { PatientArrivalTrend } from "@/components/dashboard/PatientArrivalTrend";
import { DepartmentLoad } from "@/components/dashboard/DepartmentLoad";
import { RevenueClassification } from "@/components/dashboard/RevenueClassification";
import { PatientClassification } from "@/components/dashboard/PatientClassification";

export function DashboardPage() {
  return (
    <Box>
      {/* Command Center Header */}
      <CommandCenterHeader />

      {/* KPI Cards */}
      <KPISection />

      {/* Patient Flow Pipeline */}
      <PipelineSection />

      {/* Dashboard Analytics */}
      <Grid container spacing={2}>
        {/* Patient Arrival Trend */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <PatientArrivalTrend />
        </Grid>

        {/* Department Load */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <DepartmentLoad />
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