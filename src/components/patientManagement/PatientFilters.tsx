import {
  Box,
  Button,
  InputAdornment,
  TextField,
} from "@mui/material";

import {
  ChevronDown,
  Search,
  SlidersHorizontal,
} from "lucide-react";

interface PatientFiltersProps {
  search: string;
  statusFilter: string;

  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export function PatientFilters({
  search,
  statusFilter,
  onSearchChange,
  onStatusChange,
}: PatientFiltersProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        flexWrap: "wrap",
      }}
    >
      {/* Queue Tabs */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          bgcolor: "#f1f3f7",
          borderRadius: 1.2,
          p: 0.4,
        }}
      >
        <Button
          onClick={() => onStatusChange("")}
          sx={{
            minWidth: 100,
            height: 34,
            px: 1.5,
            borderRadius: 1,
            textTransform: "none",
            fontSize: 11,
            fontWeight: 700,
            color: statusFilter === "" ? "#172033" : "#64748b",
            bgcolor: statusFilter === "" ? "#ffffff" : "transparent",
            boxShadow:
              statusFilter === ""
                ? "0 1px 3px rgba(15,23,42,0.08)"
                : "none",

            "&:hover": {
              bgcolor:
                statusFilter === "" ? "#ffffff" : "rgba(255,255,255,0.5)",
            },
          }}
        >
          All Queue
        </Button>

        <Button
          onClick={() => onStatusChange("WAITING")}
          sx={{
            minWidth: 82,
            height: 34,
            px: 1.5,
            borderRadius: 1,
            textTransform: "none",
            fontSize: 11,
            fontWeight: 600,
            color:
              statusFilter === "WAITING" ? "#172033" : "#64748b",
            bgcolor:
              statusFilter === "WAITING" ? "#ffffff" : "transparent",
            boxShadow:
              statusFilter === "WAITING"
                ? "0 1px 3px rgba(15,23,42,0.08)"
                : "none",
          }}
        >
          Waiting
        </Button>

        <Button
          onClick={() => onStatusChange("IN CONSULTATION")}
          sx={{
            minWidth: 112,
            height: 34,
            px: 1.5,
            borderRadius: 1,
            textTransform: "none",
            fontSize: 11,
            fontWeight: 600,
            color:
              statusFilter === "IN CONSULTATION"
                ? "#172033"
                : "#64748b",
            bgcolor:
              statusFilter === "IN CONSULTATION"
                ? "#ffffff"
                : "transparent",
            boxShadow:
              statusFilter === "IN CONSULTATION"
                ? "0 1px 3px rgba(15,23,42,0.08)"
                : "none",
          }}
        >
          In Consultation
        </Button>
      </Box>

      {/* Sort */}
      <Button
        variant="outlined"
        startIcon={<SlidersHorizontal size={15} />}
        endIcon={<ChevronDown size={14} />}
        sx={{
            ml: { xs: 0, md: 10 },
          minWidth: 150,
          height: 52,
          borderRadius: 1.2,
          borderColor: "#dfe5ee",
          color: "#475569",
          textTransform: "none",
          justifyContent: "space-between",
          fontSize: 11,
          fontWeight: 600,
          px: 1.2,

          "&:hover": {
            borderColor: "#cbd5e1",
            bgcolor: "#ffffff",
          },
        }}
      >
        <Box sx={{ textAlign: "left" }}>
          <Box
            component="span"
            sx={{
              display: "block",
              fontSize: 9,
              color: "#94a3b8",
              fontWeight: 700,
            }}
          >
            SORT BY:
          </Box>

          <Box
            component="span"
            sx={{
              display: "block",
              fontSize: 11,
              color: "#172033",
            }}
          >
            Priority (High-Low)
          </Box>
        </Box>
      </Button>

      {/* Search */}
      <TextField
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search name or UHID..."
        size="small"
        sx={{
          width: 250,

          "& .MuiOutlinedInput-root": {
            height: 42,
            borderRadius: 1.2,
            bgcolor: "#ffffff",
            fontSize: 12,
          },

          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#dfe5ee",
          },

          "& .MuiInputBase-input::placeholder": {
            color: "#94a3b8",
            opacity: 1,
          },
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search size={17} color="#94a3b8" />
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
}