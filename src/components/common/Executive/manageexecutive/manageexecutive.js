import React from "react";
import "./executive.css";
import TopBar from "../../topBar/index";
import ManageexecutiveTable from "./manageexecutivetable";

export default function Manageexecutives() {
  return (
    <div className="managepromo">
      <TopBar title="Manage Executive" />
      <div className="managepromo-inner">
        <ManageexecutiveTable />
      </div>
    </div>
  );
}
