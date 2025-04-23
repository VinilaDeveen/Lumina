import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidemenuComponent from '../../components/SidemenuComponent';
import TopBannerComponent from '../../components/TopBannerComponent';
import DonorAppointmentsService from '../../services/DonorAppointmentsService';
import FilledAlerts from '../../components/Main/FilledAlerts';

export default function PhAppointments() {
  // Alert 
      const [alert, setAlert] = useState({ status: null, message: null });
      const statusCode = useRef("");
      const errorMessage = useRef("");

  const token = localStorage.getItem('accessToken');
  const [fetchedAppointments, setFetchedAppointments] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const appointment = true;

  const navigate = useNavigate();

  const EligibilityTest = (userId,appointmentId) => {
    navigate(`/Phlebotomist/eligibilityTest/${userId}/${appointmentId}`);
  };

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/lumina/appointment`, config);
      setFetchedAppointments(response.data);
      console.log('Succesfully Fetched');
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
    fetchAppointments();
  }, []);

  
  return (
    <>
      <div className="D-main">
        <SidemenuComponent userRole={'phlebotomist'} />
        <div className="Aappointments">
          <TopBannerComponent />
          <h1>Appointments</h1>
          <div className="Aschedule">
            <div className="D-leaderboard" style={{ height: '58vh' }}>
              <table>
                <tr style={{ textAlign: 'center',zIndex:"9999" }} className="Ahead">
                  <th>Date</th>
                  <th>Time</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
                {fetchedAppointments.length > 0 ? (
                  fetchedAppointments.reverse().map((appoinment) => (
                    <tr style={{ textAlign: 'center' }} key={appoinment.appointmentId}>
                      <td>{appoinment.appointmentDate}</td>
                      <td>{appoinment.startTime}</td>
                      <td>{'Colombo'}</td>
                      <td>{appoinment.appointmentStatus}</td>
                      <td onClick={() => EligibilityTest(appoinment.userId,appoinment.appointmentId)} className="AdlButton">
                        {appoinment.appointmentStatus != "DELETED"?
                        <button style={{backgroundColor:"rgb(76, 175, 80)"}}>ELIGIBILITY TEST</button>
                        :
                        "-"
                        }
                        
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      Appointment Data Currently Not Available
                    </td>
                  </tr>
                )}
              </table>
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
