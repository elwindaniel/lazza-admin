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
import { orderRequests } from "../../../../api/constants";
import Axios from "../../../../api/axios";
import { MdRemoveRedEye, MdSearch } from "react-icons/md";
import SessionCheck from "../../../../api/sessionCheck";
import Dialog from "@material-ui/core/Dialog";
import InvoicePg from "../../getProduct/invoice/invoice";
import "../../forms/form.css";
import AssignOrder from "../../forms/assignOrder";
import service from "../../../../api/service";

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
  { id: "pending", label: "Pending" },
  { id: "customer", label: "Customer" },
  { id: "spName", label: "Stocking Point" },
  { id: "status", label: "Status" },

  { id: "actions", label: "Actions", diableSorting: true },
];

export default function PendingOrderTable() {
  const userdetails = SessionCheck.getLoggedinUserId();

  const GETALLORDER_URL = `${orderRequests.getAllOrder}/Processing`;
  const DELETE_URL = `${orderRequests.deleteOrder}/`;
  const [open, setOpen] = React.useState(false);
  const [spName, setSpname] = useState();
  const [records, setRecords] = useState();
  const [openAssign, setOpenAssign] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filterfn, setFilterfn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const GetData = async () => {
    try {
      await Axios.get(GETALLORDER_URL).then((res) => {
        setLoading(true);

        if (res.data.length > 0) {
          setRecords(res.data);
          setLoading(false);
        } else {
          setRecords([]);

          setLoading(false);
        }
      });
    } catch (e) {}
  };
  const GetSP = async () => {
    try {
      await service.GetStockingpoint().then((res) => {
        setLoading(true);
        // console.log(res.data, "sp");
        if (res.data.length > 0) {
          setSpname(res.data);
          setLoading(false);
        } else {
          setRecords([]);

          setLoading(false);
        }
      });
    } catch (e) {}
  };

  useEffect(() => {
    GetData();
    GetSP();
  }, []);

  const classes = useStyles();

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = useTable(records, headCells, filterfn);

  const handleSearch = (e) => {
    let target = e.target;

    setFilterfn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter(
            (x) =>
              // console.log(x, "flter") ||
              x.orderId.toString().includes(target.value)
            // || x.customerMobileNumber.toString().includes(target.value)
          );
      },
    });
  };

  function child() {
    GetData();
  }

  const handleClose = () => {
    setOpen(false);
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
  // console.log("date ==>>", currentDate.substr(4, 11));

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
                margin="small"
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
                    // console.log("itemmmm++>>", item);
                    const timeDiffInMillisec = Math.abs(
                      new Date(item.reg_time.substr(4, 20)) -
                        new Date(currentDate.substr(4, 20))
                    );

                    const diffINMinit =
                      Math.floor(timeDiffInMillisec / 60) % 60;
                    // console.log("time diffff", diffINMinit);
                    // if(item.status === "Processing") {
                    //   const
                    // }
                    return item.status === "Processing" ? (
                      <TableRow key={item._id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.orderId}</TableCell>
                        {/* {Math.abs(
                          new Date(item.reg_time) - new Date(currentDate)
                        )}{" "} */}
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
                                    ) : null
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
                    ) : null;
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
