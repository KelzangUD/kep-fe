import React from "react";
import { Box, Container, Typography, Grid, Card } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "July Test",
    excel: 40,
    good: 14,
    average: 24,
    failed: 10,
  },
  {
    name: "Aug Test",
    excel: 40,
    good: 14,
    average: 24,
    failed: 10,
  },
  {
    name: "Sept Test",
    excel: 40,
    good: 14,
    average: 24,
    failed: 10,
  },
  {
    name: "Oct Test",
    excel: 40,
    good: 14,
    average: 24,
    failed: 10,
  },
  {
    name: "Nov Test",
    excel: 40,
    good: 14,
    average: 24,
    failed: 10,
  },
  {
    name: "Dec Test",
    excel: 40,
    good: 14,
    average: 24,
    failed: 10,
  },
  {
    name: "July Test",
    excel: 40,
    good: 14,
    average: 24,
    failed: 10,
  },
  {
    name: "Aug Test",
    excel: 40,
    good: 14,
    average: 24,
    failed: 10,
  },
  {
    name: "Sept Test",
    excel: 40,
    good: 14,
    average: 24,
    failed: 10,
  },
  {
    name: "Oct Test",
    excel: 40,
    good: 14,
    average: 24,
    failed: 10,
  },
  {
    name: "Nov Test",
    excel: 40,
    good: 14,
    average: 24,
    failed: 10,
  },
  {
    name: "Dec Test",
    excel: 40,
    good: 14,
    average: 24,
    failed: 10,
  },
];

const YearGraph = () => {
  return (
    <Box>
      <Typography variant="subtitle1">One Year Report</Typography>
      <Grid item xs={12}>
        <Box sx={{ display: "flex", alignItems: "left" }}>
          <Box>
            <BarChart
              width={1140}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: -20,
                bottom: 5,
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
    </Box>
  );
};

export default YearGraph;
