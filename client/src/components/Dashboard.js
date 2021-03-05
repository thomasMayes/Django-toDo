import { useEffect, useState, useContext } from "react";

import {
  Input,
  TextField,
  Grid,
  Button,
  ButtonGroup,
  Typography,
} from "@material-ui/core";
import { ItemDisplay } from "./ItemDisplay";
import { AddItem} from './AddItem'
import {Header} from './Header'
import API from "../utils/API";
import { MyContext } from "../Provider";


export function Dashboard() {
  const {
    setTopics,
    fetchPosts,
    setPosts,
    posts
  } = useContext(MyContext)
  


  useEffect(() => {
   fetchPosts()

    API.getTopics().then((result) => {
      // console.log(result.data)
      setTopics(result.data);
    })
  }, []);

  

  return (
    <div className="dashboard">
      <Grid container align="center" justify='center' spacing={5 } className={'top-grid'}>
      <Header/>
        <ItemDisplay items={posts}/>
       <AddItem posts={posts} setPosts={setPosts}/>
      </Grid>
     
    </div>
  );
}


