import axios from 'axios';
import React, { useEffect, useState } from 'react';
import close from '../assets/icons/close.svg';

export default function ViewBloodTest({ closePopup, donationId }) {
    const token = localStorage.getItem('accessToken');
    const [viewformData, setviewFormData] = useState({
        hiv1: false,
        hiv2: false,
        hepatitisB: false,
        hepatitisC: false,
        syphilis: false,
        malaria: false,
        hemoglobin: 0,
        labTestResult: ''
    });
    
    const [error, setError] = useState(null);

    const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
    }
    
      useEffect(() => {
        const fetchLabTestDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/lumina/labTest/${donationId}`, config);
                console.log(donationId);
                setviewFormData({
                    hiv1: response.data.hiv1 || false,
                    hiv2: response.data.hiv2 || false,
                    hepatitisB: response.data.hepatitisB || false,
                    hepatitisC: response.data.hepatitisC || false,
                    syphilis: response.data.syphilis || false,
                    malaria: response.data.malaria || false,
                    hemoglobin: response.data.hemoglobin,
                    labTestResult: response.data.labTestResult
                });

            } catch (err) {
                setError(err.message);
            }
        };
    
        if (donationId) {
            fetchLabTestDetails();
        }
    }, [donationId]);
    
    if (error) {
      return <div>Error: {error}</div>;
    }

  return (
    <div className="searchDonor" style={{height:"500px", width:"600px",zIndex:"999"}}>
      <div style={{height:"560px"}} className="image"></div>
        <div className="search" style={{height:"100%",width:"100%"}}>
        <div className="exit" style={{cursor:"pointer"}} onClick={() => closePopup() }>
          <img src={close} alt="closeImage" />
        </div>
        <p>Lab Test</p>
        <form id="searchDonor" >
          <div className="input">
          <div className="labtech-form-group">
              <p style={{textAlign:"left"}}>Infection</p>
              <div className="labtech-checkboxes">
              <label>
                  
                <input
                    type="checkbox"
                    name="hiv1"
                    checked={viewformData.hiv1}
                    readOnly
                />{' '}
                    HIV 1
                </label>
                  <label>
                      <input
                          type="checkbox"
                          name="hiv2"
                          checked={viewformData.hiv2}
                          readOnly
                      />{' '}
                      HIV 2
                  </label>
                  <label>
                      <input
                          type="checkbox"
                          name="hepatitisB"
                          checked={viewformData.hepatitisB}
                          readOnly
                      />{' '}
                      Hepatitis B
                  </label>
                  <label>
                      <input
                          type="checkbox"
                          name="hepatitisC"
                          checked={viewformData.hepatitisC}
                          readOnly
                      />{' '}
                      Hepatitis C
                  </label>
                  <label>
                      <input
                          type="checkbox"
                          name="syphilis"
                          checked={viewformData.syphilis}
                          readOnly
                      />{' '}
                      Syphilis
                  </label>
                  <label>
                      <input
                          type="checkbox"
                          name="malaria"
                          checked={viewformData.malaria}
                          readOnly
                      />{' '}
                      Malaria
            </label>
                <div className='hemog-value'> 
                    <label style={{marginTop: '10px', display: 'block'}}>Hemoglobin Value (g/dL): <span style={{marginTop:"20px", borderBottom:"2px solid white"}}>{"   "}{viewformData.hemoglobin} dl</span></label>
                      
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
                          name="ACCEPTED"
                          value="ACCEPTED"
                          checked={viewformData.labTestResult === 'ACCEPTED'}
                          readOnly
                      />{' '}
                      Accept
                  </label>
                  <label>
                      <input
                          type="radio"
                          name="REJECTED"
                          value="REJECTED"
                          checked={viewformData.labTestResult === 'REJECTED'}
                          readOnly
                      />{' '}
                      REJECT
                  </label>
              </div>
          </div>
        </form>
      </div>
    </div>
  )
}
