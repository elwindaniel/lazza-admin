import { Button, TextField, Snackbar } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { FaPen } from "react-icons/fa";
import axios from "../../../api/axios";
import Service from "../../../api/service";
import SessionCheck from "../../../api/sessionCheck";
import "./form.css";
import {
  customersRequests,
  countryRequests,
  stateRequests,
  districtRequests,
  cityRequests,
} from "../../../api/constants";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
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
const session = {
  token: sessionStorage.getItem("token"),
};
function AddCustomer({ customerId, itemId }) {
  const [state, setState] = useState([]);
  const [countryName, setCountryName] = useState([]);
  const [stateName, setStateName] = useState([]);
  const [district, setdistrict] = useState([]);
  const [city, setcity] = useState([]);
  const [posts, setPost] = useState([]);
  const POST_URL = `${customersRequests.createUser}`;
  const GET_URL = `${countryRequests.getActiveCountry}`;
  const GETSTATE_URL = `${stateRequests.getAllState}`;
  const GETCountryById_URL = `${countryRequests.getCountryById}`;
  const GETSTATEById_URL = `${stateRequests.getstatebyid}`;
  const GETStateName = `${stateRequests.getStateName}`;
  const GETDISTRICT_URL = `${districtRequests.getActiveDistrict}`;
  const GETDistrictByStateId = `${districtRequests.getDistrictByStateId}`;
  const GETCity_URL = `${cityRequests.getActiveCity}`;
  const EDIT_URL = `${customersRequests.edituser}/${customerId}`;
  const [successOpen, setSuccessOpen] = useState(false);
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
  let currentCountry;
  const getactivecountry = () => {
    Service.GetActiveCountry()
      .then((res) => {
        currentCountry = res.data.find((country) => {
          return country._id == initialValues.address.country;
        });
        setPost(res.data);
      })
      .catch((err) => {});
  };
  const getactivestate = () => {
    Service.GetActiveCity()
      .then((res) => {
        setcity(res.data);
      })
      .catch((err) => {});
  };
  const getactivedistrict = () => {
    Service.GetActiveDistrict()
      .then((res) => {
        setdistrict(res.data);
      })
      .catch((err) => {});
  };
  const getactivecity = () => {
    Service.GetActiveState()
      .then((res) => {
        setState(res.data);
      })
      .catch((err) => {});
  };
  const getuserid = () => {
    Service.GetUserById(customerId)
      .then((res) => {
        // console.log(res, "ressss1111");
        setinitialValues(res.data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getuserid();
    getactivecity();
    getactivecity();
    getactivedistrict();
    getactivestate();
    getactivecountry();
  }, []);
  const [initialValues, setinitialValues] = useState({
    name: "",
    userType: "",
    email: "",
    phoneNumber: "",
    password: "",
    address: [
      {
        addressLine1: "",
        addressLine2: "",
        street: "",
        city: "",
        district: "",
        state: "",
        country: "",
        zipcode: "",
      },
    ],
  });
  const userdetails = SessionCheck.getLoggedinUserId();
  const userId = userdetails.userId;
  const userType = userdetails.userType;
  /****************************************
            GET STATE By Id
  *****************************************/
  const GetRegions = (country) => {
    axios
      .get(GETSTATEById_URL + "/" + country)
      .then((res) => {
        setState(res.data);
      })
      .catch((err) => {});
    axios
      .get(GETCountryById_URL + "/" + country)
      .then((res) => {
        setCountryName(res.data);
      })
      .catch((err) => {});
    // Simulate async call
    return new Promise((resolve, reject) => {
      switch (country) {
        default:
          resolve([]);
      }
    });
  };
  /****************************************
                GetDistrict
*****************************************/
  const GetDistrict = (state) => {
    axios
      .get(GETDistrictByStateId + "/" + state)
      .then((res) => {
        setdistrict(res.data);
      })
      .catch((err) => {});
    axios
      .get(GETStateName + "/" + state)
      .then((res) => {
        setStateName(res.data);
      })
      .catch((err) => {});
    // Simulate async call
    return new Promise((resolve, reject) => {
      switch (state) {
        default:
          resolve([]);
      }
    });
  };

  /****************************************
                  submit
  *****************************************/

  const submit = (values, { resetForm }) => {
    if (customerId == null) {
      axios
        .post(POST_URL, values)
        .then((res) => {
          resetForm({ values: "" });
          setSuccessOpen(true);
        })
        .catch((error) => {
          setErrorOpen(true);
        });
    } else {
      axios
        .put(EDIT_URL, values)
        .then((res) => {
          resetForm({ values: "" });
          setSuccessOpen(true);
        })
        .catch((error) => {
          setErrorOpen(true);
        });
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        enableReinitialize={customerId == null ? false : true}
        onSubmit={submit}
      >
        {({ values, setFieldValue }) => (
          <Form className="formBody">
            <Row className="row">
              <div className="titleText">
                {itemId == null ? <FaPen /> : null}
              </div>
              {itemId == null ? (
                <div className="titleText">
                  {customerId == null ? "Add" : "Edit"} Customer
                </div>
              ) : (
                <div className="titleText">View Customer</div>
              )}
            </Row>
            <hr />
            <div className="rowspace"></div>
            <div className="insider">
              {/* Customer Name*/}
              <Row className="row">
                <div className="labelText">Customer Name</div>{" "}
                <div className="textFormik_flex8">
                  <Field
                    className="textFormikField_flex8"
                    placeholder="Customer Name"
                    fullWidth
                    id="name"
                    name="name"
                  />
                </div>
              </Row>
              {userType == "admin" ? (
                <Row className="row">
                  <div className="labelText">User Type</div>{" "}
                  <div className="textFormik_flex8">
                    <Field
                      className="textFormikField_flex8"
                      placeholder="User Type"
                      fullWidth
                      id="userType"
                      name="userType"
                      required
                      as="select"
                    >
                      <option>Select User Type</option>

                      <option value={"admin"}>{"Admin"}</option>
                      <option value={"user"}>{"User"}</option>
                      <option value={"stockingPoint"}>
                        {"Stocking Point"}
                      </option>
                    </Field>
                  </div>
                </Row>
              ) : null}
              {/*Email*/}
              <Row className="row">
                <div className="labelText">Email</div>{" "}
                <div className="textFormik_flex8">
                  <Field
                    className="textFormikField_flex8"
                    placeholder="@gmail.com"
                    fullWidth
                    id="email"
                    name="email"
                    type="email"
                  />
                </div>
              </Row>
              {/* Telephone*/}
              <Row className="row">
                <div className="labelText">Telephone</div>{" "}
                <div className="textFormik_flex8">
                  <Field
                    className="textFormikField_flex8"
                    placeholder="Telephone"
                    fullWidth
                    id="phoneNumber"
                    name="phoneNumber"
                  />
                </div>
              </Row>
            </div>

            <FieldArray name="address">
              {({ insert, remove, push }) => (
                <div>
                  <div className="titleText">Address</div>

                  <hr />
                  <div className="ffrowspace"></div>
                  <div className="insider">
                    <div className="ffrowspace"></div>
                  </div>
                  <div className="rowspace"></div>
                  {values.address.length > 0
                    ? values.address.map((address, index) => (
                        <div className="insider" key={index}>
                          <Row className="row">
                            <div className="labelText">Address 1</div>{" "}
                            <div className="textFormik_flex8">
                              <Field
                                className="textFormikField_flex8"
                                placeholder="Address 1"
                                fullWidth
                                id="addressLine1"
                                name={`address.${index}.addressLine1`}
                              />
                            </div>
                            <ErrorMessage
                              name={`address.${index}.addressLine1`}
                              component="div"
                              className="field-error"
                            />
                          </Row>

                          <Row className="row">
                            <div className="labelText">Address 2</div>{" "}
                            <div className="textFormik_flex8">
                              <Field
                                className="textFormikField_flex8"
                                placeholder="Address 2"
                                fullWidth
                                id="addressLine2"
                                name={`address.${index}.addressLine2`}
                              />
                            </div>
                            <ErrorMessage
                              name={`address.${index}.addressLine2`}
                              component="div"
                              className="field-error"
                            />
                          </Row>
                          <Row className="row">
                            <div className="labelText">Country</div>{" "}
                            {/*Country*/}
                            <div className="textFormik_flex3">
                              {/* <Field
                              className="textFormikField_flex8"
                              placeholder="India"
                              as="select"
                              id="country"
                              name={`address.${index}.country`}
                              value={values.country}
                              onChange={async (e) => {
                                const { value } = e.target;
                                let jsonVariable = JSON.parse(value);
                                const _regions = await GetRegions(
                                  jsonVariable.id
                                );
                                setFieldValue(
                                  `address.${index}.country`,
                                  jsonVariable.countryName
                                );
                              }}
                            >
                              {" "}
                              <option>Select country</option>
                              {posts.map((post) => {
                                let json = {
                                  id: post._id,
                                  countryName: post.countryName,
                                };
                                let a = JSON.stringify(json);
                                return (
                                  <option key={post._id} value={a}>
                                    {post.countryName}
                                  </option>
                                );
                              })}
                            </Field> */}
                              {/* <Field
                              className="hiddenField"
                              value={countryName.countryName}
                            ></Field> */}
                              <Field
                                className="textFormikField_flex8"
                                placeholder="Address 2"
                                fullWidth
                                id="addressLine2"
                                name={`address.${index}.country`}
                              />
                            </div>{" "}
                            <ErrorMessage
                              name={`address.${index}.country`}
                              component="div"
                              className="field-error"
                            />
                            <div className="labelText">State</div> {/* State*/}
                            <div className="textFormik_flex3">
                              {/* <Field
                              className="textFormikField_flex8"
                              placeholder="Kerala"
                              name={`address.${index}.state`}
                              as="select"
                              id="stateId"
                              required
                              value={values.state}
                              onChange={async (e) => {
                                const { value } = e.target;
                                const _district = await GetDistrict(value);
                                setFieldValue(`address.${index}.state`, value);
                              }}
                            >
                              <option>Select State</option>
                              {state.map((state) => (
                                <option key={state._id} value={state._id}>
                                  {state.stateName}
                                </option>
                              ))}
                            </Field> */}
                              {/* <Field className="hiddenField"></Field> */}
                              <Field
                                className="textFormikField_flex8"
                                placeholder="Address 2"
                                fullWidth
                                id="addressLine2"
                                name={`address.${index}.state`}
                              />
                            </div>{" "}
                            <ErrorMessage
                              name={`address.${index}.state`}
                              component="div"
                              className="field-error"
                            />
                          </Row>
                          <Row className="row">
                            <div className="labelText">District</div>{" "}
                            {/*District*/}
                            <div className="textFormik_flex3">
                              {/* <Field
                              className="textFormikField_flex8"
                              placeholder="Trivandrum"
                              name={`address.${index}.district`}
                              as="select"
                              id="district"
                              required
                            >
                              <option>Select District</option>
                              {district.map((district) => (
                                <option
                                  key={district._id}
                                  value={district.districtName}
                                >
                                  {district.districtName}
                                </option>
                              ))}
                            </Field> */}
                              <Field
                                className="textFormikField_flex8"
                                placeholder="Address 2"
                                fullWidth
                                id="addressLine2"
                                name={`address.${index}.district`}
                              />
                            </div>{" "}
                            <ErrorMessage
                              name={`address.${index}.district`}
                              component="div"
                              className="field-error"
                            />
                            <div className="labelText">City</div> {/*City*/}
                            <div className="textFormik_flex3">
                              {/* <Field
                              className="textFormikField_flex8"
                              placeholder="Sreekariyam"
                              id="cityId"
                              name={`address.${index}.city`}
                              as="select"
                              required
                            >
                              <option>Select City</option>
                              {city.map((city) => (
                                <option key={city._id} value={city.cityName}>
                                  {city.cityName}
                                </option>
                              ))}
                            </Field> */}
                              <Field
                                className="textFormikField_flex8"
                                placeholder="Address 2"
                                fullWidth
                                id="addressLine2"
                                name={`address.${index}.city`}
                              />
                            </div>{" "}
                            <ErrorMessage
                              name={`address.${index}.city`}
                              component="div"
                              className="field-error"
                            />
                          </Row>
                          <Row className="row">
                            <div className="labelText">Street</div> {/*Street*/}
                            <div className="textFormik_flex3">
                              <Field
                                className="textFormikField_flex8"
                                placeholder="Kariyam"
                                id="street"
                                name={`address.${index}.street`}
                              />
                            </div>{" "}
                            <ErrorMessage
                              name={`address.${index}.street`}
                              component="div"
                              className="field-error"
                            />
                            <div className="labelText">Pin</div> {/* Pin*/}
                            <div className="textFormik_flex3">
                              <Field
                                className="textFormikField_flex8"
                                placeholder="689645"
                                id="zipcode"
                                name={`address.${index}.zipcode`}
                              />
                            </div>{" "}
                            <ErrorMessage
                              name={`address.${index}.zipcode`}
                              component="div"
                              className="field-error"
                            />
                          </Row>
                          <div className="ffrowspace"></div>
                          <Row className="align">
                            {itemId == null ? (
                              values.address.length > 1 ? (
                                <button
                                  type="button"
                                  className="button"
                                  onClick={() => remove(index)}
                                >
                                  Delete Address
                                </button>
                              ) : null
                            ) : null}
                            <div style={{ marginLeft: "20px" }}></div>
                            <div className="align">
                              {itemId == null ? (
                                <button
                                  type="button"
                                  className="button"
                                  onClick={() =>
                                    push({ addressLine1: "", addressLine2: "" })
                                  }
                                >
                                  Add Address
                                </button>
                              ) : null}
                            </div>
                          </Row>
                          <div className="frowspace"></div>
                        </div>
                      ))
                    : null}
                </div>
              )}
            </FieldArray>
            {/* </div> */}

            {itemId == null ? <div className="titleText">Password</div> : null}
            {itemId == null ? <hr /> : null}

            <div className="rowspace"></div>
            {itemId == null ? (
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
            ) : null}
            <div className="ffrowspace"></div>
            {itemId == null ? (
              <div className="createbtn">
                <button className="button">
                  {customerId == null ? "SAVE" : "UPDATE"}
                </button>
              </div>
            ) : null}
            <div className="rowspace"></div>
            <Snackbar
              open={successOpen}
              autoHideDuration={600}
              onClose={handleClose}
            >
              {itemId ? (
                <Alert onClose={handleClose} severity="success">
                  Success! The User successfully updated
                </Alert>
              ) : (
                <Alert onClose={handleClose} severity="success">
                  Success! The User successfully saved
                </Alert>
              )}
            </Snackbar>
            <Snackbar
              open={errorOpen}
              autoHideDuration={600}
              onClose={handleClose}
            >
              {itemId ? (
                <Alert onClose={handleClose} severity="error">
                  Error! The User has not been updated
                </Alert>
              ) : (
                <Alert onClose={handleClose} severity="error">
                  Error! The User has not been saved
                </Alert>
              )}
            </Snackbar>
          </Form>
        )}
      </Formik>
    </>
  );
}
export default AddCustomer;
