import React from "react";
import "../Orders/order.css";
import TopBar from "../topBar";

import PaymentTable from "./table";

export default function Viewpayments() {
    return (
        <div className="customer">
            <TopBar title="Online payment" />
            <div className="customer-inner">
                <PaymentTable />
            </div>
        </div>
    );
}