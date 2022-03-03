import {
  Grid,
  makeStyles,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  IconButton,
  Typography,
  InputBase,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import useTable from "../../controls/table/useTable";
import { unitRequests } from "../../../../api/constants";
import Modal from "@material-ui/core/Modal";

import Axios from "../../../../api/axios";
import {
  MdDelete,
  MdEdit,
  MdThumbUp,
  MdThumbDown,
  MdSearch,
} from "react-icons/md";

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
  { id: "code", label: "Promotional Code" },
  { id: "no", label: "Name of Users" },
  { id: "disounts", label: "Discounts" },
  { id: "actions", label: "Actions", diableSorting: true },
];

export default function Usedcodestable() {
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
      await Axios.get(GET_FILTERGROUP_URL).then((res) => {
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
            x.abbreviation.toLowerCase().includes(target.value)
          );
      },
    });
  };

  function child() {
    GetData();
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

        <InputBase
          className={classes.right}
          placeholder="Search "
          onChange={handleSearch}
          inputProps={{ "aria-label": "search " }}
        />
        <IconButton type="submit" aria-label="search">
          <MdSearch />
        </IconButton>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          {loading ? null : records && records.length ? (
            <Paper className={classes.tablePaper}>
              <TblContainer>
                <TblHead />
                <TableBody>
                  {recordsAfterPagingAndSorting().map((item, index) => (
                    <TableRow key={item._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.abbreviation}</TableCell>
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
      </Grid>

      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
      ></Modal>
      <Modal className={classes.modal} open={openDelete} onClose={handleClose}>
        <Paper className={classes.paper}>
          <IconButton aria-label="delete" onClick={() => handleClose()}>
            <MdDelete color="rgba(139,138,135,1)" />
          </IconButton>
          <IconButton aria-label="edit" onClick={() => deleteApi(deletedData)}>
            <MdEdit color="rgba(139,138,135,1)" />
          </IconButton>
        </Paper>
      </Modal>
    </>
  );
}
