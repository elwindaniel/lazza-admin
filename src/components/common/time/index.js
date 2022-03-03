import React from "react";
import "../customers/customer.css";
import TopBar from "../topBar";
import Time from "./table/time";
import YellowBox from "../settings/banner/backDiv/backDiv";

export default function ManageCustomers() {
    return (
        <div className="customer">
            <TopBar title="Global Time" />
            <div className="customer-inner">
                <Time />
            </div>
        </div>
    );
}
