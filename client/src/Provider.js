import React from "react";
import { useState } from "react";
import API from "./utils/API";
import { useHistory } from "react-router-dom";

export const MyContext = React.createContext();

export const MyProvider = (props) => {
  const defaultUserState = {
    name: "",
  };
  const {getPosts, getCurrentUser} = API
  const [user, updateUser] = useState(defaultUserState);
  const [items, updateItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [allTopics, setAllTopics] = useState([]);
  const [posts, setPosts] = useState([]);
  const history = useHistory();

  const tokenConfig = () => {
    let checkToken = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (checkToken) {
      config.headers["Authorization"] = `Token ${checkToken}`;
    }
    return config;
  };

  const loadUser = () => {
    getCurrentUser(tokenConfig())
      .then((result) => {
        setIsAuthenticated(true);
        updateUser(result.data);
        history.push("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const removeToken = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const fetchPosts = () => {
    getPosts()
      .then((result) => {
        setPosts(result.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <MyContext.Provider
      value={{
        user,
        updateUser,
        items,
        updateItems,
        isLoading,
        setIsLoading,
        isAuthenticated,
        setIsAuthenticated,
        loadUser,
        token,
        setToken,
        removeToken,
        tokenConfig,
        allTopics,
        setAllTopics,
        posts,
        setPosts,
        fetchPosts,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};
