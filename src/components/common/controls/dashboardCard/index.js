import React from "react";
import { Row } from "react-bootstrap";
import "../../forms/form.css";

function Card(props) {
  return (
    <div class="cardbody">
      <div className="cardnav">{props.title}</div>
      <Row>
        <img className="imgcart" src={props.ico} />
        <div className="textcart">{props.amount}</div>
      </Row>
      <div className="cardnavbottom"></div>
    </div>
  );
}
export default Card;
