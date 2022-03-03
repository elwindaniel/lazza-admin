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
import useTable from "../../controls/table/useTable";
import Service from "../../../../api/service";
import { MdRemoveRedEye, MdSearch } from "react-icons/md";
import SessionCheck from "../../../../api/sessionCheck";
import Dialog from "@material-ui/core/Dialog";
import InvoicePg from "../../getProduct/invoice/invoice";
import "../../forms/form.css";
import AssignOrder from "../../forms/assignOrder";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: "rgba(248,205,94,1)",
    padding: theme.spacing(2),
    marginTop: 20,
    marginBottom: 20,
    height: "60px",
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
  { id: "orderId", label: "Order Id" },
  { id: "orderTime", label: "Ordered Date & Time" },
  { id: "customer", label: "Customer" },
  { id: "spName", label: "Stocking Point" },
  { id: "status", label: "Status" },

  { id: "actions", label: "Actions", diableSorting: true },
];

export default function AdminOrderTable() {
  const userdetails = SessionCheck.getLoggedinUserId();
  const [spName, setSpname] = useState();
  const [records, setRecords] = useState();
  const [loading, setLoading] = useState(false);

  const [filterfn, setFilterfn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openAssign, setOpenAssign] = useState(false);

  const GetData = async () => {
    try {
      await Service.GetAllOrder(null).then((res) => {
        setLoading(true);

        if (res.data.length > 0) {
          setRecords(res.data);
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
      await Service.GetStockingpoint().then((res) => {
        setLoading(true);

        if (res.data.length > 0) {
          setSpname(res.data);
          setLoading(false);
        } else {
          setRecords([]);
          setLoading(false);
        }
      });
    } catch (e) { }
  };

  useEffect(() => {
    GetData();
    GetSP();
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
          return items.filter((x) =>
            x.name
              ? x.name.includes(target.value) ||
              x.name.toLowerCase().includes(target.value) ||
              x.name.toUpperCase().includes(target.value)
              : x.name || x.status
                ? x.status.includes(target.value) ||
                x.status.toLowerCase().includes(target.value) ||
                x.status.toUpperCase().includes(target.value)
                : x.status ||
                  x.customerMobileNumber.toString().includes(target.value) ||
                  x.orderId
                  ? x.orderId.toString().includes(target.value)
                  : x.orderId
          );
      },
    });
  };

  const handleClose = () => {
    setOpenDelete(false);
    setOpenAssign(false);
  };

  const [openDelete, setOpenDelete] = React.useState(false);
  const [InvoiceData, setInvoiceData] = React.useState(false);

  const invoice = (item) => {
    setInvoiceData(item);

    setOpenDelete(true);
  };
  const Assigned = () => {
    GetData();
    setOpenAssign(false);
  };
  const currentDate = Date();

  return (
    <>
      <Paper className={classes.root}>
        <Typography variant="h6"></Typography>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          {loading ? null : records && records.length ? (
            <Paper className={classes.tablePaper}>
              {" "}
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
                  {recordsAfterPagingAndSorting().map((item, index) => {
                    const timeDiffInMillisec = Math.abs(
                      new Date(item.reg_time.substr(4, 20)) -
                      new Date(currentDate.substr(4, 20))
                    );

                    const diffINMinit =
                      Math.floor(timeDiffInMillisec / 60) % 60;
                    return (
                      <TableRow key={item._id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.orderId}</TableCell>
                        <TableCell
                          style={{ color: item.pending ? "red" : "black" }}
                        >
                          {item.reg_time}
                        </TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>
                          {item.productDetails.map((x) => (
                            <div>
                              {spName?.length > 0
                                ? spName.map((sp) =>
                                  sp._id == x.stockingPointId ? (
                                    <div>{sp.name}</div>
                                  ) : (
                                    <></>
                                  )
                                )
                                : null}
                            </div>
                          ))}
                        </TableCell>

                        <TableCell>{item.status}</TableCell>

                        <TableCell>
                          <IconButton aria-label="edit">
                            <MdRemoveRedEye
                              color="rgba(139,138,135,1)"
                              onClick={() => invoice(item)}
                            />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </TblContainer>
              <TblPagination />
            </Paper>
          ) : (
            <Paper className={classes.tablePaper}>"no Records"</Paper>
          )}
        </Grid>
      </Grid>

      <Dialog className={classes.modal} open={openDelete} onClose={handleClose}>
        <Paper className={classes.paper}>
          <InvoicePg invoice={InvoiceData} />
        </Paper>
      </Dialog>
      <Dialog className={classes.modal} open={openAssign} onClose={handleClose}>
        <Paper className={classes.paper}>
          <AssignOrder invoice={InvoiceData} onselect={() => Assigned()} />
        </Paper>
      </Dialog>
    </>
  );
}
