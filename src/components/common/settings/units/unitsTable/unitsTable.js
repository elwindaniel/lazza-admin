import {
  Grid,
  InputAdornment,
  makeStyles,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  IconButton,
  Typography,
  TextField,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import useTable from "../../../controls/table/useTable";
import { unitRequests } from "../../../../../api/constants";
import Modal from "@material-ui/core/Modal";
import Service from "../../../../../api/service";
import {
  MdDelete,
  MdEdit,
  MdThumbUp,
  MdThumbDown,
  MdSearch,
  MdCheckCircle,
  MdClose,
} from "react-icons/md";
import Form from "../../../forms/createUnits";
import "../units.css";

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
  { id: "abbreviation", label: "Abbreviation" },
  { id: "nameUnit", label: "Name of Unit" },
  { id: "actions", label: "Actions", diableSorting: true },
];

export default function Unittable() {
  const GET_FILTERGROUP_URL = `${unitRequests.getAllUnit}`;
  const DELETE_URL = `${unitRequests.deleteUnit}/`;
  const STATUS_URL = `${unitRequests.editUnit}/`;

  const [records, setRecords] = useState();
  const [loading, setLoading] = useState(false);
  const [filterfn, setFilterfn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const GetData = async () => {
    try {
      await Service.GetUnit().then((res) => {
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
          return items.filter(
            (x) =>
              x.abbreviation.toLowerCase().includes(target.value) ||
              x.abbreviation.toUpperCase().includes(target.value) ||
              x.abbreviation.includes(target.value) ||
              x.name.toLowerCase().includes(target.value) ||
              x.name.toUpperCase().includes(target.value) ||
              x.name.includes(target.value)
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
    Service.DeleteUnit(deleteid)
      .then((res) => {
        child();
        handleClose();
      })
      .catch((err) => {});
  };

  const activeData = (dataid) => {
    let data = { status: "1" };
    Service.EditUnit(data, dataid)
      .then((res) => {
        child();
      })
      .catch((err) => {});
  };
  const inActiveData = (dataid) => {
    let data = { status: "0" };
    Service.EditUnit(data, dataid)
      .then((res) => {
        child();
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

  const deleteData = (dataid) => {
    setDeletedData(dataid);

    setOpenDelete(true);
  };

  return (
    <>
      <Paper className={classes.root}>
        {/* <Typography variant="h6">back</Typography> */}
      </Paper>

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

                      <TableCell>{item.abbreviation}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="delete"
                          onClick={() => deleteData(item._id)}
                        >
                          <MdDelete color="rgba(139,138,135,1)" />
                        </IconButton>
                        <IconButton
                          aria-label="edit"
                          onClick={() =>
                            editData(item._id, item.name, item.abbreviation)
                          }
                        >
                          <MdEdit color="rgba(139,138,135,1)" />
                        </IconButton>
                        {item.status == false ? (
                          <IconButton
                            aria-label="edit"
                            onClick={() => activeData(item._id)}
                          >
                            {" "}
                            <MdThumbDown color="rgba(246,58,58,1)" />{" "}
                          </IconButton>
                        ) : (
                          <IconButton
                            aria-label="edit"
                            onClick={() => inActiveData(item._id)}
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
        <Grid item xs={4}>
          <Form onSelect={() => child()} />
        </Grid>
      </Grid>

      <Modal className={classes.modal} open={open} onClose={handleClose}>
        <Paper className={classes.paper}>
          <Form
            itemId={edit}
            itemName={editName}
            itemAbbreviation={editAbbreviation}
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
          </Grid>
        </Paper>
      </Modal>
    </>
  );
}
