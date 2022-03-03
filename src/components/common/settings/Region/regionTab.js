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
import Regiontabcomp from "./regiontabcomp";
import DistrictTabComp from "./districtTabcomp";
import StatetabComp from "./stateTabComp";
import CountryTabComp from "./countryTabComp";
import CityTabComp from "./cityTabcomp";

const useStyles = makeStyles((theme) => ({
  root: { paddingLeft: theme.spacing(2), paddingRight: theme.spacing(2) },
}));

function RegionTab() {
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
              label="Region"
              value="1"
              style={{
                outline: "none",
              }}
            />
            <Tab
              label="City"
              value="2"
              style={{
                outline: "none",
              }}
            />
            <Tab
              label="District"
              value="3"
              style={{
                outline: "none",
              }}
            />
            <Tab
              label="State"
              value="4"
              style={{
                outline: "none",
              }}
            />
            <Tab
              label="Country"
              value="5"
              style={{
                outline: "none",
              }}
            />
          </TabList>
        </AppBar>
        <TabPanel value="1">
          <Regiontabcomp />
        </TabPanel>
        <TabPanel value="2">
          <CityTabComp />
        </TabPanel>
        <TabPanel value="3">
          <DistrictTabComp />
        </TabPanel>
        <TabPanel value="4">
          <StatetabComp />
        </TabPanel>
        <TabPanel value="5">
          <CountryTabComp />
        </TabPanel>
      </TabContext>
    </div>
  );
}

export default RegionTab;
