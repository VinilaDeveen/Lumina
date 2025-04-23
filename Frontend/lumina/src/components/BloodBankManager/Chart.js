import React from 'react';
import { Pie } from 'react-chartjs-2';
import Card from 'react-bootstrap/Card';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Registering chart.js modules
ChartJS.register(ArcElement, Tooltip, Legend);

// Data for Pie Chart
const PieChartData = {
  labels: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'], // Blood types
  datasets: [
    {
      label: 'Blood Donations by Type',
      data: [25, 10], // Example blood type donations
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

const PieChart = () => {
  return (
    <Card
      style={{
        color:"white",
        width: '100%',
        height: '340px',
        borderRadius: '20px',
        backgroundColor: 'rgba(0,0,0,0.8)',
      }}
    >
      <Card.Body
        style={{
          color:"white",
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Pie data={PieChartData} style={{ width: '260px', height: '260px', color:"white"}} />
      </Card.Body>
    </Card>
  );
};

export default PieChart;