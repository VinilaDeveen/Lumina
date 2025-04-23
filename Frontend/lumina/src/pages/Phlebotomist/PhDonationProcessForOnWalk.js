import axios from 'axios';
import React, { useRef, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import SidemenuComponent from '../../components/SidemenuComponent';
import TopBannerComponent from '../../components/TopBannerComponent';
import '../../styles/FormStyles.css';
import '../../styles/PhlebotomistRecieveDonationsStyles.css';
import FilledAlerts from '../../components/Main/FilledAlerts';

export default function PhDonationProcessForOnWalk() {
    // Alert 
      const [alert, setAlert] = useState({ status: null, message: null });
      const statusCode = useRef("");
      const errorMessage = useRef("");

  const token = localStorage.getItem('accessToken');
  const { userId } = useParams();
  const navigate = useNavigate();

  const [amount, setAmout] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endingTime, setEndingTime] = useState('');
  const [donationType, setDonationType] = useState('');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const submitDonation = async (e) => {
    e.preventDefault();

    const data = {
      donationAmount : parseInt(amount),
      userId : parseInt(userId),
      donationStartTime : startTime,
      donationEndTime : endingTime
    }
    try {
      await axios.post(`http://localhost:8080/api/lumina/donation`, data, config);
      navigate('/phlebotomist/donations');
      statusCode.current = 200;
      errorMessage.current = "Successfully added donation";
      setAlert({status:statusCode,message:errorMessage});

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

  const handleCancel = () => {
    navigate('/phlebotomist/appointments');
  };

  return (
    <>
      <div className="D-main">
        <SidemenuComponent userRole={'phlebotomist'} />
        {
          <div className="Aappointments">
            <TopBannerComponent />
            <h1>Donation Process</h1>
            <form>
              <div className="Main-form phlebotomist" style={{ width: '500px', marginTop: '30px',paddingBottom:"30px" }}>
                
                <div className="qBox">
                  <input
                    autoComplete="off"
                    placeholder="Donor ID"
                    required
                    type="text"
                    value={userId}
                    id="appointmentId"
                    name="appointmentId"
                    disabled
                  />
                </div>

                <div className="qBox">
                  <input
                    autoComplete="off"
                    placeholder="Amount of Blood"
                    required
                    type="number"
                    min={0}
                    value={amount}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || (Number(value) >= 0 && !value.startsWith("-"))) {
                        setAmout(value);
                      }
                    }}
                    id="amount"
                    name="amount"
                  />
                  <span style={{ color: 'white' }}>ml</span>
                </div>
                <div className="qBox">
                  <input
                    autoComplete="off"
                    placeholder="Starting Time"
                    required
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    id="startTime"
                    name="startTime"
                  />
                </div>
                <div className="qBox">
                  <input
                    autoComplete="off"
                    placeholder="Ending Time"
                    required
                    type="time"
                    value={endingTime}
                    onChange={(e) => setEndingTime(e.target.value)}
                    id="endingTime"
                    name="endingTime"
                  />
                </div>

                <div className="buttons">
                  <button className="AsaSubmit" onClick={(e) => submitDonation(e)} style={{ marginTop: '10px' }}>
                    SUBMIT
                  </button>
                  <button className="AsaSubmit" onClick={() => handleCancel()} style={{ marginTop: '10px' }}>
                    CANCEL
                  </button>
                </div>
              </div>
            </form>
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
