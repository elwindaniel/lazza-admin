import { Card, CardContent, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Axios from "../../../../api/axios";
import { user } from "../../../../api/constants";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),

    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
}));

export default function DelivLocationCard(props) {
  const editData = () => {
    props.onSelect();
  };

  const classes = useStyles();
  const defaultIndex =
    props.user === "signedUser" ? parseInt(props.defaultAddress) : 0;

  const userData = {
    defaultAddress: "",
  };

  const defaultAddresssChangeFn = (id, index) => {
    userData.defaultAddress = index.toString();
    Axios.put(changeDefaultAddURL + userId, userData).then((res) => {
      props.onSuccessEdit();
    });
  };
  const userdetails = SessionCheck.getLoggedinUserId();
  const changeDefaultAddURL = `${user.editUserDataWithid}/`;
  const userId = userdetails.userId;

  return (
    <Card
      className={classes.root}
      elevation={defaultIndex === props.index ? 2 : 1}
      style={{
        borderStyle: defaultIndex === props.index ? "solid" : "none",
        borderWidth: 2,
        borderColor: "rgba(188,135,0,100%)",
      }}
    >
      <Typography
        align="right"
        style={{ color: "rgba(188,135,0,100%)", cursor: "pointer" }}
        onClick={() => editData()}
      >
        edit
      </Typography>

      <CardContent>
        <Typography variant="h6" color="textSecondary" component="p">
          {props.addressLine1}
        </Typography>
        <Typography variant="h6" color="textSecondary" component="p">
          {props.street}
        </Typography>
        <Typography variant="h6" color="textSecondary" component="p">
          {props.city},{props.district}
        </Typography>
        <Typography variant="h6" color="textSecondary" component="p">
          {props.state},India
        </Typography>
        <Typography variant="h6" color="textSecondary" component="p">
          Pin: {props.zipcode}
        </Typography>
      </CardContent>
      {defaultIndex === props.index ? (
        <Typography
          variant="h6"
          align="right"
          color="primary"
          style={{ color: "rgba(188,135,0,100%)" }}
        >
          {"Selected"}
        </Typography>
      ) : (
        <Typography
          variant="h6"
          align="right"
          color="primary"
          style={{
            color: "rgba(188,135,0,100%)",
            cursor: "pointer",
          }}
          onClick={() => defaultAddresssChangeFn(props.id, props.index)}
        >
          {"Select this"}
        </Typography>
      )}
    </Card>
  );
}
