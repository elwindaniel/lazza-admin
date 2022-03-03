import React from "react";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "rgba(248,205,94,1)",
    padding: "30px",
    margin: theme.spacing(2),
  },
}));

export default function BackDiv() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      {/* <Typography variant="h6">Back</Typography> */}
    </Paper>
  );
}
