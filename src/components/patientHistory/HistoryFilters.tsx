import { Box, Button } from "@mui/material";
import { Activity, History } from "lucide-react";

interface HistoryFiltersProps {
  activeTab: string;
  eventFilter: string;
  onTabChange: (value: string) => void;
  onFilterChange: (value: string) => void;
}

export function HistoryFilters({
  activeTab,
  eventFilter,
  onTabChange,
  onFilterChange,
}: HistoryFiltersProps) {
  const tabs = [
    { label: "All", value: "" },
    { label: "Consultation", value: "CONSULTATION" },
    { label: "Lab Report", value: "LABORATORY" },
    { label: "Admission", value: "ADMISSION" },
    { label: "Vitals", value: "VITALS" },
    { label: "Activity", value: "ACTIVITY" },
  ];

  return (
    <Box
      sx={{
        bgcolor: "#f8fafc",
      }}
    >
      {/* =====================================================
          MAIN TABS
      ====================================================== */}
      <Box
        sx={{
          height: 58,
          display: "flex",
          alignItems: "center",
          gap: 3,
          px: 3,
          bgcolor: "#ffffff",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        {/* Timeline */}
        <Button
          onClick={() => onTabChange("TIMELINE")}
          startIcon={
            <History
              size={17}
              strokeWidth={1.8}
            />
          }
          sx={{
            height: 58,
            px: 0.5,
            borderRadius: 0,
            textTransform: "none",

            fontSize: 14,
            fontWeight: 700,

            color:
              activeTab === "TIMELINE"
                ? "#4f46e5"
                : "#64748b",

            borderBottom:
              activeTab === "TIMELINE"
                ? "2px solid #4f46e5"
                : "2px solid transparent",

            "&:hover": {
              bgcolor: "transparent",
            },

            "& .MuiButton-startIcon": {
              marginRight: "6px",
            },
          }}
        >
          Timeline
        </Button>

        {/* Vitals Trend */}
        <Button
          onClick={() => onTabChange("VITALS")}
          startIcon={
            <Activity
              size={18}
              strokeWidth={1.8}
            />
          }
          sx={{
            height: 58,
            px: 0.5,
            borderRadius: 0,
            textTransform: "none",

            fontSize: 14,
            fontWeight:
              activeTab === "VITALS"
                ? 700
                : 500,

            color:
              activeTab === "VITALS"
                ? "#4f46e5"
                : "#64748b",

            borderBottom:
              activeTab === "VITALS"
                ? "2px solid #4f46e5"
                : "2px solid transparent",

            "&:hover": {
              bgcolor: "transparent",
            },

            "& .MuiButton-startIcon": {
              marginRight: "6px",
            },
          }}
        >
          Vitals Trend
        </Button>
      </Box>

      {/* =====================================================
          EVENT FILTERS
      ====================================================== */}
      {activeTab === "TIMELINE" && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            px: 3,
            pt: 2,
            pb: 1.5,
            bgcolor: "#f8fafc",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",

              gap: 0.3,
              p: 0.4,

              border: "1px solid #e2e8f0",
              borderRadius: 1.5,

              bgcolor: "#ffffff",

              boxShadow:
                "0 1px 3px rgba(15,23,42,0.05)",
            }}
          >
            {tabs.map((tab) => {
              const active =
                eventFilter === tab.value;

              return (
                <Button
                  key={tab.label}
                  onClick={() =>
                    onFilterChange(tab.value)
                  }
                  sx={{
                    minWidth: "auto",
                    height: 32,

                    px: 1.7,

                    borderRadius: 1,

                    textTransform: "none",

                    fontSize: 11,

                    fontWeight: active
                      ? 700
                      : 500,

                    color: active
                      ? "#4f46e5"
                      : "#64748b",

                    bgcolor: active
                      ? "#eef2ff"
                      : "transparent",

                    "&:hover": {
                      bgcolor: active
                        ? "#eef2ff"
                        : "#f8fafc",
                    },
                  }}
                >
                  {tab.label}
                </Button>
              );
            })}
          </Box>
        </Box>
      )}
    </Box>
  );
}