import { Box, Button } from "@mui/material";

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
    <Box>
      {/* Main tabs */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          borderBottom: "1px solid #eef2f7",
          px: 4,
        }}
      >
        <Button
          onClick={() => onTabChange("TIMELINE")}
          sx={{
            height: 52,
            px: 0.5,
            borderRadius: 0,
            textTransform: "none",
            fontSize: 14,
            fontWeight: 700,
            color:
              activeTab === "TIMELINE" ? "#4f46e5" : "#94a3b8",
            borderBottom:
              activeTab === "TIMELINE"
                ? "2px solid #4f46e5"
                : "2px solid transparent",
          }}
        >
          Timeline
        </Button>

        <Button
          onClick={() => onTabChange("VITALS")}
          sx={{
            height: 52,
            px: 0.5,
            borderRadius: 0,
            textTransform: "none",
            fontSize: 14,
            fontWeight: 600,
            color:
              activeTab === "VITALS" ? "#4f46e5" : "#94a3b8",
            borderBottom:
              activeTab === "VITALS"
                ? "2px solid #4f46e5"
                : "2px solid transparent",
          }}
        >
          Vitals Trend
        </Button>
      </Box>

      {/* Event filters */}
      {activeTab === "TIMELINE" && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 3,
            pb: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              p: 0.45,
              border: "1px solid #e2e8f0",
              borderRadius: 1.5,
              bgcolor: "#ffffff",
              boxShadow: "0 1px 3px rgba(15,23,42,0.05)",
            }}
          >
            {tabs.map((tab) => {
              const active = eventFilter === tab.value;

              return (
                <Button
                  key={tab.label}
                  onClick={() => onFilterChange(tab.value)}
                  sx={{
                    minWidth: "auto",
                    height: 34,
                    px: 2,
                    borderRadius: 1,
                    textTransform: "none",
                    fontSize: 12,
                    fontWeight: active ? 700 : 500,
                    color: active ? "#4f46e5" : "#64748b",
                    bgcolor: active ? "#eef2ff" : "transparent",

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