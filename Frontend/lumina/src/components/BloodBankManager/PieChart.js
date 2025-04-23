import React from 'react';
import { Pie } from 'react-chartjs-2';
import Card from 'react-bootstrap/Card';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';


ChartJS.register(ArcElement, Tooltip, Legend);



export default function PieChart({bloodData}) {
  const {free,full} = bloodData;

  const PieChartData = {
    labels: ['Free', 'Full'], // Blood types
    datasets: [
      {
        label: 'Blood Donations by Type',
        data: [free, full], 
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <Card
      style={{
        width: '100%',
        borderRadius: '20px',
        backgroundColor: 'rgba(0,0,0,0.8)',
      }}
    >
      <Card.Body
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Pie data={PieChartData} style={{ width: '260px', height: '220px' }} />
      </Card.Body>
    </Card>
  )
}
