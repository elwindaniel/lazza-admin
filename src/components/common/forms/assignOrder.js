import React, { useState, useEffect } from "react";
import {
  Paper,
  Grid,
  Badge,
  TextField,
  Collapse,
  Snackbar,
} from "@material-ui/core";
import { deliveryBoyRequests, API_URL } from "../../../api/constants";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Axios from "../../../api/axios";
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

function AssignOrder({ invoice, onselect, USERID }) {
  const classes = useStyles();
  const GET_URL = `${API_URL}${deliveryBoyRequests.getSPDelivery}/${USERID}`;
  const POST_URL = `${deliveryBoyRequests.deliveryBoyAssign}`;
  const [error, setError] = React.useState(false);
  const [data, setData] = useState({
    deliveryBoyId: "",
    orderId: invoice.orderId,
    invoiceNumber: "",
    stockingPointId: USERID,
  });

  const [records, setRecords] = useState();
  const [success, setSuccess] = useState();
  const GetData = async () => {
    try {
      await Axios.get(GET_URL).then((res) => {
        setRecords(res.data);
      });
    } catch (e) { }
  };

  useEffect(() => {
    GetData();
  }, []);

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  }

  function submit(e) {
    e.preventDefault();
    Axios.post(POST_URL, data)
      .then((res) => {
        onselect();
        setSuccess(true);
      })
      .catch((error) => {
        setError(true);
      });
  }

  return (
    <div>
      <form
        className={classes.form}
        Validate
        autoComplete="on"
        onSubmit={(e) => submit(e)}
      >
        <Collapse in={error}>
          <Alert severity="error">Select Delivery a Boy</Alert>
        </Collapse>
        <select
          className={classes.selectField_flex8}
          // placeholder="User Type"
          fullWidth
          id="deliveryBoyId"
          value={data.deliveryBoyId}
          required
          onChange={(e) => handle(e)}
          as="select"
        >
          <option>Select Delivery Boy</option>
          {records && records.length
            ? records.map((post) => (
              <option key={post._id} value={post._id}>
                {post.name}
              </option>
            ))
            : null}
        </select>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="orderId"
          label="Order Id"
          type="phoneNumber"
          variant="outlined"
          value={invoice.orderId}
          onChange={(e) => handle(e)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="invoiceNumber"
          label="Invoice Number"
          type="phoneNumber"
          variant="outlined"
          value={data.invoiceNumber}
          onChange={(e) => handle(e)}
        />
        {/* <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                /> */}

        <div className={classes.button}>
          <button type="submit" className="button">
            Assign
          </button>
        </div>

        <Grid container>
          <Grid item></Grid>
        </Grid>
      </form>
      <Snackbar open={success} autoHideDuration={6000}>
        <Alert severity="success">
          The delivery Boy has been assigned for {invoice.orderId}!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default AssignOrder;
