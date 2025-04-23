import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import SidemenuComponent from '../../components/SidemenuComponent';
import TopBannerComponent from '../../components/TopBannerComponent';
import FilledAlerts from '../../components/Main/FilledAlerts';

export default function AdminActivityHistory() {
  // Alert 
      const [alert, setAlert] = useState({ status: null, message: null });
      const statusCode = useRef("");
      const errorMessage = useRef("");
    const token = localStorage.getItem('accessToken');
    const [fetchedAccountHistory, setfetchedAccountHistory] = useState([]);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  
    const fetchAccountHistory = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/lumina/actvityLog', config) /* DonorAppointmentsService.findhistorys() */;
        setfetchedAccountHistory(response.data);
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
      fetchAccountHistory();
    }, []);
    return (
      <>
        <div className="Amain">
           <SidemenuComponent userRole={'admin'}/>
          {
            <div className="Aappointments" style={window.innerWidth > 800 ? {} : { padding: '0px' }}>
              {<TopBannerComponent />}
  
              <h1 >Activity History</h1>
              <div className="Aschedule">
                      <>
                        <div className="D-leaderboard" style={{height:"420px"}}>
                          <table>
                            <tr style={{ textAlign: 'center' ,zIndex:"99"}} className="Ahead">
                              <th>Time Stamp</th>
                              <th>Performed By</th>
                              <th>Action</th>
                            </tr>
                            {fetchedAccountHistory.length > 0 ? (
                            fetchedAccountHistory.reverse().map((history) => (
                              <tr style={{ textAlign: 'center' }} key={history.id}>
                                <td>{history.timestamp}</td>
                                <td>{history.performedBy}</td>
                                <td>{history.action}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                            <td colSpan="3" className="text-center">Donations Currently Not Available</td>
                        </tr>
                          )}
                          </table>
                        </div>
                      </>
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
