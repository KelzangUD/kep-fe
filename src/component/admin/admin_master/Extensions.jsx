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
} from "@mui/material";
import SubHeader from "../../../common/SubHeader";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Transition from "../../../common/Transition";
import AddExtension from "./extensions/AddExtension";
import EditExtension from "./extensions/EditExtension";
import Notification from "../../../ui/Notification";
import CustomToolbar from "../../../ui/CustomToolBar";
import Route from "../../../routes/Route";
import { useCommon } from "../../../contexts/CommonContext";

const Extensions = () => {
  const { isMdUp } = useCommon();
  // init states
  const [extensions, setExtensions] = useState([]);
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const [details, setDetails] = useState({});
  const [deleteExtension, setDeleteExtension] = useState(false);
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");
  const [openNotification, setOpenNotification] = useState(false);
  const [severity, setSeverity] = useState("info");

  const token = localStorage.getItem("token");
  const fetchExtensions = async () => {
    const res = await Route("GET", "/extensions", token, null, null);
    if (res?.status === 200) {
      setExtensions(res?.data?.extensions);
    }
  };
  useEffect(() => {
    fetchExtensions();
  }, []);
  const editHandle = (param) => {
    setDetails(param?.row);
    setEdit(true);
  };
  const deleteHandle = (param) => {
    setId(param?.id);
    setDeleteExtension(true);
  };

  const confirmDeleteHandler = async () => {
    const res = await Route("DELETE", `/extensions`, token, null, id);
    if (res?.status === 201) {
      setDeleteExtension(false);
      setMessage(res?.data?.message);
      fetchExtensions();
      setOpenNotification(true);
    } else {
      setMessage(res?.data?.message);
      setOpenNotification(true);
    }
  };

  const userColumns = [
    {
      field: "sl",
      headerName: "Sl. No",
      flex: isMdUp ? 40 : undefined,
      width: isMdUp ? undefined : 40,
      valueGetter: (params) => params.row.sl,
    },
    {
      field: "extension",
      headerName: "Extension",
      flex: isMdUp ? 200 : undefined,
      width: isMdUp ? undefined : 200,
    },
    {
      field: "regionName",
      headerName: "Region",
      flex: isMdUp ? 200 : undefined,
      width: isMdUp ? undefined : 200,
      valueGetter: (params) => params.row.Region?.region || "N/A",
    },
    {
      field: "description",
      headerName: "Description",
      flex: isMdUp ? 300 : undefined,
      width: isMdUp ? undefined : 300,
    },
    {
      field: "action",
      headerName: "Action",
      flex: isMdUp ? 120 : undefined,
      width: isMdUp ? undefined : 120,
      renderCell: (params) => (
        <div>
          <IconButton
            aria-label="edit"
            size="small"
            onClick={() => editHandle(params)}
            color="primary"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => deleteHandle(params)}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4} alignItems="center" sx={{ px: 2 }}>
          <SubHeader text="Extensions" />
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              endIcon={<AddIcon />}
              onClick={() => setAdd(true)}
            >
              Add Extension
            </Button>
          </Grid>
          <Grid item container alignItems="center" xs={12}>
            <div style={{ height: "auto", width: "100%" }}>
              <DataGrid
                rows={extensions?.map((row, index) => ({
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
                slots={{ toolbar: CustomToolbar }}
              />
            </div>
          </Grid>
        </Grid>
      </Box>
      {add ? (
        <AddExtension
          open={add}
          setOpen={setAdd}
          setOpenNotification={setOpenNotification}
          setSeverity={setSeverity}
          setMessage={setMessage}
          fetchExtensions={fetchExtensions}
        />
      ) : null}
      {edit ? (
        <EditExtension
          details={details}
          open={edit}
          setOpen={setEdit}
          setOpenNotification={setOpenNotification}
          setSeverity={setSeverity}
          setMessage={setMessage}
          fetchExtensions={fetchExtensions}
        />
      ) : null}
      {deleteExtension ? (
        <Dialog
          open={deleteExtension}
          onClose={() => setDeleteExtension(false)}
          TransitionComponent={Transition}
        >
          <DialogContent>
            <Typography variant="h6">Confirmation</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1">
              Are you sure you want to delete this Extension?
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
              onClick={() => setDeleteExtension(false)}
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
          severity={severity}
        />
      )}
    </>
  );
};

export default Extensions;
