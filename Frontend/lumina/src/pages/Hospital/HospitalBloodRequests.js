import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/TableStyles.css';
import close from '../../assets/icons/close.svg';
import SidemenuComponent from '../../components/SidemenuComponent';
import TopBannerComponent from '../../components/TopBannerComponent';
import FilledAlerts from '../../components/Main/FilledAlerts';

export default function HospitalBloodRequests() {
    // Alert 
        const [alert, setAlert] = useState({ status: null, message: null });
        const statusCode = useRef("");
        const errorMessage = useRef("");

    const token = localStorage.getItem('accessToken');
    // State for blood requests
    const [data, setData] = useState([]);
    const [selectedRequestId, setSelectedRequestId] = useState(null);

    const [isBloodRequest, setIsBloodRequest] = useState(true);
    const [isAddBloodRequest, setIsAddBloodRequest] = useState(false);

    const [amount,setAmout] = useState('');
    const [blodType,setBloodType] = useState('');

    const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
    }

    const fetchRequests = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/lumina/bloodRequest', config);
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

    const handleDeleteBloodRequest = async(bloodRequestId)=>{
        try {
            const confirmed = window.confirm("Are you sure you want to delete?");
            if(confirmed){
                await axios.delete(`http://localhost:8080/api/lumina/bloodRequest/${bloodRequestId}`, config);
                statusCode.current = 200;
                errorMessage.current = 'Blood Request successfully deleted';
                setAlert({status:statusCode,message:errorMessage});
                fetchRequests();
            }

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


    useEffect(() => {
        fetchRequests();
    }, []);


    const handleAddBloodRequestClick = () => {
        setIsAddBloodRequest(true);
    };

    const closePopup = () => {
        setIsAddBloodRequest(false);
        setSelectedRequestId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const preparedData = {
            bloodType: blodType,
            requestAmount: parseInt(amount),
        };

        try {
            const response = await axios.post('http://localhost:8080/api/lumina/bloodRequest', preparedData , config);
            statusCode.current = 200;
            errorMessage.current = "Blood request added successfully";
            setAlert({status:statusCode,message:errorMessage});
            fetchRequests();
            setBloodType('');
            setAmout('');
            closePopup();
        } catch (error) {
            if(error.response){
                statusCode.current = error.response.status;
                errorMessage.current = error.response.data;
              }else{
                statusCode.current = 400;
                errorMessage.current = "Failed to connect to the server.";
              }
              setAlert({status:statusCode,message:errorMessage});
        }
    };

    return (
        <>
        <div className='D-main'>
            <SidemenuComponent userRole={'hospital'} />
            <div className='Aappointments'>
                <TopBannerComponent />
                {isBloodRequest && 
                    <>
                        <h1>Blood Requests</h1>
                        <div style={{display:"flex",justifyContent:"flex-end"}}>
                            <button onClick={handleAddBloodRequestClick} className='SuperB'>
                                Add Blood Request
                            </button>
                        </div>
                        
                        <div className="D-leaderboard" style={{height:"320px",marginTop:"1%"}}>
                            <table>
                            <tr style={{ checkboxAlign: 'center',zIndex:"99" }} >
                            <th>Date</th>
                                <th>Time</th>
                                <th>Blood Type</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                            {data.length > 0 ? (
                                data.reverse().map((row, index) => (
                                    row.bloodRequestStatus != "DELETED"?
                                <tr key={row.bloodRequestId || index}>
                                <td>{row.requestDate}</td>
                                    <td>{row.requestTime}</td>
                                    <td>{row.bloodType}</td>
                                    <td>{row.requestAmount}</td>
                                    <td>{row.bloodRequestStatus}</td>
                                    <td className="AdlButton">
                                        <button
                                            onClick={() => handleDeleteBloodRequest(row.bloodRequestId)}
                                            style={{ padding: '4px 20px', marginLeft: '10px'}}
                                        >
                                            DELETE
                                        </button>
                                    </td>
                                </tr>
                                :
                                null
                                ))):(
                                <p>Blood Requests are currently not available</p>
                                )}
                        </table>
                        </div>
                    </>
                    }
                    {isAddBloodRequest === true &&
                    <div className="searchDonor" style={{ height: "500px",zIndex:"999" }}>
                        <div className="image"></div>
                    <div className="search" style={{width:"500px"}}>
                        <div className="exit" onClick={closePopup} style={{cursor:"pointer"}}>
                            <img src={close} alt="Close" />
                        </div>
                        <p style={{fontSize:"32px"}}>Request Blood</p>
                        <form id="searchDonor" onSubmit={handleSubmit}>
                            <div className="labtech-form-group">
                                <label style={{color:"white"}}>Blood Type</label>
                                <select
                                    style={{backgroundColor:"transparent",border:"0px", borderBottom:"1px solid white",color:"white",padding:"0px 0px 5px 0px",width:"100%"}}
                                    name='bloodType'
                                    value={blodType}
                                    onChange={(e)=>{setBloodType(e.target.value)}}
                                    required
                                >
                                    <option style={{color:"black"}} value=''>Select Blood Type</option>
                                    <option style={{color:"black"}} value='APOSITIVE'>A+</option>
                                    <option style={{color:"black"}} value='ANEGATIVE'>A-</option>
                                    <option style={{color:"black"}} value='BPOSITIVE'>B+</option>
                                    <option style={{color:"black"}} value='BNEGATIVE'>B-</option>
                                    <option style={{color:"black"}} value='OPOSITIVE'>O+</option>
                                    <option style={{color:"black"}} value='ONEGATIVE'>O-</option>
                                    <option style={{color:"black"}} value='ABPOSITIVE'>AB+</option>
                                    <option style={{color:"black"}} value='ABNEGATIVE'>AB-</option>
                                </select>
                            </div>
                            <div style={{width:"90%",marginTop:"20px"}} className="labtech-form-group">
                            <label style={{color:"white"}}>Amount</label>
                                <input
                                    type='number'
                                    name='amount'
                                    value={amount}
                                    onChange={(e)=>setAmout(e.target.value)}
                                    required
                                    min='1'
                                />
                            </div>
                            <button type="submit" className="AsaSubmit">
                                Submit
                            </button>
                        </form>
                    </div>
                </div> 
                }

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
