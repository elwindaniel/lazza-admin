import React from 'react';
import { Row } from 'react-bootstrap';
import "./form.css";

function PeopleOnline(){
    return(
     <div class="cardbody">
       <div className="cardnav">TOTAL CUSTOMERS</div>
       <Row>
       <img  className="imgcart" src="/images/people.png" alt="Logo" />
       <div className="textcart">1 K</div>
       
       </Row>
       <div className="cardnavbottom">View More...</div>
     </div>
    )
}
export default PeopleOnline;