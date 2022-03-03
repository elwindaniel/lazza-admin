import React, { useState } from "react";
import { TextField, Snackbar } from "@material-ui/core";
import "./form.css";

import { regionRequests } from "../../../api/constants";
import MuiAlert from "@material-ui/lab/Alert";
import Service from "../../../api/service";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function CreateRegion({ onSelect, itemId, itemName }) {
  const POST_URL = `${regionRequests.createRegion}`;
  const EDIT_URL = `${regionRequests.editRegion}/${itemId}`;

  const [data, setData] = useState({
    regionName: itemId == null ? "" : itemName,
  });
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
  const resetForm = () => {
    setData({
      regionName: "",
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
      Service.CreateRegion(data)
        .then((res) => {
          onSelect();
          setSuccessOpen(true);
          resetForm();
        })
        .catch((error) => {
          setErrorOpen(true);
        });
    } else {
      Service.EditRegion(data, itemId)
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
        {" "}
        <form Validate onSubmit={(e) => submit(e)} autoComplete="on">
          <div className="insider">
            <div className="titleText">
              {" "}
              {itemId == null ? "Create Region" : "Edit Region"}
            </div>
            <label>Region Name</label>
            <TextField
              className="textArea_flex8"
              multiline
              placeholder="Region Name"
              fullWidth
              required
              margin="normal"
              variant="outlined"
              value={data.regionName}
              onChange={handleChange}
              id="regionName"
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
            Success! Region successfully updated
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="success">
            Success! Region successfully saved
          </Alert>
        )}
      </Snackbar>
      <Snackbar open={errorOpen} autoHideDuration={600} onClose={handleClose}>
        {itemId ? (
          <Alert onClose={handleClose} severity="error">
            Error! Region has not been updated
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error">
            Error! Region has not been saved
          </Alert>
        )}
      </Snackbar>
    </div>
  );
}
export default CreateRegion;
