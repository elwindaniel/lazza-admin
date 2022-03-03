import {
  Grid,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  IconButton,
  Modal,
  Typography,
  TextField,
  InputAdornment,
  Snackbar,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import useTable from "../../controls/table/useTable";
import {
  MdDelete,
  MdEdit,
  MdThumbUp,
  MdThumbDown,
  MdCheckCircle,
  MdClose,
  MdSearch,
} from "react-icons/md";
import { useHistory, Link } from "react-router-dom";
import { StockingPointRequests } from "../../../../api/constants";
import Service from "../../../../api/service";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  tablePaper: {
    padding: theme.spacing(1),
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
  { id: "Sl No", label: "Sl No", diableSorting: true },
  { id: "Stocking Point", label: "Stocking Point" },
  { id: "City/District/State", label: "City/District/State" },
  { id: "Contact Person", label: "Contact Person" },
  // { id: "On/Off", label: "On/Off" },

  { id: "actions", label: "Actions", diableSorting: true },
];

export default function StockTable() {
  const history = useHistory();
  const GetData = async () => {
    try {
      await Service.GetStockingpoint().then((res) => {
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
  const [openDelete, setOpenDelete] = React.useState(false);
  const [deletedData, setDeletedData] = React.useState(false);

  const deleteData = (dataid) => {
    setDeletedData(dataid);

    setOpenDelete(true);
  };
  const deleteApi = (deleteid) => {
    Service.DeleteStockingpoint(deleteid)
      .then((res) => {
        child();
        handleClose();
      })
      .catch((err) => { });
  };

  function editChild() {
    GetData();
    handleClose();
  }

  function child() {
    GetData();
  }

  const activeData = (dataid) => {
    let data = { active: "1" };
    Service.EditStockingpoint(data, dataid)
      .then((res) => {
        child();
      })
      .catch((err) => { });
  };

  const inActiveData = (dataid) => {
    let data = { active: "0" };
    Service.EditStockingpoint(data, dataid)
      .then((res) => {
        child();
      })
      .catch((err) => { });
  };

  const handleClose = () => {
    setOpen(false);
    setOpenDelete(false);
  };

  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState();
  const [editName, setEditName] = useState();
  const editData = (editId, editName) => {
    setOpen(true);
    setEdit(editId);
    setEditName(editName);
  };
  useEffect(() => {
    GetData();
  }, []);

  const classes = useStyles();
  const [records, setRecords] = useState();
  const [loading, setLoading] = useState(true);
  const [filterfn, setFilterfn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const handleSearch = (e) => {
    let target = e.target;

    setFilterfn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter(
            (x) =>
              x.district.toLowerCase().includes(target.value) ||
              x.city.toLowerCase().includes(target.value) ||
              x.state.toLowerCase().includes(target.value) ||
              x.contactPerson.toLowerCase().includes(target.value) ||
              x.name.toLowerCase().includes(target.value)
          );
      },
    });
  };
  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = useTable(records, headCells, filterfn);

  return (
    <>
      {loading ? null : records && records.length ? (
        <Paper className={classes.tablePaper}>
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
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    {item.city}
                    <br /> {item.district}
                    <br /> {item.state}
                  </TableCell>
                  <TableCell>{item.contactPerson}</TableCell>
                  {/* <TableCell>{item.onStatus}</TableCell> */}

                  <TableCell>
                    <IconButton
                      aria-label="delete"
                      onClick={() => deleteData(item._id)}
                    >
                      <MdDelete color="rgba(139,138,135,1)" />
                    </IconButton>
                    <IconButton aria-label="edit">
                      <Link to={`/addstockingpoint/${item._id}`}>
                        <MdEdit color="rgba(139,138,135,1)" />
                      </Link>
                    </IconButton>
                    {item.active == false ? (
                      <IconButton
                        aria-label="active"
                        onClick={() => activeData(item._id)}
                      >
                        {" "}
                        <MdThumbDown color="rgba(246,58,58,1)" />{" "}
                      </IconButton>
                    ) : (
                      <IconButton
                        aria-label="inActive"
                        onClick={() => inActiveData(item._id)}
                      >
                        <MdThumbUp color="rgba(15,206,80,1)" />
                      </IconButton>
                    )}{" "}
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
          <Snackbar autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              SubCategory is found in this Category!
            </Alert>
          </Snackbar>
        </Paper>
      </Modal>
    </>
  );
}
