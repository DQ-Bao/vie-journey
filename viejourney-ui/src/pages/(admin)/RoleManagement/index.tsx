import React, { useState } from "react";
import { AdminLayout } from "../../../layouts";
import {
  Box,
  Grid2,
  Card,
  CardContent,
  Typography,
  Paper,
  Chip,
  Stack,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { DataGridPremium, GridColDef } from "@mui/x-data-grid-premium";
import { LicenseInfo } from "@mui/x-license";
import PersonIcon from "@mui/icons-material/Person";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import GroupIcon from "@mui/icons-material/Group";
import EditRoleDialog from "./EditRoleDialog";

// Set MUI Pro License
LicenseInfo.setLicenseKey(import.meta.env.VITE_MUI_PRO_KEY);

// Actions Menu Component
const ActionMenu = ({
  roleId,
  onEditRole,
}: {
  roleId: number;
  onEditRole: (roleId: number) => void;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleViewDetail = () => {
    console.log("View detail for role:", roleId);
    handleClose();
  };

  const handleEditRole = () => {
    onEditRole(roleId);
    handleClose();
  };

  return (
    <>
      <IconButton
        size="small"
        onClick={handleClick}
        aria-controls={open ? "role-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <MoreVertIcon fontSize="small" />
      </IconButton>
      <Menu
        id="role-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "role-button",
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleViewDetail}>
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Detail</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleEditRole}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit Role</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

const roleStats = [
  {
    title: "Regular User",
    count: 1247,
    icon: <PersonIcon />,
    color: "#e3f2fd",
    iconColor: "#1976d2",
  },
  {
    title: "Content Manager",
    count: 23,
    icon: <ManageAccountsIcon />,
    color: "#f3e5f5",
    iconColor: "#7b1fa2",
  },
  {
    title: "Administrator",
    count: 5,
    icon: <AdminPanelSettingsIcon />,
    color: "#ffebee",
    iconColor: "#d32f2f",
  },
];

const systemRoles = [
  {
    id: 1,
    role: "Regular User",
    description: "Regular user with basic content creation privileges",
    users: 1247,
    permissions: ["Content Management (1)", "Comment Management (1)"],
    color: "#1976d2",
    bgColor: "#e3f2fd",
  },
  {
    id: 2,
    role: "Content Manager",
    description: "Content & asset manager with moderation capabilities",
    users: 23,
    permissions: [
      "Content Management (4)",
      "Comment Management (3)",
      "User Management (1)",
      "Asset Management (2)",
    ],
    color: "#7b1fa2",
    bgColor: "#f3e5f5",
  },
  {
    id: 3,
    role: "Administrator",
    description: "Supervisor with full system access and control",
    users: 5,
    permissions: [
      "Content Management (4)",
      "Comment Management (4)",
      "User Management (4)",
      "Report Management (4)",
      "Asset Management (4)",
    ],
    color: "#d32f2f",
    bgColor: "#ffebee",
  },
];

// Move columns definition inside component to access handleEditRole
const RoleManagement = () => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<
    (typeof systemRoles)[0] | null
  >(null);
  const [loading, setLoading] = useState(false);

  const handleEditRole = (roleId: number) => {
    const role = systemRoles.find((r) => r.id === roleId);
    if (role) {
      setSelectedRole(role);
      setEditDialogOpen(true);
    }
  };

  const handleSaveRole = async (roleData: any) => {
    setLoading(true);
    try {
      // Here you would call your API to save the role
      console.log("Saving role:", roleData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setEditDialogOpen(false);
      setSelectedRole(null);
    } catch (error) {
      console.error("Error saving role:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setEditDialogOpen(false);
    setSelectedRole(null);
  };

  const columns: GridColDef[] = [
    {
      field: "role",
      headerName: "Role",
      width: 200,
      renderCell: (params) => (
        <Chip
          label={params.value}
          sx={{
            bgcolor: params.row.bgColor,
            color: params.row.color,
            fontWeight: "bold",
            minWidth: 120,
          }}
        />
      ),
    },
    {
      field: "description",
      headerName: "Description",
      width: 300,
      flex: 1,
    },
    {
      field: "users",
      headerName: "Users",
      width: 120,
      renderCell: (params) => (
        <Stack direction="row" alignItems="center" spacing={1}>
          <GroupIcon fontSize="small" color="action" />
          <Typography fontWeight="bold">{params.value}</Typography>
        </Stack>
      ),
    },
    {
      field: "permissions",
      headerName: "Permissions (View-Only)",
      width: 400,
      flex: 1,
      renderCell: (params) => (
        <Box>
          {params.value.map((permission: string, index: number) => (
            <Typography
              key={index}
              variant="body2"
              color="text.secondary"
              sx={{ display: "block", lineHeight: 1.4 }}
            >
              • {permission}
            </Typography>
          ))}
        </Box>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 80,
      sortable: false,
      align: "center",
      renderCell: (params) => (
        <ActionMenu roleId={params.row.id} onEditRole={handleEditRole} />
      ),
    },
  ];

  return (
    <AdminLayout>
      <Box sx={{ p: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Role & Permission Management
          </Typography>
          <Typography color="text.secondary" className="mb-6">
            Configure role policies and access control
          </Typography>
        </Box>
        {/* Stats Cards */}
        <Grid2 container spacing={3} sx={{ mb: 4 }}>
          {roleStats.map((stat, index) => (
            <Grid2 size={{ xs: 12, md: 4 }} key={index}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar
                      sx={{
                        bgcolor: stat.color,
                        color: stat.iconColor,
                        width: 56,
                        height: 56,
                      }}
                    >
                      {stat.icon}
                    </Avatar>
                    <Box>
                      <Typography variant="h4" fontWeight="bold">
                        {stat.count}
                      </Typography>
                      <Typography color="text.secondary" variant="body2">
                        {stat.title}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>

        {/* System Roles Table */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight="bold" mb={1}>
            System Roles
          </Typography>
          <Typography color="text.secondary" mb={3}>
            Manage roles and their associated permissions. ADMIN role is locked
            for security.
          </Typography>

          <Box sx={{ height: 400, width: "100%" }}>
            <DataGridPremium
              rows={systemRoles}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[5, 10, 25]}
              disableRowSelectionOnClick
              getRowHeight={() => "auto"}
              sx={{
                "& .MuiDataGrid-cell": {
                  borderBottom: "1px solid #f0f0f0",
                  py: 1,
                  display: "flex",
                  alignItems: "center",
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#fafafa",
                  fontWeight: "bold",
                },
                "& .MuiDataGrid-row": {
                  minHeight: "auto !important",
                },
              }}
            />
          </Box>
        </Paper>

        {/* Edit Role Dialog */}
        <EditRoleDialog
          open={editDialogOpen}
          onClose={handleCloseDialog}
          role={selectedRole}
          onSave={handleSaveRole}
          loading={loading}
        />
      </Box>
    </AdminLayout>
  );
};

export default RoleManagement;
