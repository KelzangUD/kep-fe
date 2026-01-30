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
import { answersReportColumns } from "../../../util/CommonUtil";

const Answers = () => {
  const [answers, setAnswers] = useState([]);
  const token = localStorage.getItem("token");
  const fetchAnswers = async () => {
    const res = await Route("GET", "/results/answers", token, null, null);
    if (res?.status === 200) {
      setAnswers(res?.data?.answers);
    }
  };
  useEffect(() => {
    fetchAnswers();
  }, []);
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4} alignItems="center" sx={{ px: 2 }}>
          <SubHeader text="Answers" />
          <Grid item container alignItems="center" xs={12}>
            <div style={{ height: "auto", width: "100%" }}>
              <DataGrid
                rows={answers?.map((row, index) => ({
                  ...row,
                  sl: index + 1,
                }))}
                columns={answersReportColumns()}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                }}
                pageSizeOptions={[10, 20]}
                slots={{ toolbar: CustomToolbar }}
                rowHeight={45}
              />
            </div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Answers;
