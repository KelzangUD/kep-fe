import React from "react";
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
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Transition from "../../../common/Transition";
import AddDepartment from "./departments/AddDepartment";
import EditDepartment from "./departments/EditDepartment";
import EditDesignation from "./designations/EditDesignation";

const rows = [
  {
    id: 1,
    sl: 1,
    title: "AND",
  },
  {
    id: 2,
    sl: 2,
    title: "CNCS",
  },
  {
    id: 3,
    sl: 3,
    title: "FINANCE",
  },
  {
    id: 4,
    sl: 4,
    title: "HRAD",
  },
  {
    id: 5,
    sl: 5,
    title: "INTERNAL AUDIT UNIT",
  },
  {
    id: 6,
    sl: 6,
    title: "MARKETING",
  },
  {
    id: 7,
    sl: 7,
    title: "MIS",
  },
  {
    id: 8,
    sl: 8,
    title: "SDU",
  },
  {
    id: 9,
    sl: 9,
    title: "SPPD",
  },
];

const Departments = () => {
  const [add, setAdd] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [details, setDetails] = React.useState({});
  const [deleteGrade, setDeleteGrade] = React.useState(false);
  const [id, setId] = React.useState("");
  const editHandle = (param) => {
    setDetails(param?.row);
    setEdit(true);
  };
  const deleteHandle = (param) => {
    setId(param?.id);
    setDeleteGrade(true);
  };
  const userColumns = [
    { field: "sl", headerName: "Sl. No", width: 40 },
    { field: "title", headerName: "Title", width: 200 },
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
  const addHandle = () => {
    setAdd(true);
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4} alignItems="center" sx={{ px: 2 }}>
          <SubHeader text="Departments/Units" />
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Grid item>
              <Button
                variant="outlined"
                endIcon={<AddIcon />}
                sx={{ mr: 2 }}
                onClick={addHandle}
              >
                Add Department
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
      {add ? <AddDepartment open={add} setOpen={setAdd} /> : null}
      {edit ? (
        <EditDepartment details={details} open={edit} setOpen={setEdit} />
      ) : null}
      {deleteGrade ? (
        <Dialog
          open={deleteGrade}
          onClose={() => setDeleteGrade(false)}
          TransitionComponent={Transition}
        >
          <DialogContent>
            <Typography variant="h6">Confirmation</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1">
              Are you sure you want to delete this Department? After deletion, the
              impact will be reflected on users' designation.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ mb: 2, mx: 2 }}>
            <Button
              onClick={() => setDeleteGrade(false)}
              variant="contained"
              autoFocus
              size="small"
            >
              Confirm
            </Button>
            <Button
              onClick={() => setDeleteGrade(false)}
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

export default Departments;
