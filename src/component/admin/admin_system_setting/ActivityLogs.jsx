import React, { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import SubHeader from "../../../common/SubHeader";
import { DataGrid } from "@mui/x-data-grid";
import CustomToolbar from "../../../ui/CustomToolBar";
import Route from "../../../routes/Route";
import { useCommon } from "../../../contexts/CommonContext";

const ActivityLogs = () => {
  const { isMdUp } = useCommon();
  const [data, setData] = useState([]);
  const userColumns = [
    {
      field: "sl",
      headerName: "Sl.No",
      flex: isMdUp ? 40 : undefined,
      width: isMdUp ? undefined : 40,
    },
    {
      field: "username",
      headerName: "Name",
      flex: isMdUp ? 260 : undefined,
      width: isMdUp ? undefined : 260,
    },
    {
      field: "description",
      headerName: "Description",
      flex: isMdUp ? 400 : undefined,
      width: isMdUp ? undefined : 400,
    },
    {
      field: "date_time",
      headerName: "Date and Time",
      flex: isMdUp ? 200 : undefined,
      width: isMdUp ? undefined : 200,
    },
  ];

  const token = localStorage.getItem("token");
  const fetchActivityLogs = async () => {
    const res = await Route("GET", "/activity-logs", token, null, null);
    if (res?.status === 200) {
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
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4} alignItems="center" sx={{ px: 2 }}>
          <SubHeader text="Activity Logs" />
          <Grid item container alignItems="center" xs={12}>
            <div style={{ height: "auto", width: "100%" }}>
              <DataGrid
                rows={data}
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
    </>
  );
};

export default ActivityLogs;
