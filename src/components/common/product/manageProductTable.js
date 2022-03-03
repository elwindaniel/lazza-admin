import React from "react";
import "./product.css";
import TopBar from "../topBar";
import BackDiv from "./backDiv/backDiv";
import ProductTable from "../product/productTable/productTable";

export default function ManageProduct() {
  return (
    <>
      <div className="units">
        <TopBar title="Manage Product" />
        <div className="yellow-box">
          <BackDiv />
        </div>
        <div className="units-inner">
          <ProductTable />
        </div>
      </div>
    </>
  );
}
