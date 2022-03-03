import React from 'react';
import { Row } from 'react-bootstrap';
import "./form.css";

function TotalCustomers(){
    return(
     <div class="cardbody">
       <div className="cardnav">TOTAL CUSTOMERS</div>
       <Row>
       <img  className="imgcart" src="/images/people.png" alt="Logo" />
       <div className="textcart">1.1 M</div>
       
       </Row>
       <div className="cardnavbottom">View More...</div>
     </div>
    )
}
export default TotalCustomers;