import React from "react";
import "./executive.css";
import TopBar from "../../topBar";
import YellowBox from "../manageexecutive/backDiv/backDiv";
import CreateExecutive from "../../forms/createExecutive";

function createDelivery(props) {
  let eid = props.match.params.editId;
  return (
    <div className="customer">
      <TopBar title={eid == null ? "Add Executive" : "Edit Executive"} />
      <YellowBox />
      <CreateExecutive createExecutiveId={eid} />
    </div>
  );
}

export default createDelivery;
