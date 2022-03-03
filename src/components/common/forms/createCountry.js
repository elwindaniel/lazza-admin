import React, { useEffect, useState } from "react";
import { TextField, Snackbar } from "@material-ui/core";
import "./form.css";
import Service from "../../../api/service";
import { countryRequests } from "../../../api/constants";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function CreateCountry({ onSelect, itemId, itemName }) {
  const [successOpen, setSuccessOpen] = React.useState(false);
  const [errorOpen, setErrorOpen] = React.useState(false);

  const handleClick = () => {
    setSuccessOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setErrorOpen(false);
    setSuccessOpen(false);
  };

  const [data, setData] = useState({
    countryName: itemId == null ? "" : itemName,
  });
  const resetForm = () => {
    setData({
      countryName: "",
    });
  };
  function handleChange(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;

    setData(newdata);
  }

  function submit(e) {
    e.preventDefault();
    if (itemId == null) {
      Service.CreateCountry(data)
        .then((res) => {
          onSelect();
          setSuccessOpen(true);
          resetForm();
        })
        .catch((error) => {
          setErrorOpen(true);
        });
    } else {

      Service.EditCountry(data, itemId)
        .then((res) => {
          onSelect();
          setSuccessOpen(true);
        })
        .catch((error) => {
          setErrorOpen(true);
        });
    }
  }

  return (
    <div className="formBody">
      <div className="Row">
        <div className="titleText">
          {itemId == null ? "Create Country" : "Edit Country"}
        </div>
        <form Validate onSubmit={(e) => submit(e)} autoComplete="on">
          <div className="insider">
            <label>Country Name</label>
            <TextField
              required
              className="textArea_flex8"
              multiline
              placeholder="Country"
              fullWidth
              margin="normal"
              variant="outlined"
              value={data.countryName}
              id="countryName"
              onChange={handleChange}
            />
          </div>
          <div className="ffrowspace"></div>
          <div className="createbtn">
            <button className="button" type="submit">
              {itemId == null ? "Create" : "Edit"}
            </button>
          </div>
        </form>
      </div>
      <Snackbar open={successOpen} autoHideDuration={600} onClose={handleClose}>
        {itemId ? (
          <Alert onClose={handleClose} severity="success">
            Success! Country successfully updated
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="success">
            Success! Country successfully saved
          </Alert>
        )}
      </Snackbar>
      <Snackbar open={errorOpen} autoHideDuration={600} onClose={handleClose}>
        {itemId ? (
          <Alert onClose={handleClose} severity="error">
            Error! Country has not been updated
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error">
            Error! Country has not been saved
          </Alert>
        )}
      </Snackbar>
    </div>
  );
}
export default CreateCountry;
