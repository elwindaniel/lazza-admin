import {
  makeStyles,
  Table,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(3),
    "& thead th": {
      fontWeight: "600",
      color: "#fff",
      backgroundColor: "rgba(139,138,135,1)",
    },
    "& tbody td": {
      fontWeight: "300",
    },
    "& tbody tr:hover": {
      backgroundColor: "#fffbf2",
      cursor: "pointer",
    },
  },
}));

export default function useTable(records, headCells, filterfn) {
  const classes = useStyles();

  const pages = [15, 25, 50];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();

  const TblContainer = (props) => (
    <Table className={classes.table}>{props.children}</Table>
  );

  const TblHead = (props) => {
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell key={headCell.id}>
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={() => {
                  handleSortRequest(headCell.id);
                }}
              >
                {headCell.label}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const handleSortRequest = (cellId) => {
    const isAsc = orderBy === cellId && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(cellId);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  var length = records && records.length ? records.length : 0;
  const TblPagination = () => (
    <TablePagination
      component="div"
      page={page}
      rowsPerPageOptions={pages}
      rowsPerPage={rowsPerPage}
      count={length}
      onChangePage={handlePageChange}
      onChangeRowsPerPage={handleRowsPerPageChange}
    />
  );

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    } else if (b[orderBy] > a[orderBy]) {
      return 1;
    } else {
      return 0;
    }
  }

  const recordsAfterPagingAndSorting = () => {
    return stableSort(filterfn.fn(records), getComparator(order, orderBy))
      .reverse()
      .slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };

  return {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  };
}
