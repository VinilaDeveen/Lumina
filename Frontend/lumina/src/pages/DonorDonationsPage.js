import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideMenuComponent from '../components/SidemenuComponent';
import TopBannerComponent from '../components/TopBannerComponent';
import '../styles/DonorDonationsStyles.css';
import { jwtDecode } from 'jwt-decode';
import FilledAlerts from '../components/Main/FilledAlerts';

function DonorDonationsPage() {
  // Alert 
      const [alert, setAlert] = useState({ status: null, message: null });
      const statusCode = useRef("");
      const errorMessage = useRef("");

  const [userId,setUserId] = useState(null);
  const token = localStorage.getItem('accessToken');
  const [donation, setDonation] = useState('');
  const [donations, setDonations] = useState([]);
  const navigate = useNavigate();

  const decoded = jwtDecode(token);
  const userEmail = decoded.sub;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const fetchUserInformations = async()=>{
    try{
      const response = await axios.get(`http://localhost:8080/api/lumina/user/email?userEmail=${userEmail}`, config);
      const data = response.data;
      setUserId(data.userId);
    }catch(error){
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

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/lumina/donation/donor/${userId}`, config);
      setDonations(response.data);
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
    fetchUserInformations();
    if (userId != null ) {
      fetchData();
    }
  }, [userId]);

  const viewDonation = (donationId) => {
    navigate(`/donor/pdf/${donationId}`)
  };

  return (
    <>
      <div className="D-main">
        <SideMenuComponent userRole={'donor'} />
        {
          <div className="Aappointments">
            <TopBannerComponent />
            {donation !== '' ? (
              <>
                <h1>The Result</h1>
                <div className="previewPDF">
                  <div className="PDF" />
                </div>
                <div className="download" />
              </>
            ) : (
              <>
                <h1>Donations</h1>

                <div className="D-leaderboard" style={{height: '400px'}}>
                  <table>
                    <tr style={{ textAlign: 'center',zIndex:"999"}} className="Ahead">
                      <th>Date</th>
                      <th>Time</th>
                      <th>Location</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                    {donations.length > 0 ? (
                      donations.reverse().map((donor) => (
                        <tr key={donor.donationId} style={{ textAlign: 'center' }}>
                          <td>{donor.donationCollectionDate}</td>
                          <td>{donor.donationStartTime}</td>
                          <td>{"Colombo"}</td>
                          <td>{donor.donationStatus}</td>
                          <td className="AdlButton">
                            <button onClick={() => viewDonation(donor.donationId)} style={{ padding: '4px 20px',backgroundColor:"#2723EA99" }}>
                              VIEW
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                    <tr>
                      <td colSpan="5" className="text-center">No Data Available</td>
                    </tr>
                    )}
                  </table>
                </div>
              </>
            )}
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
export default DonorDonationsPage;
