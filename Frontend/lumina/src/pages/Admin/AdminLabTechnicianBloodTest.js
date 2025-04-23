import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import SidemenuComponent from '../../components/SidemenuComponent';
import TopBannerComponent from '../../components/TopBannerComponent';
import ViewBloodTest from '../ViewBloodTest';
import FilledAlerts from '../../components/Main/FilledAlerts';

export default function AdminLabTechnicianBloodTest() {
    // Alert 
      const [alert, setAlert] = useState({ status: null, message: null });
      const statusCode = useRef("");
      const errorMessage = useRef("");
    const token = localStorage.getItem('accessToken');
    const [data, setData] = useState([]);
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
          statusCode.current = 400;
          errorMessage.current = "Failed to connect to the server.";
        }
        setAlert({status:statusCode,message:errorMessage});
      }
    };

    useEffect(() => {
      fetchDonations();
    }, []);

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

    // ADD BLOOD TEST//
    const [formData, setFormData] = useState({
      hiv1: false,
      hiv2: false,
      hepatitisB: false,
      hepatitisC: false,
      syphilis: false,
      malaria: false,
      hemoglobin: '', // Accept or Reject as string
      hemoglobinValue: '',
    });
    

    const handleChange = (e) => {
      const { name, type, checked, value } = e.target;
      setFormData((prevData) => ({
          ...prevData,
          [name]: type === 'checkbox' ? checked : value,
      }));
    };

  return (
    <>
    <div className='D-main'>
        <SidemenuComponent userRole={'admin'}/>
        {
            <div className='Aappointments'>
                <TopBannerComponent/>
                    <>
                <h1>Blood Test</h1>
                    
                <div className="D-leaderboard" style={{marginTop: '1%', height: '58vh'}}>
                  <table>
                    <tr style={{ textAlign: 'center' ,zIndex:"99"}} className="Ahead">
                    <th>Date</th>
                    <th>Time</th>
                    <th>Donor Status</th>
                    <th>Action</th>
                    </tr>
                    {data.length > 0 ? (
                      data.reverse().map((row) => (
                        <tr key={row.labTestId} style={{ textAlign: 'center' }}>
                          <td>{row.labTestDate}</td>
                            <td>{row.labTestTime.substring(0,5)}</td>
                            <td>{row.labTestResult}</td>
                          <td className="AdlButton">
                            <button onClick={() => handleViewLabTestClick(row.labTestId)} style={{ padding: '4px 20px',marginLeft:"10px",backgroundColor:"#2723ea"}}>
                              VIEW
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                    <tr>
                        <td colSpan="4" className="text-center">No Data Available</td>
                    </tr>
                    )}
                  </table>
                </div>
              </>
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