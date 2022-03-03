import React, { useState, useEffect } from "react";
import { TextField, Snackbar } from "@material-ui/core";
import "./form.css";
import MuiAlert from "@material-ui/lab/Alert";
import Service from "../../../api/service";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function CreateFilter({ onSelect, itemId, itemName, itemGpId }) {
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
  const initialValues = () => {
    setData({
      name: "",
      filterGroupId: "",
    });
  };

  const [data, setData] = useState({
    name: itemId == null ? "" : itemName,
    filterGroupId: itemId == null ? "" : itemGpId,
  });

  function handleChange(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  }

  function submit(e) {
    e.preventDefault();
    if (itemId == null) {
      Service.CreateFilter(data)
        .then((res) => {
          onSelect();
          setErrorOpen(false);
          setSuccessOpen(true);
          initialValues();
        })
        .catch((error) => {
          setSuccessOpen(false);
          setErrorOpen(true);
        });
    } else {
      Service.EditFilter(data, itemId)
        .then((res) => {
          onSelect();
          setSuccessOpen(true);
        })
        .catch((error) => {});
    }
  }

  const [posts, setPost] = useState([]);

  useEffect(() => {
    Service.GetFilterGp()
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {});
  }, []);
  return (
    <div className="formBody">
      <div className="Row">
        <form Validate onSubmit={(e) => submit(e)} autoComplete="on">
          <div className="insider">
            <div className="titleText">
              {itemId == null ? "Create Filter" : "Edit Filter"}
            </div>
            <label>Group Name</label>
            <TextField
              className="textArea_flex8"
              placeholder="Filter"
              fullWidth
              select
              required
              SelectProps={{
                native: true,
              }}
              margin="normal"
              variant="outlined"
              value={data.filterGroupId}
              onChange={handleChange}
              id="filterGroupId"
            >
              <option>Select Filter Group</option>
              {posts.map((post) => (
                <option key={post._id} value={post._id}>
                  {post.name}
                </option>
              ))}
            </TextField>

            <label>Filter Name</label>
            <TextField
              required
              className="textArea_flex8"
              multiline
              required
              placeholder="Group Name"
              fullWidth
              margin="normal"
              variant="outlined"
              value={data.name}
              onChange={handleChange}
              id="name"
            />

            <ul> </ul>
          </div>

          <div className="createbtn">
            <button className="button" type="submit">
              {itemId == null ? "Create Filter" : "Edit Filter"}
            </button>
          </div>
        </form>
      </div>
      <Snackbar
        open={successOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        {itemId ? (
          <Alert onClose={handleClose} severity="success">
            Success! Filter successfully updated
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="success">
            Success! Filter successfully saved
          </Alert>
        )}
      </Snackbar>
      <Snackbar open={errorOpen} autoHideDuration={6000} onClose={handleClose}>
        {itemId ? (
          <Alert onClose={handleClose} severity="error">
            Error! Filter has not been updated
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error">
            Error! Filter has not been saved
          </Alert>
        )}
      </Snackbar>
    </div>
  );
}
export default CreateFilter;
