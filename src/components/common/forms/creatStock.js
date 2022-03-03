import React from "react";
import { Snackbar } from "@material-ui/core";
import "./form.css";
import axios from "../../../api/axios";
import { stockRequests } from "../../../api/constants";

import { Formik, Field, Form } from "formik";
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

function CreatStock({
  onSelect,
  itemId,
  itemName,
  itemCurrent,
  itemLastday,
  itemVariantId,
}) {
  const POST_URL = `${stockRequests.createStock}`;
  const EDIT_URL = `${stockRequests.editStock}/${itemId}`;
  const classes = useStyles();
  const [successOpen, setSuccessOpen] = React.useState(false);
  const [errorOpen, setErrorOpen] = React.useState(false);
  // console.log(itemVariantId, "itemVariantId");

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
  const session = {
    token: sessionStorage.getItem("token"),
  };

  let userId;

  const payloadStart = session.token.indexOf(".") + 1;
  const payloadEnd = session.token.lastIndexOf(".");
  let payload = session.token.substring(payloadStart, payloadEnd);

  if (payload.length === 0) {
  } else {
    payload = atob(payload);
    const jsonPayload = JSON.parse(payload);
    userId = jsonPayload.id;
  }

  return (
    <>
      <Formik
        initialValues={{
          variantName: itemName,
          currentStock: "",
          lastDay: itemLastday,
          stockingPointId: userId,
          variantId: itemVariantId,
        }}
        onSubmit={async (values, { resetForm }) => {
          let tStock = parseInt(values.currentStock) + itemCurrent;

          let data = {
            variantName: values.variantName,
            currentStock: tStock,
            lastDay: values.lastDay,
            stockingPointId: values.stockingPointId,
            variantId: values.variantId,
          };

          axios
            .post(POST_URL, data)

            .then((res) => {
              // console.log(res, "data");
              onSelect();
              setSuccessOpen(true);
              resetForm({ values: "" });
            });
          //
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="">
            <div className="Row">
              <label>{itemName}</label>

              <div className="textFormik_flex3">
                <Field
                  className="textFormikField_flex8"
                  placeholder="Current Stock"
                  id="currentStock"
                  name="currentStock"
                  value={values.currentStock}
                  onChange={async (e) => {
                    const { value } = e.target;
                    setFieldValue(`currentStock`, value);
                  }}
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <Snackbar open={successOpen} autoHideDuration={600} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          This is a success !
        </Alert>
      </Snackbar>
      <Snackbar open={errorOpen} autoHideDuration={600} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          There is a error!
        </Alert>
      </Snackbar>
    </>
  );
}

export default CreatStock;
