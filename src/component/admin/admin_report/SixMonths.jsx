import React from "react";
import {
  Box,
  Paper,
  Grid,
  Button,
  InputBase,
  IconButton,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import SubHeader from "../../../common/SubHeader";
import { DataGrid } from "@mui/x-data-grid";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SearchIcon from "@mui/icons-material/Search";

const rows = [
  {
    id: 1,
    sl: 1,
    name: "Kelzang Ugyen Dorji",
    employeeID: "E00911",
    dec1: 90,
    dec2: 90,
    ccs: 4,
    pksl: 4,
  },
  {
    id: 2,
    sl: 2,
    name: "Pema Dorji",
    employeeID: "E00505",
    dec1: 90,
    dec2: 90,
    ccs: 4,
    pksl: 4,
  },
];

const SixMonths = () => {
  const userColumns = [
    { field: "sl", headerName: "Sl. No", width: 40 },
    { field: "name", headerName: "Name", width: 160 },
    { field: "employeeID", headerName: "Employee ID", width: 130 },
    { field: "dec1", headerName: "Dec Test-I", width: 100 },
    { field: "dec2", headerName: "Dec Test-II", width: 100 },
    { field: "ccs", headerName: "Customer Care & Service", width: 200 },
    {
      field: "pksl",
      headerName: "Product Knowledge & Self Learning",
      width: 250,
    },
  ];
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4} alignItems="center" sx={{ px: 2 }}>
          <SubHeader text="Six Months Report" />
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
            <Grid
              item
              con
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Grid item sx={{ mr: 2 }}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="select-label">Select</InputLabel>
                    <Select
                      labelId="select-label"
                      id="simple-select"
                      // value={age}
                      label="Select"
                      // onChange={handleChange}
                    >
                      <MenuItem value={1}>1st Half</MenuItem>
                      <MenuItem value={2}>2nd Half</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="success"
                  endIcon={<FileDownloadIcon />}
                >
                  Export
                </Button>
              </Grid>
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
    </>
  );
};

export default SixMonths;
