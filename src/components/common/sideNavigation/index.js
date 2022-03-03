import React, { useState } from "react";
import "./sidebar.css";
import Logo from "../../../assets/logo/Lazza logo.png";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Link } from "react-router-dom";
import { SidebarData } from "./mainMenu";
import { SPMenuData } from "./stockingPointMenu";
import { DlvryBoyMenu } from "./deliveryBoyMenu";
import { CallCenterMenu } from "./callCenterMenu";
import { EmptyMenu } from "./emptyMenu";
import sessionCheck from "../../../api/sessionCheck";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    height: "90vh",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    alignItems: "center",
  },
  tab: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
  },
}));

function SideNavigatonBar() {
  const classes = useStyles();
  const userdetails = sessionCheck.getLoggedinUserId();
  const userType = userdetails.userType;

  const [value, setValue] = React.useState(0);

  let menuData =
    userType === "admin"
      ? SidebarData
      : null || userType === "stockingPoint"
      ? SPMenuData
      : null || userType === "executive"
      ? CallCenterMenu
      : null || userType === "callCenter"
      ? CallCenterMenu
      : null || userType === "deliveryBoy"
      ? DlvryBoyMenu
      : EmptyMenu;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [sidebarIndex, setSidebarIndex] = useState(0);
  const [dashboardSidebar, setDashboard] = useState(false);
  const closeDashboard = () => setDashboard(false);

  const dashboard = (index) => {
    setSidebarIndex(index);
    setDashboard(true);
  };
  return (
    <div className="sidebar">
      <img className="sidebar_logo" src={Logo} alt="" />
      <div className={classes.root}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          {menuData.map((i, index) => (
            <Tab
              className={classes.tab}
              icon={<img src={i.icon} alt="" />}
              label={i.title}
              onClick={() => dashboard(index)}
            />
          ))}
        </Tabs>
      </div>
      <div className="subbarPostion">
        <div className="subbarbar"></div>
        <nav
          className={dashboardSidebar ? "subbar-menu" : "subbar-menu active"}
          onClick={closeDashboard}
        >
          <ul>
            <li
              className={
                dashboardSidebar ? "subbar-menu-txt" : "subbar-menu-txt active"
              }
              onClick={closeDashboard}
            >
              {menuData[sidebarIndex].title}
              {menuData[sidebarIndex].subMenu.map((subMenu) => (
                <Link to={subMenu.path}> {subMenu.title} </Link>
              ))}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default SideNavigatonBar;
