import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InvoiceCard from "../invoice";

const useStyles = makeStyles((theme) => ({
  none: {
    display: "none",
  },
  invoiceFlex: {
    marginTop: "20px",
    marginBottom: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

function InvoicePg({ invoice }) {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.invoiceFlex}>
        <Typography align="left">
          {" "}
          SHIP TO <br /> {invoice.name}
        </Typography>
        <Typography align="left">
          {" "}
          PHONE <br /> {invoice.customerMobileNumber}
        </Typography>
        <Typography align="left">
          {" "}
          Order Id <br /> {invoice.orderId}
        </Typography>
      </div>
      {invoice.productDetails.map((i) => (
        <InvoiceCard
          id={i._id}
          quantity={i.quantity}
          image={i.image}
          title={i.variantName}
          invoiceNumber={i.invoiceNumber}
          prize={i.rate}
        />
      ))}
      <div className={classes.invoiceFlex}>
        <Typography align="left">ORDER PLACED</Typography>
        <Typography align="left">
          TOTAL
          <br />₹ {invoice.grantTotal}
        </Typography>
      </div>
      <div className={classes.invoiceFlex}>
        <Typography align="left">
          Address :{invoice.addressLine1}&nbsp;{invoice.addressLine2}
          &nbsp;{invoice.city}&nbsp;
          {invoice.district}&nbsp;
          {invoice.state}&nbsp;{invoice.zipcode}&nbsp;{invoice.country}
        </Typography>
      </div>
    </div>
  );
}

export default InvoicePg;
