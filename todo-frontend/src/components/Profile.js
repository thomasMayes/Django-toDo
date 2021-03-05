import React, { useState, useEffect } from "react";
import mockUser from "../mockData.js/mockUser";
import mockRepos from "../mockData.js/mockRepos";
import mockFollowers from "../mockData.js/mockFollowers";
import axios from "axios";
import { useLocation } from "react-router-dom";
import {
    Input,
    TextField,
    Grid,
    Button,
    ButtonGroup,
    Typography,
    Avatar
  } from "@material-ui/core";
  import {PieCharts} from './Pie'

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
      ])
        .then((results) => {
          const [repos, followers] = results;
          const status = "fulfilled";
          if (repos.status === status) {
            setRepos(repos.value.data);
          }
          if (followers.status === status) {
            setFollowers(followers.value.data);
          }
        })
        .catch((err) => console.log(err));
    } else {
      toggleError(true, "there is no user with that username");
    }

    setLoading(false);
  };

//==============================================================

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

console.log(mostUsed)
  if (loading) {
    return <h1>LOADING....</h1>;
  } else {
    return (
        <Grid container align="center" justify='center' >

        <Typography component="h1" variant="h5">
        <Avatar alt="Cindy Baker" src={githubUser.avatar_url} />
        {githubUser.login}

</Typography>

<Grid item container align="center" justify='center' style={{height: 200 }}>


  <PieCharts data={mostUsed}/>

</Grid>


      </Grid>
    );
  }
};
