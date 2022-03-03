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
import React, { useState, useEffect, useRef } from "react";
import useTable from "../../controls/table/useTable";
import { stockRequests, variantsRequests } from "../../../../api/constants";
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
} from "react-icons/md";
import Form from "../../forms/creatStock";
import "../stock.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: "rgba(248,205,94,1)",
    padding: theme.spacing(2),
    marginTop: 20,
    marginBottom: 20,
  },
  right: {
    marginLeft: "80%",
    height: "35px",
  },
  left: {
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
  { id: "variantName", label: "Variant Name" },
  { id: "currentStock", label: "Current Stock" },
];

export default function Unittable() {
  const session = {
    token: sessionStorage.getItem("token"),
  };

  let userId;

  const payloadStart = session.token.indexOf(".") + 1;
  const payloadEnd = session.token.lastIndexOf(".");
  let payload = session.token.substring(payloadStart, payloadEnd);

  if (payload.length === 0) {
  } else {
    payload = atob(payload);
    const jsonPayload = JSON.parse(payload);
    userId = jsonPayload.id;
  }

  const GET_currentStock_URL = `${stockRequests.currentStock}/`;
  const DELETE_URL = `${stockRequests.deleteStock}/`;
  const STATUS_URL = `${stockRequests.editStock}/`;
  const Variants_URL = `${variantsRequests.getAllVariants}/`;

  const [records, setRecords] = useState();
  const [loading, setLoading] = useState(false);
  const [filterfn, setFilterfn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const GetData = async () => {
    try {
      await Axios.get(GET_currentStock_URL + userId).then((res) => {
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
            x[0].variantName.toLowerCase().includes(target.value)
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
    Axios.delete(DELETE_URL + userId)
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
    setOpenEdit(false);
    setOpenDelete(false);
  };
  const [edit, setEdit] = useState();
  const [editName, setEditName] = useState();
  const [editAbbreviation, setEditAbbreviation] = useState();
  const [editLastDay, setEditLastDay] = useState();
  const [editvariantId, setEditvariantId] = useState();
  const editData = (
    editId,
    editName,
    editAbbreviation,
    editLastDay,
    editVId
  ) => {
    // console.log(editVId, "editVId");
    setOpenEdit(true);
    setEdit(editId);
    setEditName(editName);
    setEditAbbreviation(editAbbreviation);
    setEditLastDay(editLastDay);
    setEditvariantId(editVId);
  };

  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [deletedData, setDeletedData] = React.useState(false);

  const deleteData = (dataid) => {
    setDeletedData(dataid);

    setOpenDelete(true);
  };
  const deleteStock = (dataid) => {
    setDeletedData(dataid);

    setOpenDelete(true);
  };

  const transientName = useRef("");
  const [name, setName] = useState("");

  const handleBlur = () => {
    if (transientName.current !== name) {
      transientName.current = name;
    }
  };

  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <>
      <Paper className={classes.root}>
        <div className={classes.right}>
          <div className="createbtn">
            {/* <button className="button" onClick={() => deleteApi()}>
              {"Delete"}
            </button> */}
          </div>{" "}
        </div>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12}>
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
                      <TableCell>{item[0].variantName}</TableCell>

                      <TableCell
                        onClick={() =>
                          editData(
                            item._id,
                            item[0].variantName,
                            item[0].currentStock,
                            item[0].lastDay,
                            item[0].variantId
                          )
                        }
                      >
                        <input
                          className="textFormik_flex8"
                          value={item[0].currentStock}
                        />
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
      <Modal className={classes.modal} open={openEdit} onClose={handleClose}>
        <Paper className={classes.paper}>
          <Form
            itemId={edit}
            itemName={editName}
            itemCurrent={editAbbreviation}
            itemLastday={editLastDay}
            itemVariantId={editvariantId}
            onSelect={() => editChild()}
          />
        </Paper>
      </Modal>
    </>
  );
}
