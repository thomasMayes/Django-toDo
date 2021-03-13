import React, { useContext } from "react";
import {
  Grid,
  Typography,
  Card,
  CardHeader,
  IconButton,
  Avatar,
  CardActions,
  CardContent,
  Collapse,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ControlPoint from "@material-ui/icons/ControlPoint";
import clsx from "clsx";
import SimpleModal from "./SimpleModal";
import { MyContext } from "../Provider";
import {useHistory} from 'react-router-dom'

var moment = require("moment");
const useStyles = makeStyles((theme) => ({
  root: {
    //   width: 245,
    //   margin: 20
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  card: {
    background: "#212829",
    color: "#ccc",
  },
  topic: {
    color: "#161616",
    borderRadius: "50px",
    padding: "0 10px",
    marginLeft: "10px"
  },
  topicContainer: {
    display: "flex",
  },
  avatar: {
    background: "#127b6d",
  },
}));

export const Todo = ({ item }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [menuShow, setMenuShow] = React.useState(false);
  const { user } = useContext(MyContext);
const history = useHistory()
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };



  return (
    <Grid item xs={12} sm={12}>
      <Card className={classes.card}>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          avatar={
            <Avatar onClick ={()=>{
              history.push(`profile?id=${item.owner.id}`)
            }}aria-label="recipe" className={classes.avatar}>
              {item.owner.username[0].toUpperCase()}
            </Avatar>
          }
          title={item.title}
          subheader={moment(item.created_at).format(
            "dddd, MMMM Do YYYY, h:mm:ss a"
          )}
        />
        <div className={classes.topicContainer}>
          {item.topics.map((topic, index) => {
            return (
              <Typography
                key={index}
                className={classes.topic}
                style={{ background: topic.color }}
              >
                {topic.title}
              </Typography>
            );
          })}
          {item.owner.username == user.username && (
            <IconButton aria-label="settings" style={{ padding: 0 }}>
              <ControlPoint onClick={() => setMenuShow(true)} />
            </IconButton>
          )}
        </div>

        <SimpleModal
          menuShow={menuShow}
          setMenuShow={setMenuShow}
          item={item}
        />

        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography>{item.description}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
};
