import React from "react";
import "./stock.css";
import TopBar from "../topBar";
import BackDiv from "./backDiv/backDiv";
import StockMange from "../stockingpoint/stockMangeTable";

export default function ManageDistributer() {
    return (
        <div className="units">
            <TopBar title="Stock Sheet" />

            <div className="units-inner">
                <StockMange />
            </div>
        </div>
    );
}
