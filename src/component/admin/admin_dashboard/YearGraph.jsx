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
  ResponsiveContainer,
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
    const res = await Route(
      "GET",
      `/results/yearly_result/${year}`,
      token,
      null,
      null
    );
    if (res?.status === 200) {
      setYearlyData(res?.data?.results);
    }
  };
  useEffect(() => {
    fetchYearlyData();
  }, [year]);
  return (
    <Paper sx={{ width: "100%", height: 400, padding: 1 }}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="subtitle2" ml={3}>
            One Year Report
          </Typography>
        </Grid>
        <Grid item mr={1}>
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
              <MenuItem value={2025}>2025</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={yearlyData}
          margin={{
            top: 10,
            right: 10,
            bottom: 40,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{
              marginBottom: 10,
            }}
          />
          <Bar dataKey="excel" fill="#2AAF74" />
          <Bar dataKey="good" fill="#3081D0" />
          <Bar dataKey="average" fill="#EE7214" />
          <Bar dataKey="failed" fill="#D3756B" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default YearGraph;
