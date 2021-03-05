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

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

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
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [topics, setTopics] = React.useState([...item.topics]);
  const state = useContext(MyContext);
 
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addTopic = (topicId) => {
    let updatedTopicArray = [...topics].map((n) => n.id).concat(topicId);
    API.addTopic(item.id, { topics: updatedTopicArray }).then((result) => {
      state.fetchPosts();
    });
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <FormControl>
        {state.topics.map((topic) => {
          if (topics.map((n) => n.title).indexOf(topic.title) > -1) {
            return (
              <MenuItem key={topic.title} value={topic.title}>
                <Checkbox
                  //    checked={true}
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
                  //   checked={topics.indexOf(topic.title) > -1}
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
  );

  return (
    <div>
      <Modal
        open={menuShow}
        onClose={() => setMenuShow(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
