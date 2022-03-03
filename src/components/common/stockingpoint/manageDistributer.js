import React from "react";
import "./stock.css";
import TopBar from "../topBar";
import BackDiv from "./backDiv/backDiv";
import StockTable from "../stockingpoint/stockingPointTable/stockingPoint";

export default function ManageDistributer() {
  return (
    <div className="units">
      <TopBar title="Stocking Point" />
      <div className="yellow-box">
        <BackDiv />
      </div>
      <div className="units-inner">
        <StockTable />
      </div>
    </div>
  );
}
