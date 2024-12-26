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
  filterDataBasedOnYearAndHalf,
  getUniqueTestNames,
  reportColumns,
  yearlyReport,
} from "../../../util/CommonUtil";
import { useCommon } from "../../../contexts/CommonContext";

const SixMonths = () => {
  const { isMdUp } = useCommon();
  const [results, setResults] = useState([]);
  const [columns, setColumns] = useState([]);
  const [halfYearData, setHalfYearData] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [users, setUsers] = useState([]);
  const [half, setHalf] = useState("first");
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
  const filterBasedOnHalf = () => {
    setHalfYearData(
      filterDataBasedOnYearAndHalf(results, new Date().getFullYear(), half)
    );
  };
  const halfHandle = (e) => {
    setHalf(e.target.value);
  };
  useEffect(() => {
    filterBasedOnHalf();
  }, [results, half]);
  useEffect(() => {
    setColumns(reportColumns(getUniqueTestNames(halfYearData), isMdUp));
    setReportData(yearlyReport(halfYearData, users));
  }, [halfYearData]);
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4} alignItems="center" sx={{ px: 2 }}>
          <SubHeader text="Six Months Report" />
          <Grid
            item
            container
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
                defaultValue={"first"}
                label="Select"
                onChange={halfHandle}
              >
                <MenuItem value={"first"}>1st Half</MenuItem>
                <MenuItem value={"second"}>2nd Half</MenuItem>
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

export default SixMonths;
