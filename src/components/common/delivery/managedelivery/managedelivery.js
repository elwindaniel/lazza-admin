import React from "react";
import "./managedelivery.css";
import TopBar from "../../topBar";
import ManagedeliveryTable from "./managedeliveryTable";

export default function Managedeliveri() {
  return (
    <div className="managepromo">
      <TopBar title="Manage Delivery boy" />
      <div className="managepromo-inner">
        <ManagedeliveryTable />
      </div>
    </div>
  );
}
