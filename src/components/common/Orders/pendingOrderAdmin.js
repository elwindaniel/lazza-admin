import React from "react";
import "./order.css";
import TopBar from "../topBar";

import PendingOrderTable from "../Orders/table/pendingOrderTable";

export default function PendingOrder() {
  return (
    <div className="customer">
      <TopBar title="Pending Order" />
      <div className="customer-inner">
        <PendingOrderTable />
      </div>
    </div>
  );
}
