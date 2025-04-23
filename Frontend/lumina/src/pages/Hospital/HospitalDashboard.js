import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import SidemenuComponent from '../../components/SidemenuComponent';
import TopBannerComponent from '../../components/TopBannerComponent';
import FilledAlerts from '../../components/Main/FilledAlerts';

export default function HospitalDashboard() {
  // Alert 
      const [alert, setAlert] = useState({ status: null, message: null });
      const statusCode = useRef("");
      const errorMessage = useRef("");
  const token = localStorage.getItem('accessToken');
  const [dashboardData, setDashboardData] = useState({
    donationCount: 0,
    bloodRequestCount: 0,
    todayBloodDonors: 0,
    totalBloodDonors: 0,
  });

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const fetchTotalDonation = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/lumina/donation/getTotalDonations", config); // Adjust the endpoint as needed
      setDashboardData((prevData) => ({
        ...prevData,
        donationCount: response.data,
      }));
      console.log("TotalDonation data successfully fetched");
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

  const fetchTodayDonation = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/lumina/donation/getTotalDonationsToday", config); // Adjust the endpoint as needed
      setDashboardData((prevData) => ({
        ...prevData,
        todayBloodDonors: response.data,
      }));
      console.log("TodayDonation data successfully fetched");
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

  const fetchTotalBloodRequest = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/lumina/bloodRequest/getTotalBloodRequests", config); // Adjust the endpoint as needed
      setDashboardData((prevData) => ({
        ...prevData,
        bloodRequestCount: response.data,
      }));
      console.log("TotalBloodRequest data successfully fetched");
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



  useEffect(() => {
    fetchTotalDonation();
    fetchTotalBloodRequest();
    fetchTodayDonation();
  }, []);

  return (
    <>
      <div className="D-main">
        <SidemenuComponent userRole={'hospital'} />
        <div className="Aappointments">
          <TopBannerComponent />
          <div className="statistics-and-chart" style={{ marginTop: "8%" }}>
            <div className="statistics-section">
              <div className="statistics-box">
                <p className="stat-label">Total Donation Count</p>
                <h4 className="stat-value">{dashboardData.donationCount}</h4>
              </div>
              <div className="statistics-box">
                <p className="stat-label">Blood Request Count</p>
                <h4 className="stat-value">{dashboardData.bloodRequestCount}</h4>
              </div>
              <div className="statistics-box">
                <p className="stat-label">Today Blood Donations</p>
                <h4 className="stat-value">{dashboardData.todayBloodDonors}</h4>
              </div>
              <div className="statistics-box">
                <p className="stat-label">Total Blood Donors</p>
                <h4 className="stat-value">{dashboardData.totalBloodDonors}</h4>
              </div>
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