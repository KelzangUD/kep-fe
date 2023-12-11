import React from "react";
import {
  Box,
  Paper,
  Grid,
  InputBase,
  IconButton,
} from "@mui/material";
import SubHeader from "../../../common/SubHeader";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditUser from "./EditUser";

const rows = [
  {
    id: 1,
    sl: 1,
    username: "E00911",
    description: "Created: Took test",
    date_time: "2023-12-07 12:12:23",
    session: "1 hours",
  },
];

const ActivityLogs = () => {
  const [view, setView] = React.useState(false);
  const [details, setDetails] = React.useState({});
  const viewHandle = (param) => {
    setDetails(param?.row);
    setView(true);
  };
  const userColumns = [
    { field: "sl", headerName: "Sl. No", width: 40 },
    { field: "username", headerName: "User Name", width: 160 },
    {
      field: "description",
      headerName: "Description",
      width: 600,
    },
    { field: "date_time", headerName: "Date and Time", width: 200 },
    { field: "session", headerName: "Session", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => (
        <div>
          <IconButton
            aria-label="edit"
            size="small"
            onClick={() => viewHandle(params)}
          >
            <VisibilityIcon />
          </IconButton>
        </div>
      ),
    },
  ];
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4} alignItems="center" sx={{ px: 2 }}>
          <SubHeader text="Activity Logs" />
          <Grid
            item
            xs={12}
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
      {/* {editUser ? (
        <EditUser details={details} open={editUser} setOpen={setEditUser} />
      ) : null} */}
    </>
  );
};

export default ActivityLogs;
