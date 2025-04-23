import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import SidemenuComponent from '../../components/SidemenuComponent';
import TopBannerComponent from '../../components/TopBannerComponent';
import close from '../../assets/icons/close.svg'
import FilledAlerts from '../../components/Main/FilledAlerts';

export default function AdminBBMBloodRequests() {
  // Alert 
  const [alert, setAlert] = useState({ status: null, message: null });
  const statusCode = useRef("");
  const errorMessage = useRef("");
  // State for blood requests
    const [data, setData] = useState([]);
    const token = localStorage.getItem('accessToken');

    const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
    }

    const fetchBloodRequests = async () => {
        try {
        const response = await axios.get('http://localhost:8080/api/lumina/bloodRequest',config) /* DonorAppointmentsService.findAppoinments() */;
        setData(response.data);
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

    useEffect(()=>{
        fetchBloodRequests();
    },[])


  return (
      <div className='D-main'>
          <SidemenuComponent userRole={'admin'} />
          <div className='Aappointments'>
              <TopBannerComponent />
                  <>
                      <h1>Blood Requests</h1>
                      
                      <div className="D-leaderboard" style={{height:"58vh",marginTop:"1%"}}>
                          <table>
                          <tr style={{ checkboxAlign: 'center',zIndex:"99" }} >
                            <th>Date</th>
                            <th>Time</th>
                            <th>Blood Type</th>
                            <th>Amount</th>
                            <th>Request Status</th>
                          </tr>
                          {data.length > 0 ? (
                              data.reverse().map((row, index) => (
                              <tr key={row.bloodRequestId || index}>
                                <td>{row.requestDate}</td>
                                <td>{row.requestTime.substring(0,5)}</td>
                                <td>{row.bloodType}</td>
                                <td>{row.requestAmount}</td>
                                <td>{row.bloodRequestStatus}</td>
                              </tr>
                              ))):(
                                <tr>
                                    <td colSpan="5" className="text-center">No Data Available</td>
                                </tr>
                              )}
                      </table>
                      </div>
                    {alert.status && (
                      <FilledAlerts
                        status={alert.status}
                        message={alert.message}
                        onClose={() => setAlert({ status: null, message: null })}
                      />
                    )}
                  </>
          </div>
      </div>
  );
}
