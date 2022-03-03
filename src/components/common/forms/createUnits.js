import React, { useEffect, useState } from "react";
import { TextField, Snackbar } from "@material-ui/core";

import "./form.css";
import { unitRequests } from "../../../api/constants";
import MuiAlert from "@material-ui/lab/Alert";
import Service from "../../../api/service";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function CreateUnit({ onSelect, itemId, itemName, itemAbbreviation }) {
  const [data, setData] = useState({
    name: itemId == null ? "" : itemName,
    abbreviation: itemId == null ? "" : itemAbbreviation,
  });
  const resetForm = () => {
    setData({
      name: "",
      abbreviation: "",
    });
  };

  const [successOpen, setSuccessOpen] = React.useState(false);
  const [errorOpen, setErrorOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorOpen(false);
    setSuccessOpen(false);
  };
  function handleChange(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;

    setData(newdata);
  }

  function submit(e) {
    e.preventDefault();
    if (itemId == null) {
      Service.CreateUnit(data)
        .then((res) => {
          onSelect();
          setSuccessOpen(true);
          resetForm();
        })
        .catch((error) => {
          setErrorOpen(true);
        });
    } else {
      Service.EditUnit(data, itemId)
        .then((res) => {
          onSelect();
          setSuccessOpen(true);
        })
        .catch((error) => {});
    }
  }

  return (
    <div className="formBody">
      <div className="Row">
        {" "}
        <form Validate onSubmit={(e) => submit(e)} autoComplete="on">
          <div className="insider">
            <div className="titleText">
              {itemId == null ? "Create Units" : "Edit Units"}
            </div>
            <label>Unit Name</label>
            <TextField
              required
              isRequired="true"
              id="name"
              className="textArea_flex8"
              multiline
              placeholder="Name of Unit"
              fullWidth
              margin="normal"
              variant="outlined"
              value={data.name}
              onChange={handleChange}
            />
            <label>Abbreviation Name</label>
            <TextField
              id="abbreviation"
              className="textArea_flex8"
              multiline
              placeholder="Abbreviation"
              fullWidth
              required
              margin="normal"
              variant="outlined"
              value={data.abbreviation}
              onChange={handleChange}
            />
          </div>

          <div className="createbtn">
            <button className="button" type="submit">
              {itemId == null ? "Create Units" : "Edit Units"}
            </button>
          </div>
        </form>
      </div>
      <Snackbar open={successOpen} autoHideDuration={600} onClose={handleClose}>
        {itemId ? (
          <Alert onClose={handleClose} severity="success">
            Success! Unit successfully updated
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="success">
            Success! Unit successfully saved
          </Alert>
        )}
      </Snackbar>
      <Snackbar open={errorOpen} autoHideDuration={600} onClose={handleClose}>
        {itemId ? (
          <Alert onClose={handleClose} severity="error">
            Error! Unit has not been updated
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error">
            Error! Unit has not been saved
          </Alert>
        )}
      </Snackbar>
    </div>
  );
}
export default CreateUnit;
