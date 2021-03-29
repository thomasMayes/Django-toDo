import React from "react";
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

export const MostPopular = ({ data }) => {
  return (
    <ResponsiveContainer width='100%' height="100%">
      <BarChart
        data={data}
        margin={{
          top: 50,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          verticalFill={["#555555", "#444444"]}
          fillOpacity={0.2}
        />
        <XAxis dataKey="label" stroke={"#fff"} />
        <YAxis stroke={"#fff"} />
        <Tooltip cursor={{fill: '#c7c7c720'}}/>
        <Legend />
        <Bar dataKey="value" fill="#ffffff55" />
      </BarChart>
    </ResponsiveContainer>
  );
};
