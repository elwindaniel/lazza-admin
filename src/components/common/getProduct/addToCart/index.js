import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CardActions from "@material-ui/core/CardActions";
import "../card/card.css";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import axios from "../../../../api/axios";
import Alert from "@material-ui/lab/Alert";
import { API_URL, cart, product } from "../../../../api/constants";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#ffffff",
  },
  flex: {
    display: "flex",
  },
}));
function AddToCart({ cardData, onSuccess }) {
  const classes = useStyles();
  // console.log(cardData, "cardData");

  const [count, setCount] = useState(1);

  const addtoCart_API = `${API_URL + cart.addToCart}/`;
  const addCount = () => {
    setCount(Math.max(count + 1));
  };
  const subtrCount = () => {
    setCount(Math.max(count - 1, 1));
  };
  const [noStockPoint, setNoStockPoint] = React.useState(false);
  const [selectedSP, setselectedSP] = React.useState();

  const viewCarthandle = async () => {
    let postData = [
      {
        variantName: cardData.productName,
        variantId: cardData.variantId,
        quantity: count,
        productId: cardData.productId,
        productName: cardData.productName,
      },
    ];

    await axios
      .post(
        addtoCart_API + cardData.userId + "?" + "zipCode=" + cardData.pinCode,
        postData
      )
      .then((res) => {
        // console.log(res.data.selectedStockingPoints, "resdataaa");
        setselectedSP(res.data.selectedStockingPoints);
        if (res.data.selectedStockingPoints.length === 0) {
          setNoStockPoint(true);
        }

        if (res.status === 200) {
          if (res.data.selectedStockingPoints.length === 0) {
            setNoStockPoint(true);
          } else {
            if (res.data.productsNotAvailable.length !== 0) {
              setNoStockPoint(true);
            }

            onSuccess(selectedSP);
          }
        }
        // onSuccess();
      })
      .catch((error) => {
        setNoStockPoint(true);
      });
  };

  return (
    <div className={classes.root}>
      <div className={classes.flex}>
        <img src={`${API_URL}/${cardData.img}`} alt="" width="40%" />

        <div>
          {noStockPoint ? (
            <Alert severity="warning">
              This Product is Not Available Near Your Location at{" "}
              {cardData.pinCode}
            </Alert>
          ) : null}
          <Typography
            variant="subtitle1"
            component="p"
            style={{ color: "#ff9800", fontSize: "22px" }}
          >
            {cardData.productName}
          </Typography>
          <Grid container item xs={12}>
            <Typography variant="subtitle1" component="p">
              Qty: &ensp;
            </Typography>
            <ButtonGroup
              color="primary"
              aria-label="outlined primary button group"
            >
              <Button style={{ outline: "none" }} onClick={subtrCount}>
                <RemoveIcon />
              </Button>
              <Button style={{ outline: "none" }}>
                <Typography variant="h6">{count}</Typography>
              </Button>
              <Button style={{ outline: "none" }} onClick={addCount}>
                <AddIcon />
              </Button>
            </ButtonGroup>
          </Grid>
          <Typography variant="h4" color="initial" component="p">
            &#x20B9;
            {cardData.offer
              ? cardData.discountPrice * count
              : cardData.regularPrice * count}
          </Typography>
          <Button
            variant="contained"
            onClick={viewCarthandle}
            color="primary"
            style={{ backgroundColor: "#ff9100", outline: "none" }}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddToCart;
