import React, { useState, useEffect } from "react";
import { FaPen } from "react-icons/fa";
import "./form.css";
import Dialog from "@material-ui/core/Dialog";
import { Row } from "react-bootstrap";
import Service from "../../../api/service";
import { userExist, API_URL, CustomersRequests } from "../../../api/constants";
import GetProduct from "../getProduct";
import CartTable from "../getProduct/getCart";

import Addresslist from "../getProduct/AddressList/index";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function CreateOrder() {
  const classes = useStyles();
  // const userExist_URL = `${API_URL + userExist.userExist}`;
  // const getUser_URL = `${CustomersRequests.getUserById}/`;

  const [open, setOpen] = useState(false);
  const [displayaddress, setDisplayaddress] = useState(false);
  const [Useraddress, setUseraddress] = useState(false);
  const [uname, setUname] = useState("");
  const [data, setData] = useState({
    phoneNumber: "",
    pinCode: "",
    name: "",
  });

  const [userId, setUserId] = useState();

  function submit(e) {
    let requestData = {
      name: data.name,
      phoneNumber: data.phoneNumber,
    };

    e.preventDefault();
    Service.UserExist(requestData)
      .then((res) => {
        setUserId(res.data._id);
        getUser(res.data._id);
      })
      .catch((error) => { });
  }
  const getUser = (id) => {
    Service.GetUserById(id)
      .then((res) => {
        if (res.data.address.length == 0) {
          setDisplayaddress(true);
          setUseraddress(false);
        } else {
          setUname(res.data.name);
          setUseraddress(true);
          setDisplayaddress(false);
        }
      })
      .catch((error) => { });
  };
  const [loadCart, setLoadCart] = useState(false);
  const [displayselected, setdisplayselected] = useState();

  function eSuccess(res) {
    setdisplayselected(res);
    setOpen(false);
    setLoadCart(true);
    setUseraddress(false);
    setData({
      phoneNumber: data.phoneNumber,
      name: uname,
      pinCode: res.zipcode,
    });
  }
  function pSuccess() {
    setOpen(false);
    setLoadCart(true);
    setUseraddress(false);
  }
  const handleClose = () => {
    setOpen(false);
  };
  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;

    setData(newdata);
  }
  const openAddproduct = () => {
    // console.log(data.name, "data.name");
    if (data.pinCode == "") {
      setOpen(false);
    } else {
      setOpen(true);
      let requestData = {
        name: data.name,
        zipcode: data.zipcode,
      };
      // console.log(data, "dddddddddd");
      Service.EditUser(requestData, userId)
        .then((res) => {
          // setUserId(res.data._id);
          // getUser(res.data._id);
        })
        .catch((error) => { });
    }
  };
  return (
    <>
      <div className="formBody">
        <Row className="row">
          <div className="titleText">
            <FaPen />
          </div>
          <div className="titleText">Create Order</div>
        </Row>
        <hr />
        <form
          className={classes.form}
          Validate
          autoComplete="on"
          onSubmit={(e) => submit(e)}
        >
          {" "}
          <Row className="row">
            <div className="labelText">Customer Mobile Number</div>{" "}
            <div className="textFormik_flex8">
              <input
                className="textFormikField_flex8"
                required
                fullWidth
                id="phoneNumber"
                label="phoneNumber"
                type="phoneNumber"
                variant="outlined"
                value={data.phoneNumber}
                onChange={(e) => handle(e)}
              />
            </div>
          </Row>
          {Useraddress ? (
            <>
              <Addresslist
                userId={userId}
                selectedAddress={(res) => eSuccess(res)}
              />
              {/* <div style={{ textAlign: "right" }}>
                <button className="button" onClick={() => {
                  setDisplayaddress(false)
                  setdisplayselected("")
                }}>
                  New Address
                </button>
              </div> */}
            </>
          ) : null}
          ,
          {displayselected != null ? (
            <div className="labelText">
              {uname},{displayselected.addressLine1},
              {displayselected.addressLine2},{displayselected.city},
              {displayselected.zipcode}
              {displayselected.country}
            </div>
          ) : null}
          ,
          {displayaddress && displayselected == null ? (
            <Row className="row">
              <div className="labelText">Name</div>{" "}
              <div className="textFormik_flex3">
                <input
                  className="textFormikField_flex8"
                  required
                  fullWidth
                  id="name"
                  label="name"
                  type="name"
                  variant="outlined"
                  value={data.name}
                  onChange={(e) => handle(e)}
                />
              </div>
              <div className="labelText">PinCode</div>{" "}
              <div className="textFormik_flex3">
                <input
                  className="textFormikField_flex8"
                  required
                  fullWidth
                  id="pinCode"
                  label="pinCode"
                  type="pinCode"
                  variant="outlined"
                  value={data.pinCode}
                  onChange={(e) => handle(e)}
                />
              </div>
            </Row>
          ) : null}
          <div className="align-right">
            {Useraddress || displayaddress || displayselected != null ? (
              <button className="button" onClick={openAddproduct}>
                Add Product
              </button>
            ) : (
              <button className="button" type="submit">
                Submit
              </button>
            )}
          </div>
        </form>
      </div>

      {!open ? (
        <CartTable
          pinCode={data.pinCode}
          name={data.name}
          phone={data.phoneNumber}
          userId={userId}
          address={displayselected}
          onSuccess={(res) => eSuccess(res)}
        />
      ) : null}

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <GetProduct
          pinCode={data.pinCode}
          name={data.name}
          phone={data.phoneNumber}
          userId={userId}
          onSuccess={() => pSuccess()}
        />
      </Dialog>
    </>
  );
}
export default CreateOrder;
