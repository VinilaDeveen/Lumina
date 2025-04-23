import React, {useEffect, useState, useRef} from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Line,Pie } from 'react-chartjs-2';
import Card from 'react-bootstrap/Card';

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

//ChartJS.register(ArcElement, Tooltip, Legend);

ChartJS.register(
CategoryScale,
LinearScale,
PointElement,
LineElement,
ArcElement,
Title,
Tooltip,
Legend
);


// Options for Line Chart
const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Donation Trends',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};


const Dashboad=({bloodTypeData,hidePie,lineChartDataRef})=> {
  const linechartDatas = lineChartDataRef;
  console.log(linechartDatas);
  const lineChartData = {
    labels: linechartDatas.labels, // Example months
    datasets: [
      {
        label: 'Donations over Time',
        data: linechartDatas.values, // Example donation data
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.22)',
        fill: true,
      },
    ],
  };

  // Data for Pie Chart

      const pieChartData = {
        labels: bloodTypeData.labels, // Blood types
        datasets: [
          {
            label: 'Blood Donations by Type',
            data: bloodTypeData.values, // Example blood type donations
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(199, 199, 199, 0.6)',
              'rgba(63, 81, 181, 0.6)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(199, 199, 199, 1)',
              'rgba(63, 81, 181, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
    return (
        
    <div style={{display:"flex",justifyContent:"space-evenly"}}>
    <Row style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
       
    {/* <Col>
    <Card style={{ width:'100%' ,height:'340px', borderRadius:'20px', backgroundColor: 'rgba(0,0,0,0.8)',marginRight:"20px"}}>
      <Card.Body style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center"}}>
      <Line data={lineChartData} options={lineChartOptions} style={{ width:'280px' ,height:'280px'}}  />
      </Card.Body>
    </Card>
    </Col> */}

    <Col>
    <div style={hidePie?{display:"none"}:{display:"flex"}}>
    <Card style={{ width:'100%' ,height:'340px', borderRadius:'20px',backgroundColor: 'rgba(0,0,0,0.8)'}}>
      <Card.Body style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center"}} >
      <Pie data={pieChartData} style={{ width:'260px' ,height:'260px'}} />
      </Card.Body>
    </Card>
    </div>
    </Col>
    </Row>

    </div>

    );
}
export default Dashboad;