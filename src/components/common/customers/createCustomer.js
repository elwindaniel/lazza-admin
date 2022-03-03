import React from "react";
import "./customer.css";
import TopBar from "../topBar";
import YellowBox from "../settings/banner/backDiv/backDiv";
import CreateCustomer from "../forms/addCustomer";
function createCustomer(props) {
  let eid = props.match.params.editId;
  let vid = props.match.params.viewId;
  return (
    <div className="customer">
      {vid == null ? <TopBar title={eid == null ? "Add customer" : "Edit customer"} /> : <TopBar title="View customer" />}
      <YellowBox />
      {vid == null ?
        <CreateCustomer customerId={eid} itemId={vid} /> : <CreateCustomer customerId={vid} itemId={vid} />}
    </div>
  );
}

export default createCustomer;
