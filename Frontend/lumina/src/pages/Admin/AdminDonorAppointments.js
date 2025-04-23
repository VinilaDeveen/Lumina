import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import TopBannerComponent from '../../components/TopBannerComponent';
import SidemenuComponent from '../../components/SidemenuComponent';
import close from '../../assets/icons/close.svg';
import '../../styles/Admin/Appointments.css';
import LoaderAnimation from '../../components/LoaderAnimation';
import FilledAlerts from '../../components/Main/FilledAlerts';

export default function AdminDonorAppointments() {
  // Alert 
      const [alert, setAlert] = useState({ status: null, message: null });
      const statusCode = useRef("");
      const errorMessage = useRef("");

  const token = localStorage.getItem('accessToken');
  const [fetchedAppointments, setFetchedAppointments] = useState([]);
  const [loader,setLoader] = useState(false);

  const [numberOfBeds, setNumberOfBeds] = useState('');
  const [holidaysList, setHolidaysList] = useState([]);
  const [updateHolidayDate, setUpdateHolidayDate] = useState(''); /* THE DATE THAT CHOOSE TO BE UPDATED */
  const [holidayData, setHolidayData] = useState(''); /* THE DATE THAT CHOOSE TO BE UPDATED INFORMATIONS */

  const [holidayDate, setHolidayDate] = useState('');

  const [viewAddBeds, setViewAddBeds] = useState('');
  const [viewAddHolidays, setViewAddHolidays] = useState('');
  const [viewUpdateHolidays, setViewUpdateHolidays] = useState('');

  const appointment = true;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  // API For ADD BEDS
  const handleBedCreation = async (e) => {
    setLoader(true);
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8080/api/lumina/bed/setTotalBeds?totalBeds=${numberOfBeds}`,{}, config);
      statusCode.current = 200;
      errorMessage.current = `Successfully added ${numberOfBeds} of beds for 1 year`;
      setAlert({status:statusCode,message:errorMessage});
    } catch (error) {
      if(error.response){
        statusCode.current = error.response.status;
        errorMessage.current = error.response.data;
      }else{
        statusCode.current = 100;
        errorMessage.current = 'Failed to add beds';
      }
      setAlert({status:statusCode,message:errorMessage});
    }
    // - - - - - - - - - - - - - - - -  -  Loader Disable After AXIOS - - - - - - - - - - - - - - - - - 
    setLoader(false);
  };

  // API For ADD HOLIDAYS
  const handleAddHolidays = async (e) => {
    setLoader(true);
    e.preventDefault();
  
    if (holidaysList.length === 0) {
      statusCode.current = 400;
      errorMessage.current = 'Please add at least one holiday before submitting.';
      setAlert({status:statusCode,message:errorMessage});
      return;
    }
  
    try {
      await axios.post('http://localhost:8080/api/lumina/bed/setHolidays', holidaysList, config);
      statusCode.current = 200;
      errorMessage.current = 'Holidays have been successfully added to the calendar.';
      setAlert({status:statusCode,message:errorMessage});
      setHolidaysList([]); // Clear the list after successful submission
    } catch (error) {
      if(error.response){
        statusCode.current = error.response.status;
        errorMessage.current = error.response.data;
      }else{
        statusCode.current = 400;
        errorMessage.current = 'Error at add holiday';
      }
      setAlert({status:statusCode,message:errorMessage});
    }
    setLoader(false);
  };

  const handleViewHolidayToBeUpdated = async (holidayDate) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/lumina/bed?date=${holidayDate}`, config);
      setHolidayData(response.data);
    } catch (error) {
      if(error.response){
        statusCode.current = error.response.status;
        errorMessage.current = error.response.data;
      }else{
        statusCode.current = 400;
        errorMessage.current = 'Failed to view status';
      }
      setAlert({status:statusCode,message:errorMessage});
    }

  };

  // API FOR UPDATE HOLIDAY
  const updateHolidayToNormal = async (e) => {
    setLoader(true);
    const DateStatus = holidayData === 'HOLIDAY' ? 'ACTIVE' : 'HOLIDAY';
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:8080/api/lumina/bed/updateBedStatus?date=${updateHolidayDate}&status=${DateStatus}`,{}, config);
      statusCode.current = 200;
      errorMessage.current = `${updateHolidayDate} Holidays have been successfully added to the calendar.`;
      setAlert({status:statusCode,message:errorMessage});
      setHolidayDate("");
    } catch (error) {
      if(error.response){
        statusCode.current = error.response.status;
        errorMessage.current = error.response.data;
      }else{
        statusCode.current = 400;
        errorMessage.current = 'Failed to update Holidays to the existing calender';
      }
      setAlert({status:statusCode,message:errorMessage});
    }
    setLoader(false);
  };

  // API Call to deleteAppointments
  const deleteAppointment = async (appointmentId) => {
    try {
      const confirmed = window.confirm('Are you sure you want to delete ?');
      if (confirmed) {
        await axios.delete(`http://localhost:8080/api/lumina/appointment/${appointmentId}`, config);
        statusCode.current = 200;
        errorMessage.current = 'Appointment successfully deleted';
        setAlert({status:statusCode,message:errorMessage});
        fetchAppointments();
      }
    } catch (error) {
      if(error.response){
        statusCode.current = error.response.status;
        errorMessage.current = error.response.data;
      }else{
        statusCode.current = 400;
        errorMessage.current = 'Failed to delete holiday';
      }
      setAlert({status:statusCode,message:errorMessage});
    }
  };

  // API Call to get all the exusting appointments
  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/lumina/appointment', config);
      setFetchedAppointments(response.data);
      console.log('Succesfully Fetched');
    } catch (error) {
      if(error.response){
        statusCode.current = error.response.status;
        errorMessage.current = error.response.data;
      }else{
        statusCode.current = 400;
        errorMessage.current = 'Failed to fetch appointment';
      }
      setAlert({status:statusCode,message:errorMessage});
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleSetDateToBeUpdated = (date) => {
    setHolidayDate(date)
    setUpdateHolidayDate(date);
    handleViewHolidayToBeUpdated(date);
  };

  const handleAddBedsView = () => {
    setViewAddBeds(!viewAddBeds);
    setViewUpdateHolidays(false);
    setViewAddHolidays(false);
  };

  const handleAddHolidaysView = () => {
    setViewAddHolidays(!viewAddHolidays);
    setViewAddBeds(false);
    setViewUpdateHolidays(false);
  };

  const handleUpdateHolidaysView = () => {
    setViewUpdateHolidays(!viewUpdateHolidays);
    setViewAddBeds(false);
    setViewAddHolidays(false);
  };

  const handleCancellItemInHolidats = (index) => {
    const updatedList = holidaysList.filter((_, i) => i !== index);
    setHolidaysList(updatedList);
  };

  return (
    <>
      <div className="Amain">
        <SidemenuComponent userRole={'admin'} />
        {
          <div className="Aappointments" style={window.innerWidth > 800 ? {} : { padding: '0px' }}>
            {<TopBannerComponent />}
            <div style={{ width: '100%', display: 'flex',  justifyContent:"flex-end"}}>
              <button style={{marginRight:"20px"}} className="AsaButton" onClick={() => handleAddBedsView()}>
                ADD BEDS
              </button>
              <button style={{marginRight:"20px"}} className="AsaButton" onClick={() => handleUpdateHolidaysView()}>
                UPDATE HOLIDAYS
              </button>
              <button style={{marginRight:"20px"}} className="AsaButton" onClick={() => handleAddHolidaysView()}>
                ADD HOLIDAYS
              </button>
            </div>
            <h1>Appointments</h1>
            <div className="Aschedule">
              <>
                <div className="D-leaderboard" style={{ height: '47vh' }}>
                  <table>
                    <tr style={{ textAlign: 'center',zIndex:"99" }} className="Ahead">
                      <th>Date</th>
                      <th>Time</th>
                      <th>Location</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                    {fetchedAppointments.length > 0 ? (
                      fetchedAppointments.map((appoinment) => (
                        appoinment.appointmentStatus != "DELETED"?
                          <tr style={{ textAlign: 'center' }} key={appoinment.appointmentId}>
                          <td>{appoinment.appointmentDate}</td>
                          <td>{appoinment.startTime}</td>
                          <td>{'Colombo'}</td>
                          <td>{appoinment.appointmentStatus}</td>
                          <td onClick={() => deleteAppointment(appoinment.appointmentId)} className="AdlButton">
                            <button>DELETE</button>
                          </td>
                        </tr>
                        :null
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center">
                          Donations Currently Not Available
                        </td>
                      </tr>
                    )}
                  </table>
                </div>
              </>
            </div>
          </div>
        }
      </div>
      {viewAddBeds === true && (
        <div className="searchDonor" style={{ width: 'auto', height: 'auto', marginTop: '1%',zIndex:"999" }}>
          <div className="image"></div>
          <div className="search">
            <div className="exit" onClick={() => handleAddBedsView()}>
              <img src={close} alt="closeImage" />
            </div>
            <p style={{ fontSize: '24px' }}>Add Beds</p>
            <form id="searchDonor" onSubmit={(e) => handleBedCreation(e)}>
              <div className="User-registration" style={{ display: 'flex' }}>
                <div
                  className="User-registration-top"
                  style={{
                    marginRight: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    widows: '100%',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <i style={{ marginTop: '10px', color: 'white' }} class="fa fa-bed icon"></i>
                  <input
                    className="form-input"
                    style={{ fontSize: '16px' }}
                    autoComplete="off"
                    placeholder="Number of beds"
                    type="text"
                    id="N01"
                    key="numberOfBeds"
                    required
                    name="numberOfBeds"
                    value={numberOfBeds}
                    onChange={(e) => setNumberOfBeds(e.target.value.trim())}
                  />
                </div>
              </div>
              <button type="submit" className="AsaSubmit">
                ADD BEDS
              </button>
            </form>
          </div>
        </div>
      )}
      {viewAddHolidays && (
        <div className="searchDonor" style={{ width: 'auto', height: 'auto', marginTop: '1%',zIndex:"999"  }}>
          <div className="image"></div>
          <div className="search">
            <div className="exit" onClick={() => handleAddHolidaysView()} style={{cursor:"pointer"}}>
              <img src={close} alt="closeImage" />
            </div>
            <p style={{ fontSize: '24px' }}>Mark Holidays</p>
            <form id="searchDonor" onSubmit={(e) => handleAddHolidays(e)}>
              <div className="User-registration" style={{ display: 'flex' }}>
                <div className="User-registration-top" style={{ marginRight: '20px' }}>
                  <label style={{ color: 'rgb(0 0 0 / 0%)' }}>Select days to be holidays</label>
                  <i class="fa fa-calendar icon" style={{ color: 'white', margin: '10px 0px 0px 10px' }}></i>
                  <input
                    className="form-input"
                    style={{ fontSize: '16px' }}
                    autoComplete="off"
                    placeholder=""
                    type="date"
                    id="N01"
                    key="holidayDate"
                    name="holidayDate"
                    value={holidayDate}
                    onChange={(e) => setHolidayDate(e.target.value)}
                  />
                </div>
              </div>
              <button
                onClick={() => {
                  if (!holidayDate) {
                    statusCode.current = 400;
                    errorMessage.current = 'Please select a valid date!';
                    setAlert({status:statusCode,message:errorMessage});
                    return;
                  }
                  if (holidaysList.includes(holidayDate)) {
                    statusCode.current = 400;
                    errorMessage.current = 'This date is already added to the list!';
                    setAlert({status:statusCode,message:errorMessage});
                    return;
                  }
                  setHolidaysList([...holidaysList, holidayDate]);
                  setHolidayDate(''); // Clear the input field
                }}
                className="AsaSubmit"
                type='button'
              >
                ADD HOLIDAYS
              </button>
              <div className="Holiday-Dates" style={{ height: '200px' }}>
                {holidaysList.map((holiday, index) => (
                  <p key={holiday}>
                    {holiday}{' '}
                    <span
                      style={{ color: '#ea2323da', marginLeft: '70px', cursor: 'pointer' }}
                      onClick={() => handleCancellItemInHolidats(index)}
                    >
                      x
                    </span>
                  </p>
                ))}
              </div>
              <button type="submit" className="AsaSubmit">
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      )}
      {viewUpdateHolidays && (
        <div className="searchDonor" style={{ width: 'auto', height: 'auto', marginTop: '1%' ,zIndex:"999"}}>
          <div className="image"></div>
          <div className="search">
            <div className="exit" onClick={() => handleUpdateHolidaysView()} style={{cursor:"pointer"}}>
              <img src={close} alt="closeImage" />
            </div>
            <p style={{ fontSize: '24px' }}>UPDATE Holidays</p>
            <form id="searchDonor" onSubmit={(e) => e.preventDefault()}>
              <div className="User-registration" style={{ display: 'flex' }}>
                <div className="User-registration-top" style={{ marginRight: '20px' }}>
                  <label style={{ color: 'rgb(0 0 0 / 0%)' }}>Select days to be holidays</label>
                  <i class="fa fa-calendar icon" style={{ color: 'white', margin: '10px 0px 0px 10px' }}></i>
                  <input
                    className="form-input"
                    style={{ fontSize: '16px' }}
                    autoComplete="off"
                    placeholder=""
                    type="date"
                    id="N01"
                    key="holidayDate"
                    required
                    name="holidayDate"
                    value={holidayDate}
                    onChange={(e) => handleSetDateToBeUpdated(e.target.value)}
                  />
                </div>
              </div>
              {holidayData ? <p>Status: {holidayData}</p> : <p>Status: Loading..</p>}
              <button
                onClick={(e) => {
                  updateHolidayToNormal(e);
                }}
                type="button"
                className="AsaSubmit"
              >
                CHANGE STATUS
              </button>
            </form>
          </div>
        </div>
      )}
      {loader && 
        <LoaderAnimation type={"heart-rate"}/>
      }

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
