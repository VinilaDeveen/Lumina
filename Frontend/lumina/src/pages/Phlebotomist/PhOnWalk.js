import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import SidemenuComponent from '../../components/SidemenuComponent';
import TopBannerComponent from '../../components/TopBannerComponent';
import SignUp from '../Home/SignUp';
import { useNavigate } from 'react-router-dom';
import FilledAlerts from '../../components/Main/FilledAlerts';

export default function PhOnWalk() {
  // Alert 
          const [alert, setAlert] = useState({ status: null, message: null });
          const statusCode = useRef("");
          const errorMessage = useRef("");

  const token = localStorage.getItem('accessToken');
  const [searchInput,setSearchInput] = useState("");
  const [donorsInfo,setDonorsInfo] = useState([]);
  const [enableViewDonorRegister,setEnableViewDonorRegister] = useState(false);
  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  // Initial donors data fetching function 
  const DonorsData = async(searchInput)=>{
    if(searchInput==""){
      try {
        const response = await axios.get("http://localhost:8080/api/lumina/user/role/DONOR", config);
        const data = response.data;
        setDonorsInfo(data);
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
    }else{
      try {
        const response = await axios.get(`http://localhost:8080/api/lumina/user/universal-search?searchRequest=${searchInput}`, config);
        const data = response.data;
        setDonorsInfo(data);
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

  const EligibilityTest = (userId) => {
    navigate(`/phlebotomist/eligibilityTest/${userId}`);
  };

  const handleSearchDonorWithChange = (input)=>{
    setSearchInput(input);
    DonorsData(input);
  }

  useEffect(() => {
    DonorsData(""); // Explicitly pass an empty string for the initial load
  }, []);

  const closePopup = ()=>{
    setEnableViewDonorRegister(!enableViewDonorRegister);
  }

  return (
    <>
      <div className="D-main">
        <SidemenuComponent userRole={'phlebotomist'} />
        {
          <div className="Aappointments">
            <TopBannerComponent />
            <h1>On Walk</h1>
            <div className='search PhOnWalksearchInput'>
                <input type="text" placeholder="Search Donor" value={searchInput} onChange={(e)=> handleSearchDonorWithChange(e.target.value)}/>
                <button className="AsaButton" onClick={()=>setEnableViewDonorRegister(!enableViewDonorRegister)}>
                    REGISTER DONORS
                </button>
            </div>
            <div className="D-leaderboard" style={{height:"48vh"}}>
                  <table>
                      <tr style={{ textAlign: 'center',zIndex:"99"}} className="Ahead">
                      <th>ID</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>NIC</th>
                      <th>Action</th>
                      </tr>
                      {donorsInfo.length > 0 ? 
                      donorsInfo.reverse().map((data) => (
                      <tr style={{ textAlign: 'center' }} key={data.userId}>
                          <td>{data.userId}</td>
                          <td>{data.userFirstName}</td>
                          <td>{data.userLastName}</td>
                          <td>{data.userEmail}</td>
                          <td>{data.userRole}</td>
                          <td>{data.userNIC}</td>
                          <td className="AdlButton">
                        <button onClick={() => EligibilityTest(data.userId)} className="btn" style={{ backgroundColor: '#4CAF50' }}>
                          Eligibility Test
                        </button>
                      </td>
                      </tr>
                      )):(
                        <tr>
                          <td colSpan="7" className="text-center">donor Data Currently Not Available</td>
                        </tr>
                      )}
                        
                  </table>
                  </div>
                  {enableViewDonorRegister && 
                    <SignUp closePopup={closePopup} />
                  }
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
