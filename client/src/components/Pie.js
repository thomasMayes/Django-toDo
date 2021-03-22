import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

import {RenderCustomizedLabel} from './RenderCustomizedLabel'

const COLORS = ["#1f46a055", "#00C49F55", "#e4982155", "#FF8042aa"];

export const PieCharts = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={600} height={600}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          label={RenderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};
