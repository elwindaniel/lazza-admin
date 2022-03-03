import React from "react";
import "./marketing.css";
import TopBar from "../topBar";
import YellowBox from "../settings/banner/backDiv/backDiv";
import CreatePromotionCode from "../forms/createPromotionCode";

function createPromo(props) {
  let eid = props.match.params.editId;
  return (
    <div className="customer">
      <TopBar
        title={eid == null ? "Create Promotion Code" : "Edit Promotion Code"}
      />
      <YellowBox />
      <CreatePromotionCode promoId={eid} />
    </div>
  );
}

export default createPromo;
