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

import Form from "../../../common/forms/createCountry";
import { makeStyles } from "@material-ui/core/styles";
import useTable from "../../controls/table/useTable";
import {
  MdDelete,
  MdEdit,
  MdThumbUp,
  MdThumbDown,
  MdClose,
  MdCheckCircle,
  MdSearch,
} from "react-icons/md";
import { countryRequests } from "../../../../api/constants";
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

  { id: "Country", label: "Country" },
  { id: "Action", label: "Action" },
];

export default function CountryTable() {
  const [errorOpen, setErrorOpen] = useState(false);
  const GetData = async () => {
    try {
      await Service.GetCountry().then((res) => {
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
  function child() {
    GetData();
  }

  function editChild() {
    GetData();
    handleClose();
  }

  const deleteApi = (deleteid) => {
    Service.DeleteCountry(deleteid)
      .then((res) => {
        child();
        handleClose();
      })
      .catch((err) => {
        setErrorOpen(true);
      });
  };
  const handleClose = () => {
    setOpen(false);
    setOpenDelete(false);
    setErrorOpen(false);
  };

  const activeData = (dataid) => {
    let data = { active: "1" };
    Service.EditCountry(data, dataid)
      .then((res) => {
        child();
      })
      .catch((err) => {});
  };

  const inActiveData = (dataid) => {
    let data = { active: "0" };
    Service.EditCountry(data, dataid)
      .then((res) => {
        child();
      })
      .catch((err) => {});
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

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = useTable(records, headCells, filterfn);

  const [openDelete, setOpenDelete] = React.useState(false);
  const [deletedData, setDeletedData] = React.useState(false);

  const handleSearch = (e) => {
    let target = e.target;

    setFilterfn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter(
            (x) =>
              x.countryName.toLowerCase().includes(target.value) ||
              x.countryName.toUpperCase().includes(target.value)
          );
      },
    });
  };
  const deleteData = (dataid) => {
    setDeletedData(dataid);

    setOpenDelete(true);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={8}>
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

                      <TableCell>{item.countryName}</TableCell>

                      <TableCell>
                        <IconButton
                          aria-label="delete"
                          onClick={() => deleteData(item._id)}
                        >
                          <MdDelete color="rgba(139,138,135,1)" />
                        </IconButton>
                        <IconButton aria-label="edit">
                          <MdEdit
                            color="rgba(139,138,135,1)"
                            onClick={() => editData(item._id, item.countryName)}
                          />
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
                        {}
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
        <Grid item xs={4}>
          <Form onSelect={() => editChild()} />
        </Grid>
      </Grid>

      <Modal className={classes.modal} open={open} onClose={handleClose}>
        <Paper className={classes.paper}>
          <Form
            itemId={edit}
            itemName={editName}
            onSelect={() => editChild()}
          />
        </Paper>
      </Modal>
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
          </Grid>{" "}
          <Snackbar
            open={errorOpen}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="error">
              Cannot delete this country!
            </Alert>
          </Snackbar>
        </Paper>
      </Modal>
    </>
  );
}
