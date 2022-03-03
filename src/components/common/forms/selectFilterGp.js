import React, { useState, useEffect } from "react";
import { Button, TextField, Snackbar } from "@material-ui/core";
import "./form.css";
import axios from "../../../api/axios";
import { filterRequests, filterGroupRequests } from "../../../api/constants";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";

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

function SeldctFilterGp({ onSelect }) {
  const GET_URL = `${filterGroupRequests.getAllFilterGroupActive}`;

  const classes = useStyles();
  const [successOpen, setSuccessOpen] = React.useState(false);
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [post, setPost] = useState([]);

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

  useEffect(() => {
    axios
      .get(GET_URL)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {});
  }, []);
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { check, check2, check3, check4 } = state;
  const error = [check, check2, check3, check4].filter((v) => v).length !== 1;
  return (
    <div className="">
      <div className="Row">
        <form Validate autoComplete="on">
          <div className="insider">
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Select Filter Group</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={check}
                      onChange={handleChange}
                      name="check"
                    />
                  }
                  label={
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

                      //  onChange={handleChange}
                      // id="filterGroupId"
                    >
                      <option>Select Filter Group</option>
                      {post.map((i) => (
                        <option key={i._id} value={i._id}>
                          {i.name}
                        </option>
                      ))}
                    </TextField>
                  }
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={check2}
                      onChange={handleChange}
                      name="check2"
                    />
                  }
                  label={
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

                      //  onChange={handleChange}
                      // id="filterGroupId"
                    >
                      <option>Select Filter Group</option>
                      {post.map((i) => (
                        <option key={i._id} value={i._id}>
                          {i.name}
                        </option>
                      ))}
                    </TextField>
                  }
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={check3}
                      onChange={handleChange}
                      name="check3"
                    />
                  }
                  label={
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

                      //  onChange={handleChange}
                      // id="filterGroupId"
                    >
                      <option>Select Filter Group</option>
                      {post.map((i) => (
                        <option key={i._id} value={i._id}>
                          {i.name}
                        </option>
                      ))}
                    </TextField>
                  }
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={check4}
                      onChange={handleChange}
                      name="check4"
                    />
                  }
                  label={
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

                      //  onChange={handleChange}
                      // id="filterGroupId"
                    >
                      <option>Select Filter Group</option>
                      {post.map((i) => (
                        <option key={i._id} value={i._id}>
                          {i.name}
                        </option>
                      ))}
                    </TextField>
                  }
                />
              </FormGroup>
              <FormHelperText>Select at least one !</FormHelperText>
            </FormControl>

            <ul> </ul>
          </div>

          <div className="createbtn">
            <button className="button" type="submit">
              {"ADD"}
            </button>
          </div>
        </form>
      </div>
      <Snackbar
        open={successOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          Created Successfully !
        </Alert>
      </Snackbar>
      <Snackbar open={errorOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          There is a error!
        </Alert>
      </Snackbar>
    </div>
  );
}
export default SeldctFilterGp;
