import React from "react";
import "./units.css";
import TopBar from "../../topBar";

import Table from "./unitsTable/unitsTable";

export default function Units() {
  return (
    <div className="units">
      <TopBar title="Units" />

      <div className="units-inner">
        <Table />
      </div>
    </div>
  );
}
