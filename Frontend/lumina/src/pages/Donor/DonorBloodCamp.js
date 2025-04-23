import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../../styles/Hospital/BloodCamp.css';
import SidemenuComponent from '../../components/SidemenuComponent';
import TopBannerComponent from '../../components/TopBannerComponent';
import close from '../../assets/icons/close.svg';
import { jwtDecode } from 'jwt-decode';
import FilledAlerts from '../../components/Main/FilledAlerts';

export default function DonorBloodCamp() {
  const token = localStorage.getItem('accessToken');
  // Alert 
  const [alert, setAlert] = useState({ status: null, message: null });
  const statusCode = useRef("");
  const errorMessage = useRef("");

  // Other
  const [userId,setUserId] = useState(null);
  const [data, setData] = useState([]);
  const [enableAddEmployee,setEnableAddEmployee] = useState(false);

  const [StartingTime, setStartingTime] = useState("");
  const [EndingTime, setEndingTime] = useState("");
  const [DonorCount, setDonorCount] = useState("");
  const [bloodCampDate, setBloodCampDate] = useState("");
  const [Location, setLocation] = useState("");

  const decoded = jwtDecode(token);
  const userEmail = decoded.sub;

  const fetchUserInformations = async()=>{
    try{
      const response = await axios.get(`http://localhost:8080/api/lumina/user/email?userEmail=${userEmail}`, config);
      console.log("User Details",response.data);
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
  }

  useEffect(()=>{
    fetchUserInformations(token);
    if (userId != null ) {
      fetchData();
    }
  },[userId])

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const handleBloodCampCreation= (e)=>{
      e.preventDefault();
        const data = {
          bloodCampStartingTime:StartingTime,
          bloodCampEndingTime:EndingTime,
          bloodCampDonorCount:DonorCount,
          bloodCampDate:bloodCampDate,
          bloodCampLocation:Location,
          userId :userId
        };
        try{
            axios.post(`http://localhost:8080/api/lumina/bloodcamp`,data , config)
            fetchData();
            setEnableAddEmployee(false);
            setStartingTime("");
            setEndingTime("");
            setDonorCount("");
            setBloodCampDate("");
            setLocation("");
            statusCode.current = 200;
            errorMessage.current = "Blood camp succesfully created!";
            setAlert({status:statusCode,message:errorMessage});
            fetchData();
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
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/lumina/bloodcamp/viewUserBloodCamps/${userId}`, config);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching blood camps:', error);
      }
    }


  const handleDelete = async (bloodCampId) => {
    if(window.confirm("Are you sure u want to remove the Blood Camp request?")){
      try {
        await axios.delete(`http://localhost:8080/api/lumina/bloodcamp/${bloodCampId}`, config);
        fetchData();
        statusCode.current = 200;
        errorMessage.current = "Blood camp succesfully deleted!";
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
    }
  }

  const handleMouseEnter = (e) => {
    e.target.style.opacity = 0.8;
  };

  const handleMouseLeave = (e) => {
    e.target.style.opacity = 1; 
  }
    


  return (
    <>
      <div className="D-main">
        <SidemenuComponent userRole={'donor'} />
        {
          <div className="Aappointments">
            <TopBannerComponent />
            <h1>Blood Camp</h1>
            <div style={{width:"100%",display:"flex",justifyContent:"flex-end"}}>
              <button onClick={()=>setEnableAddEmployee(true)} className="AsaButton">
                REQUEST BLOOD CAMP
              </button>
            </div>
            <div className="D-leaderboard" style={{height:"350px"}}>
                  <table>
                    <tr style={{ checkboxAlign: 'center',zIndex:"99" }} className="Ahead">
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
                    row.bloodCampStatus != "DELETED"?
                  <tr key={row.bloodCampId} style={{ checkboxAlign: 'center' }}>
                    <td>{row.bloodCampId}</td>
                    <td>{row.bloodCampDate}</td>
                    <td>{row.bloodCampStartingTime}</td>
                    <td>{row.bloodCampLocation}</td>
                    <td>{row.bloodCampDonorCount}</td>
                    <td>{row.bloodCampStatus}</td>
                    <td className='AdlButton'>
                        <button
                          className="btn green-btn"
                          onClick={() => handleDelete(row.bloodCampId)}
                          >
                          DELETE
                        </button>
                    </td>
                    </tr>
                    :null
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">Donations Currently Not Available</td>
                  </tr>
                  )}
            </table>
            {enableAddEmployee && 
                <>
                    <div className="searchDonor" style={{width:"auto",height:"70%",zIndex:"999"}}>
                    <div className="image"></div>
                        <div className="search">
                        <div className="exit" style={{cursor:"pointer"}} onClick={() => setEnableAddEmployee(false)} onMouseEnter={(e)=>handleMouseEnter(e)} onMouseLeave={(e)=>handleMouseLeave(e)}>
                            <img src={close} alt="closeImage" />
                        </div>
                        <p style={{fontSize:"24px"}}>Create Blood Camp</p>
                        <form onSubmit={(e) => handleBloodCampCreation(e)} id="searchDonor">
                            <input
                                style={{fontSize:"16px"}}
                                autoComplete="off"
                                placeholder="Starting Time"
                                type="time"
                                key="StartingTime"
                                required
                                name="StartingTime"
                                value={StartingTime}
                                onChange={(e) => setStartingTime(e.target.value)}
                            />
                            <input
                                style={{fontSize:"16px"}}
                                autoComplete="off"
                                placeholder="Ending Time"
                                type="time"
                                key="EndingTime"
                                required
                                name="EndingTime"
                                value={EndingTime}
                                onChange={(e) => setEndingTime(e.target.value)}
                            />
                            <input
                                style={{fontSize:"16px"}}
                                autoComplete="off"
                                placeholder="Expected Donor Count"
                                type="number"
                                min={0}
                                key="DonorCount"
                                required
                                name="DonorCount"
                                value={DonorCount}
                                onChange={(e) => setDonorCount(e.target.value)}
                            />
                            <input
                              style={{ fontSize: "16px" }}
                              autoComplete="off"
                              placeholder="Date"
                              type="date"
                              key="Date"
                              required
                              name="Date"
                              value={bloodCampDate}
                              min={new Date().toISOString().split("T")[0]}
                              onChange={(e) => setBloodCampDate(e.target.value)}
                            />
                            <input
                                style={{fontSize:"16px"}}
                                autoComplete="off"
                                placeholder="Location"
                                type="Location"
                                key="Location"
                                required
                                name="Location"
                                value={Location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                            <button type='submit' className="AsaSubmit">
                            REQUEST BLOOD CAMP
                            </button>
                        </form>
                        </div>
                    </div>
                </>
                }
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
