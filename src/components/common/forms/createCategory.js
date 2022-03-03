import React from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import "./form.css";
import { categoryRequests, API_URL } from "../../../api/constants";
import Service from "../../../api/service";
import { Formik, Field, Form } from "formik";
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

function CreateCategory({ onSelect, itemId, itemName, itemImg }) {
  const classes = useStyles();
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
          categoryName: itemId == null ? "" : itemName,
          categoryImage: itemId == null ? "" : itemImg,
        }}
        onSubmit={async (values, { resetForm }) => {
          let data = new FormData();

          data.append("categoryImage", values.categoryImage);
          data.append("categoryName", values.categoryName);

          if (itemId == null) {
            Service.CreateCategory(data)
              .then((res) => {
                onSelect();
                setSuccessOpen(true);
                resetForm({ values: "" });
              })
              .catch((error) => {
                setErrorOpen(true);
              });
          } else {
            Service.EditCategory(data, itemId)
              // return fetch(EDIT_URL, {
              //   method: "put",
              //   headers: new Headers({ Accept: "application/json" }),
              //   body: data,
              // })
              .then((res) => {
                onSelect();
                setSuccessOpen(true);
              })
              .catch((error) => {
                setErrorOpen(true);
              });
          }
        }}
      >
        {/* {(formProps) => (<Form></Form>)} */}
        {(formProps) => (
          <Form className="formBody">
            <div className="Row">
              <div className="insider">
                <div className="titleText">
                  {" "}
                  {itemId == null ? "Create" : "Edit"} Category
                </div>
                <label>Category Name</label>
                <div className="textFormik_flex8">
                  <Field
                    className="textFormikField_flex8"
                    placeholder="Category Name"
                    id="categoryName"
                    name="categoryName"
                    required
                  />
                </div>

                <div className="group-Text">Category Icon</div>
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
                    type="file"
                    name="categoryImage"
                    required={itemId == null ? true : false}
                    onChange={(event) =>
                      formProps.setFieldValue(
                        "categoryImage",
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
            Success! Category successfully updated
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="success">
            Success! Category successfully saved
          </Alert>
        )}
      </Snackbar>
      <Snackbar open={errorOpen} autoHideDuration={600} onClose={handleClose}>
        {itemId ? (
          <Alert onClose={handleClose} severity="error">
            Error! Category has not been updated
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error">
            Error! Category has not been saved
          </Alert>
        )}
      </Snackbar>
    </>
  );
}
export default CreateCategory;
