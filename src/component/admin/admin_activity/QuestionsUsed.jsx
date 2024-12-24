import React, { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import SubHeader from "../../../common/SubHeader";
import { DataGrid } from "@mui/x-data-grid";
import CustomToolbar from "../../../ui/CustomToolBar";
import Route from "../../../routes/Route";
import { useCommon } from "../../../contexts/CommonContext";

const QuestionsUsed = () => {
  const { isMdUp } = useCommon();
  const [questions, setQuestions] = useState([]);

  const userColumns = [
    {
      field: "sl",
      headerName: "Sl. No",
      flex: isMdUp ? 40 : undefined,
      width: isMdUp ? undefined : 40,
    },
    {
      field: "question",
      headerName: "Question",
      flex: isMdUp ? 650 : undefined,
      width: isMdUp ? undefined : 650,
    },
    {
      field: "point",
      headerName: "Point",
      flex: isMdUp ? 60 : undefined,
      width: isMdUp ? undefined : 102,
    },
    {
      field: "type",
      headerName: "Question Type",
      flex: isMdUp ? 200 : undefined,
      width: isMdUp ? undefined : 200,
      valueGetter: (params) => params.row.QuestionType?.title || "N/A",
    },
  ];

  const token = localStorage.getItem("token");
  const fetchQuestions = async () => {
    const res = await Route("GET", "/questions/used", token, null, null);
    if (res?.status === 200) {
      setQuestions(res?.data?.questions);
    }
  };
  useEffect(() => {
    fetchQuestions();
  }, []);
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4} alignItems="center" sx={{ px: 2 }}>
          <SubHeader text="Questions Used" />
          <Grid item container alignItems="center" xs={12}>
            <div style={{ height: "auto", width: "100%" }}>
              <DataGrid
                rows={questions?.map((row, index) => ({
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
                slots={{ toolbar: CustomToolbar }}
              />
            </div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default QuestionsUsed;
