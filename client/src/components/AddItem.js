import { useState, useContext } from "react";
import { TextField, Grid } from "@material-ui/core";
import API from "../utils/API";
import CusButton from "./CustomButton";
import { MyContext } from "../Provider";

export const AddItem = ({ setPosts, posts }) => {
  let state = useContext(MyContext);
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [topics, setTopics] = useState([]);

  const addTask = () => {
    API.addPost(
      { title, description, topics },
      state.tokenConfig()
    ).then((result) => setPosts([...posts].concat(result.data)));
  };

  return (
    <Grid
      container
      item
      xs={12}
      spacing={4}
      align="center"
      style={{ background: "#0a1e25aa" }}
    >
      <Grid item xs={12} align="center">
        <TextField
          id="outlined-secondary"
          label="Title"
          variant="outlined"
          color="primary"
          onChange={(e) => setTitle(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} align="center">
        <TextField
          id="outlined-secondary"
          label="Description"
          variant="outlined"
          color="primary"
          onChange={(e) => setDescription(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} align="center">
        <CusButton onClick={() => addTask()}>Add Post</CusButton>
      </Grid>
    </Grid>
  );
};
