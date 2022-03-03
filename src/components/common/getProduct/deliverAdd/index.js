import React, { useState, useEffect } from "react";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Collapse from "@material-ui/core/Collapse";
import Alert from "@material-ui/lab/Alert";
import { user, orderRequests, cart } from "../../../../api/constants";
import Service from "../../../../api/service";
import Axios from "../../../../api/axios";

import { Formik, Field, Form } from "formik";
//Axios
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
}));

function AddDeliveryLocation({
  promocodeId,
  cartData,
  onSelect,
  onEdit,
  userId,
  cartInfo,
  total,
  name,
  phone,
  pinCode,
  selectedAddress,
  newAddress
}) {
  console.log(total, cartInfo, "promocodeId");
  const [error, setError] = useState(false);
  const [stockingPoint, setStockingPoint] = useState();
  const classes = useStyles();
  let creaateOrderLoading = true;
  const addtoCart_API = `${cart.addToCart}/`;
  const [initialValues, setinitialValues] = useState({
    address: [
      {
        addressLine1: "",
        addressLine2: "",
        street: "",
        city: "",
        district: "",
        state: "",
        country: "",
        zipcode: pinCode,
      },
    ],
  });
  const addresscheck = async () => {
    await Axios.post(addtoCart_API + "null/?zipCode=" + pinCode, cartInfo).then(
      (res) => {
        // console.log(res, "addresscheckres");
        setStockingPoint(res.data.selectedStockingPoints);
        cartData(res.data);
      }
    );
  };
  useEffect(() => {
    addresscheck();
  }, []);

  const submit = (values, { resetForm }) => {
    setinitialValues(values);
    addAddress()
    const newOrder = {
      customerMobileNumber: phone,
      name: name,
      razorpay_payment_id: "",
      customerId: cartInfo[0].customerid,
      razorpay_order_id: "",
      razorpay_signature: "",
      total: total,
      amount: total,
      productDetails: [],
      addressLine1:
        selectedAddress == null
          ? values.address[0].addressLine1
          : selectedAddress.addressLine1,
      addressLine2:
        selectedAddress == null
          ? values.address[0].addressLine2
          : selectedAddress.addressLine2,
      street:
        selectedAddress == null
          ? values.address[0].street
          : selectedAddress.street,
      city:
        selectedAddress == null ? values.address[0].city : selectedAddress.city,
      district:
        selectedAddress == null
          ? values.address[0].district
          : selectedAddress.district,
      state:
        selectedAddress == null
          ? values.address[0].state
          : selectedAddress.state,
      country:
        selectedAddress == null
          ? values.address[0].country
          : selectedAddress.country,
      zipcode: pinCode,
      selectedStockingPoints: stockingPoint,
      promoCodes: [promocodeId],
    };

    cartInfo.forEach((element) => {
      let res = {
        stockingPointId: element.stockingPointId,
        productName: element.variantName,
        variantId: element.variantId,
        variantName: element.variantName,
        productId: element.productId,
        quantity: element.quantity,
        rate: element.rate,
        _id: element._id,
      };
      newOrder.productDetails.push(res);
    });

    console.log(newOrder, "newOrder");
    creaateOrderLoading = true;
    console.log(newOrder, "NEWoRDER");
    Service.CreateOrder(newOrder).then((res) => {
      onSelect(res);
      creaateOrderLoading = false;
    });
  };

  const addAddress = () => {
    console.log(initialValues.address[0], "addAddress")
    if (newAddress) {
      Axios.put("user/addNewAddress/" + userId, initialValues).then(
        (res) => {
          console.log(res, "addresscheckres");
          // setStockingPoint(res.data.selectedStockingPoints);
          // cartData(res.data);
        }
      );
    }
  }

  return (
    <Paper className={classes.paper} elevation={0}>
      <CssBaseline />
      <Formik initialValues={initialValues} onSubmit={submit}>
        {({ values, setFieldValue }) => (
          <Form>
            <Grid container spacing={2}>
              <Collapse in={error}>
                <Alert severity="error">
                  This phone number is already exists!
                </Alert>
              </Collapse>

              <Grid item xs={12} sm={12}>
                <Field
                  component={TextField}
                  variant="outlined"
                  required
                  fullWidth
                  id="addressLine1"
                  label={selectedAddress == null ? "Address" : "Address"}
                  name={`address.${0}.addressLine1`}
                  value={
                    selectedAddress == null
                      ? values.addressLine1
                      : selectedAddress.addressLine1
                  }
                  onChange={async (e) => {
                    const { value } = e.target;
                    setFieldValue(`address.${0}.addressLine1`, value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Field
                  component={TextField}
                  variant="outlined"
                  name={`address.${0}.addressLine2`}
                  fullWidth
                  id="addressLine2"
                  label={selectedAddress == null ? "Landmark" : "Landmark"}
                  value={
                    selectedAddress == null
                      ? values.addressLine2
                      : selectedAddress.addressLine2
                  }
                  onChange={async (e) => {
                    const { value } = e.target;

                    setFieldValue(`address.${0}.addressLine2`, value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Field
                  component={TextField}
                  variant="outlined"
                  name={`address.${0}.street`}
                  fullWidth
                  id="street"
                  label={selectedAddress == null ? "street" : "street"}
                  value={
                    selectedAddress == null
                      ? values.street
                      : selectedAddress.street
                  }
                  onChange={async (e) => {
                    const { value } = e.target;

                    setFieldValue(`address.${0}.street`, value);
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Field
                  component={TextField}
                  variant="outlined"
                  name={`address.${0}.city`}
                  required
                  fullWidth
                  id="city"
                  label={selectedAddress == null ? "City" : "City"}
                  value={
                    selectedAddress == null ? values.City : selectedAddress.city
                  }
                  onChange={async (e) => {
                    const { value } = e.target;

                    setFieldValue(`address.${0}.city`, value);
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Field
                  component={TextField}
                  variant="outlined"
                  name={`address.${0}.district`}
                  required
                  fullWidth
                  id="district"
                  value={
                    selectedAddress == null
                      ? values.district
                      : selectedAddress.district
                  }
                  label={selectedAddress == null ? "District" : "District"}
                  onChange={async (e) => {
                    const { value } = e.target;

                    setFieldValue(`address.${0}.district`, value);
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Field
                  component={TextField}
                  variant="outlined"
                  name={`address.${0}.state`}
                  fullWidth
                  id="state"
                  value={
                    selectedAddress == null
                      ? values.state
                      : selectedAddress.state
                  }
                  label={selectedAddress == null ? "State" : "State"}
                  onChange={async (e) => {
                    const { value } = e.target;

                    setFieldValue(`address.${0}.state`, value);
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Field
                  component={TextField}
                  variant="outlined"
                  name={`address.${0}.zipcode`}
                  required
                  fullWidth
                  id="zipcode"
                  label={selectedAddress == null ? "zipcode" : "zipcode"}
                  value={pinCode}
                  onChange={async (e) => {
                    const { value } = e.target;

                    setFieldValue(`address.${0}.zipcode`, value);
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}></Grid>
              <Grid item xs={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  style={{
                    color: "#5d4037",
                    outline: "none",
                    marginTop: "20px",
                  }}
                  className={classes.submit}
                >
                  Place Order
                </Button>
                <Collapse in={error}>
                  <Alert severity="error">
                    This phone number is already exists!
                  </Alert>
                </Collapse>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Paper>
  );
}

export default AddDeliveryLocation;
