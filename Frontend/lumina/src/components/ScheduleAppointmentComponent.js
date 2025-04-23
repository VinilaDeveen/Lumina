
import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { jwtDecode } from 'jwt-decode';
import FilledAlerts from './Main/FilledAlerts';

export default function ScheduleAppointmentComponent() {
  // Alert 
    const [alert, setAlert] = useState({ status: null, message: null });
    const statusCode = useRef("");
    const errorMessage = useRef("");

  const token = localStorage.getItem('accessToken');
  const [location,setLocation] = useState('Colombo');
  const [appointmentDate,setAppointmentDate] = useState('');
  const [time,setTime] = useState(''); 
  const [fetchedTimes,setFetchedTimes] = useState([]);
  const [userId,setUserId] = useState(null);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const decoded = jwtDecode(token);
  const userEmail = decoded.sub;

  const fetchUserInformations = async()=>{
    try{
      const response = await axios.get(`http://localhost:8080/api/lumina/user/email?userEmail=${userEmail}`,config);
      console.log("User Details",response.data);
      const data = response.data;
      setUserId(data.userId);
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

  useEffect(()=>{
    fetchUserInformations(token);
  },[])

  const fetchAvailableTimes = useCallback(async (selectedDate) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/lumina/appointment/available-slots?date=${selectedDate}`, config );
      setFetchedTimes(response.data);
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
  }, []);


  useEffect(()=>{
    if(appointmentDate){
      fetchAvailableTimes(appointmentDate);
    }
  },[appointmentDate,fetchAvailableTimes]);

  const createAnAppointment = async (e) => {
    e.preventDefault();
    const appointment = {
      userId: userId,
      date:appointmentDate,
      startTime: time,
    };

    try {
      await axios.post('http://localhost:8080/api/lumina/appointment', appointment, config);
      statusCode.current = 200;
      errorMessage.current = `Successfully scheduled an appointment on ${appointmentDate} at ${time}`;
      setAlert({status:statusCode,message:errorMessage});
      setAppointmentDate('');
      setTime('');
      setFetchedTimes([]);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
      
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


  const handleTimeChange = (time)=>{
    setTime(time);
  }

  const handleDateChange = (date)=>{
    setAppointmentDate(date)
  }

  return (
    <>
      <form id='scheduleAppointmentForm' onSubmit={createAnAppointment}>
        <div className='Atitle'>
          <p style={{fontSize:"20px"}}>Schedule Appoinment</p>
        </div>
        <div className='LocationSelector'>
          <select value={location} >
            <option value={location}>Colombo</option>
          </select>
        </div>
        <div className='Adate'>
          <input onChange={(e)=>{handleDateChange(e.target.value)}} required type='date' min={new Date().toISOString().split("T")[0]} name='date' id='date' value={appointmentDate}/>
        </div>
        <div className='Atime'>
        <select
          required
          placeholder="Pick a time"
          onChange={(e) => setTime(e.target.value)}
          disabled={fetchedTimes.length === 0}
          style={{fontSize:"16px"}}
        >
          <option value="">
            {fetchedTimes.length === 0 ? 'No time slots available' : 'Select a time'}
          </option>
          {fetchedTimes.map((availableTime, index) => (
            <option key={index} value={availableTime}>
              {availableTime}
            </option>
          ))}
        </select>

        </div>
        <button className='AsaSubmit' type='submit'>Schedule</button>
      </form>

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
