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
  Snackbar,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import CreateFilterGroup from "../../../../forms/createFilterGroup";
import useTable from "../../../../controls/table/useTable";
import { API_URL, filterGroupRequests } from "../../../../../../api/constants";
import Modal from "@material-ui/core/Modal";
import Service from "../../../../../../api/service";
import {
  MdSearch,
  MdDelete,
  MdEdit,
  MdThumbUp,
  MdThumbDown,
  MdClose,
  MdCheckCircle,
} from "react-icons/md";
import EditForm from "../../../../forms/createFilterGroup";
import MuiAlert from "@material-ui/lab/Alert";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: "rgba(248,205,94,1)",
    padding: theme.spacing(2),
    marginTop: 20,
    marginBottom: 20,
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
  { id: "groupName", label: "GroupName" },
  { id: "img", label: "Image" },
  { id: "actions", label: "Actions", diableSorting: true },
];

export default function FilterGroupPage() {
  const GET_FILTERGROUP_URL = `${filterGroupRequests.getAllFilterGroup}`;
  const DELETE_URL = `${filterGroupRequests.deleteFilterGroup}/`;
  const STATUS_URL = `${filterGroupRequests.statusFilterGroup}/`;
  const [errorOpen, setErrorOpen] = useState(false);
  const [records, setRecords] = useState();
  const [loading, setLoading] = useState(true);
  const [filterfn, setFilterfn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const GetData = async () => {
    try {
      await Service.GetFilterGp().then((res) => {
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

  function child() {
    GetData();
  }

  function editChild() {
    GetData();
    handleClose();
  }
  const handleSearch = (e) => {
    let target = e.target;

    setFilterfn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter(
            (x) =>
              x.name.toLowerCase().includes(target.value) ||
              x.name.toUpperCase().includes(target.value) ||
              x.name.includes(target.value)
          );
      },
    });
  };

  const [edit, setEdit] = useState();
  const [editNam, setEditName] = useState();
  const [editImg, setEditImg] = useState();
  const editData = (editId, editNam, editImg) => {
    setOpen(true);
    setEdit(editId);
    setEditName(editNam);
    setEditImg(editImg);
  };

  const deleteApi = (deleteid) => {
    Service.DeleteFilterGp(deleteid)
      .then((res) => {
        child();
        handleClose();
      })
      .catch((err) => {
        setErrorOpen(true);
      });
  };
  const activeData = (dataid) => {
    let status = "Active";
    Service.StatusFilterGp(dataid, status)
      .then((res) => {
        child();
      })
      .catch((err) => {});
  };
  const inActiveData = (dataid) => {
    let status = "InActive";
    Service.StatusFilterGp(dataid, status)
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
    setErrorOpen(false);
  };
  const [openDelete, setOpenDelete] = React.useState(false);
  const [deletedData, setDeletedData] = React.useState(false);

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
                      <TableCell>{item.name}</TableCell>
                      <TableCell>
                        {" "}
                        <img
                          src={API_URL + item.imagePath}
                          width="80px"
                          height="80px"
                          object-fit="contain"
                        />
                      </TableCell>
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
                            editData(item._id, item.name, item.imagePath)
                          }
                        >
                          <MdEdit color="rgba(139,138,135,1)" />
                        </IconButton>
                        {/*item.status == "InActive" ? (
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
                        )*/}{" "}
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
          <CreateFilterGroup onSelect={() => child()} />
        </Grid>
      </Grid>
      {/* Modal */}
      <Modal className={classes.modal} open={open} onClose={handleClose}>
        <Paper className={classes.paper}>
          <EditForm
            itemId={edit}
            itemName={editNam}
            itemImg={editImg}
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
              Filters are found on this Group!
            </Alert>
          </Snackbar>
        </Paper>
      </Modal>
    </>
  );
}
