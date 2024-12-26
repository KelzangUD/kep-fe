import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import SubHeader from "../../../common/SubHeader";
import { DataGrid } from "@mui/x-data-grid";
import CustomToolbar from "../../../ui/CustomToolBar";
import Route from "../../../routes/Route";
import {
  filterDataBasedOnYear,
  getUniqueTestNames,
  reportColumns,
  yearlyReport,
} from "../../../util/CommonUtil";
import { useCommon } from "../../../contexts/CommonContext";

const OneYear = () => {
  const { isMdUp } = useCommon();
  const [results, setResults] = useState([]);
  const [users, setUsers] = useState([]);
  const [columns, setColumns] = useState([]);
  const [yearlyData, setYearlyData] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const token = localStorage.getItem("token");
  const fetchResults = async () => {
    const res = await Route("GET", "/results", token, null, null);
    if (res?.status === 200) {
      setResults(res?.data?.results);
    }
  };
  const fetchUsers = async () => {
    const res = await Route("GET", "/users", token, null, null);
    if (res?.status === 200) {
      setUsers(res?.data?.users);
    }
  };
  useEffect(() => {
    fetchResults();
    fetchUsers();
  }, []);
  const filterBasedOnYear = () => {
    setYearlyData(filterDataBasedOnYear(results, year.toString()));
  };
  const yearHandle = (e) => {
    setYear(e.target.value);
  };
  useEffect(() => {
    filterBasedOnYear();
  }, [results, year]);
  useEffect(() => {
    setColumns(reportColumns(getUniqueTestNames(yearlyData), isMdUp));
    setReportData(yearlyReport(yearlyData, users));
  }, [yearlyData]);
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4} alignItems="center" sx={{ px: 2 }}>
          <SubHeader text="One Year Report" />
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <FormControl size="small" sx={{ width: { xs: "100%", md: 120 } }}>
              <InputLabel id="select-label">Select</InputLabel>
              <Select
                labelId="select-label"
                id="simple-select"
                defaultValue={new Date().getFullYear()}
                label="Select"
                onChange={yearHandle}
              >
                <MenuItem value={2023}>2023</MenuItem>
                <MenuItem value={2024}>2024</MenuItem>
                <MenuItem value={2025}>2025</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item container alignItems="center" xs={12}>
            <div style={{ height: "auto", width: "100%" }}>
              <DataGrid
                rows={reportData?.map((row, index) => ({
                  ...row,
                  sl: index + 1,
                }))}
                columns={columns}
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

export default OneYear;
