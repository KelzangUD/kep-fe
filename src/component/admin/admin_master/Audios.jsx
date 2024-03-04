import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Divider,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  Paper,
  InputBase,
} from "@mui/material";
import SubHeader from "../../../common/SubHeader";
import { DataGrid } from "@mui/x-data-grid";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Transition from "../../../common/Transition";
import UploadAudio from "./audios/UploadAudio";
import EditAudio from "./audios/EditAudio";
import AudioPlay from "./audios/AudioPlay";
import Notification from "../../../ui/Notification";
import Route from "../../../routes/Route";

const Audios = () => {
  // init states
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");
  const [openNotification, setOpenNotification] = useState(false);
  const [audios, setAudios] = useState([]);
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const [view, setView] = useState(false);
  const [details, setDetails] = useState({});
  const [deleteAudio, setDeleteAudio] = useState(false);
  const [id, setId] = useState("");

  const token = localStorage.getItem("token");
  const fetchAudios = async () => {
    const res = await Route("GET", "/audios", token, null);
    if (res?.status === 200) {
      setAudios(res?.data?.audios);
    }
  };
  useEffect(() => {
    fetchAudios();
  }, []);
  const filteredData = audios?.filter((item) =>
    item?.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // handlers
  const searchHandle = (e) => {
    setSearchQuery(e.target.value);
  };
  const editHandle = (param) => {
    setDetails(param?.row);
    setEdit(true);
  };
  const viewHandle = (param) => {
    setDetails(param?.row);
    setView(true);
  };
  const deleteHandle = (param) => {
    setId(param?.id);
    setDeleteAudio(true);
  };
  const userColumns = [
    { field: "sl", headerName: "Sl. No", width: 40 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "description", headerName: "Description", width: 600 },
    { field: "visible", headerName: "Visible", width: 100 },
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
            aria-label="edit"
            size="small"
            onClick={() => viewHandle(params)}
          >
            <VisibilityIcon />
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
  const addHandle = () => {
    setAdd(true);
  };
  const confirmDeleteHandler = async () => {
    const res = await Route("DELETE", `/audios/${id}`, token, null);
    if (res?.status === 201) {
      setDeleteAudio(false);
      setMessage(res?.data?.message);
      fetchAudios();
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
          <SubHeader text="Audios" />
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
                variant="outlined"
                endIcon={<CloudUploadIcon />}
                sx={{ mr: 2 }}
                onClick={addHandle}
              >
                Upload
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
      {add ? (
        <UploadAudio
          open={add}
          setOpen={setAdd}
          setOpenNotification={setOpenNotification}
          setMessage={setMessage}
          fetchAudios={fetchAudios}
        />
      ) : null}
      {edit ? (
        <EditAudio
          details={details}
          open={edit}
          setOpen={setEdit}
          setOpenNotification={setOpenNotification}
          setMessage={setMessage}
          fetchAudios={fetchAudios}
        />
      ) : null}
      {view ? (
        <AudioPlay details={details} open={view} setOpen={setView} />
      ) : null}
      {deleteAudio ? (
        <Dialog
          open={deleteAudio}
          onClose={() => setDeleteAudio(false)}
          TransitionComponent={Transition}
        >
          <DialogContent>
            <Typography variant="h6">Confirmation</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1">
              Are you sure you want to delete this Audio? Once Deleted, it can
              not be recovered.
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
              onClick={() => setDeleteAudio(false)}
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
          message={message}
        />
      )}
    </>
  );
};

export default Audios;
