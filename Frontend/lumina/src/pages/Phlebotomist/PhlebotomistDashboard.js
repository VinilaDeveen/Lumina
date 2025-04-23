import React, { useEffect, useRef, useState } from 'react';
import SidemenuComponent from '../../components/SidemenuComponent';
import TopBannerComponent from '../../components/TopBannerComponent';
import Charts from '../../components/Employee/Charts';
import statistic from '../../assets/images/statistic.png';
import axios from 'axios';
import FilledAlerts from '../../components/Main/FilledAlerts';
import LineChart from '../../components/Employee/LineChart';

export default function PhlebotomistDashboard() {
  // Alert 
          const [alert, setAlert] = useState({ status: null, message: null });
          const statusCode = useRef("");
          const errorMessage = useRef("");

  const token = localStorage.getItem('accessToken');
  const [totalDonations, setTotalDonations] = useState(0);
  const [todayDonations, setTodayDonations] = useState(0);
  const [totalDonor, setTotalDonor] = useState(0);

  // Blood Type chart data
  const [bloodTypeData, setBloodTypeData] = useState({ labels: [], values: [] });
  const [lineChartData, setLineChartData] = useState({ labels: [], values: [] });

  const mapBloodType = (type) => {
    const mapping = {
      APOSITIVE: "A+",
      BPOSITIVE: "B+",
      ABPOSITIVE: "AB+",
      OPOSITIVE: "O+",
      ANEGATIVE: "A-",
      BNEGATIVE: "B-",
      ABNEGATIVE: "AB-",
      ONEGATIVE: "O-",
    };
    return mapping[type] || type; // Return original type if not found in mapping
  };

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const fetchBloodTypeData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/lumina/bloodinventory`, config);
      const data = response.data;
      const transformedData = {
        labels: data.map((item) => mapBloodType(item.bloodType)), // Corrected syntax
        values: data.map((item) => item.amount),
      };
      setBloodTypeData(transformedData);
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

  const fetchDonations = async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/lumina/donation/totalBloodDonated", config);
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

  const fetchTodayDonations = async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/lumina/donation/totalBloodDonatedToday" , config);
        setTodayDonations(response.data);
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

  const fetchTotalDonors = async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/lumina/user/getTotalDonors", config);
        setTotalDonor(response.data);
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
    fetchLineChartData();
    fetchBloodTypeData();
    fetchDonations();
    fetchTodayDonations();
    fetchTotalDonors();
  }, []);

  return (
    <>
      <div className="D-main">
        <SidemenuComponent userRole={'phlebotomist'} />
        {
          <div className="Aappointments">
            <TopBannerComponent />
            {
              <div className="D-counts-main">
                <div className="D-counts">
                  <div className="D-counts-box">
                    <img src={statistic} alt="static" />
                    <div className="D-box-info">
                      <p>Total Donors</p>
                      <p>{totalDonor}</p>
                    </div>
                  </div>
                  <div className="D-counts-box">
                    <img src={statistic} alt="static" />
                    <div className="D-box-info">
                      <p>Total Donations</p>
                      <p>{totalDonations} mL</p>
                    </div>
                  </div>
                  <div className="D-counts-box">
                    <img src={statistic} alt="static" />
                    <div className="D-box-info">
                      <p>Today's Donations</p>
                      <p>{todayDonations} mL</p>
                    </div>
                  </div>
                </div>
              </div>
            }
            <h1 style={{ margin: '1% 0 1% 0' }}>Dashboard</h1>
            <div style={{ display:"flex",justifyContent:"center" }}>
            <div style={{ transform: "scale(0.95)" }}>
                <div id="chartID">
                    <LineChart lineChartDataRef={lineChartData} onClick={()=>toggleFullScreen()}/>
                </div>
                </div>
              <Charts bloodTypeData={bloodTypeData} lineChartDataRef={lineChartData} />
            </div>
          </div>
        }
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
