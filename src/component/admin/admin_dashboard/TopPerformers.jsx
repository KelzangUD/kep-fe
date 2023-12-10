import React from "react";
import {
  Grid,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const rows = [
  {
    id: 1,
    sl: 1,
    name: "Kelzang Ugyen Dorji",
    employeeID: "E00911",
    email: "sw_engineer3.sdu@tashicell.com",
    averageScore: 95,
  },
  {
    id: 2,
    sl: 2,
    name: "Pema Dorji",
    employeeID: "E00505",
    email: "sw_engineer1.sdu@tashicell.com",
    averageScore: 94,
  },
  {
    id: 3,
    sl: 3,
    name: "Sangay Wangdi Moktan",
    employeeID: "E00714",
    email: "sw_engineer2.sdu@tashicell.com",
    averageScore: 93,
  },
  {
    id: 4,
    sl: 4,
    name: "Tula Ram",
    employeeID: "E00883",
    email: "sw_engineer9.sdu@tashicell.com",
    averageScore: 92,
  },
  {
    id: 5,
    sl: 5,
    name: "Tshering Dhendup",
    employeeID: "E00875",
    email: "sw_engineer6.sdu@tashicell.com",
    averageScore: 91,
  },
];

const TopPerformers = () => {
  const userColumns = [
    { field: "sl", headerName: "Sl. No", width: 40 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "employeeID", headerName: "Employee ID", width: 160 },
    {
      field: "email",
      headerName: "Email",
      width: 300,
    },
    { field: "averageScore", headerName: "Average Score (%)", width: 160 },
  ];
  return (
    <>
      <Grid container spacing={4} alignItems="center" sx={{ px: 2 }}>
        <Grid item xs={12}>
          <Typography>Top Five Performers</Typography>
        </Grid>
        <Grid item xs={12}>
          <div style={{ height: "auto", width: "100%" }}>
            <DataGrid rows={rows} columns={userColumns}  />
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default TopPerformers;
