import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import '../../styles/BBM/BloodRequests.css';
import TopBannerComponent from '../../components/TopBannerComponent';
import SidemenuComponent from '../../components/SidemenuComponent';
import FilledAlerts from '../../components/Main/FilledAlerts';

export default function BloodRequests() {
  // Alert 
  const [alert, setAlert] = useState({ status: null, message: null });
  const statusCode = useRef("");
  const errorMessage = useRef("");

  const token = localStorage.getItem('accessToken');
  const [data, setData] = useState([]);
  const [inventory, setInventoryData] = useState([]);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/lumina/bloodRequest', config);
      setData(response.data);
    } catch (error) {
      handleError(error);
    }
  };

  const fetchInventoryData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/lumina/bloodinventory', config);
      setInventoryData(response.data);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchInventoryData();
  }, []);

  const handleError = (error) => {
    if (error.response) {
      statusCode.current = error.response.status;
      errorMessage.current = error.response.data;
    } else {
      statusCode.current = 400;
      errorMessage.current = "Failed to connect to the server.";
    }
    setAlert({ status: statusCode.current, message: errorMessage.current });
  };

  const handleAcceptClick = async (bloodRequestId) => {
    if (window.confirm("Are you sure you want to accept?")) {
      try {
        await axios.patch(`http://localhost:8080/api/lumina/bloodRequest/${bloodRequestId}?bloodRequestStatus=ACCEPTED`, {}, config);
        fetchData();
        statusCode.current = 200;
        errorMessage.current = "Blood request fulfilled and added to inventory.";
        setAlert({ status: statusCode, message: errorMessage });
      } catch (error) {
        handleError(error);
      }
    }
  };

  const handleRejectClick = async (bloodRequestId) => {
    if (window.confirm("Are you sure you want to reject?")) {
      try {
        await axios.patch(`http://localhost:8080/api/lumina/bloodRequest/${bloodRequestId}?bloodRequestStatus=REJECTED`, {}, config);
        fetchData();
        statusCode.current = 200;
        errorMessage.current = "Blood request marked as rejected.";
        setAlert({ status: statusCode, message: errorMessage });
      } catch (error) {
        handleError(error);
      }
    }
  };

  const getAvailableAmount = (bloodType) => {
    const bloodItem = inventory.find(item => item.bloodType === bloodType);
    return bloodItem ? bloodItem.amount : 'N/A';
  };

  return (
    <>
      <div className="D-main">
        <SidemenuComponent userRole={'bbm'} />
        <div className="Aappointments">
          <TopBannerComponent />
          <h1>Blood Requests</h1>
          <div className="D-leaderboard" style={{ height: '400px', marginTop: '2%' }}>
            <table>
              <thead>
                <tr style={{ textAlign: 'center', zIndex: "99" }} className="Ahead">
                  <th>Date</th>
                  <th>Time</th>
                  <th>Blood Type</th>
                  <th>Request Amount</th>
                  <th>Available Amount</th>
                  <th>Request Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.reverse().map((row) => (
                    <tr key={row.bloodRequestId}>
                      <td>{row.requestDate}</td>
                      <td>{row.requestTime.substring(0, 5)}</td>
                      <td>{row.bloodType}</td>
                      <td>{row.requestAmount} mL</td>
                      <td>{getAvailableAmount(row.bloodType)} mL</td>
                      <td>{row.bloodRequestStatus}</td>
                      <td className="AdlButton">
                        {row.bloodRequestStatus === 'PENDING' ? (
                          <>
                            <button
                              style={{ backgroundColor: 'rgb(76, 175, 80)' }}
                              onClick={() => handleAcceptClick(row.bloodRequestId)}
                            >
                              ACCEPT
                            </button>
                            <button style={{ marginLeft: '10px' }} onClick={() => handleRejectClick(row.bloodRequestId)}>
                              REJECT
                            </button>
                          </>
                        ) : (
                          <>-</>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      Blood Requests are currently not available.
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
