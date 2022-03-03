import React, { useState, useEffect } from "react";
import { Button, TextField, Snackbar } from "@material-ui/core";
import "./form.css";
import Service from "../../../api/service";
import { stateRequests, countryRequests } from "../../../api/constants";
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
function CreateState({ onSelect, itemId, itemCountryId, itemName }) {
  const POST_URL = `${stateRequests.createState}`;
  const EDIT_URL = `${stateRequests.editState}/${itemId}`;
  const GET_URL = `${countryRequests.getActiveCountry}`;

  const [data, setData] = useState({
    stateName: itemName,
    countryId: itemId == null ? "" : itemCountryId,
  });

  const classes = useStyles();
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
      stateName: "",

      countryId: "",
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
      Service.CreateState(data)
        .then((res) => {
          onSelect();
          setSuccessOpen(true);
          resetForm();
        })
        .catch((error) => {
          setErrorOpen(true);
        });
    } else {
      Service.EditState(data, itemId)
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

  const GetCountry = () => {
    Service.GetActiveCountry()
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {});
  };
  useEffect(() => {
    GetCountry();
  }, []);
  return (
    <div className="formBody">
      <div className="Row">
        <form Validate onSubmit={(e) => submit(e)} autoComplete="on">
          <div className="insider">
            <div className="titleText">
              {itemId == null ? "Create State" : "Edit State"}
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
              multiline
              placeholder="State Name"
              fullWidth
              required
              margin="normal"
              variant="outlined"
              value={data.stateName}
              onChange={handleChange}
              id="stateName"
            />
          </div>
          <div className="createbtn">
            <button className="button" type="submit">
              {itemId == null ? "Create State" : "Edit State"}
            </button>
          </div>
        </form>
      </div>
      <Snackbar open={successOpen} autoHideDuration={600} onClose={handleClose}>
        {itemId ? (
          <Alert onClose={handleClose} severity="success">
            Success! State successfully updated
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="success">
            Success! State successfully saved
          </Alert>
        )}
      </Snackbar>
      <Snackbar open={errorOpen} autoHideDuration={600} onClose={handleClose}>
        {itemId ? (
          <Alert onClose={handleClose} severity="error">
            Error! State has not been updated
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error">
            Error! State has not been saved
          </Alert>
        )}
      </Snackbar>
    </div>
  );
}
export default CreateState;
