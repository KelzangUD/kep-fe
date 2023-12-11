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
import AddRegion from "./AddRegion";
import EditRegion from "./EditRegion";

const rows = [
  {
    id: 1,
    sl: 1,
    region: "Thimphu",
    description: "Thimphu Dzongkhag",
  },
  {
    id: 2,
    sl: 2,
    region: "Paro",
    description: "Paro Dzongkhag & Haa Dzongkhag",
  },
];

const Regions = () => {
  const [add, setAdd] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [details, setDetails] = React.useState({});
  const [deleteQuestion, setDeleteQuestion] = React.useState(false);
  const [id, setId] = React.useState("");
  const editHandle = (param) => {
    setDetails(param?.row);
    setEdit(true);
  };
  const deleteHandle = (param) => {
    setId(param?.id);
    setDeleteQuestion(true);
  };
  const userColumns = [
    { field: "sl", headerName: "Sl. No", width: 40 },
    { field: "region", headerName: "Region", width: 200 },
    { field: "description", headerName: "Description", width: 600 },
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
          <SubHeader text="Regions" />
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
                Add Region
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
      {add ? <AddRegion open={add} setOpen={setAdd} /> : null}
      {edit ? (
        <EditRegion details={details} open={edit} setOpen={setEdit} />
      ) : null}
      {deleteQuestion ? (
        <Dialog
          open={deleteQuestion}
          onClose={() => setDeleteQuestion(false)}
          TransitionComponent={Transition}
        >
          <DialogContent>
            <Typography variant="h6">Confirmation</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1">
              Are you sure you want to delete this Region? Once Deleted, the
              Region along with all the Extensions assigned under it will be
              deleted.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ mb: 2, mx: 2 }}>
            <Button
              onClick={() => setDeleteQuestion(false)}
              variant="contained"
              autoFocus
              size="small"
            >
              Confirm
            </Button>
            <Button
              onClick={() => setDeleteQuestion(false)}
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

export default Regions;
