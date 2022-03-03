import { makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";
import "./backDiv.css";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "rgba(248,205,94,1)",
    padding: "30px",
    margin: theme.spacing(2),
  },
}));

function Backdiv() {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      {/* <Typography variant="h6">Back</Typography> */}
    </Paper>
  );
}

export default Backdiv;
