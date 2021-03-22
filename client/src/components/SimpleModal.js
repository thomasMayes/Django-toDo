import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import {
  MenuItem,
  Checkbox,
  ListItemText,
  FormControl,
} from "@material-ui/core";

import { MyContext } from "../Provider";
import CustomButton from "./CustomButton";
import API from "../utils/API";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal(props) {
  let { menuShow, setMenuShow, item } = props;
  const classes = useStyles();
  const [itemTopics, setTopics] = React.useState([...item.topics]);
  const state = useContext(MyContext);
 
  const addTopic = (topicId) => {
    let updatedTopicArray = [...itemTopics].map((n) => n.id).concat(topicId);
    API.addTopic(item.id, { topics: updatedTopicArray }).then((result) => {
      state.fetchPosts();
    });
  };

 

  return (
    <div>
      <Modal
        open={menuShow}
        onClose={() => setMenuShow(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
           <div style={ {
      top: `50%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
  }} className={classes.paper}>
      <FormControl>
        {state.allTopics.map((topic) => {
          if (itemTopics.map((currentTopic) => currentTopic.title).indexOf(topic.title) > -1) {
            return (
              <MenuItem key={topic.title} value={topic.title}>
                <Checkbox
                  onChange={(e) => {
                    console.log(e.target.checked);
                  }}
                  disabled={true}
                />
                <ListItemText primary={topic.title} />
              </MenuItem>
            );
          } else {
            return (
              <MenuItem
                key={topic.title}
                value={topic.title}
                onClick={() => addTopic(topic.id)}
              >
                <Checkbox
                  onChange={(e) => {
                    console.log(e.target.checked);
                  }}
                />
                <ListItemText primary={topic.title} />
                <button> add Topic</button>
              </MenuItem>
            );
          }
        
        })}
        <CustomButton>Save</CustomButton>
      </FormControl>
    </div>
      </Modal>
    </div>
  );
}
