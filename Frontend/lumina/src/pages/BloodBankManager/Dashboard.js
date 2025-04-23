import React, { useEffect, useRef, useState } from 'react'
import SidemenuComponent from '../../components/SidemenuComponent';
import TopBannerComponent from '../../components/TopBannerComponent';
import '../../styles/BBM/Phlebotomist.css'
import BloodStatistics from '../../components/BloodBankManager/BloodStatistics';
import axios from 'axios';
import FilledAlerts from '../../components/Main/FilledAlerts';

export default function Dashboard() {
  // Alert 
      const [alert, setAlert] = useState({ status: null, message: null });
      const statusCode = useRef("");
      const errorMessage = useRef("");

  const token = localStorage.getItem('accessToken');
  const [bloodData,setBloodData] = useState({free:0,full:0});
  const [bloodDropStatistics,setBloodDropStatistics] = useState([]);
  const [statistics,setStatistics] = useState({
    totalDonors:0,
    todayDonors:0,
    totlaRequests:0
  })

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  
  // Pie Chart Data
  const fethBloodStatisticDetails = async()=>{
    try{
        const response = await axios.get("http://localhost:8080/api/lumina/bloodinventory/capacitySummary" , config);
        const data = response.data;
        setBloodData({free:data.freeCapacity,full:data.filledCapacity});
    }catch(error){
      if(error.response){
        statusCode.current = error.response.status;
        errorMessage.current = error.response.data;
      }else{
        statusCode.current = 400;
        errorMessage.current = "Failed to connect to the server.";
      }
      setAlert({status:statusCode,message:errorMessage});
    }
  }

  // Blood Drops Data
  
    
  const fetchBloodDropDetails = async()=>{
      try {
          const response = await axios.get(`http://localhost:8080/api/lumina/bloodinventory/percentage`, config);
          const data = response.data;
          console.log(data);
          setBloodDropStatistics(data);
      } catch (error) {
        if(error.response){
          statusCode.current = error.response.status;
          errorMessage.current = error.response.data;
        }else{
          statusCode.current = 400;
          errorMessage.current = "Failed to connect to the server.";
        }
        setAlert({status:statusCode,message:errorMessage});
      }
  }

  
  const fetchedTotalDonors = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/lumina/donation/getTotalDonations", config);
      setStatistics((prevStatistics) => ({
        ...prevStatistics,
        totalDonors: response.data,
      }));
    } catch (error) {
      if(error.response){
        statusCode.current = error.response.status;
        errorMessage.current = error.response.data;
      }else{
        statusCode.current = 400;
        errorMessage.current = "Failed to connect to the server.";
      }
      setAlert({status:statusCode,message:errorMessage});
    }
  };
  
  const fetchedTodayDonors = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/lumina/donation/getTotalDonationsToday", config);
      setStatistics((prevStatistics) => ({
        ...prevStatistics,
        todayDonors: response.data,
      }));
    } catch (error) {
      if(error.response){
        statusCode.current = error.response.status;
        errorMessage.current = error.response.data;
      }else{
        statusCode.current = 400;
        errorMessage.current = "Failed to connect to the server.";
      }
      setAlert({status:statusCode,message:errorMessage});
    }
  };
  
  const fetchedTotalRequest = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/lumina/bloodRequest/getTotalBloodRequestsToday", config);
      setStatistics((prevStatistics) => ({
        ...prevStatistics,
        totlaRequests: response.data, 
      }));
    } catch (error) {
      if(error.response){
        statusCode.current = error.response.status;
        errorMessage.current = error.response.data;
      }else{
        statusCode.current = 400;
        errorMessage.current = "Failed to connect to the server.";
      }
      setAlert({status:statusCode,message:errorMessage});
    }
  };
  
  

  useEffect(()=>{
    fethBloodStatisticDetails();
    fetchedTodayDonors();
    fetchedTotalDonors();
    fetchedTotalRequest();
    fetchBloodDropDetails();
  },[])

  return (
    <>
      <div className="D-main">
        <SidemenuComponent userRole={'bbm'} />
        {
          <div className="Aappointments">
            <TopBannerComponent />
            <h1>Dashboard</h1>
            <BloodStatistics bloodData={bloodData} bloodDropStatistics={bloodDropStatistics} statistics={statistics} />
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
  )
}
