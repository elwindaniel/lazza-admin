import {
  Grid,
  InputAdornment,
  makeStyles,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  IconButton,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import useTable from "../controls/table/useTable";
import { Row } from "react-bootstrap";
import Modal from "@material-ui/core/Modal";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import Axios from "../../../api/axios";
import { Link } from "react-router-dom";
import {
  MdDelete,
  MdEdit,
  MdSearch,
  MdCheckCircle,
  MdClose,
} from "react-icons/md";

import "../report/report.css";

import { Report, StockingPointRequests } from "../../../api/constants";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: "rgba(248,205,94,1)",
    padding: "30px",
    marginTop: 20,
    marginBottom: 20,
  },
  right: {
    marginLeft: "80%",
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
  { id: "index", label: "Index", diableSorting: true },
  { id: "Date", label: "Date" },
  { id: "Customer", label: "Customer" },
  { id: "OrderId", label: "Order Id" },
  { id: "StockingPointName", label: "Stocking Point Name" },
  { id: "Razorpay", label: "Razor Pay TransactionId" },
  { id: "Amount", label: "Amount" },
];

export default function ReportTable() {
  const GET_URL = `${Report.getAllReports}/`;
  const GetSP_URL = `${StockingPointRequests.getAllStockingPoint}`;
  // const DELETE_URL = `${PromoCodeRequests.deletePromo}/`;

  const [records, setRecords] = useState();
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState();
  const [filterfn, setFilterfn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const GetData = async (spid) => {
    let id = spid == null ? "all" : spid;
    let date =
      data.dateFrom == ""
        ? ""
        : "?dateFrom=" + data.dateFrom + "&dateTo=" + data.dateTo;
    try {
      await Axios.get(GET_URL + id + date).then((res) => {
        setLoading(true);

        if (res.data.length > 0) {
          setRecords(res.data);
          console.log(res, "ress");

          setLoading(false);
        } else {
          setRecords([]);

          setLoading(false);
        }
      });
    } catch (e) { }
  };
  const GetSP = async () => {
    try {
      await Axios.get(GetSP_URL).then((res) => {
        setLoading(true);

        if (res.data.length > 0) {
          // console.log(res.data, "res.data");
          setPosts(res.data);
          setLoading(false);
        } else {
          setPosts([]);

          setLoading(false);
        }
      });
    } catch (e) { }
  };
  useEffect(() => {
    GetSP();
    GetData();
  }, []);

  const classes = useStyles();

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterfn);

  const handleSearch = (e) => {
    let target = e.target;

    setFilterfn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter(
            (x) =>
              x.orderid.toString().includes(target.value) ||
              x.amount.toString().includes(target.value) ||
              x.customer.includes(target.value) ||
              x.customer.toLowerCase().includes(target.value) ||
              x.customer.toUpperCase().includes(target.value)
          );
      },
    });
  };

  function child() {
    GetData();
  }

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    setOpenDelete(false);
  };

  const [openDelete, setOpenDelete] = React.useState(false);
  const [deletedData, setDeletedData] = React.useState(false);
  let totalPrice = 0;
  let bjson = { id: "all" };
  let b = JSON.stringify(bjson);

  const [data, setData] = useState({
    dateFrom: "",
    dateTo: "",
  });

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;

    setData(newdata);
    // console.log(data, "datas");
  }
  return (
    <>
      <Paper className={classes.root}>
        {/* <Typography variant="h6">back</Typography> */}
      </Paper>
      <div className="fieldcls">
        <Formik>
          <Field
            className="textreportField_flex8"
            placeholder="India"
            as="select"
            id="country"
            name="country"
            // value={country}
            onChange={async (e) => {
              const { value } = e.target;
              // console.log(value, "value");
              let jsonVariable = JSON.parse(value);
              const _regions = await GetData(jsonVariable.id);
            }}
          >
            <option>Select Stocking Point</option>
            <option value={b}>All Stocking Point</option>
            {posts && posts.length
              ? posts.map((post) => {
                let json = {
                  id: post._id,
                  name: post.name,
                };
                let a = JSON.stringify(json);
                return (
                  <option key={post._id} value={a}>
                    {post.name}
                  </option>
                );
              })
              : null}
          </Field>
        </Formik>
        <div className="labelText">From</div>

        <TextField
          placeholder="From"
          fullWidth
          type="date"
          id="dateFrom"
          name="dateFrom"
          margin="normal"
          value={data.dateFrom}
          variant="outlined"
          onChange={(e) => handle(e)}
        />

        <div className="labelText">To</div>
        <TextField
          placeholder="To"
          fullWidth
          type="date"
          id="dateTo"
          name="dateTo"
          value={data.dateTo}
          margin="normal"
          variant="outlined"
          onChange={(e) => handle(e)}
        />

        <button
          style={{ height: "58px", marginTop: "12px", marginLeft: "12px" }}
          className="button"
          onClick={() => child()}
        >
          FIlter
        </button>
      </div>

      {loading ? null : records && records.length ? (
        <Paper className={classes.tablePaper}>
          <TextField
            placeholder="Search"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MdSearch />
                </InputAdornment>
              ),
            }}
          />
          <TblContainer>
            <TblHead />
            <TableBody>
              {recordsAfterPagingAndSorting().map((item, index) => (
                <TableRow key={item._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.customer}</TableCell>
                  <TableCell>{item.orderid}</TableCell>
                  <TableCell>
                    {item.stockingPointName?.length > 0
                      ? item.stockingPointName[0] != null
                        ? item.stockingPointName
                        : item.stockingPointName.map((name) => (
                          <div>{name}</div>
                        ))
                      : "Not Found"}
                  </TableCell>
                  <TableCell>
                    {item.razorPayTransactionId == null
                      ? "Not Found"
                      : item.razorPayTransactionId}
                  </TableCell>
                  <TableCell>{item.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TblContainer>
          {records && records.length
            ? records.map((data) => {
              let mulPrize = data.amount == null ? 0 : data.amount;
              // console.log(mulPrize, "mulPrize");
              totalPrice = totalPrice + mulPrize;

              // return null;
            })
            : null}

          <div className="totalcls">
            Total : <b>{totalPrice == null ? "₹" + 0 : "₹" + totalPrice}</b>
          </div>

          <TblPagination />
        </Paper>
      ) : (
        <Paper className={classes.tablePaper}>"no Records"</Paper>
      )}
    </>
  );
}
