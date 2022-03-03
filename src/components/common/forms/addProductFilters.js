import React from "react";
import { Button, TextField } from "@material-ui/core";
import "./form.css";
import { Row, Col, Container } from "react-bootstrap";
import { FaFilter } from "react-icons/fa";
import Checkbox from "@material-ui/core/Checkbox";

function AddProductFilters() {
  const [list, setlist] = React.useState("EUR");

  const handleChange = (event) => {
    setlist(event.target.value);
  };
  return (
    <div className="formBody">
      <div className="Row">
        <div className="filternav">Filters</div>
        <div className="rowspace"></div>
        <div className="insider">
          <Row className="row">
            <Checkbox  color="default" />
            <TextField
              className="textArea_flex8"
              multiline
              placeholder="Flavour"
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
          </Row>

          <Row className="row">
            <Checkbox  color="default" />
            <TextField
              className="textArea_flex8"
              multiline
              placeholder="Speciality"
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
          </Row>

          <Row className="row">
            <Checkbox  color="default" />
            <TextField
              className="textArea_flex8"
              multiline
              placeholder="Regional"
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
          </Row>

          <Row className="row">
            <Checkbox color="default" />
            <TextField
              className="textArea_flex8"
              multiline
              placeholder="Season"
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
          </Row>
          <div className="rowspace"></div>
          <div className="buttons">
          <button className="filterbutton ">OK</button> {""}
          
          <button className="filterbutton ">Cancel</button>
        </div>
        {/* <Row className="align-right" >
          
        <button className="filterbutton">
            OK
          </button>
         
          <div ></div>
          <button className="filterbutton">
            Cancel
          </button>
          </Row> */}
        </div>
      
       

       
        </div>
      </div>
   
  );
}
export default AddProductFilters;
const lists = [
  {
    value: "USD",
    label: "dd",
  },
  {
    value: "EUR",
    label: "Flavour",
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
