import React, { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import SubHeader from "../../../common/SubHeader";
import { DataGrid } from "@mui/x-data-grid";
import Route from "../../../routes/Route";

const rows = [
  {
    id: 1,
    sl: 1,
    title: "Excel",
    range: "90-100",
    min: 90,
    max: 100,
  },
  {
    id: 2,
    sl: 2,
    title: "Good",
    range: "70-89",
    min: 70,
    max: 89,
  },
  {
    id: 3,
    sl: 3,
    title: "Average",
    range: "50-69",
    min: 50,
    max: 69,
  },
  {
    id: 4,
    sl: 4,
    title: "Failed",
    range: "0-49",
    min: 0,
    max: 49,
  },
];

const Grades = () => {
  // init states
  const [grades, setGrades] = useState([]);

  const token = localStorage.getItem("token");
  const fetchGrades = async () => {
    const res = await Route("GET", "/grades", token, null);
    if (res?.status === 200) {
      setGrades(
        res?.data?.grades?.map((item, index) => ({
          sl: index + 1,
          title: item?.title,
          range: `${item?.min}-${item?.max}`,
        }))
      );
    }
  };
  useEffect(() => {
    fetchGrades();
  }, []);
  const userColumns = [
    {
      field: "sl",
      headerName: "Sl. No",
      flex: 40,
    },
    { field: "title", headerName: "Title", flex: 200 },
    { field: "range", headerName: "Range", flex: 200 },
  ];

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4} alignItems="center" sx={{ px: 2 }}>
          <SubHeader text="Grades" />
          <Grid item container alignItems="center" xs={12}>
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
    </>
  );
};

export default Grades;
