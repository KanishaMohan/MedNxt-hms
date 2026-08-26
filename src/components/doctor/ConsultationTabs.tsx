import {
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";

import {
  ClipboardList,
  FileText,
  FlaskConical,
  Pill,
  Stethoscope,
} from "lucide-react";

export type ConsultationTab =
  | "overview"
  | "soap"
  | "diagnosis"
  | "medications"
  | "labs";

interface ConsultationTabsProps {
  activeTab: ConsultationTab;
  onChange: (tab: ConsultationTab) => void;
}

const tabs: {
  id: ConsultationTab;
  label: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "overview",
    label: "Overview",
    icon: <ClipboardList size={14} />,
  },
  {
    id: "soap",
    label: "SOAP Notes",
    icon: <FileText size={14} />,
  },
  {
    id: "diagnosis",
    label: "Diagnosis",
    icon: <Stethoscope size={14} />,
  },
  {
    id: "medications",
    label: "Medications",
    icon: <Pill size={14} />,
  },
  {
    id: "labs",
    label: "Lab Orders",
    icon: <FlaskConical size={14} />,
  },
];

export function ConsultationTabs({
  activeTab,
  onChange,
}: ConsultationTabsProps) {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#ffffff",
        borderBottom: "1px solid #eef2f7",
        overflowX: "auto",
      }}
    >
      <Stack
        direction="row"
        sx={{
          px: { xs: 1, md: 2 },
          minWidth: "max-content",
        }}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <Button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              disableRipple
              startIcon={tab.icon}
              sx={{
                position: "relative",
                minHeight: 46,
                px: 1.8,
                borderRadius: 0,
                textTransform: "none",
                color: isActive
                  ? "#2563eb"
                  : "#64748b",
                fontSize: 11,
                fontWeight: isActive ? 700 : 500,

                "& .MuiButton-startIcon": {
                  mr: 0.7,
                  color: isActive
                    ? "#2563eb"
                    : "#94a3b8",
                },

                "&:hover": {
                  bgcolor: "#f8fafc",
                },

                ...(isActive && {
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    left: 12,
                    right: 12,
                    bottom: 0,
                    height: 2,
                    borderRadius:
                      "2px 2px 0 0",
                    bgcolor: "#2563eb",
                  },
                }),
              }}
            >
              <Typography
                component="span"
                sx={{
                  fontSize: 11,
                  fontWeight: "inherit",
                  color: "inherit",
                  whiteSpace: "nowrap",
                }}
              >
                {tab.label}
              </Typography>
            </Button>
          );
        })}
      </Stack>
    </Box>
  );
}