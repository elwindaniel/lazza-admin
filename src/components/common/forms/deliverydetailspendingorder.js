import React from "react";
import { Button, TextField } from "@material-ui/core";
import "./form.css";
import { Row, Col, Container } from "react-bootstrap";
import { FaFilter } from "react-icons/fa";

function DeliveryDetails() {
  const [list, setlist] = React.useState("EUR");

  const handleChange = (event) => {
    setlist(event.target.value);
  };
  return (
    <div className="formBody">
        <div className="nav">Delivery Details</div>
      <div className="rowspace"></div>
      <div className="Row">
        <div className="insider">
          <div className="label">
            <div>Package ID </div> {/* Pick up date*/}
            <TextField
              className="textArea_flex8"
              multiline
              placeholder="01234555666"
              fullWidth
              margin="normal"
              variant="outlined"
             />
          </div>

          <div className="label">
            <div>Address </div> {/* Pick up date*/}
            <TextField
              className="textArea_flex8"
              multiline
              fullWidth
              placeholder="Lazza Trivandrum Sreekariyam,Trivandrum Kerala ,Pin 689786"
              margin="normal"
              variant="outlined"
             />
          </div>

          <div className="label">
            <div>Mobile Number </div> {/* Pick up date*/}
            <TextField
              className="textArea_flex8"
              multiline
              fullWidth
              margin="normal"
              variant="outlined"
              />
          </div>
          <div className="label">
            <div>OTP </div> {/* Pick up date*/}
            <TextField
              className="textArea_flex8"
              multiline
              fullWidth
              margin="normal"
              variant="outlined"
              />
          </div>
          <div className="rowspace"></div>
          <div className="align-right">
          <button className="button">
            
            
            Verify
          </button>
        </div>
        </div>
        {/*  */}
        

        
      </div>
    </div>
  );
}
export default DeliveryDetails;
const lists = [
  {
    value: "USD",
    label: "dd",
  },
  {
    value: "EUR",
    label: "sss",
  },
  {
    value: "BTC",
    label: "df",
  },
  {
    value: "JPY",
    label: "dfdf",
  },
];
