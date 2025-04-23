import React, {useState,useEffect} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Navbar from 'react-bootstrap/Navbar';
import '../../styles/Employee/Section.css'
import 'bootstrap-icons/font/bootstrap-icons.css';


const Section=()=> {

    return (
    <div>
    <Col className="main2">
           
            <Card className="text">
          <Card.Header>
    
          <Navbar style={{height:'60px',marginTop:"10px"}}>
          <Container fluid>
            
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
              <Row style={{gap:"20px",marginLeft:"650px",display:"flex"}} >
            <Col> 
            <div className="notification2">
            <i class="bi bi-bell" input type="button">
              <span class="badge2">2</span></i>
            </div>
              </Col>
              
            <Col style={{lineHeight:0.5,fontSize:"12px",fontWeight:'bold'}}>
            <p>Name</p>
            <br/>
            <br/>
            <p>Phlebotomisist</p>
            
            </Col>
            <Col>
            <div className="notification2" input type="button">
            <img src="" className="outlogo2"></img>
            </div>
            
            </Col>
            
          </Row>
                
                
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
          </Card.Header>
          <Card.Body className="cardbody">
            <Card.Title style={{textAlign:'left'}}>Welcome Blood Bank Manager!</Card.Title>
            <Card.Text style={{textAlign:'left',marginBottom:'30px'}}>
              <p style={{fontSize:'15px'}}>Be The Reason For Someone's Hearbeat</p>
            </Card.Text>
          </Card.Body>
          
        </Card>
        </Col>
        
        </div>
           );}
    
export default Section;
