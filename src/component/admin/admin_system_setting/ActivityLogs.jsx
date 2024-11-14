import React, { useState, useEffect } from "react";
import { Box, Paper, Grid, InputBase, IconButton } from "@mui/material";
import SubHeader from "../../../common/SubHeader";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import Route from "../../../routes/Route";

const ActivityLogs = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const userColumns = [
    { field: "sl", headerName: "Sl. No", width: 40 },
    { field: "username", headerName: "Name", width: 260 },
    {
      field: "description",
      headerName: "Description",
      width: 400,
    },
    { field: "date_time", headerName: "Date and Time", width: 200 },
  ];
  const searchHandle = (e) => {
    setSearchQuery(e.target.value?.toLowerCase() || "");
  };
  const token = localStorage.getItem("token");
  const fetchActivityLogs = async () => {
    const res = await Route("GET", "/activity-logs", token, null, null);
    if (res?.status === 200) {
      console.log(res?.data?.activityLogs)
      setData(
        res?.data?.activityLogs?.map((item, index) => ({
          id: item?.id,
          sl: index + 1,
          username: `${item?.User?.name} (${item?.User?.empId})`,
          description: item?.description,
          date_time: item?.date_time,
        }))
      );
    }
  };
  useEffect(() => {
    fetchActivityLogs();
  }, []);
  const filteredData = data.filter((item) =>
    (item?.username?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  );
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4} alignItems="center" sx={{ px: 2 }}>
          <SubHeader text="Activity Logs" />
          <Grid item xs={12}>
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
          </Grid>
          <Grid item container alignItems="center" sx={{ px: 2 }} xs={12}>
            <div style={{ height: "auto", width: "100%" }}>
              <DataGrid
                rows={filteredData}
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
    </>
  );
};

export default ActivityLogs;
