import { Snackbar } from "@material-ui/core";
import React, { useState, useEffect, useHistory } from "react";
import { Row } from "react-bootstrap";
import { FaPen } from "react-icons/fa";
import "./form.css";
import { Formik, Field, Form, FieldArray } from "formik";
import Service from "../../../api/service";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function AddStockingPoint({ stockingPointId }) {
  const [state, setState] = useState([]);
  const [region, setregion] = useState([]);
  const [district, setdistrict] = useState([]);
  const [callCenter, setCallCenter] = useState([]);
  const [sCODE, setsCODE] = useState("");
  const [city, setcity] = useState([]);
  const [posts, setPost] = useState([]);

  const [successOpen, setSuccessOpen] = React.useState(false);
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [restPassword, setRestPassword] = React.useState(false);

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
  const getactivecountry = () => {
    Service.GetActiveCountry()
      .then((res) => {
        setPost(res.data);
        // console.log("GetActiveCountry", res.data);
      })
      .catch((err) => {});
  };
  const getactivecity = () => {
    Service.GetActiveCity()
      .then((res) => {
        setcity(res.data);
        // console.log("GetActiveCity", res.data);
      })
      .catch((err) => {});
  };
  const getActiveDistrict = () => {
    Service.GetActiveDistrict()
      .then((res) => {
        setdistrict(res.data);
        // console.log("GetActiveDistrict", res.data);
      })
      .catch((err) => {});
  };
  const getactivestate = () => {
    Service.GetActiveState()
      .then((res) => {
        setState(res.data);
        // console.log("setState", res.data);
      })
      .catch((err) => {});
  };
  const getactiveregion = () => {
    Service.GetActiveRegion()
      .then((res) => {
        setregion(res.data);
      })
      .catch((err) => {});
  };
  const getexecutive = () => {
    Service.GetExecutive()
      .then((res) => {
        // console.log(res, "executive");
        setCallCenter(res.data);
      })
      .catch((err) => {});
  };
  const getstockingpoint = () => {
    Service.GetStockingPointById(stockingPointId)
      .then((res) => {
        // console.log(res, "stockpoint");
        setinitialValues(res.data);
      })
      .catch((err) => {});
  };
  const getstockingpointcode = () => {
    Service.GetStockingpointCode()
      .then((res) => {
        // console.log(res, "stockpointcod");
        setsCODE(res.data.idd);
      })
      .catch((err) => {});
  };
  useEffect(() => {
    getexecutive();
    getactiveregion();
    getactivestate();
    getActiveDistrict();
    getactivecity();
    getactivecountry();
    getstockingpoint();
    getstockingpointcode();
  }, []);

  // console.log("stokingPoint==>>", sCODE);
  const [initialValues, setinitialValues] = useState({
    stockingPointCode: sCODE,
    name: "",
    contactPerson: "",
    phoneNumber: "",
    email: "",
    website: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    district: "",
    state: "",
    country: "",
    region: "",
    pinCode: "",
    delivery_Location: [
      {
        pinCode: "",
      },
    ],
    modeOfDelivery: "",
    agentOrSelf: "",
    charges: "",
    chargeType: "",
    callCenter_Assigned: "",
    stockingPointType: "stockingPoint",
  });

  const submit = (values, { resetForm }) => {
    if(stockingPointId != null){
      if(!restPassword){
delete values.password
      }
    }
    const newdata = { ...values };
  //  console.log(values );
  //  console.log(delete values.password );
    newdata["stockingPointCode"] = sCODE;
    // console.log(newdata, "valuesss");

    if (stockingPointId == null) {
      // console.log(newdata, "valuesss");
      Service.CreateStockingpoint(newdata)
        .then((res) => {
          // console.log(res, "rres");
          resetForm({ values: "" });
          setSuccessOpen(true);
        })
        .catch((error) => {
          setErrorOpen(true);
        });
      // console.log(newdata, "nnnnn");
    } else {
      console.log(newdata, "valuesss");
      Service.EditStockingpoint(newdata, stockingPointId)
        .then((res) => {
          setSuccessOpen(true);
        })
        .catch((error) => {
          setErrorOpen(true);
        });
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={stockingPointId == null ? false : true}
      onSubmit={submit}
    >
      {({ values }) => (
        <Form className="formBody">
          <Row className="row">
            <div className="titleText">
              <FaPen />
            </div>
            <div className="titleText">
              {" "}
              {stockingPointId == null ? "Add" : "Edit"} Stocking Point
            </div>
          </Row>

          <hr />
          <div className="rowspace"></div>
          <div className="insider">
            {/* Stocking Point Code*/}
            <Row className="row">
              <div className="labelText">Stocking Point Code </div>{" "}
              <div className="textFormik_flex8">
                {stockingPointId == null ? (
                  <Field
                    className="textFormikField_flex8"
                    placeholder="stocking Point Code"
                    value={sCODE}
                    required
                    id="stockingPointCode"
                    name="stockingPointCode"
                  />
                ) : (
                  <Field
                    className="textFormikField_flex8"
                    placeholder="stocking Point Code"
                    value={initialValues.stockingPointCode}
                    required
                    id="stockingPointCode"
                    name="stockingPointCode"
                  />
                )}
              </div>
            </Row>
            {/* Stocking Point Name*/}
            <Row className="row">
              <div className="labelText">Stocking Point Name</div>{" "}
              <div className="textFormik_flex8">
                <Field
                  className="textFormikField_flex8"
                  placeholder="Name"
                  required
                  id="name"
                  name="name"
                />
              </div>
            </Row>
            {/* Contact Person*/}
            <Row className="row">
              <div className="labelText">Contact Person</div>{" "}
              <div className="textFormik_flex8">
                <Field
                  className="textFormikField_flex8"
                  placeholder="Contact Person"
                  required
                  id="contactPerson"
                  name="contactPerson"
                />
              </div>
            </Row>
            {/* Phone Number*/}
            <Row className="row">
              <div className="labelText">Phone Number</div>{" "}
              <div className="textFormik_flex8">
                <Field
                  className="textFormikField_flex8"
                  placeholder="7857575754"
                  required
                  id="phoneNumber"
                  name="phoneNumber"
                  type="number"
                />
              </div>
            </Row>
            <Row className="row">
              <div className="labelText">Email</div> {/*Email*/}
              <div className="textFormik_flex8">
                <Field
                  className="textFormikField_flex8"
                  multiline
                  placeholder="email@gmail.com"
                  required
                  id="email"
                  name="email"
                  type="email"
                />
              </div>
            </Row>
            <Row className="row">
              <div className="labelText">Website</div> {/*Website*/}
              <div className="textFormik_flex8">
                <Field
                  className="textFormikField_flex8"
                  multiline
                  placeholder="lazzatvm.com"
                  id="website"
                  name="website"
                />
              </div>
            </Row>
            <Row className="row">
              <div className="labelText">Address Line1</div> {/*Address Line1*/}
              <div className="textFormik_flex8">
                <Field
                  className="textFormikField_flex8"
                  multiline
                  placeholder="Address Line1"
                  required
                  id="addressLine1"
                  name="addressLine1"
                />
              </div>
            </Row>
            <Row className="row">
              <div className="labelText">Address Line2</div> {/*Address Line2*/}
              <div className="textFormik_flex8">
                <Field
                  className="textFormikField_flex8"
                  multiline
                  placeholder="Address Line2"
                  id="addressLine2"
                  name="addressLine2"
                />
              </div>
            </Row>
            <Row className="row">
              <div className="labelText">Country</div> {/* Country*/}
              <div className="textFormik_flex3">
                <Field
                  className="textFormikField_flex8"
                  placeholder="India"
                  id="country"
                  name="country"
                  as="select"
                  required
                >
                  <option>Select Country</option>
                  {posts.map((post) => (
                    <option key={post._id} value={post.countryName}>
                      {post.countryName}
                    </option>
                  ))}
                </Field>
              </div>
              <div className="labelText">State</div> {/*State*/}
              <div className="textFormik_flex3">
                <Field
                  className="textFormikField_flex8"
                  placeholder="Kerala"
                  required
                  id="state"
                  name="state"
                  as="select"
                >
                  <option>Select State</option>
                  {state.map((state) => (
                    <option key={state._id} value={state.stateName}>
                      {state.stateName}
                    </option>
                  ))}
                </Field>
              </div>
            </Row>
            <Row className="row">
              <div className="labelText">District</div> {/*District*/}
              <div className="textFormik_flex3">
                <Field
                  className="textFormikField_flex8"
                  placeholder="Trivandrum"
                  required
                  id="district"
                  name="district"
                  as="select"
                >
                  <option>Select District</option>
                  {district.map((district) => (
                    <option key={district._id} value={district.districtName}>
                      {district.districtName}
                    </option>
                  ))}
                </Field>
              </div>
              <div className="labelText">City</div> {/*City*/}
              <div className="textFormik_flex3">
                <Field
                  className="textFormikField_flex8"
                  placeholder="SreeKariyam"
                  id="city"
                  name="city"
                  as="select"
                  required
                >
                  <option>Select City</option>
                  {city.map((city) => (
                    <option key={city._id} value={city.cityName}>
                      {city.cityName}
                    </option>
                  ))}
                </Field>
              </div>
            </Row>

            <Row className="row">
              <div className="labelText">Region</div> {/*Region*/}
              <div className="textFormik_flex3">
                <Field
                  className="textFormikField_flex8"
                  placeholder="SreeKariyam"
                  required
                  id="region"
                  name="region"
                  as="select"
                >
                  <option>Select Region</option>
                  {region.map((region) => (
                    <option key={region._id} value={region.regionName}>
                      {region.regionName}
                    </option>
                  ))}
                </Field>
              </div>
              <div className="labelText">Pincode</div> {/* Pincode*/}
              <div className="textFormik_flex3">
                <Field
                  className="textFormikField_flex8"
                  placeholder="687656"
                  id="pinCode"
                  name="pinCode"
                />
              </div>
            </Row>
          </div>

          <FieldArray name="delivery_Location">
            {({ insert, remove, push }) => (
              <div>
                <div className="titleText">Delivery Location</div>
                <hr />
                <div className="rowspace"></div>
                {values.delivery_Location.length > 0 &&
                  values.delivery_Location.map((delivery_Location, index) => (
                    <div className="insider" key={index}>
                      <Row className="row">
                        <div className="labelText">Pincode</div> {/*Pincode*/}
                        <div className="textFormik_flex3">
                          <Field
                            className="textFormikField_flex8"
                            placeholder="684825"
                            id="pinCode"
                            name={`delivery_Location.${index}.pinCode`}
                          />
                        </div>
                        <div className="labelText"></div> {/* Pincode*/}
                        <div className="btnFormik_flex3">
                          <Row className="align">
                            {values.delivery_Location.length > 1 ? (
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
                              onClick={() => push({ pinCode: "" })}
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
          </FieldArray>
          <hr />
          <div className="rowspace"></div>
          <div className="insider">
            <Row className="row">
              <div className="labelText">Mode of Delivery</div>{" "}
              {/*Address Line2*/}
              <div className="textFormik_flex8">
                <Field
                  className="textFormikField_flex8"
                  multiline
                  placeholder="Mode Of Delivery"
                  required
                  id="modeOfDelivery"
                  name="modeOfDelivery"
                  as="select"
                >
                  <option>Select One</option>

                  <option value={"agent"}>{"Agent"}</option>
                  <option value={"self"}>{"Self"}</option>
                </Field>
              </div>
            </Row>
            <Row className="row">
              <div className="labelText">Name of Agent / Name of Self </div>{" "}
              {/*Address Line2*/}
              <div className="textFormik_flex8">
                <Field
                  className="textFormikField_flex8"
                  multiline
                  placeholder="Name of Agent / Name of Self "
                  required
                  id="agentOrSelf"
                  name="agentOrSelf"
                  required
                  as="select"
                >
                  <option>Select One</option>

                  <option value={"agent"}>{"Agent"}</option>
                  <option value={"self"}>{"Self"}</option>
                </Field>
              </div>
            </Row>

            <Row className="row">
              <div className="labelText">Charge Type</div> {/*Address Line2*/}
              <div className="textFormik_flex8">
                <Field
                  className="textFormikField_flex8"
                  multiline
                  placeholder="Charge Type"
                  required
                  id="chargeType"
                  name="chargeType"
                  as="select"
                >
                  <option>Select One</option>

                  <option value={"Percentage"}>{"Percentage"}</option>
                  <option value={"Amount"}>{"Fixed"}</option>
                </Field>
              </div>
            </Row>
            <Row className="row">
              <div className="labelText">Charges</div> {/*Address Line2*/}
              <div className="textFormik_flex8">
                <Field
                  className="textFormikField_flex8"
                  multiline
                  placeholder="Charges"
                  required
                  id="charges"
                  name="charges"
                />
              </div>
            </Row>
          </div>
          <div className="titleText">Password</div>
          <hr />

          <div className="rowspace"></div>

          <div className="insider">
            <Row className="row">
              <div className="labelText">Password </div>
              {/*Password*/}
             {stockingPointId == null ? null : !restPassword? <div className="textFormik_flex8"> <button className="button" onClick={()=>setRestPassword(true)}>RESET
            </button></div>:null}

              {stockingPointId == null || restPassword ?<div className="textFormik_flex8">
                <Field
                  className="textFormikField_flex8"
                  placeholder="**********"
                  id="password"
                  name="password"
                  type="password"
                  required
                />
              </div> : null}
            </Row>
          </div>
          <div className="ffrowspace"></div>
          <div className="createbtn">
            <button className="button">
              {stockingPointId == null ? "SAVE" : "UPDATE"}
            </button>
          </div>

          <div className="ffrowspace"></div>
          <Snackbar
            open={successOpen}
            autoHideDuration={600}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="success">
              {stockingPointId ? (
                <Alert onClose={handleClose} severity="success">
                  Success! The Stocking Point successfully updated
                </Alert>
              ) : (
                <Alert onClose={handleClose} severity="success">
                  Success! The Stocking Point successfully saved
                </Alert>
              )}
            </Alert>
          </Snackbar>
          <Snackbar
            open={errorOpen}
            autoHideDuration={600}
            onClose={handleClose}
          >
            {stockingPointId ? (
              <Alert onClose={handleClose} severity="error">
                Error! The Stocking Point has not been updated
              </Alert>
            ) : (
              <Alert onClose={handleClose} severity="error">
                Error! The Stocking Point has not been saved
              </Alert>
            )}
          </Snackbar>
          {/* </div> */}
        </Form>
      )}
    </Formik>
  );
}
export default AddStockingPoint;
