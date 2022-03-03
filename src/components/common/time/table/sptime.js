import {
    Grid,
    CircularProgress,
    makeStyles,
    Paper,
    TableBody,
    TableCell,
    TableRow,
    TextField,
    Typography,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import useTable from "../../controls/table/useTable";
import { globalTime } from "../../../../api/constants";
import Axios from "../../../../api/axios";

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

export default function TimerTable(props) {
    const GET_URL = `${globalTime.getStockingPointAllTime}/${props.userId}`;
    const EDIT_URL = `${globalTime.editStockingPointTime}/`;
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

    const [lazzaTimeUpdate, setLazzaTimeUpdate] = useState({});
    const [lazzaTimeUpdateID, setLazzaTimeUpdateID] = useState("");

    function updateHandle(e, id) {
        const date = new Date();
        setLazzaTimeUpdateID(id);
        // console.log(e.target.name, e.target.value, )
        const updatelazzaTime = { ...lazzaTimeUpdate };
        updatelazzaTime[e.target.name] = date.toDateString() + " " + e.target.value;
        setLazzaTimeUpdate(updatelazzaTime);
    }

    const updateTime = (id) => {
        setLazzaTimeUpdateID(id);
        setLoading(true);
        // console.log(lazzaTimeUpdate, "lazzaTime");
        Axios.put(`${EDIT_URL}${id}`, lazzaTimeUpdate)
            .then((res) => {
                // console.log(res, "res");
                setLazzaTimeUpdate({});
                child();
                setLoading(false);
                setLazzaTimeUpdateID("");
            })
            .catch((error) => {
                console.log(error, "error");
                setLazzaTimeUpdate({});
                setLoading(false);
                setLazzaTimeUpdateID("");
            });
    };




    return (
        <>

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
                                                    value={
                                                        lazzaTimeUpdateID === item._id
                                                            ? lazzaTimeUpdate && lazzaTimeUpdate.startTime
                                                                ? lazzaTimeUpdate.startTime.split(" ").pop()
                                                                : null
                                                            : null
                                                    }
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
                                                    value={
                                                        lazzaTimeUpdateID === item._id
                                                            ? lazzaTimeUpdate && lazzaTimeUpdate.endTime
                                                                ? lazzaTimeUpdate.endTime.split(" ").pop()
                                                                : null
                                                            : null
                                                    }
                                                    onChange={(e) => updateHandle(e, item._id)}
                                                    fullWidth
                                                    defaultValue={item?.endTime? item.endTime.split(' ').pop():"16:30"}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <div style={{ display: "flex" }}>
                                                    <button
                                                        style={{
                                                            height: "40px",
                                                            padding: "0px",
                                                            marginRight: "10px",
                                                        }}
                                                        className="button"
                                                        onClick={() => updateTime(item._id)}
                                                    >
                                                        {lazzaTimeUpdateID === item._id && loading ? (
                                                            <CircularProgress color="secondary" />
                                                        ) : (
                                                            "UPDATE"
                                                        )}
                                                    </button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                    : null}
                            </TableBody>
                        </TblContainer>
                        {/* <TblPagination /> */}
                    </Paper>
                    {/* // ) : (
                    //     <Paper className={classes.tablePaper}>"no Records"</Paper>
                    // )} */}
                </Grid>
            </Grid>
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
