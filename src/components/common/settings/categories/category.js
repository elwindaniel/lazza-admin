import React from "react";
import Backdiv from "./backDiv/backDiv";
import TopBar from "../../topBar";
//import "./region.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import CategoryTab from "../categories/categoryTab";

const theme = createMuiTheme({
  background: {
    default: "rgb(252, 251, 236)",
  },
});

function Category() {
  return (
    <ThemeProvider theme={theme}>
      <div className="filter">
        <TopBar title="Categories" />
        <Backdiv />

        <CategoryTab />
      </div>
    </ThemeProvider>
  );
}

export default Category;
