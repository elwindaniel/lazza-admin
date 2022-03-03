import React from "react";
import "../deliveryTopbar/topbar.css";
import TopBar from "../../topBar";
import BackDiv from "../managedelivery/backDiv/backDiv";
import ConfirmDispatchedTable from "./table";
import DeliveryTopBar from "../deliveryTopbar";
function ConfirmDispatched(props) {
  return (
    <div>
      <DeliveryTopBar title="Dispatched" />
      <div className="yellow-box">
        <BackDiv />
      </div>
      <div className="managepromo-inner">
        <ConfirmDispatchedTable />
      </div>
    </div>
  );
}

export default ConfirmDispatched;
