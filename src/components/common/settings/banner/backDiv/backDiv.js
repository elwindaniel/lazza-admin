import React from "react";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "rgba(248,205,94,1)",
    padding: "30px",
    margin: theme.spacing(2),
  },
}));

export default function BackDiv({ link, title, url }) {
  const classes = useStyles();
  const history = useHistory();
  const redirectCreate = () => {
    history.push(url);
  };
  return (
    <Paper className={classes.root}>
      <Typography variant="h6" onClick={redirectCreate}>
        {title}
      </Typography>
    </Paper>
  );
}
