import React from "react";
import { TextField, Snackbar } from "@material-ui/core";
import "./form.css";
import { stockRequests } from "../../../api/constants";
import { Formik, Field, Form } from "formik";
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

function CustomerDemographics({
  itemId,
  itemName,
  itemCurrent,
  itemLastDay,
}) {
  const POST_URL = `${stockRequests.createStock}`;
  const EDIT_URL = `${stockRequests.editStock}/${itemId}`;

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

  return (
    <>
      <Formik
        initialValues={{
          variantName: itemId == null ? "" : itemName,
          currentStock: itemId == null ? "" : itemCurrent,
          lastDay: itemId == null ? "" : itemLastDay,
        }}
        onSubmit={async (values, { resetForm }) => {
        }}
      >
        {(formProps) => (
          <Form className="formBody">
            <div className="Row">
              <div className="insider">
                <div className="titleText">
                  {" "}
                  {itemId == null ? "Create" : "Edit"}
                </div>
                <label>Name of Filter</label>
                <div className="textFormik_flex8">
                  <Field
                    className="textFormikField_flex8"
                    placeholder="Filter Name"
                    id="variantName"
                    name="variantName"
                    required
                  />
                </div>
                <label>Who has spend more than</label>
                <div className="textFormik_flex8">
                  <Field
                    className="textFormikField_flex8"
                    placeholder="Who has spend more than"
                    id="currentStock"
                    name="currentStock"
                    required
                  />
                </div>
                <label>Who has spend less than</label>
                <div className="textFormik_flex8">
                  <Field
                    className="textFormikField_flex8"
                    placeholder="Who has spend less than"
                    id="lastDay"
                    name="lastDay"
                    required
                  />
                </div>
                <label>Period</label>
                <div className="">
                  <TextField
                    className="textArea_flex8"
                    placeholder="Filter"
                    fullWidth
                    select
                    SelectProps={{
                      native: true,
                    }}
                    margin="normal"
                    variant="outlined"
                    id="Period"
                  >
                    <option>Select One</option>
                    <option value={"Last30day"}>Last 30 day</option>
                    <option value={"ThisMonth"}>This Month</option>
                    <option value={"ThisYear"}>This Year</option>
                    <option value={"Last2Months"}>Last 2 Months</option>
                    <option value={"Last3Months"}>Last 3 Months</option>
                  </TextField>
                </div>
                <label>Whose birthday falls</label>

                <TextField
                  className="textArea_flex8"
                  placeholder="Filter"
                  fullWidth
                  select
                  SelectProps={{
                    native: true,
                  }}
                  margin="normal"
                  variant="outlined"
                  id="birthday"
                >
                  <option>Select One</option>
                  <option value={"ThisMonth"}>This Month</option>
                  <option value={"ThisWeek"}>This Week</option>
                </TextField>

                <label>Older than</label>
                <div className="textFormik_flex8">
                  <Field
                    className="textFormikField_flex8"
                    placeholder="Older than"
                    id="lastDay"
                    name="lastDay"
                    required
                  />
                </div>
                <label>Yonger than</label>
                <div className="textFormik_flex8">
                  <Field
                    className="textFormikField_flex8"
                    placeholder="Yonger than"
                    id="lastDay"
                    name="lastDay"
                    required
                  />
                </div>
              </div>
              <div className="ffrowspace"></div>
              <div className="createbtn">
                <button className="button">
                  {itemId == null ? "Create" : "Edit"}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <Snackbar open={successOpen} autoHideDuration={600} onClose={handleClose}>
        {itemId ? (
          <Alert onClose={handleClose} severity="success">
            Success! Customer Demographics successfully updated
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="success">
            Success! Customer Demographics successfully saved
          </Alert>
        )}
      </Snackbar>
      <Snackbar open={errorOpen} autoHideDuration={600} onClose={handleClose}>
        {itemId ? (
          <Alert onClose={handleClose} severity="error">
            Error! Customer Demographics has not been updated
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error">
            Error! Customer Demographics has not been saved
          </Alert>
        )}
      </Snackbar>
    </>
  );
}

export default CustomerDemographics;
