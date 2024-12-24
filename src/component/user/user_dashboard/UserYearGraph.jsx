import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Paper,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Route from "../../../routes/Route";
import {
  filterDataBasedOnYear,
  userYearGraphData,
} from "../../../util/CommonUtil";

const UserYearGraph = () => {
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [data, setData] = useState([]);
  const [yearData, setYearData] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const fetchYearlyData = async () => {
    const res = await Route("GET", `/results/${user?.id}`, token, null, null);
    if (res?.status === 200) {
      setData(res?.data?.results);
    }
  };
  const yearHandle = (e) => {
    setYear(e.target.value);
  };
  useEffect(() => {
    fetchYearlyData();
  }, []);
  useEffect(() => {
    setYearData(userYearGraphData(filterDataBasedOnYear(data, year)));
  }, [data, year]);
  return (
    <>
      <Paper sx={{ width: "100%", height: 300, padding: 1 }}>
        <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="subtitle2" ml={3}>
            One Year Graph
          </Typography>
          <FormControl size="small">
            <InputLabel id="demo-simple-select-label">Year</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={year}
              label="Year"
              onChange={yearHandle}
            >
              <MenuItem value={"2023"}>2023</MenuItem>
              <MenuItem value={"2024"}>2024</MenuItem>
              <MenuItem value={"2025"}>2025</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={yearData}
            margin={{
              top: 10,
              right: 10,
              left: 10,
              bottom: 50,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <XAxis dataKey="name" />
            <YAxis />
            <Legend />
            <Bar dataKey="score" fill="#3081D0" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </>
  );
};

export default UserYearGraph;
