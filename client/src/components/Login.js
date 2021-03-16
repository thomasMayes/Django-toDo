import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import API from "../utils/API";
import { MyContext } from "../Provider";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  container: {
    background: "#161616",
    height: "100vh",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  login: {
    background: "#ffffff11",
  },
}));

const Login = () => {
  let history = useHistory();

  let state = useContext(MyContext);

  let [password, updatePassword] = useState("");
  let [message, updateMessage] = useState("");
  let [email, updateEmail] = useState("");

  const classes = useStyles();

  const onSubmit = (e) => {
    e.preventDefault();

    API.login(email, password)
      .then((result) => {
        state.setToken(result.data.token);
        localStorage.setItem("token", result.data.token);
        state.updateUser(result.data.user);
        state.setIsAuthenticated(true);

        history.push("/dashboard");
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400) {
          updateMessage({
            message: "Login failed. Username or password not match",
            status: "error",
          });
        }
      });
  };

  return (
    <div className={classes.container}>
      <Container className={classes.login} component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {message && <Alert severity="error">{message.message}</Alert>}
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="User Name"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => updateEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => updatePassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onSubmit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>{state.isAuthenticated && <h1>"G@G!"</h1>}</Box>
      </Container>
    </div>
  );
};
export default Login;
