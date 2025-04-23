import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidemenuComponent from '../../components/SidemenuComponent';
import TopBannerComponent from '../../components/TopBannerComponent';
import FilledAlerts from '../../components/Main/FilledAlerts';


export default function PhDonorDonations() {
  // Alert 
      const [alert, setAlert] = useState({ status: null, message: null });
      const statusCode = useRef("");
      const errorMessage = useRef("");

  const token = localStorage.getItem('accessToken');
  const [enableDonorDonations, setEnableDonorDonations] = useState(true);
  const [enableUpdateDonatoin, setEnableUpdateDonation] = useState(false);

  const [donations, setDonations] = useState(''); /* Donations thiyn okkomma */
  const [donationId, setdonationId] = useState('');
  const [donation, setDonation] = useState(''); /* Select krpu donation ekt adala data */

  const [donationData,setDonationData] = useState({
    userId:0,donationAmount:0,donationStartTime:"",donationEndTime:""
  });

  const handleDonationUpdate = (userId,donationAmount,donationStartTime,donationEndTime,donationId) => {
    setdonationId(donationId);
    setEnableDonorDonations(false);
    setDonationData({userId:userId,donationAmount:donationAmount,donationStartTime:donationStartTime,donationEndTime:donationEndTime})
    setEnableUpdateDonation(true);
  };

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  /*  All Donations From Donors */
  const fetchDonationsData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/lumina/donation', config);
      setDonations(response.data);
      console.log(response.data);
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

  const UpdateDonatiopnProcess = async (e) => {
    e.preventDefault();
    const updatedDonationData = {
      donationAmount: donationData.donationAmount,
      donationStartTime: donationData.donationStartTime,
      donationEndTime: donationData.donationEndTime,
    };

    try {
      await axios.put(`http://localhost:8080/api/lumina/donation/${donationId}`, updatedDonationData, config);
      statusCode.current = 200;
      errorMessage.current = 'Donation process succesfully updated';
      setAlert({status:statusCode,message:errorMessage});
      setEnableDonorDonations(true);
      setEnableUpdateDonation(false);
      fetchDonationsData();
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
    fetchDonationsData();
  }, []);

  const handleCancel = (e) => {
    e.preventDefault();
    setEnableUpdateDonation(false);
    setEnableDonorDonations(true);

  };

  const navigate = useNavigate();

  return (
    <>
      <div className="D-main">
        <SidemenuComponent userRole={'phlebotomist'} />
        {
          <div className="Aappointments">
            <TopBannerComponent />
            {enableDonorDonations === true && (
              <>
                <h1>Recieve Donation</h1>
                <div className="Aschedule">
                  <div className="D-leaderboard" style={{ height: '58vh' }}>
                    <table>
                      <tr style={{ checkboxAlign: 'center',zIndex:"999" }} className="Ahead">
                        <th>Donation ID</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Location</th> {/* SHOW DONOATION DETAILS TABLE  */}
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                      {donations.length > 0 ? (
                        donations.reverse().map((donor, index) => (
                          <tr style={{ checkboxAlign: 'center' }}>
                            <td className="D-index">{donor.donationId}</td>
                            <td>{donor.donationCollectionDate}</td>
                            <td>{donor.donationStartTime}</td>
                            <td>{'Colombo'} </td>
                            <td>{donor.donationStatus} </td>
                            <td className="AdlButton">
                              <button
                                onClick={() => handleDonationUpdate(donor.userId,donor.donationAmount,donor.donationStartTime,donor.donationEndTime,donor.donationId)}
                                style={{ padding: '4px 40px', backgroundColor: '#ff7b00' }}
                              >
                                EDIT
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center">
                            Donations Currently Not Available
                          </td>
                        </tr>
                      )}
                    </table>
                  </div>
                </div>
              </>
            )}
            {enableUpdateDonatoin === true && (
              <>
                <h1>Update Donation Process</h1>
                <form onSubmit={(e) => UpdateDonatiopnProcess(e)}>
                  <div
                    className="Main-form phlebotomist"
                    style={{ width: '500px', marginTop: '30px', overflow: 'hidden' }}
                  >
                    
                    <div className="qBox">
                      <input
                        autoComplete="off"
                        placeholder="Donor ID"
                        type="text"
                        value={donationData.userId}
                        id="donorId"
                        name="donorId"
                        readOnly
                      />
                    </div>

                    <div className="qBox">
                      <input
                        autoComplete="off"
                        placeholder="Amount of Blood (ml)"
                        required
                        type="number"
                        minLength={0}
                        value={donationData.donationAmount}
                        onChange={(e) => setDonationData({ ...donationData, donationAmount: e.target.value })}
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
                        value={donationData.donationStartTime}
                        onChange={(e) => setDonationData({ ...donationData, donationStartTime: e.target.value })}
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
                        value={donationData.donationEndTime}
                        onChange={(e) => setDonationData({ ...donationData, donationEndTime: e.target.value })}
                        id="endingTime"
                        name="endingTime"
                      />
                    </div>

                    <div className="buttons">
                      <button className="AsaSubmit" style={{ marginTop: '10px' }}>
                        Update
                      </button>
                      <button
                        className="AsaSubmit"
                        onClick={(e) => {
                          handleCancel(e);
                        }}
                        style={{ marginTop: '10px' }}
                      >
                        CANCEL
                      </button>
                    </div>
                  </div>
                </form>
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
