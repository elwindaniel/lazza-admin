import React from "react";
import { Button, TextField } from "@material-ui/core";
import "./form.css";
import { Row, Col, Container } from "react-bootstrap";
import { FaFilter } from "react-icons/fa";

function CreateUsedCode() {
  const [list, setlist] = React.useState("EUR");

  const handleChange = (event) => {
    setlist(event.target.value);
  };
  return (
    <div className="formBody">
      <div className="Row">
        <div className="insider">
          <div className="label">
            <div>Status </div> {/* Pick up date*/}
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

          <div className="label">
            <div>Customer </div> {/* Pick up date*/}
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

          <div className="label">
            <div>Distributor </div> {/* Pick up date*/}
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
              <div>Date From </div> {/* Pick up date*/}
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
              <div>Date To </div> {/* Pick up date*/}
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
          </Row>
        </div>
        <div className="rowspace"></div>
        <div className="titleText"></div>

        <div className="createbtn">
          <button className="filterbutton">
            {" "}
            <FaFilter />
            {""} Filter{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
export default CreateUsedCode;
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
