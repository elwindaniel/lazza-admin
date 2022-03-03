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
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import useTable from "../../controls/table/useTable";
import { customersRequests } from "../../../../api/constants";
import Modal from "@material-ui/core/Modal";
import Axios from "../../../../api/axios";
import {
  MdDelete,
  MdEdit,
  MdThumbUp,
  MdThumbDown,
  MdSearch,
  MdCheckCircle,
  MdClose,
  MdRemoveRedEye,
} from "react-icons/md";
import CView from "./customerView";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: "rgba(248,205,94,1)",
    padding: "30px",
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
  { id: "index", label: "Index", diableSorting: true },
  { id: "name", label: "Customer Name" },
  // { id: "contact", label: "Contact No" },
  { id: "number", label: "Total No of Order" },
  { id: "orderDate", label: "Last Order Date" },
  { id: "amount", label: "Total Amount" },
  { id: "", label: "", diableSorting: true },
  { id: "actions", label: "Actions", diableSorting: true },
  { id: "", label: "", diableSorting: true },
];

export default function CustomerTable() {
  const GET_URL = `${customersRequests.getAllUser}`;
  const GETOrder_URL = `${customersRequests.getOrdersByUser}`;
  const DELETE_URL = `${customersRequests.deleteUser}/`;

  const EDIT_URL = `${customersRequests.editUser}/`;
  const [records, setRecords] = useState();
  const [loading, setLoading] = useState(false);

  const [filterfn, setFilterfn] = useState({
    fn: (items) => {
      // console.log(items, "iiiiiiiiii");
      return items;
    },
  });

  const GetData = async () => {
    try {
      await Axios.get(GETOrder_URL).then((res) => {
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
            // console.log(x, "xxx") ||
            x.customerss.name
              ? x.customerss.name.toLowerCase().includes(target.value)
              : x.customerss.name
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

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenDelete(false);
    setViewOpen(false);
  };
  const [edit, setEdit] = useState();
  const [editName, setEditName] = useState();
  const [editAbbreviation, setEditAbbreviation] = useState();
  const editData = (editId, editName, editAbbreviation) => {
    setOpen(true);
    setEdit(editId);
    setEditName(editName);
    setEditAbbreviation(editAbbreviation);
  };
  const [openDelete, setOpenDelete] = React.useState(false);
  const [deletedData, setDeletedData] = React.useState(false);
  const [viewOpen, setViewOpen] = React.useState(false);
  const [viewOpenId, setViewOpenId] = React.useState(false);
  const viewC = (dataid) => {
    setViewOpenId(dataid);

    setViewOpen(true);
  };
  const deleteData = (dataid) => {
    setDeletedData(dataid);

    setOpenDelete(true);
  };
  const [active, setActive] = useState({
    active: "1",
  });
  const [inActive, setInActive] = useState({
    active: "0",
  });

  const activeData = (dataid) => {
    Axios.put(EDIT_URL + dataid, active)
      .then((res) => {
        child();
      })
      .catch((err) => {});
  };

  const inActiveData = (dataid) => {
    Axios.put(EDIT_URL + dataid, inActive)
      .then((res) => {
        child();
      })
      .catch((err) => {});
  };

  return (
    <>
      <Paper className={classes.root}>
        {/* <Typography variant="h6">back</Typography> */}
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
                  {recordsAfterPagingAndSorting().map((item, index) => (
                    <TableRow key={item._id}>
                      <TableCell>{index + 1}</TableCell>
                      {<TableCell>{item.customerss.name}</TableCell>}
                      {item.count ? (
                        <TableCell>{item.count}</TableCell>
                      ) : (
                        <TableCell>0</TableCell>
                      )}
                      {item.lastOrderDate ? (
                        <TableCell>{item.lastOrderDate}</TableCell>
                      ) : (
                        <TableCell>Not Yet Ordered</TableCell>
                      )}
                      {item.total ? (
                        <TableCell>{item.total}</TableCell>
                      ) : (
                        <TableCell>0</TableCell>
                      )}

                      {/* <TableCell>{orderDta.lastOrderDate}</TableCell> */}

                      {/* <TableCell>{item.bday}</TableCell>
                      <TableCell>{item.bdaySpouse}</TableCell> */}

                      {/* <TableCell>
                        <IconButton
                          aria-label="delete"
                          onClick={() => deleteData(item._id)}
                        >
                          <MdDelete color="rgba(139,138,135,1)" />
                        </IconButton>
                      </TableCell> */}
                      <TableCell>
                        <IconButton
                          aria-label="delete"
                          onClick={() => viewC(item.customerss._id)}
                        >
                          <Link to={`/ViewCustomer/${item.customerss._id}`}>
                            <MdRemoveRedEye color="rgba(139,138,135,1)" />
                          </Link>
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton aria-label="edit">
                          <Link to={`/CreateCustomer/${item.customerss._id}`}>
                            <MdEdit color="rgba(139,138,135,1)" />
                          </Link>
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        {item.customerss.active == false ? (
                          <IconButton
                            aria-label="edit"
                            onClick={() => activeData(item.customerss._id)}
                          >
                            {" "}
                            <MdThumbDown color="rgba(246,58,58,1)" />{" "}
                          </IconButton>
                        ) : (
                          <IconButton
                            aria-label="edit"
                            onClick={() => inActiveData(item.customerss._id)}
                          >
                            <MdThumbUp color="rgba(15,206,80,1)" />
                          </IconButton>
                        )}{" "}
                        {}
                        <Modal
                          className={classes.modal}
                          open={open}
                          onClose={handleClose}
                        >
                          <Paper className={classes.paper}></Paper>
                        </Modal>
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

      <Modal className={classes.modal} open={openDelete} onClose={handleClose}>
        <Paper className={classes.paper}>
          <Grid container direction="row" justify="center" alignItems="center">
            <Typography variant="h6">
              Are you sure to delete this item?
            </Typography>
            <IconButton
              aria-label="delete"
              onClick={() => deleteApi(deletedData)}
            >
              <MdCheckCircle color="rgba(139,138,135,1)" />
            </IconButton>
            <IconButton aria-label="delete" onClick={() => handleClose()}>
              <MdClose color="rgba(139,138,135,1)" />
            </IconButton>
          </Grid>
        </Paper>
      </Modal>

      <Modal className={classes.modal} open={viewOpen} onClose={handleClose}>
        <Paper className={classes.paper}>
          <Grid container direction="row" justify="center" alignItems="center">
            <CView itemId={viewOpenId} />
          </Grid>
        </Paper>
      </Modal>
    </>
  );
}
