import React from "react";
import "../managepromotionCode/managepromotionCode.css";
import TopBar from "../../topBar";
import BackDiv from "../managepromotionCode/backDiv/backDiv";
import CustomerDemographyTable from "./CustomerDemographyTable";

export default function CustomerDemography() {
    return (
        <div className="managepromo">
            <TopBar title="Customer Demography" />
            <div className="yellow-box"><BackDiv /></div>
            <div className="managepromo-inner">
                <CustomerDemographyTable />
            </div>
        </div>
    );
}
