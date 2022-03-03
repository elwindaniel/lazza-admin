import React from "react";
import { Snackbar } from "@material-ui/core";
import "./form.css";
import { Row } from "react-bootstrap";

import { Formik, Field, Form } from "formik";
import { bannerRequests, API_URL } from "../../../api/constants";
import MuiAlert from "@material-ui/lab/Alert";
import Service from "../../../api/service";
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

function CreateBanner({
  onSelect,
  itemId,
  itemName,
  itemTitle,
  itemdatefrm,
  itemdateto,
  itemposition,
  itemImg,
  itemmobImg,
}) {
  const POST_URL = `${bannerRequests.createBanner}`;
  const EDIT_URL = `${bannerRequests.editBanner}/${itemId}`;

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
          title: itemId == null ? "" : itemName,
          url: itemId == null ? "" : itemTitle,
          dateFrom: itemId == null ? "" : itemdatefrm,
          dateTo: itemId == null ? "" : itemdateto,
          position: itemId == null ? "" : itemposition,
          webBannerImage: itemId == null ? "" : itemImg,
          mobBannerImage: itemId == null ? "" : itemmobImg,
        }}
        onSubmit={async (values, { resetForm }) => {
          let data = new FormData();

          data.append("title", values.title);
          data.append("url", values.url);
          data.append("dateFrom", values.dateFrom);
          data.append("dateTo", values.dateTo);
          data.append("position", values.position);
          data.append("webBannerImage", values.webBannerImage);
          data.append("mobBannerImage", values.mobBannerImage);

          if (itemId == null) {
            Service.CreateBanner(data)

              .then((res) => {
                onSelect();
                resetForm({ values: "" });
                setSuccessOpen(true);
              })
              .catch((error) => {
                setErrorOpen(true);
              });
          } else {
            Service.EditBanner(data, itemId)

              .then((res) => {
                onSelect();
              })
              .catch((error) => {
                setErrorOpen(true);
              });
          }
        }}
      >
        {(formProps) => (
          <Form className="formBody">
            <div>
              <div className="insider">
                <div className="titleText">
                  {" "}
                  {itemId == null ? "Create" : "Edit"} Banner
                </div>
                <label>Title</label>
                <div className="textFormik_flex8">
                  <Field
                    className="textFormikField_flex8"
                    multiline
                    placeholder="Title"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    id="title"
                    name="title"
                    required
                  />
                </div>
                <label>Url</label>
                <div className="textFormik_flex8">
                  <Field
                    className="textFormikField_flex8"
                    multiline
                    placeholder="Url"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    id="url"
                    name="url"
                    required
                  />
                </div>

                <label>From</label>
                <div className="textFormik_flex8">
                  <Field
                    className="textFormikField_flex8"
                    placeholder="10-05-2020"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    type="date"
                    defaultValue="02-10-2020"
                    id="dateFrom"
                    name="dateFrom"
                    required
                  />
                </div>
                <div className="spacebtwn"></div>
                <label>To</label>
                <div className="textFormik_flex8">
                  <Field
                    className="textFormikField_flex8"
                    placeholder="10-05-2020"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    type="date"
                    defaultValue={"02-10-2020"}
                    id="dateTo"
                    name="dateTo"
                    required
                  />
                </div>

                <label>Position</label>
                <div className="textFormik_flex8">
                  <Field
                    className="textFormikField_flex8"
                    placeholder="Position"
                    required
                    id="position"
                    name="position"
                    as="select"
                  >
                    <option>Select Position</option>
                    <option>top</option>
                    <option>middle</option>
                    <option>bottom</option>
                  </Field>
                </div>

                <div className="group-Text">Desktop</div>
                <div className="ffrowspace"></div>
                <Row className="row">
                  <input
                    type="file"
                    className="imgbutton"
                    id="webBannerImage"
                    name="webBannerImage"
                    required={itemId == null ? true : false}
                    onChange={(event) =>
                      formProps.setFieldValue(
                        "webBannerImage",
                        event.target.files[0]
                      )
                    }
                  />

                  {itemId == null ? (
                    <div></div>
                  ) : (
                    <div className="box1">
                      <img
                        src={itemId == null ? null : API_URL + itemImg}
                        width="200px"
                        height="100px"
                      />
                    </div>
                  )}
                </Row>
                <div className="group-Text">Mobile</div>
                <div className="ffrowspace"></div>
                <Row className="row">
                  <input
                    type="file"
                    className="imgbutton"
                    id="mobBannerImage"
                    name="mobBannerImage"
                    required={itemId == null ? true : false}
                    onChange={(event) =>
                      formProps.setFieldValue(
                        "mobBannerImage",
                        event.target.files[0]
                      )
                    }
                  />
                  {itemId == null ? (
                    <div></div>
                  ) : (
                    <div className="box1">
                      <img
                        src={itemId == null ? null : API_URL + itemmobImg}
                        width="100px"
                        height="100px"
                      />
                    </div>
                  )}
                </Row>
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
            Success! Banner successfully updated
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="success">
            Success! Banner successfully saved
          </Alert>
        )}
      </Snackbar>
      <Snackbar open={errorOpen} autoHideDuration={600} onClose={handleClose}>
        {itemId ? (
          <Alert onClose={handleClose} severity="error">
            Error! Banner has not been updated
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error">
            Error! Banner has not been saved
          </Alert>
        )}
      </Snackbar>
    </>
  );
}
export default CreateBanner;
