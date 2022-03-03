import { TextField } from "@material-ui/core";
import React from "react";
import { Row } from "react-bootstrap";
import { FaPen } from "react-icons/fa";
import "./form.css";

function AttributesGroup() {
  return (
    <div className="Bodywithoutpadding">
      <Row className="row">
        <div className="titleText">
          <FaPen />
        </div>
        <div className="titleText">Add Product</div>
      </Row>
      <hr  />
      <div className="rowspace"></div>
      <hr/>
      <div className="insider">
        {/* Product*/}
        <Row className="row">
          <div className="labelText">Attribute Group Name</div>{" "}
          <TextField
            className="textArea_flex8"
            placeholder="Attribute Group Name"
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </Row>
        </div>
        <hr/>
        {/*  Category*/}
        <div className="insider">
        <Row className="row">
          <div className="labelText">Sort Order</div>{" "}
          <TextField
            className="textArea_flex8"
            placeholder="Sort Order"
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </Row>
        </div>
       
        <hr/>
        {/* SubCategory*/}
        <div className="rowspace"></div>
    </div>
  );
}
export default AttributesGroup;
