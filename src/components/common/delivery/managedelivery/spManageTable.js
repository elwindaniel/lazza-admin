import {
  Grid,
  makeStyles,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  IconButton,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import useTable from "../../controls/table/useTable";

import Modal from "@material-ui/core/Modal";

import Axios from "../../../../api/axios";
import { MdDelete, MdEdit, MdClose, MdCheckCircle } from "react-icons/md";
import Form from "../../forms/createPromotionCode";

import "./managedelivery.css";

import { API_URL, deliveryBoyRequests } from "../../../../api/constants";
import { Link } from "react-router-dom";
import sessionCheck from "../../../../api/sessionCheck";
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
  { id: "Sl No.", label: "Sl No.", diableSorting: true },
  { id: "Name", label: "Name" },
  { id: "StockingPoint", label: "Stocking Point" },
  { id: "PhoneNumber", label: "Phone Number" },
  { id: "id", label: "ID Proof" },
  { id: "Actions", label: "Actions", diableSorting: true },
];

export default function SPManagedeliveryTable() {
  const userdetails = sessionCheck.getLoggedinUserId();
  const userid = userdetails.userId;
  const GET_URL = `${deliveryBoyRequests.getSPDelivery}/${userid} `;
  const DELETE_URL = `${deliveryBoyRequests.deleteDelivery}/`;
  const EDIT_URL = `${deliveryBoyRequests.editDeliveryBoy}/`;
  // const STATUS_URL = `${PromoCodeRequests.editUnit}/`;

  const [records, setRecords] = useState();
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
            x.abbreviation.toLowerCase().includes(target.value)
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

  const deleteData = (dataid) => {
    Axios.delete(DELETE_URL + dataid)
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
  };
  const [edit, setEdit] = useState();
  const [editName, setEditName] = useState();
  const [value, setvalue] = useState();
  const [status, setstatus] = useState();
  const [datefrm, setdatefrm] = useState();

  const [dateto, setdateto] = useState();

  const [openDelete, setOpenDelete] = React.useState(false);
  const [deletedData, setDeletedData] = React.useState(false);

  const deleteeData = (dataid) => {
    setDeletedData(dataid);

    setOpenDelete(true);
  };

  return (
    <>
      <Paper className={classes.root}>
        {/* <Typography variant="h6">back</Typography> */}
      </Paper>

      {loading ? null : records && records.length ? (
        <Paper className={classes.tablePaper}>
          <TblContainer>
            <TblHead />
            <TableBody>
              {recordsAfterPagingAndSorting().map((item, index) => (
                <TableRow key={item._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    {item.stockingPoint.map(
                      (point, pindex) => point.stockingPointName
                    )}
                  </TableCell>
                  <TableCell>{item.phoneNumber}</TableCell>
                  <TableCell>
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
                      onClick={() => deleteeData(item._id)}
                    >
                      <MdDelete color="rgba(139,138,135,1)" />
                    </IconButton>
                    <IconButton aria-label="edit">
                      <Link to={`/CreateDeliveryBoy/${item._id}`}>
                        <MdEdit color="rgba(139,138,135,1)" />
                      </Link>
                    </IconButton>

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
      {/* Modal */}
      <Modal className={classes.modal} open={open} onClose={handleClose}>
        <Paper className={classes.paper}>
          <Form onSelect={() => editChild()} />
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
              onClick={() => deleteData(deletedData)}
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
