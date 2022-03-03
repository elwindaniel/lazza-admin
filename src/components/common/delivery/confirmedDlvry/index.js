import React from "react";
import "../managedelivery/managedelivery.css";
import TopBar from "../../topBar";
import BackDiv from "../managedelivery/backDiv/backDiv";
import ConfirmDeliveryTable from "./table";
import DeliveryTopBar from "../deliveryTopbar";
function ConfirmDelivery(props) {
  return (
    <div>
      <DeliveryTopBar title="Delivered" />
      <div className="yellow-box">
        <BackDiv />
      </div>
      <div className="managepromo-inner">
        <ConfirmDeliveryTable />
      </div>
    </div>
  );
}

export default ConfirmDelivery;
