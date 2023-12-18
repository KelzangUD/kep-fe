import React from "react";
import {
  Box,
  Paper,
  Grid,
  Divider,
  Typography,
  Button,
  InputBase,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import SubHeader from "../../../common/SubHeader";
import { DataGrid } from "@mui/x-data-grid";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import CreateUser from "./CreateUser";
import EditUser from "./EditUser";
import Transition from "../../../common/Transition";

const rows = [
  {
    id: 1,
    sl: 1,
    name: "Kelzang Ugyen Dorji",
    employeeID: "E00911",
    email: "sw_engineer3.sdu@tashicell.com",
    designation: "Software Developer",
    designationId: 3,
    contactNo: "77714212",
    gender: "Male",
    region: 1,
    regionName: "Thimphu",
    extension: null,
    isAdmin: true,
    status: "Active",
  },
  {
    id: 2,
    sl: 2,
    name: "Pema Dorji",
    employeeID: "E00505",
    email: "sw_engineer1.sdu@tashicell.com",
    designation: "Project Manager",
    designationId: 4,
    contactNo: "77721212",
    gender: "Male",
    region: 1,
    regionName: "Thimphu",
    extension: null,
    isAdmin: false,
    status: "In Active",
  },
];

const User = () => {
  const [createUser, setCreateUser] = React.useState(false);
  const [editUser, setEditUser] = React.useState(false);
  const [userDetails, setUserDetails] = React.useState({});
  const [deleteUser, setDeleteUser] = React.useState(false);
  const [userId, setUserId] = React.useState("");
  const editHandle = (param) => {
    setUserDetails(param?.row);
    setEditUser(true);
  };
  const deleteHandle = (param) => {
    console.log(param);
    setUserId(param?.id);
    setDeleteUser(true);
  };
  const userColumns = [
    { field: "sl", headerName: "Sl. No", width: 40 },
    { field: "name", headerName: "Name", width: 160 },
    { field: "employeeID", headerName: "Employee ID", width: 130 },
    {
      field: "email",
      headerName: "Email",
      width: 240,
    },
    { field: "designation", headerName: "Designation", width: 170 },
    { field: "contactNo", headerName: "Contact No.", width: 100 },
    // { field: "regionName", headerName: "Region", width: 130 },
    { field: "status", headerName: "Status", width: 100 },
    { field: "isAdmin", headerName: "Admin", width: 70 },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => (
        <div>
          <IconButton
            aria-label="edit"
            size="small"
            onClick={() => editHandle(params)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => deleteHandle(params)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];
  const createUserHandle = () => {
    setCreateUser(true);
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4} alignItems="center" sx={{ px: 2 }}>
          <SubHeader text="Users" />
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Grid item>
              <Paper
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: 400,
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search"
                  inputProps={{ "aria-label": "search" }}
                />
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                endIcon={<PersonAddIcon />}
                sx={{ mr: 2 }}
                onClick={createUserHandle}
              >
                Create User
              </Button>
              <Button
                variant="contained"
                color="success"
                endIcon={<FileDownloadIcon />}
              >
                Export
              </Button>
            </Grid>
          </Grid>
          <Grid item container alignItems="center" sx={{ px: 2 }} xs={12}>
            <div style={{ height: "auto", width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={userColumns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
              />
            </div>
          </Grid>
        </Grid>
      </Box>
      {createUser ? (
        <CreateUser open={createUser} setOpen={setCreateUser} />
      ) : null}
      {editUser ? (
        <EditUser details={userDetails} open={editUser} setOpen={setEditUser} />
      ) : null}
      {deleteUser ? (
        <Dialog
          open={deleteUser}
          onClose={() => setDeleteUser(false)}
          TransitionComponent={Transition}
        >
          <DialogContent>
            <Typography variant="h6">Confirmation</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1">
              Are you sure you want to delete this user?
            </Typography>
          </DialogContent>
          <DialogActions sx={{ mb: 2, mx: 2 }}>
            <Button
              onClick={() => setDeleteUser(false)}
              variant="contained"
              autoFocus
              size="small"
            >
              Confirm
            </Button>
            <Button
              onClick={() => setDeleteUser(false)}
              variant="outlined"
              color="error"
              size="small"
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}
    </>
  );
};

export default User;
