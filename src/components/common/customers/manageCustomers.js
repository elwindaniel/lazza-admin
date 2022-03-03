import React from "react";
import "./customer.css";
import TopBar from "../topBar";
import YellowBox from "../settings/banner/backDiv/backDiv";
import CustomerTable from "../customers/customerTable";

export default function ManageCustomers() {
  return (
    <div className="customer">
      <TopBar title="Manage Customer" />
      <div className="customer-inner">
        <CustomerTable />
      </div>
    </div>
  );
}
