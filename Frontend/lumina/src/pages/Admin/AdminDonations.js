import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import SidemenuComponent from '../../components/SidemenuComponent';
import TopBannerComponent from '../../components/TopBannerComponent';
import FilledAlerts from '../../components/Main/FilledAlerts';

export default function AdminDonations() {
  // Alert 
      const [alert, setAlert] = useState({ status: null, message: null });
      const statusCode = useRef("");
      const errorMessage = useRef("");
  const token = localStorage.getItem('accessToken');
  const [data, setData] = useState([]);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/lumina/donation`, config);
        setData(response.data);
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

    fetchData();
  }, []);
  
  
    return (
      <>
        <div className="D-main">
          <SidemenuComponent userRole={'admin'} />
          {
            <div className="Aappointments">
              <TopBannerComponent />
              <h1>Blood Donation</h1>
              <div className="D-leaderboard" style={{height:"400px"}}>
                    <table>
                      <tr style={{ checkboxAlign: 'center' }} className="Ahead">
                          <th>Date</th>
                          <th>Time</th>
                          <th>Donor</th>
                          <th>Blood Type</th>
                          <th>Amount</th>
                          <th>Lab Status</th>
                      </tr>
                      {data.length > 0 ? (
                        data.reverse().map((donation) => (
                          <tr style={{ textAlign: 'center' }}>
                            <td>{donation.donationCollectionDate}</td>
                            <td>{donation.donationStartTime}</td>
                            <td>{donation.donorName}</td>
                            <td>{donation.userBloodType}</td>
                            <td>{donation.donationAmount} ml</td>
                            <td>{donation.donationStatus}</td>
                          </tr>
                        ))
                        ) : (
                          <tr>
                          <td colSpan="7" className="text-center">Donations Currently Not Available</td>
                      </tr>
                        )}
                  </table>
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
    )
}
