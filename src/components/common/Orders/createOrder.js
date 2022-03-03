import React from "react";
import "./order.css";
import TopBar from "../topBar";
import YellowBox from "../settings/banner/backDiv/backDiv";
import CreateOrders from "../forms/createOrder";

function CreateOrder() {
  return (
    <div className="customer">
      <TopBar title="Create Order" />
      <YellowBox />
      <CreateOrders />
    </div>
  );
}

export default CreateOrder;
