import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
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
import Axios from "../../../../api/axios";
import Alert from "@material-ui/lab/Alert";
import { API_URL, cart, product, user } from "../../../../api/constants";
import DeliveryLocation from "../deliveryLocation";
import AddDeliveryLocation from "../deliverAdd";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";

function CheckOut({ userId }) {
  const [isDelivryLocation, setIsDelivryLocation] = useState(false);
  const [userDetails, setUserDetails] = useState();
  const get_userbyuserid_API = `${user.getUserbyUserid}/`;

  const fetchUser = async () => {
    try {
      await Axios.get(get_userbyuserid_API + userId).then((res) => {
        if (res.data.address.length > 0) {
          setIsDelivryLocation(true);

          setUserDetails(res.data);
        } else {
          setUserDetails([]);
        }
      });
    } catch (e) {}
  };
  function handleDeliveryLocation() {
    setIsDelivryLocation(true);
    fetchUser();
  }
  return (
    <div>
      <div>
        <Typography variant="h4">Delivery Location</Typography>
        {isDelivryLocation ? (
          <div>
            {" "}
            <DeliveryLocation
              address={userDetails}
              userId={userId}
              onSuccessEdit={handleDeliveryLocation}
              user={"signedUser"}
            />
            <Grid container justify="flex-end" alignItems="center">
              <IconButton
                style={{
                  color: "rgba(188,135,0,100%)",
                  outline: "none",
                }}
                onClick={() => setIsDelivryLocation(false)}
              >
                <AddCircleOutlineRoundedIcon />
              </IconButton>
              <Typography
                style={{
                  color: "rgba(188,135,0,100%)",
                  cursor: "pointer",
                }}
                onClick={() => setIsDelivryLocation(false)}
              >
                add location
              </Typography>
            </Grid>
          </div>
        ) : (
          <div>
            <AddDeliveryLocation
              address={userDetails}
              userId={userId}
              onSelect={handleDeliveryLocation}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default CheckOut;
