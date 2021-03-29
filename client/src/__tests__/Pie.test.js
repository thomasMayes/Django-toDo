import React from "react";
import { ItemDisplay } from "../components/ItemDisplay";
import { shallow, mount } from "enzyme";
import { MyContext } from "../Provider";
import { PieCharts } from "../components/Pie";
import { Todo } from "../components/Todo";
import {
  Cell,
  PieChart,
  Pie
} from "recharts";



describe("<PieCharts/>", () => {
  it("should display Pie Chart displaying perctenges of users most used languages ", () => {
    const mockRepoData = [
      {
        label: "java",
        value: '50%',
      },
      {
        label: "ruby",
        value: "50%",
      },
    ];
    const component = shallow(<PieCharts data={mockRepoData} />);

    expect(component.find(PieChart)).toHaveLength(1);
    expect(Object.keys(component.find(Pie).props().data))
    .toHaveLength(Object.keys(mockRepoData).length)
    
  });
});
