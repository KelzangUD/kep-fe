import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
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
import { calculateLatestTestResults } from "../../../util/CommonUtil";

const LastTestGraph = () => {
  const [latestResults, setLatestResults] = useState([]);
  const token = localStorage.getItem("token");
  const fetchLatestResults = async () => {
    const res = await Route("GET", "/results/latest", token, null, null);
    if (res?.status === 200) {
      setLatestResults(calculateLatestTestResults(res?.data?.results));
    }
  };
  useEffect(() => {
    fetchLatestResults();
  }, []);
  return (
    <Paper sx={{ width: "100%", height: 300, padding: 1 }}>
      <Typography variant="subtitle2" ml={3}>
        Last Test
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={latestResults}
          margin={{
            top: 10,
            right: 20,
            left: 20,
            bottom: 30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Bar dataKey="excel" fill="#2AAF74" />
          <Bar dataKey="good" fill="#3081D0" />
          <Bar dataKey="average" fill="#EE7214" />
          <Bar dataKey="failed" fill="#D3756B" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default LastTestGraph;
