import { Button, TextField, Snackbar } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Service from "../../../api/service";
import { Row } from "react-bootstrap";
import { FaPen, FaCalendar } from "react-icons/fa";
import InputAdornment from "@material-ui/core/InputAdornment";
import sessionCheck from "../../../api/sessionCheck";

import "./form.css";
import {
  API_URL,
  deliveryBoyRequests,
  StockingPointRequests,
} from "../../../api/constants";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import MuiAlert from "@material-ui/lab/Alert";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function CreateDeliveryBoyForm({ deliveryId }) {
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [spName, setspName] = useState("");
  const userdetails = sessionCheck.getLoggedinUserId();
  const userType = userdetails.userType;
  const userId = userdetails.userId;
  const handleClick = () => {
    setSuccessOpen(true);
  };
  const [posts, setPost] = useState([]);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorOpen(false);
    setSuccessOpen(false);
  };
  const [stockPC, setstockPC] = useState([]);
  const getdeliveryid = () => {
    Service.GetDeliveryById(deliveryId)
      .then((res) => {
        setinitialValues(res.data);
        // console.log(res.data, "stockpccc");
        // // console.log(res.data.stockingPoint[0], "resdata");
        setstockPC(res.data.stockingPoint[0]);
        setspName(res.data.stockingPoint[0].stockingPointName);
      })
      .catch((err) => {});
  };
  const [stock, setstock] = useState([]);

  const getstockpoint = () => {
    userType === "stockingPoint"
      ? Service.GetStockingPointById(userId)
          .then((res) => {
            setstock(res.data);
            // console.log(res.data, "stock");
          })
          .catch((err) => {})
      : Service.GetStockingpoint()
          .then((res) => {
            setstock(res.data);
            // console.log(res.data, "stock");
          })
          .catch((err) => {});
  };
  useEffect(() => {
    getdeliveryid();
    getstockpoint();
    GetStockingPointCode();
  }, []);
  //
  const [pointCode, setPointCode] = useState([]);
  const GetStockingPointCode = (stockingPointCode) => {
    let spCode = userType === "stockingPoint" ? userId : stockingPointCode;
    Service.GetStockingPointById(spCode)
      .then((res) => {
        setPointCode(res.data);
      })
      .catch((err) => {});

    // Simulate async call
    return new Promise((resolve, reject) => {
      switch (stockingPointCode) {
        default:
          resolve([]);
      }
    });
  };
  // InitialValues
  const [initialValues, setinitialValues] = useState({
    stockingPoint: [
      {
        stockingPointCode: "",
        stockingPointName: "",
      },
    ],
    name: "",
    phoneNumber: "",
    email: "",
    joiningDate: "",
    deliveryBoyImage: "",
    password: "",
    deliveryBoyType: "deliveryBoy",
  });

  const submit = (values, { resetForm }) => {
    let data = new FormData();

    userType === "stockingPoint"
      ? data.append("stockingPoint[0].stockingPointCode", stock._id)
      : data.append(
          "stockingPoint[0].stockingPointCode",
          values.stockingPoint[0].stockingPointCode
        );

    userType === "stockingPoint"
      ? data.append("stockingPoint[0].stockingPointName", stock.name)
      : data.append("stockingPoint[0].stockingPointName", spName);
    data.append("name", values.name);
    data.append("phoneNumber", values.phoneNumber);
    data.append("email", values.email);
    data.append("joiningDate", values.joiningDate);
    data.append("password", values.password);
    data.append("deliveryBoyImage", values.deliveryBoyImage);

    if (deliveryId == null) {
      Service.CreateDeliveryBoy(data)

        .then((res) => {
          resetForm({ values: "" });
          setSuccessOpen(true);
        })
        .catch((error) => {
          setErrorOpen(true);
        });
    } else {
      Service.EditDeliveryBoy(data, deliveryId)

        .then((res) => {
          resetForm({ values: "" });
          setSuccessOpen(true);
        })
        .catch((error) => {
          setErrorOpen(true);
        });
    }
  };

  const GetName = (name) => {
    // console.log(name, "name");
    setspName(name);
  };
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={deliveryId == null ? false : true}
      onSubmit={submit}
    >
      {({ values, setFieldValue }) => (
        <Form className="formBody">
          <Row className="row">
            <div className="titleText">
              <FaPen />
            </div>
            <div className="titleText">
              {" "}
              {deliveryId == null ? "Create" : "Edit"} Delivery Boy
            </div>
          </Row>
          <hr />
          <FieldArray name="stockingPoint">
            {({ insert, remove, push }) => (
              <div>
                {values.stockingPoint.length > 0 &&
                  values.stockingPoint.map((stockingPoint, index) => (
                    <div className="insider" key={index}>
                      <br />
                      <br />

                      <Row className="row">
                        <div className="labelText">Stocking Point Code</div>{" "}
                        <div className="textFormik_flex8">
                          {userType === "stockingPoint" ? (
                            <Field
                              className="textFormikField_flex8"
                              placeholder="Distributor Code"
                              fullWidth
                              required
                              id="stockingPointCode"
                              name={`stockingPoint.${index}.stockingPointCode`}
                              value={stock.stockingPointId}
                            />
                          ) : (
                            <Field
                              className="textFormikField_flex8"
                              placeholder="Distributor Code"
                              fullWidth
                              required
                              id="stockingPointCode"
                              name={`stockingPoint.${index}.stockingPointCode`}
                              as="select"
                              value={values.stockingPointCode}
                              onChange={async (e) => {
                                const { value } = e.target;
                                let jsonVariable = JSON.parse(value);
                                const _regions = await GetName(
                                  jsonVariable.name
                                );
                                setFieldValue(
                                  `stockingPoint.${index}.stockingPointCode`,
                                  jsonVariable.id
                                );
                              }}
                            >
                              {/* <option key={stockPC._id}>{stockPC._id}</option> */}
                              {stockPC.length === 0 ? (
                                <option>Select Stocking Point </option>
                              ) : null}
                              {stock.map((post) => {
                                let json = {
                                  id: post._id,
                                  stockingPointCode: post.stockingPointId,
                                  name: post.name,
                                };
                                let a = JSON.stringify(json);
                                return stockPC.stockingPointCode == post._id ? (
                                  <option key={post._id} value={a}>
                                    {post.stockingPointId}
                                  </option>
                                ) : null;
                              })}
                              {stock.map((post) => {
                                let json = {
                                  id: post._id,
                                  stockingPointCode: post.stockingPointId,
                                  name: post.name,
                                };
                                let a = JSON.stringify(json);
                                return (
                                  <>
                                    <option key={post._id} value={a}>
                                      {post.stockingPointId}
                                    </option>
                                  </>
                                );
                              })}
                            </Field>
                          )}
                        </div>
                      </Row>
                      {/*  Stocking Point Name*/}
                      <Row className="row">
                        <div className="labelText">Stocking Point Name</div>{" "}
                        <div className="textFormik_flex8">
                          {userType === "stockingPoint" ? (
                            <Field
                              className="textFormikField_flex8"
                              placeholder="Stocking Point Name"
                              fullWidth
                              required
                              id="stockingPointName"
                              name={`stockingPoint.${index}.stockingPointName`}
                              value={stock.name}
                            />
                          ) : (
                            <Field
                              className="textFormikField_flex8"
                              placeholder="Stocking Point Name"
                              fullWidth
                              id="stockingPointName"
                              required
                              // value={spName}
                              value={
                                spName == ""
                                  ? stockPC.stockingPointName
                                  : spName
                              }
                              name={`stockingPoint.${index}.stockingPointName`}
                              onChange={async (e) => {
                                // console.log(value, "value");
                                const { value } = e.target;
                                setFieldValue(
                                  `stockingPoint.${index}.stockingPointName`,
                                  pointCode.stockingPointName
                                );
                              }}
                            ></Field>
                          )}
                        </div>
                      </Row>
                    </div>
                  ))}
              </div>
            )}
          </FieldArray>
          {/* Name*/}
          <div className="insider">
            <Row className="row">
              <div className="labelText">Name</div>{" "}
              <div className="textFormik_flex8">
                <Field
                  className="textFormikField_flex8"
                  placeholder="Name"
                  fullWidth
                  required
                  id="name"
                  name="name"
                />
              </div>
            </Row>
            {/* Phone Number*/}
            <Row className="row">
              <div className="labelText">Phone Number</div>{" "}
              <div className="textFormik_flex8">
                <Field
                  className="textFormikField_flex8"
                  placeholder="Phone Number"
                  fullWidth
                  required
                  id="phoneNumber"
                  name="phoneNumber"
                />
              </div>
            </Row>
            {/*  Email*/}
            <Row className="row">
              <div className="labelText">Email</div>{" "}
              <div className="textFormik_flex8">
                <Field
                  className="textFormikField_flex8"
                  placeholder="Email"
                  fullWidth
                  required
                  id="email"
                  name="email"
                />
              </div>
            </Row>
            <Row className="row">
              <div className="labelText">Joining Date</div> {/* Joining Date*/}
              <div className="textFormik_flex3">
                <Field
                  className="textFormikField_flex8"
                  placeholder="02-10-2020"
                  fullWidth
                  required
                  type="date"
                  id="joiningDate"
                  name="joiningDate"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaCalendar />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className="labelText">Address Proof</div> {/* Joining Date*/}
              <div className="textFormik_flex3">
                {deliveryId == null ? null : (
                  <img
                    src={API_URL + initialValues.imagePath}
                    width="80px"
                    height="80px"
                    object-fit="contain"
                  />
                )}
                <input
                  type="file"
                  required={deliveryId == null ? true : false}
                  name="deliveryBoyImage"
                  onChange={(event) =>
                    setFieldValue("deliveryBoyImage", event.target.files[0])
                  }
                />
              </div>
            </Row>

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

            <br />
            <div className="align-right">
              <button className="button">
                {deliveryId == null ? "SAVE" : "Edit"}
              </button>
            </div>
          </div>
          <Snackbar
            open={successOpen}
            autoHideDuration={600}
            onClose={handleClose}
          >
            {deliveryId ? (
              <Alert onClose={handleClose} severity="success">
                Success! Delivery Boy successfully updated
              </Alert>
            ) : (
              <Alert onClose={handleClose} severity="success">
                Success! Delivery Boy successfully saved
              </Alert>
            )}
          </Snackbar>
          <Snackbar
            open={errorOpen}
            autoHideDuration={600}
            onClose={handleClose}
          >
            {deliveryId ? (
              <Alert onClose={handleClose} severity="error">
                Error! Delivery Boy has not been updated
              </Alert>
            ) : (
              <Alert onClose={handleClose} severity="error">
                Error! Delivery Boy has not been saved
              </Alert>
            )}
          </Snackbar>
        </Form>
      )}
    </Formik>
  );
}
export default CreateDeliveryBoyForm;
