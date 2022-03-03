import React from "react";
import TopBar from "../topBar";

import PromotionalTable from "../product/promotionalProduct";
import "../product/product.css";
export default function PromotionalProductTable() {
  return (
    <div className="customer">
      <TopBar title="Manage Promotional Products" />
      <div className="customer-inner">
        <PromotionalTable />{" "}
      </div>
    </div>
  );
}
