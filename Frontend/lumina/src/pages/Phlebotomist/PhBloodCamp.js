import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import SidemenuComponent from '../../components/SidemenuComponent';
import TopBannerComponent from '../../components/TopBannerComponent';
import PhSearchDonor from './PhSearchDonor';
import FilledAlerts from '../../components/Main/FilledAlerts';

export default function PhBloodCamp() {
  // Alert 
      const [alert, setAlert] = useState({ status: null, message: null });
      const statusCode = useRef("");
      const errorMessage = useRef("");

  const token = localStorage.getItem('accessToken');
  const [bloodcampId, setBloodcampId] = useState();
  const [data, setData] = useState([]);
  const [isSearchvisible, setIsSearchVisble] = useState(false);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/lumina/bloodcamp`,config);
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

  const viewSearch = (bloodCampId) => {
    setBloodcampId(bloodCampId)
    setIsSearchVisble(!isSearchvisible);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="D-main">
        <SidemenuComponent userRole={'phlebotomist'} />
        {
          <div className="Aappointments">
            <TopBannerComponent />
            <h1>Blood Camp</h1>
            <div className="D-leaderboard" style={{ height: '58vh',position:"relative" }}>
              <table>
                <tr style={{ checkboxAlign: 'center',zIndex:"99"}} className="Ahead">
                  <th>ID</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Location</th>
                  <th>Donor Count</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
                {data.length > 0 ? (
                  data.reverse().map((row, index) => (
                    <tr key={row.bloodCampId} style={{ checkboxAlign: 'center' }}>
                      <td>{row.bloodCampId}</td>
                      <td>{row.bloodCampDate}</td>
                      <td>{row.bloodCampStartingTime}</td>
                      <td>{row.bloodCampLocation}</td>
                      <td>{row.bloodCampDonorCount}</td>
                      <td>{row.bloodCampStatus}</td>
                      <td className="AdlButton">
                      {row.bloodCampStatus != "DELETED"?
                        <button className="btn" style={{ backgroundColor: '#4CAF50' }} onClick={() => viewSearch(row.bloodCampId)}>Eligibility Test</button>
                        :
                        "-"
                        }
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      Blood Camp Data Currently Not Available
                    </td>
                  </tr>
                )}
              </table>
            </div>
            {isSearchvisible === true && <PhSearchDonor hadleClosePopup={viewSearch} bloodCamp={bloodcampId} />}
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
