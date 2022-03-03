import React, { useState } from "react";
import { CircularProgress, Grid, Snackbar, TextField } from "@material-ui/core";
import Service from "../../../api/service";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  back: {
    backgroundColor: "#E9B635",
    width: "100%",
  },

  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
    backgroundColor: "#1B1D2A",
  },
  outer: {
    margin: theme.spacing(16),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 10,
  },
  box: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "50vh",
    borderRadius: 5,
    backgroundColor: "#FFF",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#1B1D2A",
  },
  img: {
    margin: theme.spacing(2),
    height: 100,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  selectField_flex8: {
    width: "100%",
    height: "60px",
    borderRadius: "5px",
    marginTop: "15px",
  },
}));

function ConfirmDelivery({ invoice, userId, onSelect }) {
  const classes = useStyles();
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [loadingOpen, setloadingOpen] = React.useState(false);
  // console.log(invoice);
  let data = {
    phoneNumber: invoice.customerMobileNumber,
    orderId: invoice.orderId,
    deliveryBoyId: userId,
    stockingPointId: invoice.productDetails[0].stockingPointId,
  };

  const [otp, setOtp] = useState("");

  const submit = (e) => {
    e.preventDefault();
    setloadingOpen(true);
    Service.ConfirmDeliveryBoyOrder(otp, data)
      .then((res) => {
        // console.log(res.data, "cDBoy");
        onSelect();
        setSuccessOpen(true);
        setloadingOpen(false);
      })
      .catch((error) => {
        setErrorOpen(true);
        setloadingOpen(false);
      });
  };
  function handle(e) {
    // // console.log(e.target.value, "otp entered");
    setOtp(e.target.value);
  }
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setErrorOpen(false);
    setSuccessOpen(false);
  };
  return (
    <div>
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
          label="Order Id"
          value={invoice.orderId}
          variant="outlined"
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="phoneNumber"
          label="Phone Number"
          value={invoice.customerMobileNumber}
          variant="outlined"
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="otp"
          label="OTP"
          onChange={(e) => handle(e)}
          variant="outlined"
        />

        <div className={classes.button}>
          <button type="submit" className="button">
            Submit
          </button>
        </div>

        <Grid container>
          <Grid item></Grid>
        </Grid>
      </form>
      <Snackbar
        open={successOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          Success!
        </Alert>
      </Snackbar>
      <Snackbar
        open={loadingOpen}
        autoHideDuration={60000}
        // onClose={handleClose}
        message={"Please wait.."}
        action={<CircularProgress color="" />}
      />

      <Snackbar open={errorOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Check the OTP !
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ConfirmDelivery;
