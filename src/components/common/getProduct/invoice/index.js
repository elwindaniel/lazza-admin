import { Paper, Grid, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  paper: {
    paddingLeft: theme.spacing(1),
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: "rgba(250,250,250,100%)",
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(2),
    },
  },
}));

export default function CartProducts({
  quantity,
  title,
  promo,
  prize,
  invoiceNumber,
}) {
  const classes = useStyles();

  let promoValue;
  let totalPrize = prize * quantity;

  if (promo) {
    if (promo.variantName === title) {
      if (promo.status === "percentage") {
        let a = quantity * prize;
        promoValue = a * (promo.value / 100);
        totalPrize -= promoValue;
      } else {
        promoValue = promo.value;
        totalPrize -= promoValue;
      }
    }
  }

  return (
    <>
      <Paper className={classes.paper} elevation={0}>
        <Grid container spacing={2}>
          <Grid item xs={0.5}></Grid>
          <Grid
            container
            item
            xs={5}
            justify="space-evenly"
            direction="column"
            alignItems="flex-start"
          >
            <Typography
              variant="body1"
              style={{
                color: "rgba(188,135,0,100%)",
                textAlign: "left",
              }}
            >
              {title}
              <br />
              <span style={{ fontSize: 14 }}>Invoice No : {invoiceNumber}</span>
            </Typography>
            {promo ? (
              promo.variantName === title ? (
                <Typography
                  variant="body1"
                  color="textSecondary"
                  style={{
                    fontSize: 18,
                  }}
                >
                  Offer Applied: {promo.promotionalCode}
                </Typography>
              ) : null
            ) : null}
          </Grid>
          <Grid container item xs={3} alignItems="center">
            <Typography
              variant="body1"
              color="textSecondary"
              style={{
                fontSize: 18,
                fontWeight: 600,
                textAlign: "right",
              }}
            >
              {quantity} * &#x20B9;
              {prize}
            </Typography>
            {promoValue ? (
              promo.status === "percentage" ? (
                <Typography variant="body1" color="textSecondary">
                  - {promo.value} %
                </Typography>
              ) : (
                <Typography
                  variant="body1"
                  color="textSecondary"
                  style={{
                    fontSize: 18,
                  }}
                >
                  - Rs {promo.value}
                </Typography>
              )
            ) : null}
          </Grid>
          <Grid container item xs={2} alignItems="center">
            <Typography
              variant="body1"
              style={{
                fontWeight: "bold",
              }}
            >
              &#x20B9; {totalPrize}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
