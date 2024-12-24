import React, { useState, useEffect } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Route from "../../../routes/Route";

const TopPerformers = () => {
  const [topPerformersData, setTopPerformarsData] = useState([]);
  const token = localStorage.getItem("token");
  const fetchTopPerformers = async () => {
    const res = await Route(
      "GET",
      "/results/top_performers",
      token,
      null,
      null
    );
    if (res?.status === 200) {
      setTopPerformarsData(res?.data?.results);
    }
  };
  useEffect(() => {
    fetchTopPerformers();
  }, []);
  return (
    <Paper sx={{ width: "100%", padding: 1 }}>
      <Typography variant="subtitle2">Top Five Performers</Typography>
      <TableContainer
        sx={{
          width: "100%",
          overflowX: "auto", // Enable horizontal scrolling
        }}
      >
        <Table sx={{ width: "100%" }} aria-label="top-performers" responsive>
          <TableHead>
            <TableRow>
              <TableCell>Sl.No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Employee ID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">Average Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topPerformersData?.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.employeeID}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell align="right">{row.averageScore}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TopPerformers;
