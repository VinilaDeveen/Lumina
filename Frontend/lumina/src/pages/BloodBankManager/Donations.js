import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../../styles/BBM/Donations.css';
import SidemenuComponent from '../../components/SidemenuComponent';
import TopBannerComponent from '../../components/TopBannerComponent';
import FilledAlerts from '../../components/Main/FilledAlerts';

export default function Donations() {
  // Alert 
      const [alert, setAlert] = useState({ status: null, message: null });
      const statusCode = useRef("");
      const errorMessage = useRef("");

  const [data, setData] = useState([]);
  const token = localStorage.getItem('accessToken');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/lumina/labTest/donationLabTests', config);
      setData(response.data);
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
  
  useEffect(() => {
    
    fetchData();
  }, []);

  const handleAcceptClick = async (donationId,userBloodType,donationAmount,donationStatus) => {
    const confirmed = window.confirm("Are you sure you want to accept?");
    if(confirmed){
      const data = {
        donationId: donationId,
        donationAmount:donationAmount,
        userBloodType:userBloodType,
        labTestResult:donationStatus
      };
      try {
        await axios.put(`http://localhost:8080/api/lumina/bloodinventory/add`, data , config);
        fetchData();
          if(donationStatus === "ACCEPTED") {
            statusCode.current = 200;
            errorMessage.current = "Blood Donation marked as added.";
            setAlert({ status: statusCode, message: errorMessage });
          } else {
            statusCode.current = 400;
            errorMessage.current = "Lab Test Result is Rejected.";
            setAlert({ status: statusCode, message: errorMessage });
          }
        
        console.log(data);
      } catch (error) {
        if(error.response){
          statusCode.current = error.response.status;
          errorMessage.current = error.response.data;
        }else{
          statusCode.current = 400;
          errorMessage.current = "Lab Test Result is Rejected.";
        }
        setAlert({status:statusCode,message:errorMessage});
      }
    }
  };

  const handleRejectClick = async (donationId,userBloodType,donationAmount,donationStatus) => {
    const confirmed = window.confirm("Are you sure you want to reject?");
    if(confirmed){
      const data = {
        donationId: donationId,
        donationAmount:donationAmount,
        userBloodType:userBloodType,
        labTestResult:donationStatus
      };
      try {
        await axios.put(`http://localhost:8080/api/lumina/bloodinventory/reject`, data , config);
        fetchData();
          if(donationStatus === "REJECTED") {
            statusCode.current = 200;
            errorMessage.current = "Blood Donation marked as disposed.";
            setAlert({ status: statusCode, message: errorMessage });
          } else {
            statusCode.current = 400;
            errorMessage.current = "Lab Test Result is accepted.";
            setAlert({ status: statusCode, message: errorMessage });
          }
        
        console.log(data);
      } catch (error) {
        if(error.response){
          statusCode.current = error.response.status;
          errorMessage.current = error.response.data;
        }else{
          statusCode.current = 400;
          errorMessage.current = "Lab Test Result is accepted.";
        }
        setAlert({status:statusCode,message:errorMessage});
      }
    }
  };

  return (
    <>
      <div className="D-main">
        <SidemenuComponent userRole={'bbm'} />
        <div className="Aappointments">
          <TopBannerComponent />
          <h1>Blood Donation</h1>
          <div className="D-leaderboard" style={{ height: '420px' }}>
            <table>
              <thead>
                <tr style={{ textAlign: 'center' ,zIndex:"99"}} className="Ahead">
                  <th>Date</th>
                  <th>Time</th>
                  <th>Donor</th>
                  <th>Blood Type</th>
                  <th>Amount</th>
                  <th>Lab Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.reverse().map((row) => (
                    <tr key={row.donationId} style={{ textAlign: 'center' }}>
                      <td>{row.donationCollectionDate}</td>
                      <td>{row.donationStartTime}</td>
                      <td>{row.donorName}</td>
                      <td>{row.userBloodType}</td>
                      <td>{row.donationAmount}</td>
                      <td>{row.labTestResult}</td>
                      <td className="AdlButton">
                        {row.donationStatus === 'ACCEPTED' || row.donationStatus === 'REJECTED' ? (
                          '-'
                        ) : (
                          <>
                            <button
                              style={{ backgroundColor: 'rgb(76, 175, 80)' }}
                              onClick={() => handleAcceptClick(row.donationId,row.userBloodType,row.donationAmount,row.labTestResult)}
                            >
                              Accept
                            </button>
                            <button style={{ marginLeft: '10px' }} 
                            onClick={() => handleRejectClick(row.donationId,row.userBloodType,row.donationAmount,row.labTestResult)}>
                              Reject
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      Donations Currently Not Available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
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
