import React from "react";
import "./order.css";
import TopBar from "../topBar";
import YellowBox from "../settings/banner/backDiv/backDiv";
import OrderTable from "../Orders/table/mangeOrder";
import DispatchedTable from "../Orders/table/spOrderDis";
import { AppBar, Tab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";

const useStyles = makeStyles((theme) => ({
  root: { paddingLeft: theme.spacing(2), paddingRight: theme.spacing(2) },
}));
export default function ManageCustomers() {
  const classes = useStyles();
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="customer">
      <TopBar title="Manage Order" />

      <div className="customer-inner">
        <YellowBox />
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
                  label="Waiting for payment"
                  value="1"
                  style={{
                    outline: "none",
                  }}
                />
                <Tab
                  label="Pending"
                  value="2"
                  style={{
                    outline: "none",
                  }}
                />
                <Tab
                  label="Delivery Boy Assigned"
                  value="3"
                  style={{
                    outline: "none",
                  }}
                />
                <Tab
                  label="Dispatched"
                  value="4"
                  style={{
                    outline: "none",
                  }}
                />
                <Tab
                  label="Delivered"
                  value="5"
                  style={{
                    outline: "none",
                  }}
                />
              </TabList>
            </AppBar>
            <TabPanel value="1">
              <DispatchedTable spStatus={"Waiting for payment"} />
            </TabPanel>
            <TabPanel value="2">
              <OrderTable />
            </TabPanel>
            <TabPanel value="3">
              <DispatchedTable spStatus={"Delivery boy assigned"} />
            </TabPanel>
            <TabPanel value="4">
              <DispatchedTable spStatus={"Dispatched"} />
            </TabPanel>
            <TabPanel value="5">
              <DispatchedTable spStatus={"Delivered"} />
            </TabPanel>
          </TabContext>
        </div>
      </div>
    </div>
  );
}
