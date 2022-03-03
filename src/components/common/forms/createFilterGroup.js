import React, { useEffect, useState } from "react";
import { Button, TextField, Snackbar } from "@material-ui/core";
import "./form.css";

import { filterGroupRequests, API_URL } from "../../../api/constants";
import { Formik, Field, Form } from "formik";
import MuiAlert from "@material-ui/lab/Alert";

import Service from "../../../api/service";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function CreateFilterGroup({ onSelect, itemId, itemName, itemImg }) {
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
  const submit = (values, { resetForm }) => {
    let data = new FormData();
    data.append("name", values.name);
    data.append("filterGroupImage", values.filterGroupImage);

    if (itemId == null) {
      Service.CreateFilterGp(data).then((res) => {
        onSelect();
        setSuccessOpen(true);
        resetForm({ values: "" });
      });
    } else {
      Service.EditFilterGp(data, itemId).then((res) => {
        onSelect();
        setSuccessOpen(true);
        resetForm({ values: "" });
      });
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          name: itemId == null ? "" : itemName,
          filterGroupImage: "",
        }}
        onSubmit={submit}
      >
        {(formProps) => (
          <Form className="formBody">
            <div className="Row">
              <div className="insider">
                <div className="titleText">
                  {" "}
                  {itemId == null ? "Create" : "Edit"}
                </div>
                <label>Filter Group Name</label>
                <div className="textFormik_flex8">
                  <Field
                    className="textFormikField_flex8"
                    placeholder="Filter Group Name"
                    id="name"
                    name="name"
                    required
                  />
                </div>
                <div className="group-Text">Filter Group Icon</div>

                {itemId == null ? (
                  <div></div>
                ) : (
                  <div className="box1">
                    <img
                      src={itemId == null ? null : API_URL + itemImg}
                      width="100px"
                      height="100px"
                    />
                  </div>
                )}
                <div className="heightbTw"></div>
                <div className="align-right">
                  <input
                    required={itemId == null ? true : false}
                    type="file"
                    name="filterGroupImage"
                    onChange={(event) =>
                      formProps.setFieldValue(
                        "filterGroupImage",
                        event.target.files[0]
                      )
                    }
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
            Success! Filter Group successfully updated
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="success">
            Success! Filter Group successfully saved
          </Alert>
        )}
      </Snackbar>
      <Snackbar open={errorOpen} autoHideDuration={600} onClose={handleClose}>
        {itemId ? (
          <Alert onClose={handleClose} severity="error">
            Error! Filter Group has not been updated
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error">
            Error! Filter Group has not been saved
          </Alert>
        )}
      </Snackbar>
    </>
  );
}

export default CreateFilterGroup;
