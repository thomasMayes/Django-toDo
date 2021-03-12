import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { MyContext } from "../Provider";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  let state = useContext(MyContext);
  

  let token = localStorage.getItem('token')

  return (
    <Route
      {...rest}
      render={(props) => {
        if (state.isLoading) {
          return (<h4>loading</h4>)
        } else if( !token) {
          return (
            <Redirect
            to={{
              pathname: "/",
              state: props.location,
            }}
            />
            );
          }else{
            return (<Component {...props} />)

        }
      }}
    />
  );
};
