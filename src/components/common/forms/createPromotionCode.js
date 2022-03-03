import React, { useState, useEffect } from "react";
import { Button, TextField, Snackbar } from "@material-ui/core";
import "./form.css";
import Select from "react-select";
import MultiSelect from "react-multi-select-component";
import { Row, Col, Container } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import axios from "../../../api/axios";
import { FaPen } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import {
  PromoCodeRequests,
  categoryRequests,
  variantsRequests,
  customersRequests,
  product,
} from "../../../api/constants";
import {
  MdDelete,
  MdHelp,
  MdEdit,
  MdThumbUp,
  MdThumbDown,
  MdClose,
  MdCheckCircle,
} from "react-icons/md";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import "./form.css";
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

function CreatePromotionCode({ promoId }) {
  const GET_product_URL = `${product.getAllProduct}`;
  const GET_Category_URL = `${categoryRequests.getActiveCategory}`;
  const GET_Customer_URL = `${customersRequests.getActiveUser}`;
  const POST_URL = `${PromoCodeRequests.createPromo}`;
  const EDIT_URL = `${PromoCodeRequests.editPromo}/${promoId}`;
  const [successOpen, setSuccessOpen] = React.useState(false);
  const [errorOpen, setErrorOpen] = React.useState(false);
  const GETpromoid_URL = `${PromoCodeRequests.getAllPromoId}/${promoId}`;
  const history = useHistory();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    ///////

    setErrorOpen(false);
    setSuccessOpen(false);
  };
  const [initialValues, setinitialValues] = useState({
    promotionalCode: "",
    value: "",
    status: "",
    dateFrom: "",
    dateTo: "",
    minimumSpent: "",
    birthdayCustomers: "",
    anniversaryCustomers: "",
    description: "",
    specialDay: "",
    monthlyPayment: "",
    totalPayment: "",
    numberOfUse: "",
    products: [],
    productCategories: [],
    customers: [],
  });

  const [products, setproducts] = useState([]);
  const getC = () => {
    axios
      .get(GET_Category_URL)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {});
  };
  const getP = () => {
    axios
      .get(GET_product_URL)
      .then((res) => {
        setproducts(res.data);
      })
      .catch((err) => {});
  };
  const getCus = () => {
    axios
      .get(GET_Customer_URL)
      .then((res) => {
        setuser(res.data);
      })
      .catch((err) => {});
  };
  const [user, setuser] = useState([]);

  const GetPC = () => {
    axios
      .get(GETpromoid_URL)
      .then((res) => {
        let promocodedata = res.data;
        console.log(promocodedata, "promocodedata");
        if (res && res.data != undefined) {
          console.log(res.data, "esdata");
          if (
            promocodedata &&
            promocodedata.products &&
            promocodedata.products.length
          ) {
            promocodedata.products.map((data) => {
              productselected.push({
                label: data.name,
                value: data.productId,
              });
            });
          }
          if (
            promocodedata &&
            promocodedata.productCategories &&
            promocodedata.productCategories.length
          ) {
            promocodedata.productCategories.map((data) => {
              categorySelected.push({
                label: data.name,
                value: data.categoryId,
              });
            });
          }
          if (
            promocodedata &&
            promocodedata.customers &&
            promocodedata.customers.length
          ) {
            promocodedata.customers.map((data) => {
              selected.push({
                label: data.name,
                value: data.customerId,
              });
            });
          }
          setproductselected(productselected);
          setCategorySelected(categorySelected);
          setSelected(selected);
          setinitialValues(res.data);
        }
      })
      .catch((err) => {});
  };
  useEffect(() => {
    GetPC();
    getCus();
    getP();
    getC();
  }, []);

  const [posts, setPost] = useState([]);
  const customerOptions = [];
  const [selected, setSelected] = useState([]);
  const productCategoryOptions = [];
  const [categorySelected, setCategorySelected] = useState([]);
  const productOptions = [];
  const [productselected, setproductselected] = useState([]);

  const ddProduct = (e) => {
    const newState = { ...productselected, ...e };
    const result = Object.values(newState);
    setproductselected(result);
  };
  const ddCategory = (e) => {
    const newState = { ...categorySelected, ...e };
    const result = Object.values(newState);
    setCategorySelected(result);
  };
  const ddCustomer = (e) => {
    const newState = { ...selected, ...e };
    const result = Object.values(newState);
    setSelected(result);
  };

  let selectedProductIds = [];
  let selectedCategoryIds = [];
  let selectedCustomerIds = [];
  const submit = (values, { resetForm }) => {
    productselected.forEach((element) => {
      selectedProductIds.push(element.value);
    });
    values.products = [];
    values.products.push(...selectedProductIds);
    //
    categorySelected.forEach((element) => {
      selectedCategoryIds.push(element.value);
    });
    values.productCategories = [];
    values.productCategories.push(...selectedCategoryIds);
    //
    selected.forEach((element) => {
      selectedCustomerIds.push(element.value);
    });
    values.customers = [];
    values.customers.push(...selectedCustomerIds);

    if (promoId == null) {
      console.log(values, "values");
      axios
        .post(POST_URL, values)
        .then((res) => {
          resetForm({ values: "" });
          setSuccessOpen(true);
          history.push("/managepromotioncode");

          setSelected([]);
          setCategorySelected([]);
          setproductselected([]);
        })
        .catch((error) => {
          setErrorOpen(true);
        });
    } else {
      axios
        .put(EDIT_URL, values)
        .then((res) => {
          GetPC();
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
      enableReinitialize={promoId == null ? false : true}
      onSubmit={submit}
    >
      {({ values, setFieldValue }) => (
        <Form className="formBody">
          {" "}
          <Row className="row">
            <div className="spacebtwn"></div>
            <div className="titleText">
              <FaPen />
            </div>{" "}
            <div className="titleText">
              {" "}
              {promoId == null ? "Create" : "Edit"} Promotional Code
            </div>{" "}
          </Row>
          <div className="ffrowspace"></div>
          <hr />
          <div className="Row">
            {" "}
            <div className="insider">
              <div className="rowspace"></div>

              <Row className="row">
                <div className="labelText">Promotional Code</div>{" "}
                <div className="spacebtwn"></div>
                <div className="textFormik_flex8">
                  <Field
                    className="textFormikField_flex8"
                    placeholder="Christmas2020"
                    fullWidth
                    id="promotionalCode"
                    name="promotionalCode"
                    required
                  />
                </div>
              </Row>

              <Row className="row">
                <div className="labelText">Percentage / Amount</div>{" "}
                <div className="spacebtwn"></div>
                <div className="textFormik_flex8">
                  <Field
                    className="textFormikField_flex8"
                    multiline
                    placeholder="%"
                    fullWidth
                    id="status"
                    name="status"
                    required
                    as="select"
                  >
                    <option>Select one</option>
                    <option value={"amount"}>{"Amount"}</option>
                    <option value={"percentage"}>{"Percentage"}</option>
                  </Field>
                </div>
              </Row>
              <Row className="row">
                <div className="labelText">Value</div>{" "}
                <div className="spacebtwn"></div>
                <div className="textFormik_flex8">
                  <Field
                    className="textFormikField_flex8"
                    multiline
                    placeholder="value"
                    fullWidth
                    id="value"
                    name="value"
                    required
                  />
                </div>
              </Row>
              <Row className="row">
                <div className="labelText">Description</div>{" "}
                <div className="spacebtwn"></div>
                <div className="textFormik_flex8 ">
                  <Field
                    className="textFormikField_flex8"
                    placeholder="Description"
                    id="description"
                    name="description"
                  ></Field>
                </div>{" "}
              </Row>
              <Row className="row">
                <div className="labelText">Minimum Spent On a Purchase</div>
                <div className="spacebtwn"></div>
                <div className="textFormik_flex8">
                  <Field
                    className="textFormikField_flex8"
                    multiline
                    placeholder="Minimum Spent"
                    fullWidth
                    id="minimumSpent"
                    name="minimumSpent"
                    required
                  />
                </div>
              </Row>
              <Row className="row">
                <div className="labelText">Special Day</div>
                <div className="spacebtwn"></div>
                <div className="textFormik_flex8">
                  <Field
                    className="textFormikField_flex8"
                    multiline
                    placeholder="Special Day"
                    fullWidth
                    id="specialDay"
                    name="specialDay"
                    placeholder="02-10-2020"
                    type="date"
                    defaultValue="02-10-2020"
                    // required
                  />
                </div>
              </Row>
              <Row className="row">
                <div className="labelText">Monthly Spent</div>
                <div className="spacebtwn"></div>
                <div className="textFormik_flex8">
                  <Field
                    type="numeric"
                    className="textFormikField_flex8"
                    multiline
                    placeholder="Monthly Payment"
                    fullWidth
                    id="monthlyPayment"
                    name="monthlyPayment"
                    //required
                  />
                </div>
              </Row>
              <Row className="row">
                <div className="labelText">Total Spent</div>
                <div className="spacebtwn"></div>
                <div className="textFormik_flex8">
                  <Field
                    type="numeric"
                    className="textFormikField_flex8"
                    multiline
                    placeholder="Total Payment"
                    fullWidth
                    id="totalPayment"
                    name="totalPayment"
                    // required
                  />
                </div>
              </Row>
              <Row className="row">
                <div className="labelText">Product</div>
                <div className="spacebtwn"></div>
                <div
                  className="textFormik_flex8"
                  style={{
                    minWidth: "800px",
                    maxWidth: "1400px",
                    height: "100%",
                  }}
                >
                  {products && products.length
                    ? products.map((item) => {
                        productOptions.push({
                          label: item.variantName,
                          value: item.variantId,
                        });
                      })
                    : null}
                  <MultiSelect
                    className="textFormikField_flex8"
                    options={productOptions}
                    value={productselected || []}
                    id="products"
                    name={`products`}
                    onChange={(e) => ddProduct(e)}
                    labelledBy={"Select"}
                  />
                </div>
              </Row>

              <Row className="row">
                <div className="labelText">Product Categories</div>
                <div className="spacebtwn"></div>
                <div
                  className="textFormik_flex8"
                  style={{
                    minWidth: "800px",
                    maxWidth: "1400px",
                    height: "100%",
                  }}
                >
                  {posts && posts.length
                    ? posts.map((item) => {
                        productCategoryOptions.push({
                          label: item.categoryName,
                          value: item._id,
                        });
                      })
                    : null}
                  <MultiSelect
                    className="textFormikField_flex8"
                    options={productCategoryOptions}
                    value={categorySelected}
                    id="productCategories"
                    name={`productCategories`}
                    onChange={(e) => ddCategory(e)}
                    labelledBy={"Select"}
                  />
                </div>
              </Row>

              <Row className="row">
                <div className="labelText">Customers</div>
                <div className="spacebtwn"></div>
                <div
                  className="textFormik_flex8"
                  style={{
                    minWidth: "800px",
                    maxWidth: "1400px",
                    height: "100%",
                  }}
                >
                  {user && user.length
                    ? user.map((item) => {
                        customerOptions.push({
                          label: item.name,
                          value: item._id,
                        });
                      })
                    : null}
                  <MultiSelect
                    className="textFormikField_flex8"
                    options={customerOptions}
                    value={selected}
                    id="customers"
                    name={`customers`}
                    onChange={(e) => ddCustomer(e)}
                    labelledBy={"Select"}
                  />
                </div>
              </Row>
            </div>
            <div className="insider">
              <Row className="row">
                <div className="labelText">From</div>{" "}
                <div className="spacebtwn"></div>
                <div className="textFormik_flex8">
                  <Field
                    className="textFormikField_flex8"
                    placeholder="02-10-2020"
                    fullWidth
                    id="dateFrom"
                    name="dateFrom"
                    type="date"
                    defaultValue="02-10-2020"
                  />
                </div>{" "}
              </Row>
              <Row className="row">
                <div className="labelText">To</div>{" "}
                <div className="spacebtwn"></div>
                <div className="textFormik_flex8">
                  <Field
                    className="textFormikField_flex8"
                    placeholder="02-10-2020"
                    fullWidth
                    id="dateTo"
                    name="dateTo"
                    type="date"
                    defaultValue="02-10-2020"
                  />
                </div>{" "}
              </Row>
              <Row className="row">
                <div className="labelText">Number Of Use</div>{" "}
                <div className="spacebtwn"></div>
                <div className="textFormik_flex8 ">
                  <Field
                    className="textFormikField_flex8"
                    placeholder="1"
                    id="numberOfUse"
                    name="numberOfUse"
                  ></Field>
                </div>
              </Row>
              <div className="createbtn">
                <button className="button">
                  {" "}
                  {promoId == null ? "SAVE" : "UPDATE"}
                </button>
              </div>{" "}
              <div className="rowspace"></div>
            </div>
          </div>
          <Snackbar
            open={successOpen}
            autoHideDuration={600}
            onClose={handleClose}
          >
            {promoId ? (
              <Alert onClose={handleClose} severity="success">
                Success! Promotion Code successfully updated
              </Alert>
            ) : (
              <Alert onClose={handleClose} severity="success">
                Success! Promotion Code successfully saved
              </Alert>
            )}
          </Snackbar>
          <Snackbar
            open={errorOpen}
            autoHideDuration={600}
            onClose={handleClose}
          >
            {promoId ? (
              <Alert onClose={handleClose} severity="error">
                Error! Promotion Code has not been updated
              </Alert>
            ) : (
              <Alert onClose={handleClose} severity="error">
                Error! Promotion Code has not been saved
              </Alert>
            )}
          </Snackbar>
        </Form>
      )}
    </Formik>
  );
}
export default CreatePromotionCode;
