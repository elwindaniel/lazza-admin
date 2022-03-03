import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Paper, Checkbox } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Logo from "../../../assets/logo/Lazza logo.png";
import SessionCheck from "../../../api/sessionCheck";
import { API_URL } from "../../../api/constants";
import Collapse from "@material-ui/core/Collapse";
import Alert from "@material-ui/lab/Alert";
import Style from "../../auth/style";

const useStyles = makeStyles(Style);

export default function DeliveryBoyIndex(props) {
  const classes = useStyles();
  const url = `${API_URL}users/authenticate`;
  const [error, setError] = React.useState(false);
  const [response, setResponse] = useState(null);
  const [data, setData] = useState({
    phoneNumber: "",
    password: "",
    userType: "",
  });
  function submit(e) {
    e.preventDefault();
    SessionCheck.basicJWTAuthentication(
      data.phoneNumber,
      data.password,
      "deliveryBoy"
    )
      .then((res) => {
        if (res.data != undefined) {
          let resData = JSON.stringify(res.data);

          SessionCheck.setSessionForJWt(res.data.token);

          props.history.push("/vieworder");
          window.location.reload(false);
        }
      })
      .catch((error) => {
        setError(true);
      });
  }
  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  }

  return (
    <>
      <Paper elevation={3}>
        <div className={classes.paper}>
          <div className={classes.outer}>
            <img className={classes.img} src={Logo} alt="" />

            <div className={classes.box}>
              <div className={classes.avatar}></div>

              <Collapse in={error}>
                <Alert severity="error">Invalid username or password!</Alert>
              </Collapse>
              <form
                className={classes.form}
                Validate
                autoComplete="on"
                onSubmit={(e) => submit(e)}
              >
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="phoneNumber"
                  label="phoneNumber"
                  // type="phoneNumber"
                  variant="outlined"
                  value={data.phoneNumber}
                  onChange={(e) => handle(e)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  variant="outlined"
                  value={data.password}
                  onChange={(e) => handle(e)}
                />

                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <div className={classes.button}>
                  <button type="submit" className="button">
                    Sign In
                  </button>
                </div>
                <Grid container>
                  <Grid item></Grid>
                </Grid>
              </form>
            </div>
          </div>
        </div>
      </Paper>
    </>
  );
}
