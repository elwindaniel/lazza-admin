import React from "react";
import "./report.css";
import TopBar from "../../common/topBar";

import ReportTable from "./reportTable";

export default function ManagePromotionCode() {
  return (
    <div className="managepromo">
      <TopBar title="Sales Report" />

      <div className="managepromo-inner">
        <ReportTable />
      </div>
    </div>
  );
}
