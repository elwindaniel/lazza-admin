import React from "react";
import Backdiv from "./backDiv/backDiv";
import Filtertab from "./filterTab/filterTab";
import TopBar from "../../topBar";
import "./filter.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
  background: {
    default: "rgb(252, 251, 236)",
  },
});

function Filters() {
  return (
    <ThemeProvider theme={theme}>
      <div className="filter">
        <TopBar title="Filter" />
        <Backdiv />

        <Filtertab />
      </div>
    </ThemeProvider>
  );
}

export default Filters;
