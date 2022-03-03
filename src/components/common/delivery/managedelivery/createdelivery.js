import React from "react";
import "./managedelivery.css";
import TopBar from "../../topBar/index";
import YellowBox from "../managedelivery/backDiv/backDiv";
import CreateDeliveryBoyForm from "../../forms/CreateDeliveryBoyForm";

function createDelivery(props) {
  let eid = props.match.params.editId;

  return (
    <div className="customer">
      <TopBar
        title={eid == null ? "Create Delivery Boy" : "Edit Delivery Boy"}
      />
      <YellowBox />
      <CreateDeliveryBoyForm deliveryId={eid} />
    </div>
  );
}

export default createDelivery;
