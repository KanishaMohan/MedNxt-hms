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
  sortBy: string;

  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

export function PatientFilters({
  search,
  statusFilter,
  sortBy,
  onSearchChange,
  onStatusChange,
  onSortChange,
}: PatientFiltersProps) {
  const sortLabel =
    sortBy === "PRIORITY_LOW"
      ? "Priority (Low-High)"
      : sortBy === "ARRIVAL_EARLY"
        ? "Arrival (Early)"
        : sortBy === "ARRIVAL_LATEST"
          ? "Arrival (Latest)"
          : sortBy === "NAME"
            ? "Name (A-Z)"
            : "Priority (High-Low)";

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        flexWrap: "wrap",
      }}
    >
      {/* QUEUE TABS */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          bgcolor: "#f1f3f7",
          borderRadius: 1.2,
          p: 0.4,
        }}
      >
        <FilterButton
          active={statusFilter === ""}
          onClick={() =>
            onStatusChange("")
          }
          minWidth={90}
        >
          All Queue
        </FilterButton>

        <FilterButton
          active={
            statusFilter === "WAITING"
          }
          onClick={() =>
            onStatusChange("WAITING")
          }
          minWidth={78}
        >
          Waiting
        </FilterButton>

        <FilterButton
          active={
            statusFilter ===
            "IN CONSULTATION"
          }
          onClick={() =>
            onStatusChange(
              "IN CONSULTATION"
            )
          }
          minWidth={108}
        >
          In Consultation
        </FilterButton>
      </Box>

      {/* SORT */}
      <Button
        variant="outlined"
        startIcon={
          <SlidersHorizontal size={14} />
        }
        endIcon={
          <ChevronDown size={13} />
        }
        onClick={() => {
          const nextSort =
            sortBy === "PRIORITY_HIGH"
              ? "PRIORITY_LOW"
              : sortBy === "PRIORITY_LOW"
                ? "ARRIVAL_EARLY"
                : sortBy ===
                    "ARRIVAL_EARLY"
                  ? "ARRIVAL_LATEST"
                  : sortBy ===
                      "ARRIVAL_LATEST"
                    ? "NAME"
                    : "PRIORITY_HIGH";

          onSortChange(nextSort);
        }}
        sx={{
          minWidth: 145,
          height: 42,
          borderRadius: 1.2,
          borderColor: "#dfe5ee",
          color: "#475569",
          textTransform: "none",
          justifyContent:
            "space-between",
          fontSize: 10,
          fontWeight: 600,
          px: 1.1,

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
              fontSize: 8,
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
              fontSize: 10,
              color: "#172033",
            }}
          >
            {sortLabel}
          </Box>
        </Box>
      </Button>

      {/* SEARCH */}
      <TextField
        value={search}
        onChange={(event) =>
          onSearchChange(
            event.target.value
          )
        }
        placeholder="Search name or UHID..."
        size="small"
        sx={{
          width: 220,

          "& .MuiOutlinedInput-root": {
            height: 42,
            borderRadius: 1.2,
            bgcolor: "#ffffff",
            fontSize: 11,
          },

          "& .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "#dfe5ee",
            },

          "& .MuiInputBase-input::placeholder":
            {
              color: "#94a3b8",
              opacity: 1,
            },
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search
                  size={16}
                  color="#94a3b8"
                />
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
}

function FilterButton({
  children,
  active,
  onClick,
  minWidth,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  minWidth: number;
}) {
  return (
    <Button
      onClick={onClick}
      sx={{
        minWidth,
        height: 32,
        px: 1.3,
        borderRadius: 1,
        textTransform: "none",
        fontSize: 10,
        fontWeight: active ? 700 : 600,
        color: active
          ? "#172033"
          : "#64748b",
        bgcolor: active
          ? "#ffffff"
          : "transparent",
        boxShadow: active
          ? "0 1px 3px rgba(15,23,42,0.08)"
          : "none",

        "&:hover": {
          bgcolor: active
            ? "#ffffff"
            : "rgba(255,255,255,0.5)",
        },
      }}
    >
      {children}
    </Button>
  );
}