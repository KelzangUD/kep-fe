import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
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
} from "recharts";
import Route from "../../../routes/Route";

const YearGraph = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [yearlyData, setYearlyData] = useState([]);
  const yearHandle = (e) => {
    setYear(e.target.value);
  };
  const token = localStorage.getItem("token");
  const fetchYearlyData = async () => {
    const res = await Route("GET", `/results/yearly_result/${year}`, token, null, null);
    if (res?.status === 200) {
      setYearlyData(res?.data?.results);
    };
  };
  useEffect(() => {
    fetchYearlyData();
  }, [year]);
  return (
    <Paper sx={{ padding: 1 }}>
      <Typography variant="subtitle1">One Year Report</Typography>
      <Grid item xs={12}>
        <Grid sx={{ display: "flex", justifyContent: "flex-end", py: "8px" }}>
          <Box>
            <FormControl size="small">
              <InputLabel id="demo-simple-select-label">Year</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={year}
                label="Year"
                onChange={yearHandle}
              >
                <MenuItem value={2023}>2023</MenuItem>
                <MenuItem value={2024}>2024</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Box sx={{ display: "flex", alignItems: "left" }}>
          <Box>
            <BarChart
              width={970}
              height={300}
              data={yearlyData}
              margin={{
                top: 5,
                bottom: 5,
                left: -30
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="excel" fill="#2AAF74" />
              <Bar dataKey="good" fill="#3081D0" />
              <Bar dataKey="average" fill="#EE7214" />
              <Bar dataKey="failed" fill="#D3756B" />
            </BarChart>
          </Box>
        </Box>
      </Grid>
    </Paper>
  );
};

export default YearGraph;
