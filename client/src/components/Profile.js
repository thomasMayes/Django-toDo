import React, { useState, useEffect } from "react";
import mockUser from "../mockData.js/mockUser";
import mockRepos from "../mockData.js/mockRepos";
import mockFollowers from "../mockData.js/mockFollowers";
import mockEvents from "../mockData.js/mockEvents";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Grid, Typography, Avatar } from "@material-ui/core";
import { PieCharts } from "./Pie";
import {MostPopular} from './charts/Barchart'

const rootUrl = "https://api.github.com";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ show: false, msg: "" });
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  const [githubUser, setGithubUser] = useState(mockUser);
  const [events, setEvents] = useState(mockEvents)
  let query = useQuery();

  useEffect(() => {
    let requestedUser = query.get("name");
    if (requestedUser) {
      searchGithubUser(requestedUser);
    }
  }, []);

  function toggleError(show = false, msg = "") {
    setError({ show, msg });
  }

  //   ======================== FETCH GitHub UserINfo==================================

  const searchGithubUser = async (user) => {
    toggleError();
    setLoading(true);
    const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err)
    );
    if (response) {
      setGithubUser(response.data);
      const { login, followers_url } = response.data;

      await Promise.allSettled([
        axios(`${rootUrl}/users/${login}/repos?per_page=100`),
        axios(`${followers_url}?per_page=100`),
        axios(`${rootUrl}/users/${login}/events`),
      ])
        .then((results) => {
          const [repos, followers, events] = results;
          const status = "fulfilled";
          if (repos.status === status) {
            setRepos(repos.value.data);
          }
          if (followers.status === status) {
            setFollowers(followers.value.data);
          }
          if (events.status === status) {  
            setEvents(events.value.data);
//             console.log(events.value.data.reduce((a, v)=> {


//               // if(v.type === "PushEvent"){
// // // result.concat(...event.payload.commits.filter(commit=> commit.author.name === githubUser.name))
// // result.push('1')
// // return a.concat(...v.payload.commits)
// //}
// return a.push('1')
// }, []))
console.log(
  events.value.data
  // .map(n=> n.actor.login)
  .reduce((a,b)=> {
    if(b.type === "PushEvent"){
    a.push(...b.payload.commits.reduce((result, commit)=>{
      if(commit.author.name=== githubUser.login){
        result.push({...commit, created_at: b.created_at})
      }
    return result 
    },[]))
    }
    return a

}, [])

) 





}
        })
        .catch((err) => console.log(err));
    } else {
      toggleError(true, "there is no user with that username");
    }

    setLoading(false);
  };

  //==============================================================
  // reduce repo arr to object with language keys holding that language count and stars  

  // extract from here 

  const languages = repos.reduce((total, item) => {
    const { language, stargazers_count } = item;
    if (!language) return total;
    if (!total[language]) {
      total[language] = { label: language, value: 1, stars: stargazers_count };
    } else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count,
      };
    }
    return total;
  }, {});

  const mostUsed = Object.values(languages)
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5);


    let { stars, forks } = repos.reduce(
      (total, item) => {
        const { stargazers_count, name, forks } = item;
        total.stars[stargazers_count] = { label: name, value: stargazers_count };
        total.forks[forks] = { label: name, value: forks };
        return total;
      },
      {
        stars: {},
        forks: {},
      }
    );
  
    stars = Object.values(stars).slice(-5).reverse();
    forks = Object.values(forks).slice(-5).reverse();
  


console.log(events)






  if (loading) {
    return <h1>LOADING....</h1>;
  } else {
    return (
      <Grid container align="center" justify="center">
        <Grid item xs={12} style={{background: '#c7c7c7'}}>
  <Typography component="h1" variant="h5">
          <Avatar alt="Cindy Baker" src={githubUser.avatar_url} 
          style={{height: 200, width: 200}}
          />
          {githubUser.login}
        </Typography>
        </Grid>
      

        <Grid
          item
          container
          align="center"
          justify="center"
          sm={4}
          style={{ height: 200 , border: '1px dashed #00FF0022'}}
        >
          <PieCharts data={mostUsed} />
        </Grid>
        {/* <Grid
          item
          container
          align="center"
          justify="center"
          sm={4}
          style={{ height: 200 , border: '1px dashed red'}}
        >
          <PieCharts data={mostUsed} />
        </Grid> */}
        <Grid
          item
          container
          align="center"
          justify="center"
          sm={8}
          style={{ height: 400 , border: '1px dashed red'}}
        >
     <MostPopular data={stars}/>
        </Grid>

        <Grid
          item
          container
          align="center"
          justify="center"
          sm={12}
          style={{ border: '1px dashed yellow'}}
        >
          <Grid
          item
          container
          align="center"
          justify="center"
          sm={6}
          style={{ height: 200 , border: '1px dashed blue'}}
        >

<Typography component="h1" variant="h5">
          users recent posts go here
        </Typography>


        
        </Grid>
         


        </Grid>
      </Grid>
    );
  }
};
