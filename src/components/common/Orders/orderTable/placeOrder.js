import {
  Grid,
  InputAdornment,
  makeStyles,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
} from "@material-ui/core";
import { useHistory, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import useTable from "../../controls/table/useTable";
import { customersRequests } from "../../../../api/constants";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Axios from "../../../../api/axios";
import {
  MdDelete,
  MdEdit,
  MdThumbUp,
  MdThumbDown,
  MdSearch,
  MdCheckCircle,
  MdClose,
} from "react-icons/md";
import Dialog from "@material-ui/core/Dialog";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: "rgba(248,205,94,1)",
    padding: theme.spacing(2),
    marginTop: 20,
    marginBottom: 20,
  },
  right: {
    marginLeft: "75%",
  },
  tablePaper: {
    padding: theme.spacing(1),
  },
  searchTextField: {
    width: "75%",
  },
  paper: {
    width: "50%",
    backgroundColor: theme.palette.background.paper,

    padding: theme.spacing(2, 4, 3),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const headCells = [
  { id: "Item", label: "Item" },
  { id: "Stocking Point", label: "Stocking Point" },
  { id: "Qty", label: "Qty" },
  { id: "Rate", label: "Rate" },
  { id: "Total", label: "Total" },
  { id: "Taxes", label: "Taxes" },
  { id: "LineTotal", label: "LineTotal" },
];

export default function PlaceOrderTable() {
  const classes = useStyles();

  const {} = useTable(records, headCells, filterfn);

  return (
    <>
      <Paper className={classes.tablePaper}>
        {" "}
        <TblContainer>
          <TblHead />
          <TableBody>
            <TableRow>
              <TableCell>
                {" "}
                <TextField></TextField>
              </TableCell>
              <TableCell>
                {" "}
                <TextField></TextField>
              </TableCell>
              <TableCell>
                {" "}
                <TextField></TextField>
              </TableCell>
              <TableCell>
                {" "}
                <TextField></TextField>
              </TableCell>
              <TableCell>
                {" "}
                <TextField></TextField>
              </TableCell>
              <TableCell>
                {" "}
                <TextField></TextField>
              </TableCell>
              <TableCell>
                {" "}
                <TextField></TextField>
              </TableCell>
            </TableRow>
          </TableBody>
        </TblContainer>
      </Paper>
    </>
  );
}
