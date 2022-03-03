import React, { useEffect, useState } from "react";
import "../customers/customer.css";
import TopBar from "../topBar";
import Time from "./table/sptime";
import sessionCheck from "../../../api/sessionCheck";
import { globalTime, StockingPointRequests } from "../../../api/constants";
import Axios from "../../../api/axios";
import { Paper, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        backgroundColor: "rgba(248,205,94,1)",
        padding: theme.spacing(2),
        marginTop: 20,
        marginBottom: 20,
        justifyContent: "space-between",
    },
}));
export default function ManageCustomers() {
    const classes = useStyles();
    const userdetails = sessionCheck.getLoggedinUserId();
    const userId = userdetails.userId;

    const [dropOn, setDropOn] = useState(false);

    useEffect(() => {
        Axios.get(`${StockingPointRequests.getStockingPointById}/${userId}`).then(
            (res) => {
                setDropOn(res.data.onStatus);
            }
        );
    }, []);

    const dropOffNo = () => {
        let body = { onStatus: dropOn ? "0" : "1" };
        // console.log(body, "body");
        Axios.put(`${globalTime.onOffStockingPoint}/${userId}`, body)
            .then((res) => {
                setDropOn(!dropOn);
            })
            .catch((error) => {
                console.log(error, "error");
            });
    };
    return (
        <div className="customer">
            <TopBar title="Time" />
            <div className="customer-inner">
                <Paper className={classes.root}>
                    <Typography variant="h6">back</Typography>
                    <span style={{ display: "flex", justifyContent: "center" }}>
                        <button

                            className="button"
                            style={{ width: "260px", backgroundColor: dropOn ? "#90EE90" : "#ff5050", color: dropOn ? "#000" : "#fff", }}
                            onClick={() => dropOffNo()}
                        >
                            STATUS :{dropOn ? " SHOP OPEN" : " SHOP CLOSED"}
                        </button>
                    </span>
                </Paper>

                <Time userId={userId} />
            </div>
        </div>
    );
}
