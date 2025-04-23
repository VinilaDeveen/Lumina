import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import SidemenuComponent from '../../components/SidemenuComponent'
import TopBannerComponent from '../../components/TopBannerComponent'
import { useNavigate } from 'react-router-dom';
import close from '../../assets/icons/close.svg';
import '../../styles/LabTestAddTest.css'
import ViewBloodTest from '../ViewBloodTest';
import FilledAlerts from '../../components/Main/FilledAlerts';


export default function BloodTestPage() {
    // Alert 
        const [alert, setAlert] = useState({ status: null, message: null });
        const statusCode = useRef("");
        const errorMessage = useRef("");

    const token = localStorage.getItem('accessToken');
    // BLOOD TEST//
    const [data, setData] = useState([]);
    const [labTestData, setLabTestData] = useState({
        hiv1: false,
        hiv2: false,
        hepatitisB: false,
        hepatitisC: false,
        syphilis: false,
        malaria: false,
        hemoglobin: 0,
        labTestResult: '',
    });
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [showViewPopup, setShowViewPopup] = useState(false);
    const [selectedDonationId, setSelectedDonationId] = useState(null);

    const [isBloodTest,setBloodTest] = useState(true);
    const [isAddLabTest,setAddLabTest] = useState(false);
    const [isViewLabTest,setViewLabTest] = useState(false);
    const [isEditLabTest,setEditLabTest] = useState(false);

    const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

    const fetchDonations = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/lumina/labTest', config);
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

    const loadLabTestDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/lumina/labTest/${selectedDonationId}`, config)
            setLabTestData(response.data);
            console.log("Lab Test Id :", selectedDonationId);
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
    }

    useEffect(() => {
        fetchDonations();
        if (selectedDonationId) {
            loadLabTestDetails();
        }
    }, [selectedDonationId]);

    const handleEditLabTestClick = (labTestId) => {
        setSelectedDonationId(labTestId); // Set the donationId when editing
        console.log("LLLLL  ",selectedDonationId)
        loadLabTestDetails();
        setAddLabTest(false);
        setViewLabTest(false);
        setEditLabTest(true);
    };

    const handleViewLabTestClick = (labTestId) => {
        setAddLabTest(false);
        setViewLabTest(true);
        setEditLabTest(false);
        setSelectedDonationId(labTestId);
    };

    const closePopup = () => {
        setAddLabTest(false);
        setEditLabTest(false);
        setViewLabTest(false);
    };
    
    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setLabTestData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate the form data
        const hasInfection = labTestData.hiv1 || labTestData.hiv2 || labTestData.hepatitisB || labTestData.hepatitisC || labTestData.syphilis || labTestData.malaria;
        const hemoglobinValue = parseFloat(labTestData.hemoglobin);
    
        if (hasInfection || hemoglobinValue < 12.5) {
            // Set alert and prevent submission
            statusCode.current = 400;
            errorMessage.current = 'Lab test cannot be accepted due to infection or low hemoglobin value.';
            setAlert({status:statusCode,message:errorMessage});
            return; // Exit the function early
        }

        const preparedData = {
            hemoglobin: parseFloat(labTestData.hemoglobin),
            labTestResult: labTestData.labTestResult,
            hepatitisB: labTestData.hepatitisB,
            hepatitisC: labTestData.hepatitisC,
            malaria: labTestData.malaria,
            syphilis: labTestData.syphilis,
            hiv1: labTestData.hiv1,
            hiv2: labTestData.hiv2,
        };

        try {
            const response = await axios.put(`http://localhost:8080/api/lumina/labTest/${selectedDonationId}`, preparedData , config);
            console.log('Lab Test added successfully:', response.data);
            closePopup();
            statusCode.current = 200;
            errorMessage.current = 'Lab test successfully updated';
            setAlert({status:statusCode,message:errorMessage});
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


    const navigate = useNavigate();


    const bloodTestViewPage = () => {
        navigate('/lTechBloodTest');
    };

  return (
    <>
    <div className='D-main'>
        <SidemenuComponent userRole={'labTechnician'}/>
        {
            <div className='Aappointments'>
                <TopBannerComponent/>
                    <>
                <h1>Blood Test</h1>
                    
                <div className="D-leaderboard" style={{marginTop: '1%', height: '58vh'}}>
                  <table>
                    <tr style={{ textAlign: 'center',zIndex:"99"}} className="Ahead">
                    <th>Donation ID</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Donation Status</th>
                    <th>Action</th>
                    </tr>
                    {data.length > 0 ? (
                      data.reverse().map((row) => (
                        <tr key={row.labTestId} style={{ textAlign: 'center' }}>
                            <td>{row.userId}</td>
                            <td>{row.labTestDate}</td>
                            <td>{row.labTestTime}</td>
                            <td>{row.labTestResult}</td>
                          <td className="AdlButton">
                            <button onClick={() => handleViewLabTestClick(row.labTestId)} style={{ padding: '4px 20px',marginLeft:"10px",backgroundColor:"#2723ea"}}>
                              VIEW
                            </button>
                            <button onClick={() => handleEditLabTestClick(row.labTestId)} style={{ padding: '4px 20px',marginLeft:"10px",backgroundColor:"#ff7b00"}}>
                              EDIT
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                    <tr>
                        <td colSpan="5" className="text-center">No Data Available</td>
                    </tr>
                    )}
                  </table>
                </div>
              </>
                {isEditLabTest && 
                <div className="searchDonor" style={{height:"500px", width:"600px",zIndex:"999"}}>
              <div style={{height:"560px"}} className="image"></div>
                <div className="search" style={{height:"100%",width:"100%"}}>
                  <div className="exit" onClick={() => (setEditLabTest(false))} style={{cursor:"pointer"}}>
                    <img src={close} alt="closeImage" />
                  </div>
                  <p>Update Lab Test</p>
                  <form id="searchDonor" onSubmit={handleSubmit}>
                    <div className="input"  style={{backgroundSize:"0px"}}>
                    <div className="labtech-form-group">
                        <p style={{textAlign:"left"}}>Infection</p>
                        <div className="labtech-checkboxes">
                        <label>
                                <input
                                    type="checkbox"
                                    name="hiv1"
                                    checked={labTestData.hiv1}
                                    onChange={handleChange}
                                />{' '}
                                <span>HIV</span>
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="hiv2"
                                    checked={labTestData.hiv2}
                                    onChange={handleChange}
                                />{' '}
                                HIV 2
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="hepatitisB"
                                    checked={labTestData.hepatitisB}
                                    onChange={handleChange}
                                />{' '}
                                Hepatitis B
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="hepatitisC"
                                    checked={labTestData.hepatitisC}
                                    onChange={handleChange}
                                />{' '}
                                Hepatitis C
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="syphilis"
                                    checked={labTestData.syphilis}
                                    onChange={handleChange}
                                />{' '}
                                Syphilis
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="malaria"
                                    checked={labTestData.malaria}
                                    onChange={handleChange}
                                />{' '}
                                Malaria
                            </label>
                            <div className='hemog-value'> 
                                <label style={{marginTop: '10px', display: 'block'}}>Hemoglobin Value (g/dL):</label>
                                <input type="number" 
                                name='hemoglobin' 
                                value={labTestData.hemoglobin} 
                                onChange={handleChange} 
                                placeholder='Enter Hemoglobin value' 
                                style={{marginTop: '10px', width: '100%'}}/>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div id='hemoglobinGrop' className="labtech-form-group">
                        <p style={{textAlign:"left",marginTop:"20px"}}>Donation Status</p>
                        <div className="labtech-checkboxes" id='hemoglobin'>
                            <label>
                                <input
                                    type="radio"
                                    name="labTestResult"
                                    value="ACCEPTED"
                                    checked={labTestData.labTestResult === 'ACCEPTED'}
                                    onChange={handleChange}
                                />{' '}
                                Accept
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="labTestResult"
                                    value="REJECTED"
                                    checked={labTestData.labTestResult === 'REJECTED'}
                                    onChange={handleChange}
                                />{' '}
                                Reject
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
            {isViewLabTest && <ViewBloodTest closePopup={closePopup} donationId={selectedDonationId}/> }
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
