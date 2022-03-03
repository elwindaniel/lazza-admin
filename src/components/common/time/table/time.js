import {
    Grid,
    CircularProgress,
    makeStyles,
    Paper,
    TableBody,
    TableCell,
    TableRow,
    TextField,
    IconButton,
    Typography,
    MenuItem,
} from "@material-ui/core";
import TimePicker from 'react-bootstrap-time-picker';
import React, { useState, useEffect } from "react";
import useTable from "../../controls/table/useTable";
import { globalTime } from "../../../../api/constants";
import Modal from "@material-ui/core/Modal";
import Axios from "../../../../api/axios";
import {
    MdDelete,
    MdCheckCircle,
    MdClose,
} from "react-icons/md";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        backgroundColor: "rgba(248,205,94,1)",
        padding: theme.spacing(2),
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
    { id: "days", label: "Days", diableSorting: true },
    { id: "StartTime", label: "Start Time" },
    { id: "EndTime", label: "End Time" },
    { id: "Action", label: "Save" },
];

export default function TimerTable() {
    const [selectedDate, setSelectedDate] = React.useState();

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const GET_URL = `${globalTime.getAllGlobalTime}`;
    const DELETE_URL = `${globalTime.deleteGlobalTime}/`;

    const EDIT_URL = `${globalTime.editGlobalTime}/`;
    const POST_URL = `${globalTime.setGlobalTime}`;
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
        } catch (e) { }
    };

    useEffect(() => {
        GetData();
    }, []);

    const classes = useStyles();

    const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
        useTable(records, headCells, filterfn);

    function child() {
        GetData();
    }

    const date = new Date()
    let startTimeWithDate = date.toDateString() + " " + "06:30"
    let endTimeWithDate = date.toDateString() + " " + "18:30"
    const [lazzaTime, setLazzaTime] = useState({
        day: "",
        startTime: startTimeWithDate,
        endTime: endTimeWithDate
    });
    const [lazzaTimeUpdate, setLazzaTimeUpdate] = useState({});
    const [lazzaTimeUpdateID, setLazzaTimeUpdateID] = useState("");

    function handle(e) {
        // const date = new Date()
        // console.log(e.target.name, e.target.value + " " + date.toDateString())
        const newlazzaTime = { ...lazzaTime };
        if (e.target.name === "day") {
            newlazzaTime[e.target.name] = e.target.value;
            setLazzaTime(newlazzaTime);
        }
        else {
            newlazzaTime[e.target.name] = date.toDateString() + " " + e.target.value;
            setLazzaTime(newlazzaTime);
        }

    }
    function updateHandle(e, id) {
        setLazzaTimeUpdateID(id)
        // const date = new Date()
        // console.log(e.target.value)
        const updatelazzaTime = { ...lazzaTimeUpdate };
        updatelazzaTime[e.target.name] = date.toDateString() + " " + e.target.value;
        setLazzaTimeUpdate(updatelazzaTime);
    }


    const setTime = () => {
        if (lazzaTime.day.length == 0) {
            // console.log("error");
        }
        else {
            setLoading(true);
            Axios
                .post(POST_URL, lazzaTime)
                .then((res) => {
                    // console.log(res, "res");
                    child()
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error, "error");
                    setLoading(false);
                });
        }

    };
    const updateTime = (id) => {
        setLazzaTimeUpdateID(id)
        setLoading(true);
        //console.log(lazzaTimeUpdate, "lazzaTime");
        Axios
            .put(`${EDIT_URL}${id}`, lazzaTimeUpdate)
            .then((res) => {
                // console.log(res, "res");
                setLazzaTimeUpdate({})
                child()
                setLoading(false);
                setLazzaTimeUpdateID("")
            })
            .catch((error) => {
                console.log(error, "error");
                setLazzaTimeUpdate({})
                setLoading(false);
                setLazzaTimeUpdateID("")
            });

    };

    const [deleteOpen, setdeleteOpen] = useState(false)
    const [deleteId, setdeleteId] = useState()
    const handleClose = () => {
        setdeleteOpen(false)
    }
    const deletehandle = (id) => {
        setdeleteId(id)
        setdeleteOpen(true)
    }


    const deleteApi = (deleteid) => {
        Axios.delete(DELETE_URL + deleteid)
            .then((res) => {
                child();
                setdeleteOpen(false)
                setdeleteId()
            })
            .catch((error) => { console.log(error, "error"); });
    };

    // const [selectedDate, setSelectedDate] = React.useState(
    //     new Date("2014-08-18T21:11:54")
    // );

    return (
        <>
            <Paper className={classes.root}>
                <Typography variant="h6">back</Typography>
            </Paper>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    {/* {loading ? null : records && records.length ? ( */}
                    <Paper className={classes.tablePaper}>
                        <TblContainer>
                            <TblHead />
                            <TableBody>
                                {records && records.length
                                    ? recordsAfterPagingAndSorting().map((item, index) => (
                                        <TableRow key={item._id}>
                                            <TableCell>{item.day}</TableCell>
                                            <TableCell>

                                                <TextField
                                                    id="startTime"
                                                    name="startTime"
                                                    type="time"
                                                    value={lazzaTimeUpdateID === item._id ? lazzaTimeUpdate && lazzaTimeUpdate.startTime ? lazzaTimeUpdate.startTime.split(' ').pop() : null : null}
                                                    onChange={(e) => updateHandle(e, item._id)}
                                                    fullWidth
                                                    defaultValue={item?.startTime? item.startTime.split(' ').pop():"06:30"}

                                                />
                                            </TableCell>
                                            <TableCell>

                                                <TextField
                                                    id="endTime"
                                                    name="endTime"
                                                    type="time"
                                                    value={lazzaTimeUpdateID === item._id ? lazzaTimeUpdate && lazzaTimeUpdate.endTime ? lazzaTimeUpdate.endTime.split(' ').pop() : null : null}

                                                    onChange={(e) => updateHandle(e, item._id)}
                                                    fullWidth
                                                    defaultValue={item?.endTime? item.endTime.split(' ').pop():"16:30"}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <div style={{ display: "flex" }}>
                                                    <button
                                                        style={{ height: "40px", padding: "0px", marginRight: "10px" }}
                                                        className="button" onClick={() => updateTime(item._id)}
                                                    >
                                                        {lazzaTimeUpdateID === item._id && loading ? <CircularProgress color="secondary" /> : "UPDATE"}
                                                    </button>
                                                    <button
                                                        style={{ height: "40px", padding: "0px", width: "40px" }}
                                                        className="button" onClick={() => deletehandle(item._id)}
                                                    >
                                                        <MdDelete />
                                                    </button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                    : null}

                                {records && records.length < 7 ? <TableRow key={"item._id"}>
                                    <TableCell>
                                        <TextField
                                            id="day"
                                            name="day"
                                            select
                                            value={lazzaTime.day}
                                            onChange={(e) => handle(e)}
                                            fullWidth
                                        >
                                            {days.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="startTime"
                                            name="startTime"
                                            type="time"
                                            value={lazzaTime.startTime.split(' ').pop()}
                                            onChange={(e) => handle(e)}
                                            fullWidth
                                            defaultValue="06:30"

                                        // onChange={(e) => setTime(e, "start")}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="endTime"
                                            name="endTime"
                                            type="time"
                                            value={lazzaTime.endTime.split(' ').pop()}
                                            onChange={(e) => handle(e)}
                                            defaultValue="18:30"
                                            fullWidth
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <button
                                            style={{ height: "40px", padding: "0px" }}
                                            className="button"
                                            onClick={() => setTime()}
                                        >
                                            {lazzaTimeUpdateID == "" && loading ? <CircularProgress color="secondary" /> : "SAVE"}
                                        </button>
                                    </TableCell>
                                </TableRow> : null}
                            </TableBody>
                        </TblContainer>
                        {/* <TblPagination /> */}
                    </Paper>
                    {/* // ) : (
                    //     <Paper className={classes.tablePaper}>"no Records"</Paper>
                    // )} */}
                </Grid>
            </Grid>

            <Modal className={classes.modal} open={deleteOpen} onClose={handleClose}>
                <Paper className={classes.paper}>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Typography variant="h6">
                            Are you sure to delete ?
                        </Typography>
                        <IconButton
                            aria-label="delete"
                            onClick={() => deleteApi(deleteId)}
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

const days = [
    {
        value: "Monday",
        label: "Monday",
    },
    {
        value: "Tuesday",
        label: "Tuesday",
    },
    {
        value: "Wednesday",
        label: "Wednesday",
    },
    {
        value: "Thursday",
        label: "Thursday",
    },
    {
        value: "Friday",
        label: "Friday",
    },
    {
        value: "Saturday ",
        label: "Saturday ",
    },
    {
        value: "Sunday ",
        label: "Sunday ",
    },
];
