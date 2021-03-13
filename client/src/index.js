import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MyProvider } from "./Provider";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});


ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>

    <MyProvider>
      <App />
    </MyProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
