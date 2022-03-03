import React from "react";
import "./banner.css";
import TopBar from "../../topBar";
import BackDiv from "./backDiv/backDiv";
import Table from "./bannerTable/bannerTable";

export default function Units() {
  return (
    <div className="units">
      <TopBar title="Banner" />
      <div className="yellow-box">
        <BackDiv />
      </div>
      <div className="units-inner">
        <Table />
      </div>
    </div>
  );
}
