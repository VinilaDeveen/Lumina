import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Options for Line Chart
const lineChartOptions = {
  responsive: true,
  plugins: {
      legend: {
          position: 'top',
          labels: {
            color: 'rgba(255, 255, 255, 0.9)',
            boxWidth: 20, 
            boxHeight: 2, 
          },
      },
      title: {
          display: true,
          text: 'Donation Trends',
          color: 'rgba(255, 255, 255, 0.8)', 
          font: {
            size: 18,
            weight: 'bold',
        },
      },
  },
  scales: {
    x: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)', // Light gray grid lines for x-axis
        backgroundColor: 'transparent', // Transparent background for the x-axis grid
      },
      ticks: {
        color: 'rgba(255, 255, 255, 0.2)', // Set x-axis labels to white
      },
    },
    y: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)', // Light gray grid lines for y-axis
        backgroundColor: 'transparent', // Transparent background for the y-axis grid
      },
      ticks: {
        color: 'rgba(255, 255, 255, 0.2)', // Set y-axis labels to white
      },
      beginAtZero: true,
    },
  },
  
};

export default function LineChart({ lineChartDataRef, onClick }) {
    const lineChartDatas = lineChartDataRef || { labels: [], values: [] };

    const lineChartData = {
      labels: lineChartDataRef.labels || ["No Data"],
      datasets: (lineChartDataRef.datasets || [{
          label: 'No Data',
          data: [0],
          borderColor: 'rgba(255, 99, 132, 1)', 
          backgroundColor: 'rgba(255, 99, 132, 0.2)', 
      }]).map(dataset => ({
          ...dataset,
          borderWidth: 2, // Force thin lines for all datasets
      })),
  };

    return (
        <div style={{ display: "flex", justifyContent: "center" ,cursor:"pointer"}} onClick={()=>onClick()}>
            <Row style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Col>
                    <Card style={{ width: '100%', height: '340px', borderRadius: '20px', backgroundColor: 'rgba(0,0,0,0.8)', marginRight: "20px" }}>
                        <Card.Body style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <Line data={lineChartData} options={lineChartOptions} style={{ width: '280px', height: '280px', borderWidth: 1 }} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
