import React, { useState, useEffect } from "react";
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
import Notification from "../../../ui/Notification";
import Route from "../../../routes/Route";

const User = () => {
  // init states
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [createUser, setCreateUser] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [deleteUser, setDeleteUser] = useState(false);
  const [userId, setUserId] = useState("");
  const [message, setMessage] = React.useState("");
  const [openNotification, setOpenNotification] = useState(false);
  const [severity, setSeverity] = useState("info");
  // handlers
  const searchHandle = (e) => {
    setSearchQuery(e.target.value?.toLowerCase() || "");
  };
  const editHandle = (param) => {
    setUserDetails(param?.row);
    setEditUser(true);
  };
  const deleteHandle = (param) => {
    setUserId(param?.id);
    setDeleteUser(true);
  };
  const userColumns = [
    {
      field: "sl",
      headerName: "Sl. No",
      width: 40,
      valueGetter: (params) => params.row.sl,
    },
    { field: "name", headerName: "Name", width: 180 },
    { field: "empId", headerName: "Employee ID", width: 90 },
    {
      field: "email",
      headerName: "Email",
      width: 240,
    },
    {
      field: "designation ",
      headerName: "Designation",
      width: 140,
      valueGetter: (params) => params.row.Designation?.title || "N/A",
    },
    { field: "contact", headerName: "Contact No.", width: 100 },
    {
      field: "isAdmin",
      headerName: "Admin",
      width: 60,
      valueGetter: (params) => (params.row.isAdmin === true ? "Yes" : "No"),
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
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
  const token = localStorage.getItem("token");
  const fetchUsers = async () => {
    const res = await Route("GET", "/users", token, null, null);
    if (res?.status === 200) {
      setUsers(res?.data?.users);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  const filteredData = users.filter(
    (item) =>
      (item?.name?.toLowerCase() || "").includes(searchQuery) ||
      (item?.empId?.toLowerCase() || "").includes(searchQuery) ||
      (item?.Designation?.title?.toLowerCase() || "").includes(searchQuery)
  );
  const confirmDeleteHandler = async () => {
    const res = await Route("PUT", `/users/delete-users`, token, null, userId);
    if (res?.status === 200) {
      setDeleteUser(false);
      setMessage(res?.data?.message);
      fetchUsers();
      setOpenNotification(true);
    } else {
      setMessage(res?.data?.message);
      setOpenNotification(true);
    }
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
                  p: "2px 2px",
                  display: "flex",
                  alignItems: "center",
                  width: 400,
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search"
                  inputProps={{ "aria-label": "search" }}
                  onChange={searchHandle}
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
                variant="contained"
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
          <Grid item container alignItems="center" xs={12}>
            <div style={{ height: "auto", width: "100%" }}>
              <DataGrid
                rows={filteredData?.map((row, index) => ({
                  ...row,
                  sl: index + 1,
                }))}
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
        <CreateUser
          open={createUser}
          setOpen={setCreateUser}
          setOpenNotification={setOpenNotification}
          setMessage={setMessage}
          fetchUsers={fetchUsers}
        />
      ) : null}
      {editUser ? (
        <EditUser
          details={userDetails}
          open={editUser}
          setOpen={setEditUser}
          setOpenNotification={setOpenNotification}
          setSeverity={setSeverity}
          setMessage={setMessage}
          fetchUsers={fetchUsers}
        />
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
              onClick={confirmDeleteHandler}
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
      {openNotification && (
        <Notification
          open={openNotification}
          setOpen={setOpenNotification}
          severity={severity}
          message={message}
        />
      )}
    </>
  );
};

export default User;
