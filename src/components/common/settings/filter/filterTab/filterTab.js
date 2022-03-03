import React from "react";
import {
  Paper,
  Grid,
  Typography,
  Button,
  ButtonGroup,
  AppBar,
  Tab,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import Filtertabcomp from "./filtertabComponent/filtertabComp";
import FilterGroupPage from "./filterGroupTabPage";

const useStyles = makeStyles((theme) => ({
  root: { paddingLeft: theme.spacing(2), paddingRight: theme.spacing(2) },
}));

function FilterTab() {
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <TabContext value={value}>
        <AppBar position="static" color="#fff" elevation={1}>
          <TabList
            onChange={handleChange}
            aria-label="simple tabs example"
            indicatorColor="primary"
            textColor="primary"
            style={{ outline: "none" }}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab
              label="Filter"
              value="1"
              style={{
                outline: "none",
              }}
            />
            <Tab
              label="Filter Group"
              value="2"
              style={{
                outline: "none",
              }}
            />
          </TabList>
        </AppBar>
        <TabPanel value="1">
          <Filtertabcomp />
        </TabPanel>
        <TabPanel value="2">
          <FilterGroupPage />
        </TabPanel>
      </TabContext>
    </div>
  );
}

export default FilterTab;
