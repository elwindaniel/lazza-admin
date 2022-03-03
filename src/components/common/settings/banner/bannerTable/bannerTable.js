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
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Form from "../../../forms/createBanner";
import { makeStyles } from "@material-ui/core/styles";
import useTable from "../../../controls/table/useTable";
import {
  MdDelete,
  MdEdit,
  MdSearch,
  MdThumbUp,
  MdThumbDown,
  MdCheckCircle,
  MdClose,
} from "react-icons/md";
import Service from "../../../../../api/service";
import { API_URL } from "../../../../../api/constants";

const useStyles = makeStyles((theme) => ({
  tablePaper: {
    padding: theme.spacing(1),
  },
  paper: {
    width: "50%",
    backgroundColor: theme.palette.background.paper,
    marginTop: 10,
    padding: theme.spacing(2, 4, 3),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: 'scroll',
  },
}));

const headCells = [
  { id: "Sl No", label: "Sl No", diableSorting: true },
  { id: "Title", label: "Title" },
  { id: "Images", label: "Desktop Images" },
  { id: "MImages", label: "Mobile Images" },
  { id: "actions", label: "Actions", diableSorting: true },
];

export default function BannerTable() {
  const GetData = async () => {
    try {
      await Service.GetBanner().then((res) => {
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
  const deleteApi = (deleteid) => {
    Service.DeleteBanner(deleteid)
      .then((res) => {
        child();
        handleClose();
      })
      .catch((err) => { });
  };
  const handleClose = () => {
    setOpen(false);
    setOpenDelete(false);
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
    Service.EditBanner(data, dataid)
      .then((res) => {
        child();
      })
      .catch((err) => { });
  };

  const inActiveData = (dataid) => {
    let data = { active: "0" };
    Service.EditBanner(data, dataid)
      .then((res) => {
        child();
      })
      .catch((err) => { });
  };

  const [openDelete, setOpenDelete] = React.useState(false);
  const [deletedData, setDeletedData] = React.useState(false);

  const deleteData = (dataid) => {
    setDeletedData(dataid);

    setOpenDelete(true);
  };

  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState();
  const [editName, setEditName] = useState();
  const [Title, setTitle] = useState();
  const [dateFrom, setdateFrom] = useState();
  const [dateTo, setdateTo] = useState();
  const [editImg, setEditImg] = useState();
  const [editMobImg, seteditMobImg] = useState();
  const [position, setposition] = useState();
  const editData = (
    editId,
    editName,
    edittitle,
    editdatefrm,
    editdateto,
    editposition,
    editImg,
    editMobImg
  ) => {
    // let toDate = new Date(editdateto).getDate()
    // let toMonth = new Date(editdateto).getMonth()
    //2021-07-26 
    setOpen(true);
    setEdit(editId);
    setEditName(editName);
    setTitle(edittitle);
    setdateFrom(editdatefrm);
    setdateTo(editdateto.split('T')[0]);
    setposition(editposition);
    setEditImg(editImg);
    seteditMobImg(editMobImg);
  };
  useEffect(() => {
    GetData();
  }, []);
  const handleSearch = (e) => {
    let target = e.target;

    setFilterfn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter(
            (x) =>
              x.title.toLowerCase().includes(target.value) ||
              x.title.toUpperCase().includes(target.value) ||
              x.title.includes(target.value)
          );
      },
    });
  };
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
                      <TableCell>{item.title}</TableCell>
                      <TableCell>
                        {" "}
                        <img
                          src={API_URL + item.webImagePath}
                          width="200px"
                          height="80px"
                          object-fit="contain"
                        />
                      </TableCell>
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
                        <IconButton aria-label="edit">
                          <MdEdit
                            color="rgba(139,138,135,1)"
                            onClick={() =>
                              editData(
                                item._id,
                                item.title,
                                item.url,
                                item.dateFrom,
                                item.dateTo,
                                item.position,
                                item.webImagePath,
                                item.imagePath
                              )
                            }
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
            itemTitle={Title}
            itemdatefrm={dateFrom}
            itemdateto={dateTo}
            itemposition={position}
            itemImg={editImg}
            itemmobImg={editMobImg}
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
