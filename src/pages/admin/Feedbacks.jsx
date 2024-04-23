import React, { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import SubHeader from "../../common/SubHeader";
import { DataGrid } from "@mui/x-data-grid";
import Route from "../../routes/Route";

const Feedbacks = () => {
    // init states
    const [feedbacks, setFeedbacks] = useState([]);

    const token = localStorage.getItem("token");
    const fetchFeedbacks = async () => {
      const res = await Route("GET", "/feedbacks/get", token, null, null);
      if (res?.status === 200) {
        setFeedbacks(res?.data?.feedbacks);
      }
    };
    useEffect(() => {
        fetchFeedbacks();
    }, []);
    const userColumns = [
        {
          field: "sl",
          headerName: "Sl. No",
          width: 40,
          valueGetter: (params) => params.row.sl,
        },
        { field: "message", headerName: "Message", width: 500 },
      ];
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={4} alignItems="center" sx={{ px: 2 }}>
        <SubHeader text="Feedbacks" />
        <Grid item container alignItems="center" sx={{ px: 2 }} xs={12}>
            <div style={{ height: "auto", width: "100%" }}>
              <DataGrid
                rows={feedbacks?.map((row, index) => ({
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
  );
};

export default Feedbacks;
