import React, { useState, useEffect } from "react";
import { TextField, Snackbar } from "@material-ui/core";
import "./form.css";
import Service from "../../../api/service";
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

function CreateDistrict({
  onSelect,
  itemId,
  itemCountryId,
  itemName,
  itemStateId,
}) {
  const classes = useStyles();
  const [successOpen, setSuccessOpen] = React.useState(false);
  const [errorOpen, setErrorOpen] = React.useState(false);

  const handleClick = () => {
    setSuccessOpen(true);
  };
  const resetForm = () => {
    setData({
      districtName: "",
      stateId: "",
      countryId: "",
    });
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setErrorOpen(false);
    setSuccessOpen(false);
  };

  const [data, setData] = useState({
    districtName: itemId == null ? "" : itemName,
    stateId: itemId == null ? "" : itemStateId,
    countryId: itemId == null ? "" : itemCountryId,
  });

  function handleChange(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;

    setData(newdata);
  }

  function submit(e) {
    e.preventDefault();
    if (itemId == null) {
      Service.CreateDistrict(data)
        .then((res) => {
          onSelect();
          setSuccessOpen(true);
          resetForm();
        })
        .catch((error) => {
          setErrorOpen(true);
        });
    } else {
      Service.EditDistrict(data, itemId)
        .then((res) => {
          onSelect();
          setSuccessOpen(true);
        })
        .catch((error) => {
          setErrorOpen(true);
        });
    }
  }

  const [posts, setPost] = useState([]);
  const GetCountryData = async () => {
    try {
      Service.GetActiveCountry()
        .then((res) => {
          setPost(res.data);
        })
        .catch((err) => {});
    } catch (e) {}
  };
  const GetStateData = async () => {
    try {
      Service.GetActiveState()
        .then((res) => {
          setState(res.data);
        })
        .catch((err) => {});
    } catch (e) {}
  };

  useEffect(() => {
    GetCountryData();
    GetStateData();
  }, []);

  const [state, setState] = useState([]);

  return (
    <div className="formBody">
      <div className="Row">
        <form Validate onSubmit={(e) => submit(e)} autoComplete="on">
          <div className="insider">
            <div className="titleText">
              {itemId == null ? "Create District" : "Edit District"}
            </div>
            <label>Country Name</label>
            <TextField
              className="textArea_flex8"
              placeholder="Country"
              fullWidth
              required
              select
              SelectProps={{
                native: true,
              }}
              margin="normal"
              variant="outlined"
              value={data.countryId}
              onChange={handleChange}
              id="countryId"
            >
              <option>Select Country</option>
              {posts.map((post) => (
                <option key={post._id} value={post._id}>
                  {post.countryName}
                </option>
              ))}
            </TextField>
            <label>State Name</label>
            <TextField
              className="textArea_flex8"
              placeholder="State"
              fullWidth
              required
              select
              SelectProps={{
                native: true,
              }}
              margin="normal"
              variant="outlined"
              value={data.stateId}
              onChange={handleChange}
              id="stateId"
            >
              <option>Select State</option>
              {state.map((post) => (
                <option key={post._id} value={post._id}>
                  {post.stateName}
                </option>
              ))}
            </TextField>
            <label>District Name</label>
            <TextField
              className="textArea_flex8"
              multiline
              placeholder="District Name"
              fullWidth
              required
              margin="normal"
              variant="outlined"
              value={data.districtName}
              onChange={handleChange}
              id="districtName"
            />
          </div>
          <div className="createbtn">
            <button className="button" type="submit">
              {itemId == null ? "Create District" : "Edit District"}
            </button>
          </div>
        </form>
      </div>
      <Snackbar open={successOpen} autoHideDuration={600} onClose={handleClose}>
        {itemId ? (
          <Alert onClose={handleClose} severity="success">
            Success! District successfully updated
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="success">
            Success! District successfully saved
          </Alert>
        )}
      </Snackbar>
      <Snackbar open={errorOpen} autoHideDuration={600} onClose={handleClose}>
        {itemId ? (
          <Alert onClose={handleClose} severity="error">
            Error! District has not been updated
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error">
            Error! District has not been saved
          </Alert>
        )}
      </Snackbar>
    </div>
  );
}
export default CreateDistrict;
