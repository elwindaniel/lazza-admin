import {
  Dialog, Snackbar,
  CircularProgress,
} from "@material-ui/core";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaPen } from "react-icons/fa";
import {
  API_URL,
  filterRequests,
  ProductRequests,
  SubcategoryRequests,
} from "../../../api/constants";
import { Row } from "react-bootstrap";
import { Formik, Field, Form, FieldArray } from "formik";
import "./form.css";
import MuiAlert from "@material-ui/lab/Alert";


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function AddProductFrom(props) {
  let { productId, pathName } = props;
  const GET_URLId = `${API_URL}${ProductRequests.getproductid}/${productId}`;
  const POST_URL = `${API_URL}${ProductRequests.createProduct}`;
  const EDIT_URL = `${API_URL}${ProductRequests.editProduct}/${productId}`;
  const [categories, setCategories] = useState({});
  const [subCategories, setSubCategories] = useState({});
  const [filterGpsData, setFilterGpsData] = useState({});
  const [filtersData, setFiltersData] = useState({});
  const [filter, setfilter] = useState([]);
  const [promo, setPromo] = useState();
  const [productData, setProductData] = useState({
    productName: "",
    categoryId: "",
    subCategoryId: "",
    description: "",
    filterGroups: [{
      filterGroupId: "",
      filterId: "",
    }],
    variants: [{
      variantName: "",
      quantity: "",
      regularPrice: "",
      discountPrice: "",
      variantDescription: "",
      productImage: "",
      promotionCode: [
        {
          promotionCodeId: "",
        },
      ],
    }],
  });

  const getData = () => {
    axios.get(GET_URLId).then((res) => {
      setProductData(res.data);
      if (productId) {
        getSubCategories(res.data.categoryId);
      }
      if (res.data.filterGroups) {
        //console.log(res.data.filterGroups, "res.data.filterGroups");
        setfilter(res.data.filterGroups);
        // setVariants(res.data.variants);
      }
    });
  };
  const getCategories = () => {
    axios.get(`${API_URL}master/getAllCategory`).then((res) => {
      setCategories(res.data);
    });
  };
  const getSubCategories = (id) => {
    axios
      .get(`${API_URL}${SubcategoryRequests.getSubCategorybyCategoryId}/${id}`)
      .then((res) => {
        setSubCategories(res.data);
      });
  };
  async function getAllActiveFilterGroup() {
    const res = await axios.get(`${API_URL}master/getActiveFilterGroup`);
    let response = res.data;
    setFilterGpsData(response);
  }
  async function getAllFilter() {
    const res = await axios.get(`${API_URL}master/getActiveFilter`);
    let response = res.data;
    setFiltersData(response);
  }
  async function getAllPromo() {
    const res = await axios.get(`${API_URL}master/getAllPromoCode`);
    let response = res.data;
    setPromo(response);
  }

  const getAllData = () => {
    getData();
    getCategories();
    getAllActiveFilterGroup();
    getAllFilter();
    getAllPromo();
  };

  useEffect(() => {
    getAllData();
  }, []);

  const ProductFilterSubmi = (val) => {
    //console.log(val, "val");
    setfilter(val);
    handleFilterClose();
  };

  const [filterOpen, setFilterOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [loadingOpen, setloadingOpen] = useState(false);

  const handleFilterClose = () => {
    setFilterOpen(false);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setErrorOpen(false);
    setSuccessOpen(false);
  };

  const productSubmit = (values, { resetForm }) => {
    //console.log(values, "values")
    let data = new FormData();

    data.append("productName", values.productName);
    data.append("categoryId", values.categoryId);
    data.append("subCategoryId", values.subCategoryId);
    data.append("description", values.description);
    data.append("filterGroups", JSON.stringify(values.filterGroups));

    let variantsArray = [];

    for (let i of values.variants) {
      let variants = [];

      let variantData = {
        quantity: i.quantity,
        variantName: i.variantName,
        regularPrice: i.regularPrice,
        discountPrice: i.discountPrice,
        variantDescription: i.variantDescription,
        promotionCode: i.promotionCode,
        productImage:
          i.productImage == undefined ? i.imagePath : i.productImage,
        // productImage: i.productImage,
      };
      // //console.log(i.productImage, "i.poductimg");
      variantsArray.push(variantData);
    }
    for (let variant of variantsArray) {
      data.append("variants[]", JSON.stringify(variant));
      productId == null
        ? data.append(
          variant.variantName,
          variant.productImage,
          variant.productImage.name
        )
        : data.append(
          variant.variantName,
          variant.productImage
        );
    }

    if (productId == null) {
      setloadingOpen(true);
      axios
        .post(POST_URL, data)
        .then((res) => {
          setSuccessOpen(true);
          setloadingOpen(false);
          resetForm({ data: "" });
        })
        .catch((error) => {
          setErrorOpen(true);
          setloadingOpen(false);
        });
    } else {
      setloadingOpen(true);
      axios
        .put(EDIT_URL, data)
        .then((res) => {
          getAllData();
          setSuccessOpen(true);
          setloadingOpen(false);
          resetForm({ data: "" });
        })
        .catch((error) => {
          setErrorOpen(true);
          setloadingOpen(false);
        });
    }
  };


  return (
    <>
      <Formik
        initialValues={productData}
        enableReinitialize={productId == null ? false : true}
        onSubmit={(values, { resetForm }) => productSubmit(values, { resetForm })}
      >
        {({ values, setFieldValue }) => (
          <Form className="formBody">
            <Row className="row">
              <div className="titleText">
                <FaPen />
              </div>
              <div className="titleText">
                {" "}
                {productId == null ? "Add" : "Edit"} Product
              </div>
            </Row>
            <hr />
            <div className="rowspa"></div>
            <div className="insider">
              {/* Product*/}
              <Row className="row">
                <div className="labelText">Product Name</div>{" "}
                <div className="textFormik_flex8">
                  <Field
                    className="textFormikField_flex8"
                    placeholder="Product Name"
                    id="productName"
                    name="productName"
                    required
                  />
                </div>
              </Row>
              {/*  Category*/}
              <Row className="row">
                <div className="labelText">Category</div>{" "}
                <div className="textFormik_flex8">
                  <Field
                    className="textFormikField_flex8"
                    placeholder="Category"
                    id="categoryId"
                    name="categoryId"
                    as="select"
                    required
                    onChange={async (e) => {
                      const { value } = e.target;
                      await getSubCategories(value);
                      setFieldValue(`categoryId`, value);
                    }}
                    value={values.categoryId}
                  >
                    <option>Select Category</option>
                    {categories?.length > 0
                      ? categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.categoryName}
                        </option>
                      ))
                      : null}
                  </Field>
                </div>
              </Row>
              {/* SubCategory*/}
              <Row className="row">
                <div className="labelText">SubCategory</div>{" "}
                <div className="textFormik_flex8">
                  <Field
                    className="textFormikField_flex8"
                    placeholder="SubCategory"
                    id="subCategoryId"
                    name="subCategoryId"
                    as="select"
                    required
                  >
                    <option>Select SubCategory</option>
                    {subCategories?.length > 0
                      ? subCategories.map((subCategory) => (
                        <option key={subCategory._id} value={subCategory._id}>
                          {subCategory.subCategoryName}
                        </option>
                      ))
                      : null}
                  </Field>
                </div>
              </Row>
              {/* Description*/}
              <Row className="row">
                <div className="labelText">Description</div>{" "}
                <div className="textFormik_flex8">
                  <Field
                    className="textFormikField_flex8"
                    multiline
                    rows={5}
                    placeholder="Description"
                    id="description"
                    name="description"
                    required
                  />
                </div>
              </Row>
            </div>
            {/* filter */}
            <hr />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="titleText">Filters</div>
            </div>
            <hr />


            <FieldArray name="filterGroups">
              {({ insert, remove, push }) => (
                <div>
                  {values.filterGroups.length > 0 && values.filterGroups.map((fg, index) => (
                    <div className="insider" key={index}>
                      <div className="rowspa"></div>
                      <Row className="row">
                        <div className="labelText">Filter Group</div>{" "}
                        {/* Filter Group*/}
                        <div className="textFormik_flex8">
                          <Field
                            className="textFormikField_flex8"
                            placeholder="Filter Group"
                            id="filterGroupId"
                            required
                            as="select"
                            name={`filterGroups.${index}.filterGroupId`}
                          >
                            <option>
                              Select a filter group
                            </option>
                            {filterGpsData?.length > 0
                              ? filterGpsData.map((filterGps) => (

                                <option key={filterGps._id} value={filterGps._id}>
                                  {filterGps.name}
                                </option>
                              ))
                              : null}
                          </Field>
                        </div>
                      </Row>
                      <Row className="row">
                        <div className="labelText">Filter </div>{" "}
                        {/* Filter*/}
                        <div className="textFormik_flex8">
                          <Field
                            className="textFormikField_flex8"
                            placeholder="Filter"
                            id="filterId"
                            required
                            as="select"
                            name={`filterGroups.${index}.filterId`}
                          >
                            <option>
                              Select a filter
                            </option>
                            {filtersData?.length > 0
                              ? filtersData.map((filterItem) => (
                                fg.filterGroupId === filterItem.filterGroupId ?
                                  <option key={filterItem._id} value={filterItem._id}>
                                    {filterItem.name}
                                  </option> : ""
                              ))
                              : null}
                          </Field>
                        </div>
                      </Row>   <Row className="align">
                        {values.filterGroups.length > 1 ? (
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
                            push({
                              filterGroupId: "",
                              filterId: "",
                            })
                          }
                        >
                          Add
                        </button>
                      </Row>
                    </div>

                  ))}
                </div>
              )}
            </FieldArray>
            <div className="rowspace"></div>

            <FieldArray name="variants">
              {({ insert, remove, push }) => (
                <div>
                  <hr />
                  <div className="titleText">Variants</div>
                  <hr />

                  {values.variants.length > 0 &&
                    values.variants.map((variants, index) => (
                      <div className="insider" key={index}>
                        <div className="rowspa"></div>{" "}
                        <Row className="row">
                          <div className="labelText">Variant Name</div>{" "}
                          {/* Variants*/}
                          <div className="textFormik_flex8">
                            <Field
                              className="textFormikField_flex8"
                              placeholder="Variant Name"
                              id="variantName"
                              required
                              name={`variants.${index}.variantName`}
                            />
                          </div>
                        </Row>
                        <Row className="row">
                          <div className="labelText">Quantity</div>{" "}
                          {/*Quantity*/}
                          <div className="textFormik_flex3">
                            <Field
                              className="textFormikField_flex8"
                              placeholder="Quantity"
                              id="quantity"
                              required
                              name={`variants.${index}.quantity`}
                            />
                          </div>
                          <div className="labelText">Regular Price</div>{" "}
                          {/* Regular Price*/}
                          <div className="textFormik_flex3">
                            <Field
                              className="textFormikField_flex8"
                              placeholder="Regular Price"
                              id="regularPrice"
                              required
                              name={`variants.${index}.regularPrice`}
                            />
                          </div>
                        </Row>
                        <Row className="row">
                          <div className="labelText">Description</div>{" "}
                          <div className="textFormik_flex3">
                            <Field
                              className="textFormikField_flex8"
                              multiline
                              required
                              rows={7}
                              placeholder="Description"
                              id="variantDescription"
                              name={`variants.${index}.variantDescription`}
                            />
                          </div>
                          <div className="labelText">Discount Price</div>{" "}
                          {/* Regular Price*/}
                          <div className="textFormik_flex3">
                            <Field
                              className="textFormikField_flex8"
                              placeholder="Discount Price"
                              id="discountPrice"
                              name={`variants.${index}.discountPrice`}
                            />
                          </div>
                        </Row>
                        <Row className="row">
                          <div className="labelText">promotion Code</div>{" "}
                          <div className="textFormik_flex3">
                            <Field
                              className="textFormikField_flex8"
                              placeholder="Promotion Code"
                              id="promotionCodeId"
                              name={`variants[${index}].promotionCode[${0}].promotionCodeId`}
                              as="select"
                              required
                            >
                              <option>Select Promocode</option>
                              {promo?.length > 0
                                ? promo.map((promoCode) => (
                                  <option key={promoCode._id} value={promoCode._id}>
                                    {promoCode.promotionalCode}
                                  </option>
                                ))
                                : null}
                            </Field>
                          </div>
                          <div className="labelText">Image</div>{" "}
                          <div className="textArea_flex3">
                            {productId == null ? (
                              <div></div>
                            ) : (
                              <div className="box">
                                <img
                                  src={
                                    productId == null
                                      ? null
                                      : API_URL +
                                      values.variants[index].imagePath
                                  }
                                  width="100px"
                                  height="100px"
                                />
                              </div>
                            )}

                            <div className="align-right">
                              <input
                                required={productId == null ? true : false}
                                type="file"
                                id="productImage"
                                name={`variants.${index}.productImage`}
                                onChange={(event) => {
                                  setFieldValue(
                                    `variants.${index}.productImage`,
                                    event.target.files[0]
                                  );
                                }}
                              />
                            </div>
                          </div>
                        </Row>
                        <Row className="align">
                          {values.variants.length > 1 ? (
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
                              push({
                                variantName: "",
                                variantName: "",
                              })
                            }
                          >
                            Add
                          </button>
                        </Row>
                      </div>
                    ))}
                </div>
              )}
            </FieldArray>
            <div className="rowspace"></div>
            <div className="rowspace"></div>
            <div className="buttons">
              <button className="button">
                {productId == null ? "SAVE" : "UPDATE"}
              </button>
            </div>
            <div className="rowspace"></div>
          </Form>
        )}
      </Formik>
      <Dialog open={filterOpen} onClose={handleFilterClose}>
        <ProductFilter
          filterData={productId ? filter : null}
          submitted={(val) => ProductFilterSubmi(val)}
        />
      </Dialog>
      <Snackbar
        open={successOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        {productId ? (
          <Alert onClose={handleClose} severity="success">
            Success! The Product successfully updated
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="success">
            Success! The Product successfully saved
          </Alert>
        )}
      </Snackbar>
      <Snackbar
        open={loadingOpen}
        autoHideDuration={60000}
        // onClose={handleClose}
        message={'"Please wait..", while file is uploading !'}
        action={<CircularProgress color="" />}
      />

      <Snackbar open={errorOpen} autoHideDuration={6000} onClose={handleClose}>
        {productId ? (
          <Alert onClose={handleClose} severity="error">
            Error! The product has not been updated
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error">
            Error! The product has not been saved
          </Alert>
        )}
      </Snackbar>
    </>
  );
}

export default AddProductFrom;

function ProductFilter(props) {
  //console.log(props.filterData);

  return (
    <div style={{ margin: 20, justifyContent: "center" }}>
      <div className="row">
        <div className="textFormik_flex3" style={{ marginRight: 10 }}>
          <div>Filter Group</div>
          <select
            className="textFormikField_flex8"
            placeholder="Filter Group"
            id="filterGroupId1"
          // value={filterEdit ? filterData.filterGroupId1 : fd1.filterGroupId}
          // onChange={async (e) => {
          //   filterHandle(e);
          //   await getFilter(e.target.value, 1);
          // }}
          >
            <option value="">Select Filter Group</option>

          </select>
        </div>
        <div className="textFormik_flex3">
          <div>Filter</div>
          <select
            className="textFormikField_flex8"
            placeholder="Filter"
            id="filterId1"
          // value={!filterEdit || filterData.filterId1 ? filterData.filterId1 : fd1.filterId}
          // onChange={(e) => filterHandle(e)}
          >
            <option value="">Select Filter</option>

          </select>
        </div>
      </div>

      <div style={{ margin: 22, alignContent: "center" }}>
        <button
          style={{ width: "100%" }}
          className="button"
          type="button"
        // onClick={() => filterSumbit()}
        >
          Add
        </button>
      </div>
    </div>
  );
}
