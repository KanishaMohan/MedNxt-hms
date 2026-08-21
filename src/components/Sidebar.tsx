import {
  Activity,
  BedDouble,
  FileText,
  LayoutGrid,
  LogOut,
  Settings,
  Shield,
  Stethoscope,
  UserPlus,
  UsersRound,
} from "lucide-react";

import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

import { NavLink } from "react-router-dom";

const drawerWidth = 240;

const navigation = [
  {
    label: "Dashboard",
    path: "/",
    icon: LayoutGrid,
  },
  {
    label: "Admin Panel",
    icon: Shield,
    nonNavigable: true,
  },
  {
    label: "Registration",
    path: "/registration",
    icon: UserPlus,
  },
  {
    label: "Patient Queue",
    path: "/patients",
    icon: UsersRound,
  },
  {
    label: "Doctor Station",
    icon: Stethoscope,
    nonNavigable: true,
  },
  {
    label: "Patient History",
    path: "/history",
    icon: FileText,
  },
  {
    label: "IPD & Wards",
    path: "/ipd",
    icon: BedDouble,
  },
];

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

function SidebarContent() {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        color: "#d9ddff",
      }}
    >
      {/* =====================================================
          LOGO
      ====================================================== */}
      <Box
        sx={{
          px: 2.25,
          pt: 2.25,
          pb: 1.75,
        }}
      >
        <Stack
          direction="row"
          spacing={1.25}
          sx={{
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 1.75,
              bgcolor: "rgba(255,255,255,.12)",
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
            }}
          >
            <Activity size={19} />
          </Box>

          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                color: "#fff",
                fontSize: 22,
                fontWeight: 800,
                lineHeight: 1,
              }}
            >
              MedNxt
            </Typography>

            <Typography
              sx={{
                color: "#b8bdf5",
                fontSize: 8,
                letterSpacing: ".14em",
                mt: 0.5,
                whiteSpace: "nowrap",
              }}
            >
              AI HEALTH SYSTEM
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* =====================================================
          USER CARD
      ====================================================== */}
      <Box
        sx={{
          mx: 1.5,
          mb: 2,
          p: 1.5,
          borderRadius: 2.5,
          bgcolor: "rgba(255,255,255,.08)",
        }}
      >
        <Stack
          direction="row"
          spacing={1.25}
          sx={{
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              bgcolor: "#4F8CFF",
              display: "grid",
              placeItems: "center",
              color: "#fff",
              fontWeight: 700,
              fontSize: 13,
              flexShrink: 0,
            }}
          >
            A
          </Box>

          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                color: "#fff",
                fontWeight: 700,
                fontSize: 13,
                lineHeight: 1.2,
              }}
            >
              Admin User
            </Typography>

            <Typography
              sx={{
                color: "#b8bdf5",
                fontSize: 9,
                mt: 0.3,
              }}
            >
              ADMIN
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* =====================================================
          NAVIGATION
      ====================================================== */}
      <List
        sx={{
          px: 1.25,
          py: 0,
          flex: 1,
        }}
      >
        {navigation.map(
          ({ label, path, icon: Icon, nonNavigable }) => (
            <ListItemButton
              key={label}
              component={nonNavigable ? "div" : NavLink}
              {...(!nonNavigable
                ? {
                    to: path,
                    end: path === "/",
                  }
                : {})}
              sx={{
                mb: 0.35,
                minHeight: 42,
                px: 1.25,
                borderRadius: 2,
                color: "#d3d8ff",

                "& .MuiListItemIcon-root": {
                  color: "inherit",
                  minWidth: 32,
                },

                "&.active": {
                  bgcolor: "#6254F3",
                  color: "#fff",
                },

                "&:hover": {
                  bgcolor: "rgba(255,255,255,.08)",
                },
              }}
            >
              <ListItemIcon>
                <Icon size={17} />
              </ListItemIcon>

              <ListItemText
                primary={
                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: 500,
                    }}
                  >
                    {label}
                  </Typography>
                }
              />
            </ListItemButton>
          )
        )}
      </List>

      {/* =====================================================
          BOTTOM ACTIONS
      ====================================================== */}
      <Box
        sx={{
          px: 1.25,
          pb: 1.5,
        }}
      >
        <Divider
          sx={{
            borderColor: "rgba(255,255,255,.1)",
            mb: 0.75,
          }}
        />

        {/* System Settings */}
        <ListItemButton
          sx={{
            minHeight: 42,
            px: 1.25,
            borderRadius: 2,
            color: "#d3d8ff",
          }}
        >
          <ListItemIcon
            sx={{
              color: "inherit",
              minWidth: 32,
            }}
          >
            <Settings size={17} />
          </ListItemIcon>

          <ListItemText
            primary={
              <Typography
                sx={{
                  fontSize: 13,
                }}
              >
                System Settings
              </Typography>
            }
          />
        </ListItemButton>

        {/* Sign Out */}
        <ListItemButton
          sx={{
            minHeight: 42,
            px: 1.25,
            borderRadius: 2,
            color: "#d3d8ff",
          }}
        >
          <ListItemIcon
            sx={{
              color: "inherit",
              minWidth: 32,
            }}
          >
            <LogOut size={17} />
          </ListItemIcon>

          <ListItemText
            primary={
              <Typography
                sx={{
                  fontSize: 13,
                }}
              >
                Sign Out
              </Typography>
            }
          />
        </ListItemButton>
      </Box>
    </Box>
  );
}

export function Sidebar({
  mobileOpen,
  onClose,
}: SidebarProps) {
  return (
    <>
      {/* =====================================================
          DESKTOP SIDEBAR
      ====================================================== */}
      <Box
        component="aside"
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
          width: drawerWidth,
          flexShrink: 0,
        }}
      >
        <Drawer
          variant="permanent"
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              border: 0,
              boxSizing: "border-box",
              background:
                "linear-gradient(180deg, #2D2A8C 0%, #4C1D95 100%)",
            },
          }}
        >
          <SidebarContent />
        </Drawer>
      </Box>

      {/* =====================================================
          MOBILE SIDEBAR
      ====================================================== */}
      <Drawer
        open={mobileOpen}
        onClose={onClose}
        sx={{
          display: {
            xs: "block",
            md: "none",
          },

          "& .MuiDrawer-paper": {
            width: drawerWidth,
            background:
              "linear-gradient(180deg, #2D2A8C 0%, #4C1D95 100%)",
          },
        }}
      >
        <SidebarContent />
      </Drawer>
    </>
  );
}

export { drawerWidth };