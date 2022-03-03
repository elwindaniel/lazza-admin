import React from "react";
import "./managepromotionCode.css";
import TopBar from "../../topBar";
import YellowBox from "../../settings/banner/backDiv/backDiv";
import ManagepromoTable from "./managepromoTable";

export default function ManagePromotionCode() {
  return (
    <div className="managepromo">
      <TopBar title="Manage Promotion code" />
      <YellowBox title="Create Promocode" url="/createpromotioncode" />
      <div className="managepromo-inner">
        <ManagepromoTable />
      </div>
    </div>
  );
}
