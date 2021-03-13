import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";


const COLORS = ["#1f46a055", "#00C49F55", "#e4982155", "#FF8042aa"];

const RADIAN = Math.PI / 180;

// creat file to hold this +++++++++++++++++++++++++++++++++++++++
const renderCustomizedLabel = (props) => {
  let {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
    label,
  } = props;

  const radius = innerRadius + (outerRadius - innerRadius) *1.3
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${label} ${(percent * 100).toFixed(0)}%`}
      {/* {`${label}`} */}
    </text>
  );
};
// =++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

export const PieCharts = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={600} height={600}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};
