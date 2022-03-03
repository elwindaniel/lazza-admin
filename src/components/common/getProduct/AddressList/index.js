import React, { useState, useEffect } from "react";
import { user } from "../../../../api/constants";
import Service from "../../../../api/service";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    marginTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    color: theme.palette.text.secondary,
    width: "250px",
  },
  divroot: {
    marginRight: "20px",
  },
}));

function AddressList({ userId, pinCode, selectedAddress }) {
  const classes = useStyles();

  // const Get_USER = `${user.getUserbyUserid}/${userId}`;

  const [data, setData] = useState();
  const [name, setName] = useState();
  const [addDefault, setAddDefault] = useState();

  const [loading, setLoading] = useState(true);
  const [value, setValue] = React.useState("female");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const GetUser = async () => {
    try {
      await Service.GetUserById(userId).then((res) => {
        setName(res.data.name);
        setLoading(false);
        setAddDefault(res.data.defaultAddress);
        setData(res.data.address);
      });
    } catch (e) {}
  };

  useEffect(() => {
    GetUser();
  }, []);

  return (
    <div>
      <Box display="flex" flexWrap="wrap" p={1} m={1} justifyContent="center">
        {loading
          ? null
          : data && data.length
          ? data.map((i, index) => (
              <div
                className={classes.divroot}
                onClick={() => selectedAddress(i)}
              >
                <Paper className={classes.paper}>
                  {
                    <Typography variant="h6">
                      {name}
                      <br />
                      {i.addressLine1}
                      <br />
                      {i.city}
                      <br />
                      {i.state}
                      <br />
                      {i.zipcode}
                    </Typography>
                  }
                </Paper>
              </div>
            ))
          : null}
      </Box>
    </div>
  );
}

export default AddressList;
