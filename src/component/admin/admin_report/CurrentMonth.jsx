import React, { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import SubHeader from "../../../common/SubHeader";
import { DataGrid } from "@mui/x-data-grid";
import CustomToolbar from "../../../ui/CustomToolBar";
import Route from "../../../routes/Route";
import {
  filterDataBasedOnCurrentYearAndMonth,
  getUniqueTestNames,
  reportColumns,
  yearlyReport,
} from "../../../util/CommonUtil";
import { useCommon } from "../../../contexts/CommonContext";

const CurrentMonth = () => {
  const { isMdUp } = useCommon();
  const [results, setResults] = useState([]);
  const [columns, setColumns] = useState([]);
  const [currentMonthData, setCurrentMonthData] = useState([]);
  const [reportData, setReportData] = useState([]);
  const token = localStorage.getItem("token");
  const fetchResults = async () => {
    const res = await Route("GET", "/results", token, null, null);
    if (res?.status === 200) {
      setResults(res?.data?.results);
    }
  };
  useEffect(() => {
    fetchResults();
  }, []);
  const filterBasedOnHalf = () => {
    setCurrentMonthData(filterDataBasedOnCurrentYearAndMonth(results));
  };
  useEffect(() => {
    filterBasedOnHalf();
  }, [results]);
  useEffect(() => {
    setColumns(reportColumns(getUniqueTestNames(currentMonthData), isMdUp));
    setReportData(yearlyReport(currentMonthData));
  }, [currentMonthData]);
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4} alignItems="center" sx={{ px: 2 }}>
          <SubHeader text="Current Month Report" />
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

export default CurrentMonth;
