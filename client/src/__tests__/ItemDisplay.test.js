import React from "react";
import { ItemDisplay } from "../components/ItemDisplay";
import { shallow, mount } from "enzyme";
import { MyContext } from "../Provider";
import { Card } from "@material-ui/core";
import { Todo } from "../components/Todo";

// pass in items = [ of posts ]

describe("<ItemDisplay/>", () => {
  it("should display all items passed in", () => {
    const items = [
      {
        title: "new post",
        description: "some description of some stuff",
        owner: {
          username: "bill",
          id: 4,
        },
        created_at: "2021-02-16T23:12:17.883752Z",
        topics: [],
        id: 2,
      },
      {
        title: "post two",
        description: "some description of some stuff",
        owner: {
          username: "guy",
          id: 3,
        },
        created_at: "2021-02-16T23:12:17.883752Z",
        topics: [],
        id: 2,
      },
    ];
    const component = mount(
      <MyContext.Provider
        value={{
          user: { firstname: "Alice", lastname: "Middleman" },
          topics: [],
        }}
      >
        <ItemDisplay items={items} />
      </MyContext.Provider>
    );

    expect(component.find(Todo)).toHaveLength(2);
    expect(Object.keys(component.find(Todo).at(0).props().item)).toHaveLength(
      Object.keys(items[0]).length
    );
  });
});
