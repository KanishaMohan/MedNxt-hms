import {
  Avatar,
  Box,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MenuIcon from "@mui/icons-material/Menu";

interface TopHeaderProps {
  onMenuClick: () => void;
}

export function TopHeader({ onMenuClick }: TopHeaderProps) {
  return (
    <Box
      component="header"
      sx={{
        height: 60,
        bgcolor: "background.paper",
        borderBottom: "1px solid #e5e7eb",
        px: { xs: 1.5, sm: 2.5, md: 3 },
        display: "flex",
        alignItems: "center",
        gap: { xs: 1, md: 1.5 },
        flexShrink: 0,
      }}
    >
      {/* =========================
          HAMBURGER MENU
          ========================= */}
      <IconButton
        onClick={onMenuClick}
        aria-label="Open menu"
        sx={{
          width: 32,
          height: 32,
          p: 0,
          color: "#64748b",
          borderRadius: 1,
          flexShrink: 0,

          "&:hover": {
            bgcolor: "#f8fafc",
          },
        }}
      >
        <MenuIcon
          sx={{
            fontSize: 22,
            strokeWidth: 1.5,
          }}
        />
      </IconButton>

      {/* =========================
          HOSPITAL BADGE
          ========================= */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.8,

          px: 1.4,
          py: 0.55,

          height: 38,
          boxSizing: "border-box",

          borderRadius: 1.5,
          bgcolor: "#eef2ff",

          flexShrink: 0,
        }}
      >
        <LocalHospitalIcon
          sx={{
            fontSize: 18,
            color: "primary.main",
          }}
        />

        <Typography
          sx={{
            fontSize: 11,
            lineHeight: 1,
            fontWeight: 700,
            color: "primary.dark",
            whiteSpace: "nowrap",
          }}
        >
          MedNxt Hospitals
        </Typography>
      </Box>

      {/* =========================
          SPACER
          ========================= */}
      <Box sx={{ flex: 1 }} />

      {/* =========================
          SYSTEM OPERATIONAL
          ========================= */}
      <Box
        sx={{
          display: { xs: "none", sm: "flex" },
          alignItems: "center",
          justifyContent: "center",
          gap: 0.7,

          height: 30,
          px: 1.5,

          borderRadius: 999,
          border: "1px solid #a7f3d0",
          bgcolor: "#f0fdf4",
        }}
      >
        {/* Green Dot */}
        <Box
          sx={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            bgcolor: "#16a34a",
            flexShrink: 0,
          }}
        />

        <Typography
          sx={{
            fontSize: 9.5,
            lineHeight: 1,
            fontWeight: 700,
            color: "#059669",
            letterSpacing: "0.05em",
            whiteSpace: "nowrap",
          }}
        >
          SYSTEM OPERATIONAL
        </Typography>
      </Box>

      {/* =========================
          NOTIFICATION
          ========================= */}
      <IconButton
        sx={{
          width: 34,
          height: 34,
          p: 0,
          color: "#64748b",
          border: "1px solid #e5e7eb",
          bgcolor: "#ffffff",
          borderRadius: "50%",
          flexShrink: 0,

          "&:hover": {
            bgcolor: "#f8fafc",
          },
        }}
      >
        <NotificationsNoneIcon
          sx={{
            fontSize: 20,
          }}
        />
      </IconButton>

      {/* =========================
          USER SECTION
          ========================= */}
      <Stack
        direction="row"
        spacing={0.7}
        sx={{
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        {/* User Name */}
        <Box
          sx={{
            display: { xs: "none", sm: "block" },
            textAlign: "right",
          }}
        >
          <Typography
            sx={{
              fontSize: 11,
              lineHeight: 1.2,
              fontWeight: 700,
              color: "#111827",
            }}
          >
            Admin User
          </Typography>

          <Typography
            sx={{
              mt: 0.25,
              fontSize: 9,
              lineHeight: 1.2,
              color: "#64748b",
              letterSpacing: "0.08em",
            }}
          >
            ADMIN
          </Typography>
        </Box>

        {/* Avatar */}
        <Avatar
          sx={{
            width: 34,
            height: 34,
            bgcolor: "#5548e8",
            color: "#ffffff",
            fontSize: 11,
            fontWeight: 700,
          }}
        >
          A
        </Avatar>

        {/* Dropdown */}
        <KeyboardArrowDownIcon
          sx={{
            fontSize: 17,
            color: "#94a3b8",
          }}
        />
      </Stack>
    </Box>
  );
}