import React, { useState, useEffect } from "react";
import { Paper, Typography } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Route from "../../../routes/Route";
import { calculateScoreAnalysis } from "../../../util/CommonUtil";

const data = [
  { name: "excel", value: 25 },
  { name: "good", value: 30 },
  { name: "average", value: 45 },
  { name: "faild", value: 12 },
];

const COLORS = ["#2AAF74", "#3081D0", "#EE7214", "#D3756B"];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = 25 + innerRadius + (outerRadius - innerRadius);
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(value * 100).toFixed(0)}%`}
    </text>
  );
};

export default function ScoreAnalysis() {
  const [scoreAnalysis, setScoreAnalysis] = useState([]);
  const token = localStorage.getItem("token");
  const fetchResults = async () => {
    const res = await Route("GET", "/results", token, null, null);
    if (res?.status === 200) {
      setScoreAnalysis(calculateScoreAnalysis(res?.data?.results));
    }
  };
  useEffect(() => {
    fetchResults();
  }, []);
  return (
    <Paper sx={{ width: "100%", height: 300, padding: 1 }}>
      <Typography variant="subtitle2" ml={3}>
        Score Analysis
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={scoreAnalysis}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            innerRadius={30}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{
              marginBottom: 25,
            }}
          />
          <Tooltip formatter={(value) => `${value}%`} />
        </PieChart>
      </ResponsiveContainer>
    </Paper>
  );
}
