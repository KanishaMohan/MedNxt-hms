
import { useMemo, useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";

import {
  AddRounded,
  AdminPanelSettingsRounded,
  SearchRounded,
  RefreshRounded,
  LockResetRounded,
  PeopleAltRounded,
  ShieldRounded,
  HistoryRounded,
  AssignmentRounded,
  CloseRounded,
} from "@mui/icons-material";

type UserRole =
  | "Super Admin"
  | "Hospital Admin"
  | "Doctor"
  | "Receptionist"
  | "Pharmacist"
  | "Nurse";

type UserStatus = "Active" | "Inactive";

type AdminUser = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
};

const initialUsers: AdminUser[] = [
  {
    id: 1,
    name: "SaaS Owner",
    email: "super@mednxt.in",
    role: "Super Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Dr. Sharma",
    email: "doctor@mednxt.in",
    role: "Doctor",
    status: "Active",
  },
  {
    id: 3,
    name: "Admin User",
    email: "admin@mednxt.in",
    role: "Hospital Admin",
    status: "Active",
  },
  {
    id: 4,
    name: "Receptionist Anjali",
    email: "reception@mednxt.in",
    role: "Receptionist",
    status: "Active",
  },
  {
    id: 5,
    name: "Pharma Rajesh",
    email: "pharmacy@mednxt.in",
    role: "Pharmacist",
    status: "Active",
  },
  {
    id: 6,
    name: "Nurse Priya",
    email: "nurse@mednxt.in",
    role: "Nurse",
    status: "Active",
  },
  {
    id: 7,
    name: "Dr. Kumar",
    email: "kumar@mednxt.in",
    role: "Doctor",
    status: "Inactive",
  },
  {
    id: 8,
    name: "Receptionist Divya",
    email: "divya@mednxt.in",
    role: "Receptionist",
    status: "Active",
  },
  {
    id: 9,
    name: "Nurse Arjun",
    email: "arjun@mednxt.in",
    role: "Nurse",
    status: "Inactive",
  },
];

const roles: UserRole[] = [
  "Super Admin",
  "Hospital Admin",
  "Doctor",
  "Receptionist",
  "Pharmacist",
  "Nurse",
];

const panelTabs = [
  { label: "Users", icon: <PeopleAltRounded fontSize="small" /> },
  { label: "Audit Logs", icon: <HistoryRounded fontSize="small" /> },
  { label: "Requests", icon: <AssignmentRounded fontSize="small" /> },
];

const auditLogs = [
  {
    action: "User account created",
    detail: "Receptionist Anjali",
    time: "Today, 10:30 AM",
    type: "User management",
  },
  {
    action: "Role assigned",
    detail: "Dr. Sharma — Doctor",
    time: "Today, 09:15 AM",
    type: "Access control",
  },
  {
    action: "User status updated",
    detail: "Dr. Kumar — Inactive",
    time: "Yesterday, 04:20 PM",
    type: "User management",
  },
];

const pendingRequests = [
  {
    name: "Dr. Meera",
    email: "meera@mednxt.in",
    role: "Doctor",
  },
  {
    name: "Receptionist Karthik",
    email: "karthik@mednxt.in",
    role: "Receptionist",
  },
];

const cardSx = {
  border: "1px solid #EAECF4",
  borderRadius: "16px",
  boxShadow: "0 3px 14px rgba(34, 35, 90, 0.04)",
  backgroundColor: "#FFFFFF",
};

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: "#FFFFFF",
  },
};

export default function AdminPanelPage() {
  const [users, setUsers] = useState<AdminUser[]>(initialUsers);
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All roles");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState<UserRole>("Doctor");
  const [formError, setFormError] = useState("");

  const activeCount = users.filter(
    (user) => user.status === "Active"
  ).length;

  const inactiveCount = users.length - activeCount;

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query);

      const matchesRole =
        roleFilter === "All roles" || user.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter]);

  const showNotice = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3500);
  };

  const handleAddUser = () => {
    setFormError("");

    if (!newName.trim() || !newEmail.trim()) {
      setFormError("Please enter both the user's name and email.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(newEmail.trim())) {
      setFormError("Please enter a valid email address.");
      return;
    }

    if (
      users.some(
        (user) =>
          user.email.toLowerCase() === newEmail.trim().toLowerCase()
      )
    ) {
      setFormError("A user with this email already exists.");
      return;
    }

    const newUser: AdminUser = {
      id: Math.max(0, ...users.map((user) => user.id)) + 1,
      name: newName.trim(),
      email: newEmail.trim(),
      role: newRole,
      status: "Active",
    };

    setUsers((previous) => [...previous, newUser]);
    setSearch("");
    setRoleFilter("All roles");
    setActiveTab(0);
    setNewName("");
    setNewEmail("");
    setNewRole("Doctor");
    setDialogOpen(false);
    showNotice("User added to the local mock data.");
  };

  const handleRoleChange = (id: number, role: UserRole) => {
    setUsers((previous) =>
      previous.map((user) =>
        user.id === id ? { ...user, role } : user
      )
    );

    showNotice("Role updated in local mock data.");
  };

  const handleStatusChange = (id: number, status: UserStatus) => {
    setUsers((previous) =>
      previous.map((user) =>
        user.id === id ? { ...user, status } : user
      )
    );

    showNotice("User status updated in local mock data.");
  };

  const handleResetPassword = (user: AdminUser) => {
    const confirmed = window.confirm(
      `Demo action only: simulate a password reset for ${user.name}?`
    );

    if (confirmed) {
      showNotice(
        "Demo only: no password was changed or reset email sent."
      );
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100%",
        p: { xs: 2, md: 3.5 },
        backgroundColor: "#F5F7FC",
        color: "#18213B",
      }}
    >
      {/* Page heading */}
      <Stack
  direction={{ xs: "column", md: "row" }}
  spacing={2}
  sx={{
    mb: 3,
    justifyContent: "space-between",
    alignItems: { xs: "stretch", md: "center" },
  }}
>
        <Box>
          <Stack
  direction="row"
  spacing={1}
  sx={{ alignItems: "center" }}
>
            <Avatar
              sx={{
                width: 40,
                height: 40,
                backgroundColor: "#EFEDFF",
                color: "#5B4CE2",
                borderRadius: "12px",
              }}
            >
              <AdminPanelSettingsRounded />
            </Avatar>

            <Typography
              variant="h5"
              sx={{ fontWeight: 800, letterSpacing: "-0.6px" }}
            >
              Admin & Access Control
            </Typography>
          </Stack>

          <Typography
            variant="body2"
            sx={{ color: "#77819B", mt: 1, ml: 0.5 }}
          >
            Manage mock users, roles, and access status.
          </Typography>
        </Box>

        <Stack
  direction="row"
  spacing={1.5}
  sx={{ flexWrap: "wrap" }}
>
          <Chip
            icon={<ShieldRounded />}
            label="Demo Mode"
            sx={{
              height: 36,
              backgroundColor: "#E5F8EF",
              color: "#16845A",
              fontWeight: 700,
              borderRadius: "10px",
            }}
          />

          <Button
            variant="contained"
            startIcon={<AddRounded />}
            onClick={() => {
              setFormError("");
              setDialogOpen(true);
            }}
            sx={{
              textTransform: "none",
              fontWeight: 700,
              borderRadius: "10px",
              px: 2.5,
              py: 1.1,
              backgroundColor: "#5847E8",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#4535CF",
                boxShadow: "none",
              },
            }}
          >
            Add User
          </Button>
        </Stack>
      </Stack>

      {notice && (
        <Alert
          severity="info"
          onClose={() => setNotice("")}
          sx={{ mb: 2, borderRadius: "12px" }}
        >
          {notice}
        </Alert>
      )}

      {/* Summary cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(3, minmax(0, 1fr))",
          },
          gap: 2,
          mb: 3,
        }}
      >
        {[
          {
            label: "Total Users",
            value: users.length,
            detail: "All registered demo accounts",
            icon: <PeopleAltRounded />,
            color: "#5847E8",
            background: "#EFEDFF",
          },
          {
            label: "Active Users",
            value: activeCount,
            detail: "Accounts marked active",
            icon: <ShieldRounded />,
            color: "#12966A",
            background: "#E3F8EF",
          },
          {
            label: "Inactive Users",
            value: inactiveCount,
            detail: "Accounts marked inactive",
            icon: <LockResetRounded />,
            color: "#D97706",
            background: "#FFF1D9",
          },
        ].map((item) => (
          <Paper key={item.label} sx={{ ...cardSx, p: 2.5 }}>
            <Stack
  direction="row"
  sx={{
    justifyContent: "space-between",
    alignItems: "center",
  }}
>
              <Box>
                <Typography
                  variant="body2"
                  sx={{ color: "#7C849B", fontWeight: 600 }}
                >
                  {item.label}
                </Typography>

                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 800,
                    mt: 1,
                    color: "#1B2440",
                  }}
                >
                  {item.value}
                </Typography>

                <Typography
                  variant="caption"
                  sx={{ color: "#9299AC" }}
                >
                  {item.detail}
                </Typography>
              </Box>

              <Avatar
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "14px",
                  color: item.color,
                  backgroundColor: item.background,
                }}
              >
                {item.icon}
              </Avatar>
            </Stack>
          </Paper>
        ))}
      </Box>

      {/* Main content */}
      <Paper sx={{ ...cardSx, overflow: "hidden" }}>
        <Box sx={{ px: { xs: 2, md: 3 }, pt: 1.5 }}>
          <Tabs
            value={activeTab}
            onChange={(_, value: number) => setActiveTab(value)}
            variant="scrollable"
            allowScrollButtonsMobile
            sx={{
              minHeight: 54,
              "& .MuiTab-root": {
                minHeight: 54,
                textTransform: "none",
                fontWeight: 700,
                color: "#7A8299",
              },
              "& .Mui-selected": { color: "#5847E8" },
              "& .MuiTabs-indicator": {
                height: 3,
                borderRadius: "3px 3px 0 0",
                backgroundColor: "#5847E8",
              },
            }}
          >
            {panelTabs.map((tab) => (
              <Tab
                key={tab.label}
                icon={tab.icon}
                iconPosition="start"
                label={tab.label}
              />
            ))}
          </Tabs>
        </Box>

        {/* Users tab */}
        {activeTab === 0 && (
          <>
            <Box
              sx={{
                p: { xs: 2, md: 3 },
                display: "flex",
                flexWrap: "wrap",
                gap: 1.5,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TextField
                size="small"
                placeholder="Search by name or email..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                sx={{
                  ...fieldSx,
                  width: { xs: "100%", md: 320 },
                }}
                slotProps={{
  input: {
    startAdornment: (
      <InputAdornment position="start">
        <SearchRounded sx={{ color: "#969DB0" }} />
      </InputAdornment>
    ),
  },
}}
              />

              <Stack
  direction="row"
  spacing={1}
  sx={{ alignItems: "center" }}
>
                <TextField
                  select
                  size="small"
                  label="Filter by role"
                  value={roleFilter}
                  onChange={(event) => setRoleFilter(event.target.value)}
                  sx={{ ...fieldSx, width: 180 }}
                >
                  <MenuItem value="All roles">All roles</MenuItem>
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </TextField>

                <IconButton
                  aria-label="Clear search and filters"
                  title="Clear filters"
                  onClick={() => {
                    setSearch("");
                    setRoleFilter("All roles");
                  }}
                  sx={{
                    border: "1px solid #E5E7F0",
                    borderRadius: "10px",
                  }}
                >
                  <RefreshRounded />
                </IconButton>
              </Stack>
            </Box>

            <Box sx={{ px: { xs: 2, md: 3 }, pb: 1 }}>
              <Typography variant="body2" sx={{ color: "#8189A0" }}>
                Showing <strong>{filteredUsers.length}</strong> of{" "}
                <strong>{users.length}</strong> users
              </Typography>
            </Box>

            <TableContainer sx={{ overflowX: "auto" }}>
              <Table sx={{ minWidth: 780 }}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#F8F9FD" }}>
                    {[
                      "USER DETAILS",
                      "ROLE & ACCESS",
                      "STATUS",
                      "SECURITY ACTIONS",
                    ].map((heading) => (
                      <TableCell
                        key={heading}
                        sx={{
                          color: "#858CA2",
                          fontSize: 11,
                          fontWeight: 800,
                          letterSpacing: 0.5,
                          py: 1.8,
                          borderBottom: "1px solid #EDF0F6",
                        }}
                      >
                        {heading}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow
                      key={user.id}
                      hover
                      sx={{
                        "&:last-child td": { borderBottom: 0 },
                        "& td": {
                          borderBottom: "1px solid #F0F2F7",
                          py: 1.6,
                        },
                      }}
                    >
                      <TableCell>
                        <Stack
  direction="row"
  spacing={1.5}
  sx={{ alignItems: "center" }}
>
                          <Avatar
                            sx={{
                              width: 38,
                              height: 38,
                              fontSize: 13,
                              fontWeight: 800,
                              color: "#5847E8",
                              backgroundColor: "#EFEDFF",
                            }}
                          >
                            {user.name
                              .split(" ")
                              .map((part) => part[0])
                              .slice(0, 2)
                              .join("")
                              .toUpperCase()}
                          </Avatar>

                          <Box>
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 700, color: "#28314D" }}
                            >
                              {user.name}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ color: "#9299AC" }}
                            >
                              {user.email}
                            </Typography>
                          </Box>
                        </Stack>
                      </TableCell>

                      <TableCell>
                        <TextField
                          select
                          size="small"
                          value={user.role}
                          onChange={(event) =>
                            handleRoleChange(
                              user.id,
                              event.target.value as UserRole
                            )
                          }
                          disabled={user.role === "Super Admin"}
                          sx={{
                            ...fieldSx,
                            width: 175,
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#E8EAF2",
                            },
                            "& .MuiSelect-select": {
                              fontSize: 12,
                              fontWeight: 600,
                              py: 1,
                            },
                          }}
                        >
                          {roles.map((role) => (
                            <MenuItem key={role} value={role}>
                              {role}
                            </MenuItem>
                          ))}
                        </TextField>
                      </TableCell>

                      <TableCell>
                        <TextField
                          select
                          size="small"
                          value={user.status}
                          onChange={(event) =>
                            handleStatusChange(
                              user.id,
                              event.target.value as UserStatus
                            )
                          }
                          sx={{
                            ...fieldSx,
                            width: 120,
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "transparent",
                            },
                            "& .MuiSelect-select": {
                              py: 0.7,
                              fontSize: 12,
                              fontWeight: 700,
                              color:
                                user.status === "Active"
                                  ? "#16845A"
                                  : "#B45309",
                              backgroundColor:
                                user.status === "Active"
                                  ? "#E7F8F0"
                                  : "#FFF2DD",
                              borderRadius: "8px",
                            },
                          }}
                        >
                          <MenuItem value="Active">Active</MenuItem>
                          <MenuItem value="Inactive">Inactive</MenuItem>
                        </TextField>
                      </TableCell>

                      <TableCell>
                        <Button
                          size="small"
                          startIcon={<LockResetRounded />}
                          onClick={() => handleResetPassword(user)}
                          sx={{
                            textTransform: "none",
                            fontWeight: 700,
                            fontSize: 12,
                            color: "#6654DB",
                            backgroundColor: "#F3F0FF",
                            borderRadius: "8px",
                            px: 1.5,
                            whiteSpace: "nowrap",
                            "&:hover": {
                              backgroundColor: "#E9E4FF",
                            },
                          }}
                        >
                          Reset Password
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}

                  {filteredUsers.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} sx={{ py: 7, textAlign: "center" }}>
                        <Typography sx={{ fontWeight: 700 }}>
                          No users found
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#858CA2", mt: 0.5 }}
                        >
                          Try a different name, email, or role.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}

        {/* Audit Logs tab */}
        {activeTab === 1 && (
          <Box sx={{ p: { xs: 2, md: 3 } }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
              Recent Activity
            </Typography>
            <Typography variant="body2" sx={{ color: "#858CA2", mb: 3 }}>
              Sample activity records for this assessment.
            </Typography>

            <Stack spacing={1.5}>
              {auditLogs.map((log) => (
                <Paper
                  key={log.action}
                  variant="outlined"
                  sx={{
                    p: 2,
                    borderRadius: "12px",
                    borderColor: "#EAECF4",
                    boxShadow: "none",
                  }}
                >
                  <Stack
  direction={{ xs: "column", sm: "row" }}
  spacing={1}
  sx={{ justifyContent: "space-between" }}
>
                    <Box>
                      <Typography sx={{ fontWeight: 700 }}>
                        {log.action}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "#7D859D", mt: 0.5 }}
                      >
                        {log.detail}
                      </Typography>
                    </Box>

                    <Box sx={{ textAlign: { sm: "right" } }}>
                      <Chip
                        size="small"
                        label={log.type}
                        sx={{
                          backgroundColor: "#F0EDFF",
                          color: "#5949D8",
                          fontWeight: 600,
                        }}
                      />
                      <Typography
  variant="caption"
  sx={{
    display: "block",
    color: "#939AAF",
    mt: 0.8,
  }}
>
                        {log.time}
                      </Typography>
                    </Box>
                  </Stack>
                </Paper>
              ))}
            </Stack>
          </Box>
        )}

        {/* Requests tab */}
        {activeTab === 2 && (
          <Box sx={{ p: { xs: 2, md: 3 } }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
              Access Requests
            </Typography>
            <Typography variant="body2" sx={{ color: "#858CA2", mb: 3 }}>
              Example requests for UI demonstration only.
            </Typography>

            <Stack spacing={1.5}>
              {pendingRequests.map((request) => (
                <Paper
                  key={request.email}
                  variant="outlined"
                  sx={{
                    p: 2,
                    borderRadius: "12px",
                    borderColor: "#EAECF4",
                    boxShadow: "none",
                  }}
                >
                  <Stack
  direction={{ xs: "column", sm: "row" }}
  spacing={2}
  sx={{
    justifyContent: "space-between",
    alignItems: { xs: "stretch", sm: "center" },
  }}
>
                    <Box>
                      <Typography sx={{ fontWeight: 700 }}>
                        {request.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "#858CA2", mt: 0.5 }}
                      >
                        {request.email} · {request.role}
                      </Typography>
                    </Box>

                    <Stack direction="row" spacing={1}>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() =>
                          showNotice(
                            "Demo only: request approval is not connected."
                          )
                        }
                        sx={{
                          textTransform: "none",
                          backgroundColor: "#5847E8",
                          boxShadow: "none",
                          "&:hover": {
                            backgroundColor: "#4535CF",
                            boxShadow: "none",
                          },
                        }}
                      >
                        Review
                      </Button>
                      <Button
                        size="small"
                        onClick={() =>
                          showNotice(
                            "Demo only: request decisions are not saved."
                          )
                        }
                        sx={{
                          textTransform: "none",
                          color: "#7D859D",
                        }}
                      >
                        Dismiss
                      </Button>
                    </Stack>
                  </Stack>
                </Paper>
              ))}
            </Stack>
          </Box>
        )}

        {/* <Box
          sx={{
            px: 3,
            py: 1.8,
            borderTop: "1px solid #EDF0F6",
            backgroundColor: "#FCFCFE",
          }}
        >
          <Typography variant="caption" sx={{ color: "#939AAF" }}>
            MedNxt · Frontend assessment · Mock data only
          </Typography>
        </Box> */}
      </Paper>

      {/* Add User dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth
        maxWidth="sm"
        slotProps={{
  paper: {
    sx: { borderRadius: "18px", p: 0.5 },
  },
}}
      >
        <DialogTitle sx={{ fontWeight: 800, pr: 6 }}>
          Add New User
          <Typography
            variant="body2"
            sx={{ color: "#858CA2", fontWeight: 400, mt: 0.5 }}
          >
            Add a sample account to the local user list.
          </Typography>

          <IconButton
            aria-label="Close dialog"
            onClick={() => setDialogOpen(false)}
            sx={{ position: "absolute", right: 12, top: 12 }}
          >
            <CloseRounded />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          {formError && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: "10px" }}>
              {formError}
            </Alert>
          )}

          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              label="Full name"
              placeholder="Enter full name"
              value={newName}
              onChange={(event) => setNewName(event.target.value)}
              fullWidth
              sx={fieldSx}
            />

            <TextField
              label="Email address"
              placeholder="name@mednxt.in"
              type="email"
              value={newEmail}
              onChange={(event) => setNewEmail(event.target.value)}
              fullWidth
              sx={fieldSx}
            />

            <TextField
              select
              label="Assign role"
              value={newRole}
              onChange={(event) => setNewRole(event.target.value as UserRole)}
              fullWidth
              sx={fieldSx}
            >
              {roles
                .filter((role) => role !== "Super Admin")
                .map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
            </TextField>

            <Alert severity="info" sx={{ borderRadius: "10px" }}>
              This creates a temporary frontend record. No account, password,
              or backend user is created.
            </Alert>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 2.5, pt: 1 }}>
          <Button
            onClick={() => setDialogOpen(false)}
            sx={{ textTransform: "none", color: "#747D95" }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleAddUser}
            sx={{
              textTransform: "none",
              borderRadius: "9px",
              backgroundColor: "#5847E8",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#4535CF",
                boxShadow: "none",
              },
            }}
          >
            Add User
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
