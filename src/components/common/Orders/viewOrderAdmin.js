import React from "react";
import "./order.css";
import TopBar from "../topBar";

import OrderTable from "../Orders/table/adminOrderTable";

export default function ViewOrder() {
  return (
    <div className="customer">
      <TopBar title="View Order" />
      <div className="customer-inner">
        <OrderTable />
      </div>
    </div>
  );
}
