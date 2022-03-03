import React from "react";
import "./topBar.css";
import { AiFillCaretDown } from "react-icons/ai";
import { MdAccountCircle, MdNotifications } from "react-icons/md";
import { Link, Redirect } from "react-router-dom";
import {
  AppBar,
  Grid,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
const useStyle = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    color: "black",
  },
}));
const session = {
  token: sessionStorage.getItem("token"),
};

const TopBar = (props) => {
  const classes = useStyle();
  const history = useHistory();
  const logout = () => {
    sessionStorage.removeItem("token");
    history.push("/");
    // <Redirect to={{ pathname: "/" }}></Redirect>;
    window.location.reload(true);
  };
  let userName;
  let userId;
  let userType;
  const payloadStart = session.token.indexOf(".") + 1;
  const payloadEnd = session.token.lastIndexOf(".");
  let payload = session.token.substring(payloadStart, payloadEnd);

  if (payload.length === 0) {
  } else {
    payload = atob(payload);
    const jsonPayload = JSON.parse(payload);
    userType = jsonPayload.userType;
    userName = jsonPayload.name;
    userId = jsonPayload.id;
  }
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item>
            <Typography variant="h5">{props.title}</Typography>
          </Grid>
          <Grid item xs></Grid>
          <Grid item>
            <Grid container>
              <Grid item>
                <IconButton>
                  <MdNotifications />
                </IconButton>
              </Grid>
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item>
                    <IconButton>
                      <MdAccountCircle />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <Typography align="center"> {userName}</Typography>
                  </Grid>
                  <Grid item>
                    <IconButton onClick={handleClick}>
                      <AiFillCaretDown />
                    </IconButton>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleClose}>
                        {userType === "admin" ? (
                          <Link to={`/CreateCustomer/${userId}`}>
                            Edit Profile
                          </Link>
                        ) : null}

                        {userType === "executive" ? (
                          <Link to={`/editexecutive/${userId}`}>
                            Edit Profile
                          </Link>
                        ) : null}

                        {userType === "stockingPoint" ? (
                          <Link to={`/addstockingpoint/${userId}`}>
                            Edit Profile
                          </Link>
                        ) : null}
                      </MenuItem>

                      <MenuItem onClick={() => logout()}>Logout</MenuItem>
                    </Menu>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
export default TopBar;
