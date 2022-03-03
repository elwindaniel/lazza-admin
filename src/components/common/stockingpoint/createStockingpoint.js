import React from "react";
import "./stock.css";
import TopBar from "../topBar";
import YellowBox from "../settings/banner/backDiv/backDiv";
import AddStockingPoint from "../forms/addStockingPoint";
function createStock(props) {
  let eid = props.match.params.editId;
  return (
    <div className="customer">
      <TopBar
        title={eid == null ? "Add Stocking point" : "Edit Stocking point"}
      />
      <YellowBox />
      <AddStockingPoint stockingPointId={eid} />
    </div>
  );
}

export default createStock;
