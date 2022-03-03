import {
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Snackbar,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React, { useState, useEffect } from "react";
import "../../forms/form.css";
import { makeStyles } from "@material-ui/core/styles";
import useTable from "../../controls/table/useTable";
import { cart, API_URL, sendPaymentLink } from "../../../../api/constants";
import Service from "../../../../api/service";
import AddAddress from "../deliverAdd";
import InvoiceCompound from "../invoice/invoice";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

//Axios
const useStyles = makeStyles((theme) => ({
  none: {
    display: "none",
  },
  tablePaper: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
  },
  paper: {
    width: "50%",
    backgroundColor: theme.palette.background.paper,
    overflow: "scroll",
    padding: theme.spacing(2, 4, 3),
  },
  modal: {
    alignItems: "topcenter",
    display: "flex",
    justifyContent: "center",
  },
  flex: {
    display: "flex",
  },
  invoiceFlex: {
    marginTop: "20px",
    marginBottom: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  margin: {
    marginLeft: 10,
    marginRight: 10,
  },
  total: {
    marginTop: 30,
    marginRight: 10,
    marginBottom: 50,
  },
}));

const headCells = [
  { id: "Sl No", label: "Sl No", diableSorting: true },
  { id: "Images", label: "" },
  { id: "Product", label: "Product" },
  { id: "Price", label: "Price" },
  { id: "Quantity", label: "Quantity" },
  { id: "TotalPrice", label: "Total Price" },
  { id: "", label: "" },
  // { id: "actions", label: "Actions", diableSorting: true },
];

export default function CartTable({
  onSelect,
  onsave,
  userId,
  loadCart,
  name,
  pinCode,
  phone,
  address,
}) {
  // console.log(phone, "phone");
  const [invoiceID, setInvoiceID] = useState();
  const GET_getCart_URL = `${cart.getCart}/${userId}`;
  const sendPaymentLinkApi = `${sendPaymentLink.sendPaymentLink}/${userId}/${invoiceID}`;
  const [open, setOpen] = useState(false);
  const [openPayMent, setOpenPayMent] = useState(false);
  const [openAlert, setopenAlert] = useState(false);
  const GetData = async () => {
    await Service.GetCart(userId).then((res) => {
      setLoading(true);

      if (res.data.length > 0) {
        setRecords(res.data);

        setLoading(false);
      } else {
        setLoading(false);
        setRecords();
      }
    }, []);
  };
  const PostData = async () => {
    console.log(invoice.orderId, "invoice.orderId");
    try {
      await Service.SendPaymentLink(userId, invoice.orderId).then((res) => {
        setOpenPayMent(true);
      });
    } catch (e) { }
  };

  const handleClose = () => {
    setOpenDelete(false);
    setOpen(false);
    setopenAlert(true);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleCloseAlert = () => {
    setopenAlert(false);
  };
  const handleopenPayMent = () => {
    setOpenPayMent(false);
  };
  useEffect(() => {
    GetData();
  }, []);
  function child() {
    GetData();
  }

  const [openDelete, setOpenDelete] = useState(false);
  const [offeredPrice, setofferedPrice] = useState();

  const deleteData = (dataid) => {
    DelectData(dataid);
  };

  const DelectData = async (dataid) => {
    Service.DeleteCart(userId, dataid)
      .then((res) => {
        GetData();
        // setofferedPrice();
      })
      .catch((err) => {
        GetData();
      });
  };

  const classes = useStyles();
  const [records, setRecords] = useState();
  const [loading, setLoading] = useState(true);
  const [filterfn, setFilterfn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterfn);

  const [cartPrices, setCartPrices] = useState();
  const [cartId, setCartId] = useState();
  const [invoice, setInvoice] = useState();
  const [invoiceTrue, setInvoiceTrue] = useState(false);

  function eSuccess(res) {
    handleClose();
    // GetData();
    setInvoice(res.data);
    setInvoiceID(res.data._id);
    setInvoiceTrue(true);
  }
  function cartPrice(res) {
    console.log(res, "cartPrices");
    setCartPrices(res);
  }
  const [promoValue, setPromoValue] = React.useState("");
  const [promoRate, setPromoRate] = React.useState(0);
  const [promoCode, setPromoCode] = useState();
  const [promoId, setPromoId] = useState();

  // let promoCode;
  const promoFormHandleChange = (event, value, promo) => {
    console.log("promo", promo, cartPrices.grant);
    // console.log("i ==>>", event, "==>>", value, "==>>", promo);
    setPromoValue(event);
    setPromoRate(value);
    setPromoCode(promo);
    setPromoId(promo._id);
    let body = {
      totalPrice: totalPrice,
      promoValue: value,
      promocode: { ...promo },
      delivery: cartPrices.delivery,
    };

    Service.ApplyPromoCode(body)
      .then((res) => {
        console.log(res.data, "ApplyPromoCode");
        setofferedPrice(res.data.totalWithOffer);
        child();
      })
      .catch((err) => { });
    // promoCode = i;
    // // console.log("i let  ==>>", promoCode);
  };

  const quantityUpdate = (quantity) => {
    let postData = {
      cartId: cartId,
      quantity: quantity,
    };
  };
  const addCount = (cId, quantity) => { };

  const subtrCount = (cId, quantity) => { };
  let totalPrice = 0;
  let grantTotal = 0;

  return (
    <>
      {loading ? null : records && records.length ? (
        <Paper className={classes.tablePaper}>
          {invoiceTrue ? (
            <div>
              {invoiceTrue ? null : "no Records"}
              {invoiceTrue ? (
                <>
                  <InvoiceCompound invoice={invoice} />
                  <br />
                  <div className="align-right">
                    <button className="button" onClick={() => PostData()}>
                      {"Send Payment"}
                    </button>
                  </div>
                </>
              ) : null}
            </div>
          ) : (
            <div>
              <TblContainer>
                <TblHead />
                <TableBody>
                  {recordsAfterPagingAndSorting().map((item, index) => (
                    //  {let mulPrize = parseInt(gtString);

                    //   totalPrice = totalPrice + item}
                    <TableRow key={item._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <img
                          src={API_URL + item.image}
                          width="110px"
                          height="80px"
                          object-fit="contain"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography>{item.variantName}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>₹ {item.rate}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className={classes.flex}>
                          {/* <div
                                                onClick={() => subtrCount()}
                                                className={classes.margin}
                                            >
                                                -
                      </div> */}
                          {item.quantity}
                          {/* <div onClick={addCount()} className={classes.margin}>
                                                +
                      </div> */}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>
                          ₹{item.total}
                          {/* ₹ {(item.total, console.log(records, "item.total"))} */}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography onClick={() => deleteData(item._id)}>
                          X
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </TblContainer>
              <TblPagination />
              <hr />

              <RadioGroup aria-label="promoCode" value={promoValue}>
                {records?.length
                  ? records.map((data) => (
                    <>
                      {data.promoCodes?.length
                        ? data.promoCodes.map((promo) => {
                          return (
                            <>
                              <FormControlLabel
                                value={promo._id}
                                control={<Radio />}
                                style={{
                                  marginTop: 18,
                                }}
                                label={
                                  <Paper
                                    className={classes.offerFormPaper}
                                    elevation={0}
                                  >
                                    <Typography
                                      variant="h5"
                                      // component="h6"
                                      align="left"
                                      style={{
                                        fontSize: 22,
                                      }}
                                    >
                                      {promo.promotionalCode} -{" "}
                                      {promo.status === "percentage" ? (
                                        <>{promo.value} % </>
                                      ) : (
                                        <>Rs {promo.value} </>
                                      )}
                                      Off on {data.variantName}
                                    </Typography>
                                  </Paper>
                                }
                                onClick={() =>
                                  promoFormHandleChange(
                                    promo._id,
                                    promo.value,
                                    promo
                                  )
                                }
                              />
                              {promo.minimumSpent ? (
                                <Typography
                                  variant="subtitle1"
                                  color="textSecondary"
                                  align="left"
                                  style={{
                                    paddingTop: 0,
                                    paddingLeft: 45,
                                    fontSize: 18,
                                  }}
                                >
                                  {" "}
                                  Minimum Total Order Value must be above
                                  &#x20B9; {promo.minimumSpent}
                                </Typography>
                              ) : null}
                            </>
                          );
                        })
                        : null}
                    </>
                  ))
                  : null}
              </RadioGroup>

              <Typography className={classes.total} variant="h5" align="right">
                {records && records.length
                  ? records.map((data) => {
                    let mulPrize = data.total;
                    if (promoCode) {
                      if (data.variantName === promoCode.variantName) {
                        if (promoCode.status === "percentage") {
                          let a =
                            mulPrize - mulPrize * (promoCode.value / 100);
                          totalPrice = totalPrice + a;
                        } else {
                          let a = mulPrize - promoCode.value;
                          totalPrice = totalPrice + a;
                        }
                      } else {
                        totalPrice = totalPrice + mulPrize;
                      }
                    } else {
                      totalPrice = totalPrice + mulPrize;
                    }

                    return null;
                  })
                  : null}
                Total: ₹ {cartPrices == null ? 0 : totalPrice}
                <br />
                Delivery charge: ₹{cartPrices == null ? 0 : cartPrices.delivery}
                <br />
                Amount payable: ₹
                {
                  (cartPrices == null
                    ? totalPrice
                    : totalPrice + cartPrices.delivery,
                    (grantTotal =
                      cartPrices == null
                        ? totalPrice
                        : totalPrice + cartPrices.delivery))
                }
                {/* //////////////////////////////// */}
                <br />
                <button className="button" onClick={handleOpen}>
                  Place Order
                </button>
              </Typography>

              <hr />
              <div>
                <div className={open ? null : classes.none}>
                  {address == null ? (
                    <AddAddress
                      userId={userId}
                      cartInfo={records}
                      total={grantTotal}
                      name={name}
                      phone={phone}
                      pinCode={pinCode}
                      promocodeId={promoCode}
                      onSelect={(res) => eSuccess(res)}
                      cartData={(res) => cartPrice(res)}
                      newAddress={true}
                    />
                  ) : (
                    <AddAddress
                      userId={userId}
                      cartInfo={records}
                      total={grantTotal}
                      selectedAddress={address}
                      phone={phone}
                      name={name}
                      pinCode={pinCode}
                      promocodeId={promoCode}
                      onSelect={(res) => eSuccess(res)}
                      cartData={(res) => cartPrice(res)}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </Paper>
      ) : (
        <Paper className={classes.tablePaper}>

        </Paper>
      )}

      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity="success">
          Order has been placed !
        </Alert>
      </Snackbar>

      <Snackbar
        open={openPayMent}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleopenPayMent} severity="success">
          Payment Link Send Successfully !
        </Alert>
      </Snackbar>
    </>
  );
}
