import React, { useState } from "react";
import { Grid, Box, Paper, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const data = [
  { name: "excel", value: 25 },
  { name: "good", value: 30 },
  { name: "average", value: 45 },
  { name: "faild", value: 12 },
];

const COLORS = ["#2AAF74","#3081D0", "#EE7214", "#D3756B"];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
  index,
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
  const [year, setYear] = useState("");

  const yearHandle = (event) => {
    setYear(event.target.value);
  };

  return (
    <>
      <Typography>Score Analysis</Typography>
      <Grid>
        <PieChart width={450} height={300}>
          <Pie
            data={data}
            cx={200}
            cy={140}
            labelLine={false}
            label={renderCustomizedLabel}
            innerRadius={60}
            outerRadius={120}
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
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend />
        </PieChart>
      </Grid>
    </>
  );
}
