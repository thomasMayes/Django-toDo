import { Grid } from "@material-ui/core";
import { Todo } from "./Todo";

export const ItemDisplay = ({ items }) => {
  return (
    <Grid
      container
      item
      xs={6}
      align="center"
      spacing={2}
      style={{
        height: 500,
        overflowY: "scroll",
        padding: 30,
        // background: 'url(./dial.jpg)',
        boxShadow: "inset 0px 0px 10px #161616",
        margin: 20,
      }}
    >
      {items.map((n, i) => {
        return <Todo item={n} key ={i} />;
      })}
    </Grid>
  );
};
