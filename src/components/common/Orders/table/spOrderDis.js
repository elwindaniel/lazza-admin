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

  { id: "customer", label: "Customer" },
  { id: "status", label: "Status" },

  { id: "actions", label: "Actions", diableSorting: true },
];

export default function CustomerTable({ spStatus }) {
  const userdetails = SessionCheck.getLoggedinUserId();
  const userId = userdetails.userId;
  const userType = userdetails.userType;

  const GET_URL = `${orderRequests.getOrderByStockingPointId}/${userId}/${spStatus}`;
  const GETALLORDER_URL = `${orderRequests.getAllOrder}`;
  const DELETE_URL = `${orderRequests.deleteOrder}/`;
  const STATUS_URL = `${orderRequests.editOrder}/`;

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
      await Axios.get(GET_URL).then((res) => {
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

  useEffect(() => {
    GetData();
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
          return items.filter((x) =>
            x.name.toLowerCase().includes(target.value)
          );
      },
    });
  };

  function child() {
    GetData();
  }

  function editChild() {
    GetData();
    handleClose();
  }

  const deleteApi = (deleteid) => {
    Axios.delete(DELETE_URL + deleteid)
      .then((res) => {
        child();
        handleClose();
      })
      .catch((err) => {});
  };
  const [statusActive, setStatusActive] = useState({ status: "1" });
  const activeData = (dataid) => {
    Axios.put(STATUS_URL + dataid, statusActive)
      .then((res) => {
        child();
      })
      .catch((err) => {});
  };
  const [statusInActive, setStatusINActive] = useState({ status: "0" });
  const inActiveData = (dataid) => {
    Axios.put(STATUS_URL + dataid, statusInActive)
      .then((res) => {
        child();
      })
      .catch((err) => {});
  };

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    setOpenDelete(false);
    setOpenAssign(false);
  };

  const [openDelete, setOpenDelete] = React.useState(false);
  const [InvoiceData, setInvoiceData] = React.useState(false);

  const orderAssign = (item) => {
    setInvoiceData(item);
    setOpenAssign(true);
  };
  const invoice = (item) => {
    setInvoiceData(item);

    setOpenDelete(true);
  };
  const Assigned = () => {
    GetData();
    setOpenAssign(false);
  };

  return (
    <>
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
                  {recordsAfterPagingAndSorting().map((item, index) => (
                    <TableRow key={item._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.orderId}</TableCell>
                      {/* <TableCell>Pending For </TableCell> */}
                      <TableCell>{item.name}</TableCell>

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
                  ))}
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
