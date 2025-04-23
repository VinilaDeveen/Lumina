import React, {useState,useEffect} from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Topsection from '../../components/Employee/Topsection';
import Topic from '../../components/Employee/Topic';
import Charts from '../../components/Employee/Charts';

export default function PhlebotomistDashboard() {
  return (
    <div>
    <Container fluid>
    <Row style={{display:"flex", maxWidth:"100%"}}>
     <Col sm={4}>       
   {/* <SideMenuComponent></SideMenuComponent> */}
   </Col>
   <Col sm={8}>
    <Topsection></Topsection>
    <br/>
    <br/>
    
    <Topic></Topic>
    <Charts></Charts>
   
   </Col>
   </Row>
   </Container>
    </div>
    );
}
