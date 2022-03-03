import React, { useEffect, useState } from "react";
import "../Orders/order.css";
import TopBar from "../topBar";
import { makeStyles, Grid } from "@material-ui/core";
import Cards from "../controls/dashboardCard";
import Cart from "../../../assets/dashboardIcon/cart.png";
import Payment from "../../../assets/dashboardIcon/payment.png";
import People from "../../../assets/dashboardIcon/people.png";
import Service from "../../../api/service";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function ManageCustomers() {
  const [spl, setSpl] = useState();
  const [orderl, setOrderl] = useState();
  const [orderA, setOrderA] = useState();
  const [customerl, setCustomerl] = useState();
  const getORDERS = () => {
    Service.GetAllOrder(null)
      .then((res) => {
        // // console.log(res.data, "res.dataddd");
        setOrderl(res.data.length);
        setOrderA(res.data);
      })
      .catch((err) => {});
  };
  // const getSP = () => {
  //   Service.GetStockingpoint()
  //     .then((res) => {
  //       // console.log(res.data.length, "res.dataddd");
  //       setSpl(res.data.length);
  //     })
  //     .catch((err) => {});
  // };
  const getCUSTOMERS = () => {
    Service.GetAllUser()
      .then((res) => {
        setCustomerl(res.data.length);
      })
      .catch((err) => {});
  };
  useEffect(() => {
    getORDERS();
    getCUSTOMERS();
    // getSP();
  }, []);
  const classes = useStyles();
  let totalPrice = 0;

  return (
    <div className="customer">
      <TopBar title="Dashboard" />
      <div className="customer-inner">
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <Cards
              title="TOTAL ORDERS"
              ico={Cart}
              amount={orderl != null ? orderl : 0}
            />
          </Grid>
          <Grid item xs={4}>
            {orderA && orderA.length
              ? orderA.map((data) => {
                  let gtString =
                    data.grantTotal != "NaN" ? data.grantTotal : "0";
                  let mulPrize = parseInt(gtString);
                  // console.log(mulPrize, " mulPrize");
                  totalPrice = totalPrice + mulPrize;
                  return null;
                })
              : null}
            {/* ₹ {totalPrice} */}
            <Cards
              title="TOTAL SALES"
              ico={Payment}
              amount={totalPrice == null ? "₹" + 0 : "₹" + totalPrice}
            />
          </Grid>

          <Grid item xs={4}>
            <Cards
              title="TOTAL CUSTOMERS"
              ico={People}
              amount={customerl != null ? customerl : 0}
            />
          </Grid>
          {/* <Grid item xs={4}>
            <Cards
              title="TOTAL STOCKING POINTS"
              ico={People}
              amount={spl != null ? spl : 0}
            />
          </Grid> */}
        </Grid>
      </div>
    </div>
  );
}
