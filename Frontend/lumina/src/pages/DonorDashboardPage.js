import '../styles/DonorDashboard.css';
import statistic from '../assets/images/statistic.png';
import { useState, useEffect, useRef } from 'react';
import TopBannerComponent from '../components/TopBannerComponent';
import DonorDashboardService from '../services/DonorDashboardService';
import SidemenuComponent from '../components/SidemenuComponent';
import axios from 'axios';
import FilledAlerts from '../components/Main/FilledAlerts';

function DonorDashboardPage() {
  // Alert 
    const [alert, setAlert] = useState({ status: null, message: null });
    const statusCode = useRef("");
    const errorMessage = useRef("");


  const token = localStorage.getItem('accessToken');
  const [totalDonor, setTotalDonor] = useState(0);
  const [totalDonation, setTotalDonation] = useState(0);
  const [todayDonation, setTodayDonation] = useState(0);

  const [donors, setDonors] = useState([]);

  const [sumDonations, setSumDonations] = useState('');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const fetchDonors = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/lumina/user/getTotalDonors`, config);
      setTotalDonor(response.data);
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

  const fetchTotalDonations = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/lumina/donation/totalBloodDonated`, config);
      setTotalDonation(response.data);
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
      const response = await axios.get(`http://localhost:8080/api/lumina/donation/totalBloodDonatedToday`,config);
      setTodayDonation(response.data);
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

  const fetchLeaderBoardData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/lumina/donation/topTenDonors`, config);
      setDonors(response.data);
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
    fetchDonors();
    fetchTotalDonations();
    fetchTodayDonations();
    fetchLeaderBoardData();
  }, []);
  return (
    <>
      <div className="D-main">
        <SidemenuComponent userRole={'donor'} />
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
                      <p>{totalDonation} mL</p>
                    </div>
                  </div>
                  <div className="D-counts-box">
                    <img src={statistic} alt="static" />
                    <div className="D-box-info">
                      <p>Today's Donations</p>
                      <p>{todayDonation} mL</p>
                    </div>
                  </div>
                </div>
              </div>
            }

            <h1>Leaderboard</h1>
            <div className="D-leaderboard" style={{height:"auto"}}>
              
              <table style={{ marginTop: '40px' }}>
                {donors.length > 0 ? (
                  donors.map((donor, index) => (
                    <tr>
                      <td className="D-index">{index + 1}</td>
                      <td>{donor.userFirstName}</td>
                      <td>{donor.totalBloodAmount} mL</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan={2}>Donor Data not exists</td></tr>
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
  );
}

export default DonorDashboardPage;
