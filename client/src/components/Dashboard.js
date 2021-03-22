import { useEffect, useContext } from "react";
import {
  Grid,
} from "@material-ui/core";

import { MyContext } from "../Provider";
import API from "../utils/API";
import { ItemDisplay } from "./ItemDisplay";
import { AddItem} from './AddItem'
import {Header} from './Header'

export function Dashboard() {
  const {
    setAllTopics,
    fetchPosts,
    setPosts,
    posts
  } = useContext(MyContext)
  
  useEffect(() => {
   fetchPosts()
    API.getTopics().then((result) => {
      setAllTopics(result.data);
    })
  }, []);

  return (
    <div className="dashboard">
      <Grid container align="center" justify='center' spacing={5 } className={'top-grid'}>
      <Header />
        <ItemDisplay items={posts} />
        <AddItem posts={posts} setPosts={setPosts} />
      </Grid>
    </div>
  );
}
