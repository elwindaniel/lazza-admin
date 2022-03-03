import { Button, TextField } from "@material-ui/core";
import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { FaPen } from "react-icons/fa";
import "./form.css";

function AddDistributor() {
  const [list, setlist] = React.useState("EUR");

  const handleChange = (event) => {
    setlist(event.target.value);
  };
  return (
    <div className="formBody">
      <Row className="row">
        <div className="titleText">
          <FaPen />
        </div>
        <div className="titleText">Add Distributor</div>
      </Row>
      <hr />
      <div className="ffrowspace"></div>
     
      <div className="insider">
      <div className="titleText">Customer Details</div>
      <hr />
      <div className="ffrowspace"></div>
        {/* Product*/}
        <Row className="row">
          <div className="labelText">Distibutor Code</div>{" "}
          <TextField
            className="textArea_flex8"
            placeholder="Distibutor Code"
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </Row>
        {/*  Category*/}
        <Row className="row">
          <div className="labelText">Name</div>{" "}
          <TextField
            className="textArea_flex8"
            placeholder="Name"
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </Row>
        {/* SubCategory*/}
        <Row className="row">
          <div className="labelText">Contact Person</div>{" "}
          <TextField
            className="textArea_flex8"
            placeholder="Contact Person"
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </Row>
        <Row className="row">
          <div className="labelText">Phone Number</div>{" "}
          <TextField
            className="textArea_flex8"
            placeholder="12345654566"
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </Row>
        
        <Row className="row">
          <div className="labelText">Email</div>{" "}
          <TextField
            className="textArea_flex8"
            placeholder="@gmail.com"
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </Row>
        <Row className="row">
          <div className="labelText">Website</div>{" "}
          <TextField
            className="textArea_flex8"
            placeholder="Lazzatvm.com"
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </Row>
        
       
        <Row className="row">
          <div className="labelText">City</div> {/*City*/}
          <TextField
            className="textArea_flex3"
            placeholder="SreeKariyam"
            fullWidth
            select
            SelectProps={{
              native: true,
            }}
            margin="normal"
            variant="outlined"
            value={list}
            onchange={handleChange}
          >
            {lists.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
          <div className="labelText">District</div> {/*District*/}
          <TextField
            className="textArea_flex3"
            placeholder="Trivandrum"
            fullWidth
            select
            SelectProps={{
              native: true,
            }}
            margin="normal"
            variant="outlined"
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
          <div className="labelText">State</div> {/*State*/}
          <TextField
            className="textArea_flex3"
            placeholder="Kerala"
            fullWidth
            select
            SelectProps={{
              native: true,
            }}
            margin="normal"
            variant="outlined"
            value={list}
            onchange={handleChange}
          >
            {lists.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
          <div className="labelText">Country</div> {/* Country*/}
          <TextField
            className="textArea_flex3"
            placeholder="India"
            fullWidth
            select
            SelectProps={{
              native: true,
            }}
            margin="normal"
            variant="outlined"
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
          <div className="labelText">Region</div> {/*Region*/}
          <TextField
            className="textArea_flex3"
            placeholder="SreeKariyam"
            fullWidth
            select
            SelectProps={{
              native: true,
            }}
            margin="normal"
            variant="outlined"
            value={list}
            onchange={handleChange}
          >
            {lists.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
          <div className="labelText">Pincode</div> {/* Pincode*/}
          <TextField
            className="textArea_flex3"
            placeholder="687656"
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </Row>
      
      </div>
      <div className="titleText">Delivery Location</div>
      <hr />
      <div className="insider">
      <Row className="row">
          <div className="labelText">Pincode</div> {/*Pincode*/}
          <TextField
            className="textArea_flex3"
            placeholder="684825"
            fullWidth
           
            margin="normal"
            variant="outlined"
           
          />
            
          <div className="labelText">Pincode</div> {/* Pincode*/}
          <TextField
            className="textArea_flex3"
            placeholder="684825"
            fullWidth
            
            margin="normal"
            variant="outlined"
           
          />
            
        </Row>
        <Row className="row">
          <div className="labelText">Pincode</div> {/*Pincode*/}
          <TextField
            className="textArea_flex3"
            placeholder="684825"
            fullWidth
           
            margin="normal"
            variant="outlined"
           
          />
            
          <div className="labelText">Pincode</div> {/* Pincode*/}
          <TextField
            className="textArea_flex3"
            placeholder="684825"
            fullWidth
            
            margin="normal"
            variant="outlined"
           
          />
            
        </Row>
        <div className="ffrowspace"></div>
        <div className="align-right">
          <button className="button">ADD</button>
        </div>
      </div>
    </div>
  );
}
export default AddDistributor;
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
