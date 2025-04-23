import axios from 'axios';
import { React, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SidemenuComponent from '../../components/SidemenuComponent';
import TopBannerComponent from '../../components/TopBannerComponent';
import close from '../../assets/icons/close.svg';
import FilledAlerts from '../../components/Main/FilledAlerts';

export default function LabTechDonations() {
  // Alert 
      const [alert, setAlert] = useState({ status: null, message: null });
      const statusCode = useRef("");
      const errorMessage = useRef("");

  const token = localStorage.getItem('accessToken');
  const [donordonationId, setDornorDonationId] = useState();
  const [data, setData] = useState([]);
  const [isAddLabTest,setAddLabTest] = useState(false);

  const closePopup = () => {
    setAddLabTest(false);
  };

  const handleAddLabTestClick = (donationId) => {
    setAddLabTest(true);
    setDornorDonationId(donationId);
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/lumina/donation/donationLabTest`, config);
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

  useEffect(() => {
    fetchData();
  }, []);

    // ADD BLOOD TEST//
  const [formData, setFormData] = useState({
    hiv1: false,
    hiv2: false,
    hepatitisB: false,
    hepatitisC: false,
    syphilis: false,
    malaria: false,
    hemoglobin: '', // ACCEPTED or REJECTED as string
    hemoglobinValue: 0,
  });
    

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Validate the form data
      const hasInfection = formData.hiv1 || formData.hiv2 || formData.hepatitisB || formData.hepatitisC || formData.syphilis || formData.malaria;
      const hemoglobinValue = parseFloat(formData.hemoglobinValue);
  
      if (hasInfection || hemoglobinValue < 12.5) {
          // Set alert and prevent submission
          statusCode.current = 400;
          errorMessage.current = 'Lab test cannot be accepted due to infection or low hemoglobin value.';
          setAlert({status:statusCode,message:errorMessage});
          return; // Exit the function early
      }
  
        // Prepare the data
        const preparedData = {
          hiv1: formData.hiv1,
          hiv2: formData.hiv2,
          hepatitisB: formData.hepatitisB,
          hepatitisC: formData.hepatitisC,
          syphilis: formData.syphilis,
          malaria: formData.malaria,
          hemoglobin: hemoglobinValue, // Ensure this is a number
          labTestResult: formData.hemoglobin, // ACCEPTED or REJECTED
          donationId: donordonationId, // Ensure this is valid
        };

        try {
          const response = await axios.post('http://localhost:8080/api/lumina/labTest', preparedData, config);
          statusCode.current = 200;
          errorMessage.current = 'Lab Test added successfully';
          setAlert({status:statusCode,message:errorMessage});
          console.log(preparedData);
          bloodTestViewPage(); // Navigate to the next page
      } catch (error) {
          // Enhanced error handling
          statusCode.current = 400;
          errorMessage.current = 'Lab test already exists.';
          setAlert({status:statusCode,message:errorMessage});
          closePopup();
      }
  };
  
  
    
  

    const navigate = useNavigate();
    const bloodTestViewPage = () => {
        setTimeout(() => {
          navigate('/labtechnician/BloodTest');
        },3000)
    };
  
    return (
      <>
        <div className="D-main">
          <SidemenuComponent userRole={'labTechnician'} />
          {
            <div className="Aappointments">
              <TopBannerComponent />
              <h1>Blood Donation</h1>
              <div className="D-leaderboard" style={{height:"400px"}}>
                    <table>
                      <tr style={{ checkboxAlign: 'center',zIndex:"99"}} className="Ahead">
                        <th>Date</th>
                        <th>Time</th>
                        <th>Donor</th>
                        <th>Blood Type</th>
                        <th>Amount</th>
                        <th>Lab Status</th>
                        <th>Action</th>
                      </tr>
                      {data.length > 0 ? (
                        data.reverse().map((row, index) => (
                          <tr key={row.donationId} style={{ checkboxAlign: 'center' }}>
                          <td>{row.donationCollectionDate}</td>
                          <td>{row.donationStartTime}</td>
                          <td>{row.donorName}</td>
                          <td>{row.userBloodType}</td>
                          <td>{row.donationAmount}</td>
                          <td>{row.labStatus}</td>
                          {row.labStatus == "PENDING" ? (
                            <>
                              <td className="AdlButton">
                                <button onClick={() => handleAddLabTestClick(row.donationId)} style={{ padding: '4px 20px',marginLeft:"10px",backgroundColor:"#2723ea"}}>
                                  ADD LAB TEST
                                </button>
                              </td>
                            </>
                            ) : (
                              <>-</>
                            )
                          }
                          </tr>
                          ))
                        ) : (
                          <tr>
                          <td colSpan="7" className="text-center">Donations Currently Not Available</td>
                      </tr>
                        )}
                  </table>
              </div>
            </div>
          }
          {
                isAddLabTest &&
                <div className="searchDonor" style={{height:"500px", width:"600px",zIndex:"99"}}>
                <div style={{height:"560px"}} className="image"></div>
                  <div className="search" style={{height:"100%",width:"100%"}}>
                  <div className="exit" onClick={() => closePopup()} style={{cursor:"pointer"}}>
                    <img src={close} alt="closeImage" />
                  </div>
                  <p>Lab Test</p>
                  <form id="searchDonor" onSubmit={handleSubmit}>
                    <div className="input" style={{backgroundSize:"0px"}}>
                        <div className="labtech-form-group">
                            <p style={{textAlign:"left"}}>Infection</p>
                            <div className="labtech-checkboxes">
                            <label>
                                
                                    <input
                                        type="checkbox"
                                        name="hiv1"
                                        checked={formData.hiv1}
                                        onChange={handleChange}
                                    />{' '}
                                    HIV 1
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="hiv2"
                                        checked={formData.hiv2}
                                        onChange={handleChange}
                                    />{' '}
                                    HIV 2
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="hepatitisB"
                                        checked={formData.hepatitisB}
                                        onChange={handleChange}
                                    />{' '}
                                    Hepatitis B
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="hepatitisC"
                                        checked={formData.hepatitisC}
                                        onChange={handleChange}
                                    />{' '}
                                    Hepatitis C
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="syphilis"
                                        checked={formData.syphilis}
                                        onChange={handleChange}
                                    />{' '}
                                    Syphilis
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="malaria"
                                        checked={formData.malaria}
                                        onChange={handleChange}
                                    />{' '}
                                    Malaria
                                </label>
                            </div>
                            <div className='hemog-value'> 
                                <label style={{marginTop: '10px', display: 'block',color:"white",fontSize:"14px",fontWeight:"600"}}>Hemoglobin Value (g/dL):</label>
                                <input type="number"
                                name='hemoglobinValue' 
                                value={formData.hemoglobinValue} 
                                onChange={handleChange} 
                                placeholder='Enter Hemoglobin value' 
                                style={{marginTop: '10px', width: '100%'}}/>
                            </div>
                        </div>
                    </div>
                    <div id='hemoglobinGrop' className="labtech-form-group">
                        <p style={{textAlign:"left",marginTop:"20px"}}>Donation Status</p>
                        <div className="labtech-checkboxes" id='hemoglobin'>
                            <label>
                                <input
                                    type="radio"
                                    name="hemoglobin"
                                    value="ACCEPTED"
                                    checked={formData.hemoglobin === 'ACCEPTED'}
                                    onChange={handleChange}
                                    style={{padding:"0px",borderBottom:"2px solid white !important"}}
                                />{' '}
                                ACCEPT
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="hemoglobin"
                                    value="REJECTED"
                                    checked={formData.hemoglobin === 'REJECTED'}
                                    onChange={handleChange}
                                    style={{padding:"0px",borderBottom:"2px solid white !important"}}
                                />{' '}
                                REJECT
                            </label>
                        </div>
                    </div>
                    <button type="submit" className="AsaSubmit">
                      Submit
                    </button>
                  </form>
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
