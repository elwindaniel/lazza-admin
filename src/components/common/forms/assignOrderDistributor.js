import React from "react";
import { TextField } from "@material-ui/core";
import "./form.css";
import { Row } from "react-bootstrap";

function AssignOrder() {
  const [list, setlist] = React.useState("EUR");

  const handleChange = (event) => {
    setlist(event.target.value);
  };
  return (
    <div className="formBody">
      <div className="nav">Assign Order</div>
      <div className="rowspace"></div>
      <div className="Row">
        <div className="insider">
          <div className="label">
            <div>Select Delivery Boy </div> {/* Pick up date*/}
            <TextField
              className="textArea_flex8"
              multiline
              fullWidth
              margin="normal"
              variant="outlined"
              select
              SelectProps={{
                native: true,
              }}
              value={list}
              onchange={handleChange}
            >
              {lists.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </div>

          <Row className="row">
            <div className="label">
              <div>Pick up Date </div>

              <TextField
                className="textArea_flex3"
                placeholder="02-10-2020"
                fullWidth
                margin="normal"
                variant="outlined"
                id="date"
                type="date"
                defaultValue="02-10-2020"
              />
            </div>

            <div className="label">
              <div>Pick up time</div> {/* Pick up time*/}
              <TextField
                className="textArea_flex3"
                placeholder="10:10 am"
                fullWidth
                margin="normal"
                variant="outlined"
                id="time"
                type="time"
                defaultValue="07:30"
              />
            </div>
          </Row>
          <div className="align-right">
            <button className="button">Assign</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AssignOrder;
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
