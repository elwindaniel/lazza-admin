import { TextField } from "@material-ui/core";
import React from "react";
import { Row } from "react-bootstrap";
import { FaPen } from "react-icons/fa";
import "./form.css";
import { MdAddCircle } from "react-icons/md";
function CallcentercreateOrder() {
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
        <div className="titleText">Create Order</div>
      </Row>
      <hr />
      <div className="insider">
        <Row className="row">
          <div className="labelText">Customer Mobile Number</div>{" "}{/*Customer Mobile Number*/}
          <TextField
            className="textArea_flex8"
            placeholder="Customer Mobile Number"
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </Row>
        <Row className="row">
          <div className="labelText"> Name</div>{" "}{/*Name*/}
          <TextField
            className="textArea_flex8"
            placeholder="Name"
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </Row>
        <Row className="row">
          <div className="labelText">Customer ID</div>{" "}{/*Customer ID*/}
          <TextField
            className="textArea_flex8"
            placeholder="Customer ID"
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </Row>
      </div>
      <div className="productdtls">
        <div className="titleText">Order Details</div>
        <hr />
        <div className="insider">
          <Row className="row">
            <div className="labelText">Product Name</div>{" "}{/*Product Name*/}
            <TextField
              className="textArea_flex8"
              placeholder="Product Name"
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
            <div className="labelText">Product ID</div>{" "}{/*Product ID*/}
            <TextField
              className="textArea_flex8"
              placeholder="Product ID"
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
            <div className="labelText">Price</div>{" "}{/*Price*/}
            <TextField
              className="textArea_flex8"
              placeholder="0000"
              fullWidth
              margin="normal"
              variant="outlined"
            />
          </Row>
          <Row className="row">
            <div className="labelText">PromoCode</div>{" "}{/*PromoCode*/}
            <TextField
              className="textArea_flex8"
              placeholder="CHRISMAS2020"
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
            <div className="labelText">Tax</div>{" "}{/*Tax*/}
            <TextField
              className="textArea_flex8"
              placeholder="00"
              fullWidth
              margin="normal"
              variant="outlined"
            />
          </Row>
          <div className="align-right ">
            <div className="plusIcons">
              <MdAddCircle />
            </div>
          </div>
        </div>
      </div>
      <div className="insider">
        <Row className="row">
          <div className="labelText">Address Line1</div>{" "}{/*Address Line1*/}
          <TextField
            className="textArea_flex8"
            placeholder="Address Line1"
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </Row>
        <Row className="row">
          <div className="labelText">Address Line 2</div>{" "}{/*Address Line 2*/}
          <TextField
            className="textArea_flex8"
            placeholder="Address Line 2"
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </Row>
        <Row className="row">
          <div className="labelText">Landmark</div>{" "}{/*Landmark*/}
          <TextField
            className="textArea_flex8"
            placeholder="Landmark"
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </Row>
        <Row className="row">
          <div className="labelText">Country</div> {/*Country*/}
          <TextField
            className="textArea_flex3"
            placeholder="Select Country"
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
          <div className="labelText">State</div> {/* State*/}
          <TextField
            className="textArea_flex3"
            placeholder="Select State"
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
          <div className="labelText">District</div> {/*District*/}
          <TextField
            className="textArea_flex3"
            placeholder="Select District"
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
          <div className="labelText">Region</div> {/* Region*/}
          <TextField
            className="textArea_flex3"
            placeholder="Select Region"
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
        <Row className="Row">
          <div className="labelText">Pin</div> {/* Pin*/}
          <TextField
            className="textArea_flex8"
            placeholder="689645"
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </Row>
      </div>
      <div className="titleText">Assign Order</div>
      <hr />
      <div className="insider">
        <Row className="row">
          <div className="labelText">Select Distributor </div> {/* Select Distributor*/}
        
          <TextField
            className="textArea_flex8"
            placeholder="Select Distributor"
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </Row>
        <Row className="row">
          <div className="labelText">Pick up date </div> {/* Pick up date*/}
          
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
          <div className="labelText">Pick up time</div> {/* Pick up time*/}
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
        </Row>
        <div className="align-right">
          <button className="button">Assign</button>
        </div>
      </div>
    </div>
  );
}
export default CallcentercreateOrder;
const lists = [
  {
    value: "USD",
    label: "dg",
  },
  {
    value: "EUR",
    label: "dg",
  },
  {
    value: "BTC",
    label: "erer",
  },
  {
    value: "JPY",
    label: "ere",
  },
];
