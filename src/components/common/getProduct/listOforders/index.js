import {
    Grid,
    Paper,
    TableBody,
    TableCell,
    TableRow,
    IconButton,
    Modal, Button,
    Typography,
    TextField,
    InputAdornment, Dialog, Snackbar,
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import React, { useState, useEffect } from "react";
import "../../forms/form.css"
import { makeStyles } from "@material-ui/core/styles";
import useTable from "../../controls/table/useTable";
import {
    MdDelete,
    MdEdit,
    MdSearch,
    MdThumbUp,
    MdThumbDown,
    MdCheckCircle,
    MdClose, MdAdd
} from "react-icons/md";

import { orderRequests, API_URL } from "../../../../api/constants";
import Axios from "../../../../api/axios";
import AddAddress from '../deliverAdd';
const useStyles = makeStyles((theme) => ({
    tablePaper: {
        padding: theme.spacing(1),
    },
    paper: {
        width: "50%",
        backgroundColor: theme.palette.background.paper,
        overflow: "scroll",
        padding: theme.spacing(2, 4, 3),
    },
    modal: {
        alignItems: "topcenter",
        display: "flex",
        justifyContent: "center",
    },
    flex: {
        display: "flex"
    },
    margin: {
        marginLeft: 10,
        marginRight: 10,
    },
    total: {
        marginTop: 30,
        marginRight: 10,
        marginBottom: 50,
    },
    none: {
        display="none"
    }
}));

const headCells = [
    { id: "Sl No", label: "Sl No", diableSorting: true },
    { id: "Images", label: "" },
    { id: "Product", label: "Product" },
    { id: "Price", label: "Price" },
    { id: "Quantity", label: "Quantity" },
    { id: "TotalPrice", label: "Total Price" },
    { id: "", label: "" },
  
];

export default function CartTable({ onSelect, userId, loadCart, name, pinCode, phone }) {
    const GET_getCart_URL = `${orderRequests.getOrderById}/${userId}`;
    const [open, setOpen] = useState(false);
    const [openAlert, setopenAlert] = useState(false);
    const GetData = async () => {
        try {
            await Axios.get(GET_getCart_URL).then((res) => {
                setLoading(true);

                if (res.data.length > 0) {
                    setRecords(res.data);

                  
                    setLoading(false);

                } else {
                    setRecords([]);
                    setLoading(false);
                }
            });
        } catch (e) {
            
        }
    };
   
    const handleClose = () => {
      
        setOpenDelete(false);
        setOpen(false);
        setopenAlert(true);

    };
    const handleOpen = () => {
        setOpen(true);
    };
    const handleCloseAlert = () => {
        setopenAlert(false);
    };


    function child() {
        GetData();
    }

    const [active, setActive] = useState({
        active: "1",
    });
    const [inActive, setInActive] = useState({
        active: "0",
    });



    const [openDelete, setOpenDelete] = React.useState(false);
    const [deletedData, setDeletedData] = React.useState(false);

    const deleteData = (dataid) => {
       
        DelectData(dataid);
    };

    const DelectData = async (dataid) => {
        Axios.delete(`${cart.deleteCartbyId}/` + userId + "?cartId=" + dataid)
            .then((res) => {
                child();

            })
            .catch((err) => {
              
            });

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

    const [count, setCount] = useState();
    const [cartId, setCartId] = useState();

    function eSuccess() {

        handleClose();
        GetData();
    }

    const quantityUpdate = (quantity) => {
        let postData = {
            cartId: cartId,
            quantity: quantity,
        };



    };
    const addCount = (cId, quantity) => {
    };

    const subtrCount = (cId, quantity) => {

    };
    let totalPrice = 0;

    return (
        <>

            {loading ? null : records && records.length ? (
                <Paper className={classes.tablePaper}>
                    <TblContainer>
                        <TblHead />
                        <TableBody>
                            {recordsAfterPagingAndSorting().map((item, index) => (
                                <TableRow key={item._id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>
                                        {" "}
                                        <img
                                            src={API_URL + item.image}
                                            width="110px"
                                            height="80px"
                                            object-fit="contain"
                                        />
                                    </TableCell>
                                    <TableCell><Typography>{item.productName}</Typography></TableCell>
                                    <TableCell><Typography>₹ {item.rate}</Typography></TableCell>
                                    <TableCell><Typography className={classes.flex}> <div onClick={() => subtrCount()} className={classes.margin}>-</div> {item.quantity} <div onClick={addCount()} className={classes.margin}>+</div></Typography></TableCell>
                                    <TableCell><Typography>₹ {item.total}</Typography></TableCell>
                                    <TableCell><Typography onClick={() => deleteData(item._id)}>X</Typography></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </TblContainer>
                    <TblPagination />
                    <hr />
                   



                    <hr />
                    <div>
                       

                        <div className={open ? null : classes.none}>

                            <AddAddress userId={userId} cartInfo={records} total={totalPrice} name={name} phone={phone} pinCode={pinCode} onSelect={() => eSuccess()} />
                        </div>

                    </div>
                </Paper>
            ) : (
                    <Paper className={classes.tablePaper}>"no Records"</Paper>
                )}

            <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="success">
                    Order has been placed !
  </Alert>
            </Snackbar>







        </>
    );
}