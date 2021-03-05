import { useContext } from "react";
import { MyContext } from "../Provider";
import { useHistory } from "react-router-dom";
import { Grid, Typography, Button } from "@material-ui/core";
import API from "../utils/API";
import CusButton from './CustomButton'

export const Header = () => {
  let history = useHistory();
  let { tokenConfig, setIsAuthenticated, removeToken } = useContext(MyContext);

  const logout = () => {
    API.logout(tokenConfig()).then((result) => {
      removeToken();
      setIsAuthenticated(false);
      history.push("/");
    });
  };

  return (
    <Grid item xs={12} align="right" style={{background: '#0a1e25'}}>
      {/* <Typography variant="h3" compact="h3">
        
      </Typography>
      <Button  variant="contained" color="primary" onClick={logout}>
        Sign Out
      </Button> */}
      <CusButton onClick={logout}>
        Log Out
      </CusButton>
    </Grid>
  );
};
