import React, { useEffect, useRef, useState } from 'react'
import SidemenuComponent from '../../components/SidemenuComponent';
import TopBannerComponent from '../../components/TopBannerComponent';
import axios from 'axios';
import FilledAlerts from '../../components/Main/FilledAlerts';

export default function AdminEligibilityTest() {
  // Alert 
      const [alert, setAlert] = useState({ status: null, message: null });
      const statusCode = useRef("");
      const errorMessage = useRef("");

  const token = localStorage.getItem('accessToken');
  const [eligibilityTest, setEligibilityTest] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const appointment = true;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const fetchEligibilityTest = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/lumina/eligibilityTest', config) /* DonorAppointmentsService.findeligibilityTests() */;
      setEligibilityTest(response.data);
      console.log('Succesfully Fetched');
    } catch (error) {
      if(error.response){
        statusCode.current = error.response.status;
        errorMessage.current = error.response.data;
      }else{
        statusCode.current = 400;
        errorMessage.current = "Error at fetch Eligibility test.";
      }
      setAlert({status:statusCode,message:errorMessage});
    }
  };

  useEffect(() => {
    fetchEligibilityTest();
  }, []);

  
  return (
    <>
      <div className="Amain">
         <SidemenuComponent userRole={'admin'}/>
        {
          <div className="Aappointments" style={window.innerWidth > 800 ? {} : { padding: '0px' }}>
            {<TopBannerComponent />}

            <h1 >Eligibility Test</h1>
            <div className="Aschedule">
                    <>
                      <div className="D-leaderboard" style={{height:"420px"}}>
                        <table>
                          <tr style={{ textAlign: 'center' }} className="Ahead">
                            <th>Date</th>
                            <th>Time</th>
                            <th>Donor</th>
                            <th>Donor Status</th>
                          </tr>
                          {eligibilityTest.length > 0 ? (
                          eligibilityTest.reverse().map((eligibilityTest) => (
                            <tr style={{ textAlign: 'center' }} key={eligibilityTest.id}>
                              <td>{eligibilityTest.testDate}</td>
                              <td>{eligibilityTest.testTime}</td>
                              <td>{eligibilityTest.userFirstName}</td>
                              <td>{eligibilityTest.result ? 'Eligible' : 'Not Eligible'}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                          <td colSpan="4" className="text-center">Donations Currently Not Available</td>
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
