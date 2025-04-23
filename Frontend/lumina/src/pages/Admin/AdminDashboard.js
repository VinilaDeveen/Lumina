import React, { useEffect, useRef, useState } from 'react';
import TopBannerComponent from '../../components/TopBannerComponent';
import SidemenuComponent from '../../components/SidemenuComponent';
import LineChart from '../../components/Employee/LineChart';
import axios from 'axios';
import FilledAlerts from '../../components/Main/FilledAlerts';

export default function AdminDashboard() {

    // Alert 
        const [alert, setAlert] = useState({ status: null, message: null });
        const statusCode = useRef("");
        const errorMessage = useRef("");
    const [lineChartData, setLineChartData] = useState({ labels: [], values: [] });
    const [totalDonations, setTotalDonations] = useState(0);
    const [totalAppointments, setTotalAppointments] = useState(0);
    const token = localStorage.getItem('accessToken');

    const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
    }

    useEffect(() => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
        canvas.style.borderWidth = '1px'; // Border around the canvas
    }
}, []);

    
    const fetchDonationssCount = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/lumina/user/getTotalDonors", config);
            setTotalDonations(response.data);
            console.log("Dashboard data fetched successfully:", response.data);
        } catch (error) {
            if(error.response){
                statusCode.current = error.response.status;
                errorMessage.current = error.response.data;
              }else{
                statusCode.current = 100;
                errorMessage.current = "Failed to connect to the server.";
              }
              setAlert({status:statusCode,message:errorMessage});
        }
    };

    const fetchAppointmentsCount = async () => {
      try {
          const response = await axios.get("http://localhost:8080/api/lumina/appointment/getTotalAppointments", config);
          setTotalAppointments(response.data);
          console.log("Dashboard data fetched successfully:", response.data);
      } catch (error) {
        if(error.response){
            statusCode.current = error.response.status;
            errorMessage.current = error.response.data;
          }else{
            statusCode.current = 100;
            errorMessage.current = "Failed to connect to the server.";
          }
          setAlert({status:statusCode,message:errorMessage});
      }
  };

  const fetchLineChartData = async () => {
    try {
        const response = await axios.get(`http://localhost:8080/api/lumina/donation/getYearlyMonthlyDonation`,config);
        const data = response.data;
        console.log("Year donations",data)

        // List of colors to use for each year
        const colorList = [
            'rgba(255, 0, 0, 1)',
            'rgba(255, 255, 0, 1)', 
            'rgba(75, 192, 192, 1)',  
            'rgba(255, 99, 132, 1)',  
            'rgba(54, 162, 235, 1)',  
            'rgba(153, 102, 255, 1)', 
            'rgba(255, 159, 64, 1)', 
            'rgba(0, 255, 0, 1)',     
            'rgba(0, 0, 255, 1)',     
            'rgba(255, 105, 180, 1)', 
            'rgba(255, 20, 147, 1)',  
            'rgba(0, 0, 0, 1)'        
        ];

        // List of month names
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        // Group data by year
        const groupedData = data.reduce((acc, item) => {
            if (!acc[item.year]) {
                acc[item.year] = {
                    labels: [],  // will hold the month names
                    values: []   // will hold the totalAmount values
                };
            }
            // Convert month number to month name
            const monthName = monthNames[item.month - 1];
            acc[item.year].labels.push(monthName);
            acc[item.year].values.push(item.totalDonation);

            return acc;
        }, {});

            // Prepare datasets for each year, using the colorList for different years
            const datasets = Object.keys(groupedData).map((year, index) => ({
                label: `Year ${year}`,
                data: groupedData[year].values,
                borderColor: colorList[index % colorList.length],  // Use color from predefined list
                backgroundColor: `${colorList[index % colorList.length]}0.2`,  // Lightened color for background
                fill: true
            }));

            // Set the data for the line chart, using the labels from the first year's months
            setLineChartData({
                labels: groupedData[Object.keys(groupedData)[0]].labels,  // All years should have the same months
                datasets: datasets
            });
        } catch (error) {
            if(error.response){
                statusCode.current = error.response.status;
                errorMessage.current = error.response.data;
              }else{
                statusCode.current = 100;
                errorMessage.current = "Failed to connect to the server.";
              }
              setAlert({status:statusCode,message:errorMessage});
        }
    };

    const toggleFullScreen = () => {
        const chart = document.querySelector("#chartID"); 
        const card = chart.querySelector(".card");
    
        // Function to set normal size
        const setNormalSize = () => {
            card.style.width = `612px`;
            card.style.height = `340px`;
        };
    
        // Function to set fullscreen size
        const setFullscreenSize = () => {
            card.style.width = `1400px`;
            card.style.height = `900px`;
        };
    
        if (!document.fullscreenElement) {
            chart.requestFullscreen().catch((err) => {
                console.error("Error attempting to enable fullscreen mode:", err);
            });
            setFullscreenSize();
        } else {
            document.exitFullscreen().catch((err) => {
                console.error("Error attempting to exit fullscreen mode:", err);
            });
            setNormalSize();
        }
    
        // Add event listener for escape key
        document.addEventListener('fullscreenchange', () => {
            if (!document.fullscreenElement) {
                setNormalSize();
            }
        });
    };

    useEffect(() => {
        fetchAppointmentsCount();
        fetchLineChartData();
        fetchDonationssCount();
    }, []);

    return (
        <>
            <div className="D-main">
                <SidemenuComponent userRole={'admin'} />
                <div className="Aappointments">
                    <TopBannerComponent />
                    <h1 style={{ margin: "1%" }}>Dashboard</h1>
                    <div className='A-Statistic' style={{ display: "flex", justifyContent: "center" }}>
                        <div className="statistics-and-chart" style={{ alignItems: "unset", marginRight: "0.5%", marginTop: "unset", borderRadius: "30px 0px 0px 30px " }}>
                            <div className="statistics-section" style={{ width: "unset", marginTop: "unset" }}>
                                <div className="statistics-box">
                                    <p className="stat-label" style={{margin:"0px"}}>Total Blood Donors</p>
                                    <h4 className="stat-value">{totalDonations}</h4>
                                </div>
                            </div>
                        </div>
                        <div className="statistics-and-chart" style={{ alignItems: "unset", marginLeft: "0.5%", marginTop: "unset" }}>
                            <div className="statistics-section" style={{ width: "unset", marginTop: "unset" }}>
                                <div className="statistics-box">
                                    <p className="stat-label" style={{margin:"0px"}}>Total Appointments</p>
                                    <h4 className="stat-value">{totalAppointments}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{width:"100%",height:"48%", padding:"0px 28% 0px 28%"}}>
                    <div style={{ transform: "scale(0.95)" }} id="chartID" >
                        <LineChart lineChartDataRef={lineChartData} onClick={()=>toggleFullScreen()} />
                    </div>
                    </div>
                </div>
            </div>
            {alert.status && (
                <FilledAlerts
                status={alert.status}
                message={alert.message}
                onClose={() => setAlert({ status: null, message: null })}
                />
            )}
        </>
    );
}

