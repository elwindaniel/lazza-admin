import React from "react";
import "./usedCode.css";
import TopBar from "../../topBar";

import Usedcodestable from "./usedcodeTable";

export default function UsedCode() {
  return (
    <div className="usedcode">
      <TopBar title="Used Codes" />

      <div className="usedcode-inner">
        <Usedcodestable />
      </div>
    </div>
  );
}
