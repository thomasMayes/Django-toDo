import React from "react";
import { shallow, mount } from "enzyme";
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

import { MyContext } from "../Provider";
import { MostPopular } from "../components/charts/Barchart";
import { Todo } from "../components/Todo";
import { ItemDisplay } from "../components/ItemDisplay";
// pass in items = [ of posts ]

describe("<Most Popular/>", () => {
  it("should display bar graph displaying users most stared repos", () => {
    const mockRepoData = [
      {
        label: "repo#1",
        value: 100,
      },
      {
        label: "repo#2",
        value: 200,
      },
    ];
    const component = shallow(<MostPopular data={mockRepoData} />);

    expect(component.find(BarChart)).toHaveLength(1);
    // console.log(component.find(Bar))
     expect(Object.keys(component.find(BarChart).at(0).props().data))
     .toHaveLength(Object.keys(mockRepoData).length)
    
  });
});
