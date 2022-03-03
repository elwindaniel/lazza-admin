import React, { useState, useEffect } from "react";
import { Snackbar } from "@material-ui/core";
import "./form.css";
import {
  categoryRequests,
  API_URL,
  SubcategoryRequests,
} from "../../../api/constants";
import Service from "../../../api/service";
import { Formik, Field, Form } from "formik";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function CreateSubCategories({
  onSelect,
  itemId,
  itemcategoryId,
  itemName,
  itemImg,
}) {
  const POST_URL = `${SubcategoryRequests.createSubcategory}`;
  const EDIT_URL = `${SubcategoryRequests.editSubcategory}/${itemId}`;
  const GET_Category_URL = `${categoryRequests.getActiveCategory}`;
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
    Service.GetActiveCategory()
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {});
  }, []);
  const [posts, setPost] = useState([]);
  return (
    <Formik
      initialValues={{
        subCategoryName: itemId == null ? "" : itemName,
        categoryId: itemId == null ? "" : itemcategoryId,
        subcategoryImage: itemId == null ? "" : itemImg,
      }}
      onSubmit={async (values, { resetForm }) => {
        let data = new FormData();

        data.append("subcategoryImage", values.subcategoryImage);
        data.append("subCategoryName", values.subCategoryName);
        data.append("categoryId", values.categoryId);
        if (itemId == null) {
          Service.CreateSubCategory(data).then((res) => {
            onSelect();
            setSuccessOpen(true);
            resetForm({ values: "" });
          });
        } else {
          Service.EditSubCategory(data, itemId).then((res) => {
            onSelect();
            setSuccessOpen(true);
          });
        }
      }}
    >
      {(formProps) => (
        <Form className="formBody">
          <div className="Row">
            <div className="insider">
              <div className="titleText">
                {" "}
                {itemId == null ? "Create Subcategory" : "Edit Subcategory"}
              </div>
              <label>Category Name</label>
              <div className="textFormik_flex8">
                <Field
                  className="textFormikField_flex8"
                  placeholder="Category Name"
                  id="categoryId"
                  name="categoryId"
                  required
                  as="select"
                >
                  <option>Select Category</option>
                  {posts.map((post) => (
                    <option key={post._id} value={post._id}>
                      {post.categoryName}
                    </option>
                  ))}
                </Field>
              </div>
              <label>Subcategory Name</label>
              <div className="textFormik_flex8">
                <Field
                  className="textFormikField_flex8"
                  placeholder="Subcategory"
                  fullWidth
                  required
                  id="subCategoryName"
                  name="subCategoryName"
                />
              </div>
              <div className="group-Text">SubCategory Icon</div>
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
              <div className="align-right">
                <input
                  type="file"
                  name="subcategoryImage"
                  required={itemId == null ? true : false}
                  onChange={(event) =>
                    formProps.setFieldValue(
                      "subcategoryImage",
                      event.target.files[0]
                    )
                  }
                />
              </div>{" "}
            </div>
            <div className="ffrowspace"></div>
            <div className="createbtn">
              <button className="button">
                {itemId == null ? "Create " : "Edit"}
              </button>
            </div>
          </div>
          <Snackbar
            open={successOpen}
            autoHideDuration={600}
            onClose={handleClose}
          >
            {itemId ? (
              <Alert onClose={handleClose} severity="success">
                Success! Subcategory successfully updated
              </Alert>
            ) : (
              <Alert onClose={handleClose} severity="success">
                Success! Subcategory successfully saved
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
                Error! Subcategory has not been updated
              </Alert>
            ) : (
              <Alert onClose={handleClose} severity="error">
                Error! Subcategory has not been saved
              </Alert>
            )}
          </Snackbar>
        </Form>
      )}
    </Formik>
  );
}
export default CreateSubCategories;
