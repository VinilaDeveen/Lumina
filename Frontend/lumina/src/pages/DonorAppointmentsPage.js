import { useEffect, useRef, useState } from 'react';
import ScheduleAppointmentComponent from '../components/ScheduleAppointmentComponent';
import SideMenuComponent from '../components/SidemenuComponent';
import TopBannerComponent from '../components/TopBannerComponent';
import axios from 'axios';
import FilledAlerts from '../components/Main/FilledAlerts';
import { jwtDecode } from 'jwt-decode';

function DonorAppointmentsPage() {
  // Alert 
  const [alert, setAlert] = useState({ status: null, message: null });
  const statusCode = useRef("");
  const errorMessage = useRef("");
  const [userId,setUserId] = useState(null);
  const token = localStorage.getItem('accessToken');
  const [fetchedAppointments, setFetchedAppointments] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const appointment = true;

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

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/lumina/appointment/donor/${userId}`, config);
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

  const deleteAppointment = async (appointmentId) => {
    try {
      const confirmed = window.confirm('Are you sure you want to delete ?');
      if (confirmed) {
        await axios.delete(`http://localhost:8080/api/lumina/appointment/${appointmentId}`, config);
        statusCode.current = 200;
        errorMessage.current = "Appointment succesfully deleted!";
        setAlert({status:statusCode,message:errorMessage});
        fetchAppointments();
      }
    } catch (error) {
      if(error.response){
        statusCode.current = error.response.status;
        errorMessage.current = error.response.data;
        if(error.response.status === 403){
          errorMessage.current = "You have no Authority to delete it"
        }
      }else{
        statusCode.current = 100;
        errorMessage.current = "Failed to delete appointment.";
      }
      setAlert({status:statusCode,message:errorMessage});
    }
  };

  useEffect(() => {
    fetchUserInformations();
    if (userId != null) {
      fetchAppointments();
    }
  }, [userId]);

  

  return (
    <>
      <div className="Amain">
        {window.innerWidth > 800 ? <SideMenuComponent userRole={'donor'} /> : null}
        {
          <div className="Aappointments" style={window.innerWidth > 800 ? {} : { padding: '0px' }}>
            {<TopBannerComponent />}

            <h1 >Appointments</h1>
            <div className="Aschedule">
              {buttonClicked === false ? (
                <>
                  <button onClick={setButtonClicked} className="AsaButton">
                    SCHEDULE APPOINTMENTS
                  </button>
                  {fetchedAppointments.length > 0 ? (
                    <>
                      <div className="D-leaderboard" style={{height:"345px"}}>
                        <table>
                          <tr style={{ textAlign: 'center',zIndex:"999"}} className="Ahead">
                            <th>Date</th>
                            <th>Time</th>
                            <th>Location</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                          {fetchedAppointments.reverse().map((appoinment) => (
                            appoinment.appointmentStatus != "DELETED"?
                            <tr style={{ textAlign: 'center' }} key={appoinment.appointmentId}>
                              <td>{appoinment.appointmentDate}</td>
                              <td>{appoinment.startTime}</td>
                              <td>{"Colombo"}</td>
                              <td>{appoinment.appointmentStatus}</td>
                              <td className="AdlButton">
                                {appoinment.appointmentStatus != 'COMPLETED' ? (
                                  <>
                                    <button onClick={() => deleteAppointment(appoinment.appointmentId)}>DELETE</button>
                                  </>
                                ) : (
                                  <>-</>
                                )}
                              </td>
                            </tr>
                            :null
                          ))}
                        </table>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="AnoAppoinments">
                        <p>Appoinments Does not exists </p>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="AsaContainer">
                  <ScheduleAppointmentComponent  />
                </div>
              )}
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

export default DonorAppointmentsPage;
