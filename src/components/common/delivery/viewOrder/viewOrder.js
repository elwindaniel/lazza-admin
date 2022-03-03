import React from "react";
import "../managedelivery/managedelivery.css";
import TopBar from "../../topBar";
import DeliveryTopBar from "../deliveryTopbar";
import BackDiv from "../managedelivery/backDiv/backDiv";
import ManagedeliveryTable from "./table";

function ViewOrderAdmin(props) {
  return (
    <div>
      <DeliveryTopBar title="Orders" />
      {/* <TopBar title="Orders" className="isdesktop" /> */}
      <div className="yellow-box">
        <BackDiv />
      </div>
      <div className="managepromo-inner">
        <ManagedeliveryTable />
      </div>
    </div>
  );
}

export default ViewOrderAdmin;
