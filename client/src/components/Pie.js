import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

// const data = [
//   { name: 'Group A', value: 400 },
//   { name: 'Group B', value: 300 },
//   { name: 'Group C', value: 300 },
//   { name: 'Group D', value: 200 },
// ];

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
    label
  } = props

  console.log(props)
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
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
      {/* {`${label +(percent * 100).toFixed(0)}%`} */}
      {`${label}`}
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
          // labelLine={true}
          // label={(d)=> d}
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
      {/* <PieChart width={730} height={250}>
  <Pie data={data} label={'label'} dataKey="value" nameKey="label" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />

</PieChart> */}
    </ResponsiveContainer>
  );
};
