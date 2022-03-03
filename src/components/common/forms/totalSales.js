import React from 'react';
import { Row } from 'react-bootstrap';
import "./form.css";

function TotalSales(){
    return(
     <div class="cardbody">
       <div className="cardnav">TOTAL SALES</div>
       <Row>
       <img  className="imgcart" src="/images/payment.png" alt="Logo" />
       <div className="textcart">7.2 K</div>
       
       </Row>
       <div className="cardnavbottom">View More...</div>
     </div>
    )
}
export default TotalSales;