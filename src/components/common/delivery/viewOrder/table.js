import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import SessionCheck from "../../../../api/sessionCheck";
import "../../forms/form.css";
import { orderRequests, deliveryBoyRequests } from "../../../../api/constants";
import Axios from "../../../../api/axios";
import CartProducts from "../../getProduct/invoice";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Snackbar from "@material-ui/core/Snackbar";
import {
  createMuiTheme,
  makeStyles,
  responsiveFontSizes,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import "../dispatchedOrders/dispatchedOrder.css";
let theme = createMuiTheme({});
theme = responsiveFontSizes(theme);

const useStyles = makeStyles((theme) => ({
  space: {
    marginLeft: "10px",
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  flex1: {
    display: "flex",
  },
  none: { display: "none" },
  paper: {
    width: "100%",
  },
  paperModel: {
    backgroundColor: theme.palette.background.paper,

    padding: theme.spacing(2, 4, 3),
  },
  mainPaper: {
    width: "94%",

    marginTop: "10px",
    marginLeft: theme.spacing(2),
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(0),
    },
  },
  img: {
    width: "20%",
  },
  button: {
    margin: "10px",
  },
}));

export default function ViewOrderDelivery() {
  const [invoiceData, setInvoiceData] = useState();
  const [invoice, setInvoice] = useState();
  const [open, setOpen] = React.useState(false);
  const [successOpen, setSuccessOpen] = React.useState(false);
  const userdetails = SessionCheck.getLoggedinUserId();
  const userId = userdetails.userId;
  const GET_URL = `${deliveryBoyRequests.getOrderByDeliveryBoyId}/${userId}/`;
  const POST_URL = `${orderRequests.editOrder}/`;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        await Axios.get(GET_URL + "Delivery boy assigned").then((res) => {
          setInvoiceData(res.data);
        });
      } catch (e) {}
    };
    fetchPost();
  }, []);

  const GetData = async () => {
    try {
      await Axios.get(GET_URL + "Delivery boy assigned").then((res) => {
        setInvoiceData(res.data);
      });
    } catch (e) {}
  };

  const ItemRecived = (i) => {
    Axios.put(POST_URL + i._id, {
      status: "Dispatched",
      stockingPointId: i.productDetails[0].stockingPointId,
    })
      .then((res) => {
        GetData();
        setSuccessOpen(true);
      })
      .catch((error) => {
        setSuccessOpen(false);
      });
  };
  const handleClickOpen = (i) => {
    setInvoice(i);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSuccessOpen(false);
  };

  const classes = useStyles();
  return (
    <div>
      <MuiThemeProvider theme={theme}>
        {invoiceData && invoiceData.length
          ? invoiceData.map((i, index) =>
              i.status == "Delivery boy assigned" ? (
                <div className="mainPaper">
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <div className={classes.flex}>
                        <Typography align="left" className={classes.flex1}>
                          {" "}
                          {index + 1}.
                          <div
                            className={classes.space}
                            style={{ paddingRight: "10px" }}
                          >
                            {" "}
                            SHIP TO <br /> {i.name}
                            <br /> {i.addressLine1},{i.street}
                            <br /> {i.zipcode}
                          </div>
                        </Typography>
                        <Typography align="left">
                          {" "}
                          PHONE <br /> {i.customerMobileNumber}
                        </Typography>
                        {/* <Typography align="left">
                          {" "}
                          Order Id <br /> {i.orderId}
                        </Typography>
                        <Typography align="left">
                          TOTAL
                          <br />₹ {i.total}
                        </Typography> */}
                      </div>
                    </AccordionSummary>
                    {i.productDetails.map((p) => (
                      <div className={classes.paper}>
                        <CartProducts
                          id={p._id}
                          quantity={p.quantity}
                          image={p.image}
                          title={p.productName}
                          promo={p.promocodes}
                          prize={p.rate}
                        />
                      </div>
                    ))}

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "25px",
                      }}
                    >
                      <Typography align="left">
                        {" "}
                        Order Id <br /> {i.orderId}
                      </Typography>
                      <Typography className="spacewidth"></Typography>
                      <Typography align="right">
                        TOTAL
                        <br />₹ {i.total}
                      </Typography>
                      <div className={"align-right"}>
                        {i.status == "Dispatched" ? null : (
                          <div className={classes.button}>
                            <button
                              type="submit"
                              className="button"
                              onClick={() => ItemRecived(i)}
                            >
                              Item Received
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </Accordion>
                </div>
              ) : null
            )
          : null}
      </MuiThemeProvider>
      <Snackbar
        open={successOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          Item Received !
        </Alert>
      </Snackbar>
    </div>
  );
}
