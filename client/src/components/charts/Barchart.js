import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const MostPopular = ({ data }) => {
  console.log(data);

  return (
    <ResponsiveContainer width={500} height="100%">
      <BarChart
        // width={500}
        // height={1500}
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
          stroke={"#000000"}
        />
        <XAxis dataKey="label" stroke={"#000000"} />
        <YAxis stroke={"#000000"} />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#ffffff55" />
      </BarChart>
    </ResponsiveContainer>
  );
};
