import React from "react";
import "./stock.css";
import TopBar from "../topBar";
import BackDiv from "./backDiv/backDiv";
import DailyStock from "./dailyStockTable";

export default function DailyStockTable() {
    return (
        <div className="units">
            <TopBar title="Daily Stock" />
            <div className="units-inner">
                <DailyStock />
            </div>
        </div>
    );
}
