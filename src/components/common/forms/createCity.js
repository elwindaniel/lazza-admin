import React, { useState, useEffect } from "react";
import { TextField, Snackbar } from "@material-ui/core";
import "./form.css";
import {
  stateRequests,
  countryRequests,
  districtRequests,
  cityRequests,
} from "../../../api/constants";
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

function CreateCity({
  onSelect,
  itemId,
  itemCountryId,
  itemName,
  itemStateId,
  itemDistrictId,
}) {
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
    districtId: itemId == null ? "" : itemDistrictId,
    stateId: itemId == null ? "" : itemStateId,
    countryId: itemId == null ? "" : itemCountryId,
    cityName: itemId == null ? "" : itemName,
  });
  const resetForm = () => {
    setData({
      districtId: "",
      stateId: "",
      countryId: "",
      cityName: "",
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
      Service.CreateCity(data)
        .then((res) => {
          onSelect();
          setSuccessOpen(true);
          resetForm();
        })
        .catch((error) => {
          setErrorOpen(true);
        });
    } else {
      Service.EditCity(data, itemId)
        .then((res) => {
          onSelect();
          setSuccessOpen(true);
        })
        .catch((error) => {
          setErrorOpen(true);
        });
    }
  }

  //Getting List of FilterGroup Api Call
  const [posts, setPost] = useState([]);

  useEffect(() => {
    Service.GetActiveCountry()
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {});
  }, []);

  const [state, setState] = useState([]);

  useEffect(() => {
    Service.GetState()
      .then((res) => {
        setState(res.data);
      })
      .catch((err) => {});
  }, []);
  const [district, setDistrict] = useState([]);

  useEffect(() => {
    Service.GetDistrict()
      .then((res) => {
        setDistrict(res.data);
      })
      .catch((err) => {});
  }, []);
  return (
    <div className="formBody">
      <div className="Row">
        {" "}
        <form Validate onSubmit={(e) => submit(e)} autoComplete="on">
          <div className="insider">
            <div className="titleText">
              {itemId == null ? "Create City" : "Edit City"}
            </div>

            <label>Country Name</label>
            <TextField
              required
              className="textArea_flex8"
              multiline
              placeholder="Country"
              fullWidth
              margin="normal"
              variant="outlined"
              select
              SelectProps={{
                native: true,
              }}
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
              required
              className="textArea_flex8"
              multiline
              placeholder="State"
              fullWidth
              margin="normal"
              variant="outlined"
              select
              SelectProps={{
                native: true,
              }}
              value={data.stateId}
              onChange={handleChange}
              id="stateId"
            >
              <option>Select State</option>
              {state.map((state) => (
                <option key={state._id} value={state._id}>
                  {state.stateName}
                </option>
              ))}
            </TextField>
            <label>District Name</label>
            <TextField
              className="textArea_flex8"
              multiline
              placeholder="District "
              fullWidth
              margin="normal"
              variant="outlined"
              select
              SelectProps={{
                native: true,
              }}
              value={data.districtId}
              onChange={handleChange}
              id="districtId"
              required
            >
              <option>Select District</option>
              {district.map((district) => (
                <option key={district._id} value={district._id}>
                  {district.districtName}
                </option>
              ))}
            </TextField>
            <label>City Name</label>
            <TextField
              className="textArea_flex8"
              multiline
              placeholder="City"
              fullWidth
              margin="normal"
              variant="outlined"
              value={data.cityName}
              onChange={handleChange}
              id="cityName"
              required
            />
          </div>{" "}
          <div className="createbtn">
            <button className="button" type="submit">
              {itemId == null ? "Create City" : "Edit City"}
            </button>
          </div>
        </form>
      </div>

      <Snackbar open={successOpen} autoHideDuration={600} onClose={handleClose}>
        {itemId ? (
          <Alert onClose={handleClose} severity="success">
            Success! City successfully updated
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="success">
            Success! City successfully saved
          </Alert>
        )}
      </Snackbar>
      <Snackbar open={errorOpen} autoHideDuration={600} onClose={handleClose}>
        {itemId ? (
          <Alert onClose={handleClose} severity="error">
            Error! City has not been updated
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error">
            Error! City has not been saved
          </Alert>
        )}
      </Snackbar>
    </div>
  );
}
export default CreateCity;
