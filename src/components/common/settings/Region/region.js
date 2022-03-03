import React from "react";
import Backdiv from "./backDiv/backDiv";
import RegionTab from "./regionTab";

import TopBar from "../../topBar";
import "./region.css";
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
        <TopBar title="Region" />
        <Backdiv />

        <RegionTab />
      </div>
    </ThemeProvider>
  );
}

export default Filters;
