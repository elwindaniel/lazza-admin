import React from "react";
import "./report.css";
import TopBar from "../topBar";

import ReportTable from "./spReportTable";

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
