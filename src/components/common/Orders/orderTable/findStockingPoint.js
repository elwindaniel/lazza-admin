import {
  makeStyles,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  TextField,
} from "@material-ui/core";

import React, { useState, useEffect } from "react";
import useTable from "../../controls/table/useTable";

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
  { id: "Qty", label: "Qty" },
  { id: "Rate", label: "Rate" },
  { id: "Total", label: "Total" },
  { id: "Taxes", label: "Taxes" },
  { id: "LineTotal", label: "LineTotal" },
];

export default function FindStockingTable() {
  const [filterfn, setFilterfn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const classes = useStyles();

  const { TblContainer, TblHead } = useTable(records, headCells, filterfn);

  return (
    <>
      <Paper className={classes.tablePaper}>
        <TblContainer>
          <TblHead />
          <TableBody>
            <TableRow>
              <TableCell>
                <TextField placeholder=""></TextField>
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
