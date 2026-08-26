import {
  dashboardKpis,
  patientFlowPipeline,
  patientArrivalTrend,
  departmentLoad,
  resourceStatus,
  revenueClassification,
  patientClassification,
} from "./mockData";
import type { AITrafficAudit } from "@/types";

export const dashboardService = {
  async getDashboardKpis() {
    return dashboardKpis;
  },

  async getPatientFlowPipeline() {
    return [...patientFlowPipeline];
  },

  async getPatientArrivalTrend() {
    return [...patientArrivalTrend];
  },

  async getDepartmentLoad() {
    return [...departmentLoad];
  },

  async getResourceStatus() {
    return resourceStatus;
  },

  async getRevenueClassification() {
    return [...revenueClassification];
  },

  async getPatientClassification() {
    return [...patientClassification];
  },

  // Dashboard Header
  async getDashboardHeader() {
    return {
      alertLabel: "High Volume Alert",
      activePatientMessage:
        "Real-time monitoring of 312 active patient journeys",
      temperature: "23.5°C",
      weather: "Rainy",
      averageTat: "55 min",
    };
  },
    async getAITrafficAudit(): Promise<AITrafficAudit> {
    return {
      title: "AI Operational Insights",
      summary: "Here is a 3-bullet point summary of insights:",
      insights: [
        {
          title: "Operational Bottlenecks",
          description:
            "Critical average wait times (55 mins) and a capacity warning (312 walk-ins) are driven by significant backlogs in General Medicine OPD (45 patients) and a 25-minute lag in Pharmacy Dispensing.",
        },
        {
          title: "Revenue Opportunities",
          description:
            "The high OPD volume is generating substantial daily revenue (₹2,45,000). Streamlining operations to reduce wait times and improve patient flow presents an opportunity to further enhance patient satisfaction and potentially increase patient throughput and sustained revenue.",
        },
        {
          title: "Staffing Optimization",
          description:
            "The absence of 2 nurses is likely exacerbating current operational strain. A review of nurse staffing levels and doctor allocation, particularly for General Medicine, is critical to alleviate bottlenecks and improve service delivery.",
        },
      ],
    };
  },
};
