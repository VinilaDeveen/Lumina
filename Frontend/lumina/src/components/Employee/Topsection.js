import React, {useEffect, useState, useRef} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import chartpic from '../../assets/icons/Employee/chart.png';
import '../../styles/Employee/Topsection.css';
import Navbar from 'react-bootstrap/Navbar';

const Topsection = () => {
    return(
<div>
<div className="main2">
       <Card className="text">
     <Card.Header>

     <Navbar style={{height:'60px',marginTop:"10px",marginLeft:"650px"}}>
     <Container fluid>
       
       <Navbar.Toggle />
       <Navbar.Collapse className="justify-content-end">
         <Navbar.Text>
         <Row className="row" style={{gap:"20px",display:"flex"}}>
       <Col> 
       <div className="notification2">
       <i class="bi bi-bell" input type="button">
         <span class="badge2">2</span></i>
       </div>
         </Col>
         
       <Col style={{lineHeight:0.6,fontSize:"12px",fontWeight:'bold'}}>
       <p>Name</p>
       <br/>
       <p>Phlebotomisist</p>
       
       </Col>
       <Col>
       <div className="notification2" input type="button">
       <img className="outlogo2"></img>
       </div>
       
       </Col>
       
     </Row>
           
           
         </Navbar.Text>
       </Navbar.Collapse>
     </Container>
   </Navbar>
     </Card.Header>
     <Card.Body className="cardbody">
       <Card.Title style={{textAlign:'left'}}>Welcome Volunteer!</Card.Title>
       <Card.Text style={{textAlign:'left',marginBottom:'30px',fontSize:"17px"}}>
         <p>Be The Reason For Someone's Hearbeal</p>
       </Card.Text>
     </Card.Body>
     
   </Card>
   <div className="cardset">
       <Row style={{display:"flex", marginTop:"-17px",gap:"60px"}}>
    <Col>       
   <Card style={{ width: '13rem' , backgroundColor:"white",borderRadius:'10px' }}>
     <Card.Body>
   
       
       <Card.Text>
           <Row style={{display:'flex',gap:"35px",padding:'20px 10px'}}>
           <Col>
           <img src={chartpic} style={{width:'45px',height:'45px'}}></img>
           </Col>

           <Col>
           <p style={{fontWeight:'bold'}}>Total Visitors<br/>10,456</p>
         </Col>
       </Row>
       </Card.Text>
       
   
     </Card.Body>
   </Card>
   </Col>

   <Col> 
   <Card style={{ width: '13rem', backgroundColor:"white",borderRadius:'10px' }}>
     <Card.Body>
   
       
     <Card.Text>
           <Row style={{display:'flex',gap:"35px",padding:'20px 10px'}}>
           <Col>
           <img src={chartpic} style={{width:'45px',height:'45px'}}></img>
           </Col>

           <Col>
           <p style={{fontWeight:'bold'}}>Total Visitors<br/>10,456</p>
         </Col>
       </Row>
       </Card.Text>
       
   
     </Card.Body>
   </Card>
   </Col>

   <Col>
   <Card style={{ width: '13rem', backgroundColor:"white",borderRadius:'10px'  }}>
     <Card.Body>
   
       
     <Card.Text>
           <Row style={{display:'flex',gap:"35px",padding:'20px 10px',}}>
           <Col>
           <img src={chartpic} style={{width:'45px',height:'45px'}}></img>
           </Col>

           <Col>
         <p style={{fontWeight:'bold'}}>Total Visitors<br/>10,456</p>
         
         
         </Col>
       </Row>
       </Card.Text>
       
   
     </Card.Body>
   </Card>
   </Col>
   </Row>
   
   </div>
  </div>
  </div>
  
  );
  }
  export default Topsection;