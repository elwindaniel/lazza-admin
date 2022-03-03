import React, { useState, useEffect } from "react";
import { Button, TextField, Snackbar } from "@material-ui/core";
import "./form.css";
import { Row, Col, Container } from "react-bootstrap";
import { MdAddCircleOutline } from "react-icons/md";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import Service from "../../../api/service";
import { executiveRequests } from "../../../api/constants";
import MuiAlert from "@material-ui/lab/Alert";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function CreateExecutive({ createExecutiveId }) {
  const POST_URL = `${executiveRequests.createExecutive}`;
  const GET_URL = `${executiveRequests.getAllExecutive}`;
  const get_URL = `${executiveRequests.getExecutiveId}/${createExecutiveId}`;
  const EDIT_URL = `${executiveRequests.editExecutive}/${createExecutiveId}`;
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
  useEffect(() => {
    Service.GetExecutiveId(createExecutiveId)
      .then((res) => {
        setinitialValues(res.data);
      })
      .catch((err) => {});
  }, []);
  const [initialValues, setinitialValues] = useState({
    userName: "",
    email: "",
    location: "",
    phoneNumber: "",
    serviceLocations: [
      {
        pinCode: "",
      },
      {
        pinCode: "",
      },
    ],

    password: "",
    executiveType: "executive",
  });
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={createExecutiveId == null ? false : true}
      onSubmit={async (values, { resetForm }) => {
        if (createExecutiveId == null) {
          Service.CreateExecutive(values)
            .then((res) => {
              resetForm({ values: "" });
              setSuccessOpen(true);
            })
            .catch((error) => {
              setErrorOpen(true);
            });
        } else {
          Service.EditExecutive(values, createExecutiveId)
            .then((res) => {
              resetForm({ values: "" });
              setSuccessOpen(true);
            })
            .catch((error) => {
              setSuccessOpen(true);
            });
        }
      }}
    >
      {({ values }) => (
        <Form className="formBody">
          <div className="Row">
            <div className="insider">
              <div className="rowspace"></div>
              <Row className="row">
                <div className="labelText">User Name</div> {/*UserName*/}
                <div className="textFormik_flex8">
                  <Field
                    className="textFormikField_flex8"
                    placeholder="UserName"
                    id="userName"
                    name="userName"
                    required
                  />
                </div>
                <div className="labelText">Email</div> {/* Email*/}
                <div className="textFormik_flex8">
                  <Field
                    className="textFormikField_flex8"
                    placeholder="Email"
                    id="email"
                    name="email"
                    required
                  />
                </div>
              </Row>

              <Row className="row">
                <div className="labelText">Location</div> {/*Location*/}
                <div className="textFormik_flex8">
                  <Field
                    className="textFormikField_flex8"
                    placeholder="Location"
                    id="location"
                    name="location"
                    required
                  />
                </div>
                <div className="labelText">Mobile No.</div> {/* Mobile No.*/}
                <div className="textFormik_flex8">
                  <Field
                    className="textFormikField_flex8"
                    placeholder="phoneNumber."
                    id="phoneNumber"
                    name="phoneNumber"
                    required
                  />
                </div>
              </Row>
            </div>
            <div className="rowspace"></div>
            {/* <FieldArray name="serviceLocations">
              {({ insert, remove, push }) => (
                <div>
                  <div className="titleText">Service Locations</div>
                  <hr />
                  <div className="rowspace"></div>
                  {values.serviceLocations.length > 0 &&
                    values.serviceLocations.map((serviceLocations, index) => (
                      <div className="insider" key={index}>
                        <Row className="row">
                          <div className="labelText">Pincode</div>
                          <div className="textFormik_flex8">
                            <Field
                              className="textFormikField_flex8"
                              placeholder="684825"
                              required
                              id="pinCode"
                              name={`serviceLocations.${index}.pinCode`}
                            />
                          </div>
                          <div className="labelText"></div>
                          <div className="btnFormik_flex3">
                            <Row className="align">
                              {values.serviceLocations.length > 1 ? (
                                <button
                                  type="button"
                                  className="button"
                                  onClick={() => remove(index)}
                                >
                                  Delete
                                </button>
                              ) : null}
                              <div className="spacebtwn"></div>
                              <button
                                type="button"
                                className="button"
                                onClick={() =>
                                  push({ pinCode: "", pinCode: "" })
                                }
                              >
                                Add
                              </button>
                            </Row>
                          </div>
                        </Row>
                      </div>
                    ))}
                </div>
              )}
            </FieldArray> */}
            <div className="titleText">Password</div>
            <hr />
            <div className="rowspace"></div>
            <div className="insider">
              <Row className="row">
                <div className="labelText">Password </div>
                {/*Password*/}

                <div className="textFormik_flex8">
                  <Field
                    className="textFormikField_flex8"
                    placeholder="**********"
                    id="password"
                    name="password"
                    type="password"
                  />
                </div>
              </Row>
            </div>
            <div className="rowspace"></div>
            <div className="createbtn">
              <button className="button">
                {createExecutiveId == null ? "Save" : "Update"}{" "}
              </button>
            </div>{" "}
            <div className="rowspace"></div>
            <Snackbar
              open={successOpen}
              autoHideDuration={600}
              onClose={handleClose}
            >
              {createExecutiveId ? (
                <Alert onClose={handleClose} severity="success">
                  Success! Executive successfully updated
                </Alert>
              ) : (
                <Alert onClose={handleClose} severity="success">
                  Success! Executive successfully saved
                </Alert>
              )}
            </Snackbar>
            <Snackbar
              open={errorOpen}
              autoHideDuration={600}
              onClose={handleClose}
            >
              {createExecutiveId ? (
                <Alert onClose={handleClose} severity="error">
                  Error! Executive has not been updated
                </Alert>
              ) : (
                <Alert onClose={handleClose} severity="error">
                  Error! Executive has not been saved
                </Alert>
              )}
            </Snackbar>
          </div>
        </Form>
      )}
    </Formik>
  );
}
export default CreateExecutive;
