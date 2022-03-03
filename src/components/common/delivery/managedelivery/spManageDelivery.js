import React from "react";
import "./managedelivery.css";
import TopBar from "../../topBar";
import BackDiv from "./backDiv/backDiv";
import ManagedeliveryTable from "./spManageTable";

export default function SPManagedeliveri() {
  return (
    <div className="managepromo">
      <TopBar title="Manage Delivery boy" />
      {/* <div className="yellow-box"><BackDiv /></div> */}
      <div className="managepromo-inner">
        <ManagedeliveryTable />
      </div>
    </div>
  );
}
