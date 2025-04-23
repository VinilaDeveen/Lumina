import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/TableStyles.css';
import close from '../../assets/icons/close.svg';
import SidemenuComponent from '../SidemenuComponent';
import TopBannerComponent from '../TopBannerComponent';

export default function HospitalBloodRequests() {
    // State for blood requests
    const [data, setData] = useState([]);
    const [selectedRequestId, setSelectedRequestId] = useState(null);

    const [isBloodRequest, setIsBloodRequest] = useState(true);
    const [isAddBloodRequest, setIsAddBloodRequest] = useState(false);

    const [formData, setFormData] = useState({
        bloodType: '',
        amount: '',
    });

    const dummyData = [
        {
            BloodType: "A+",
            amount: "500 ml",
            status: 'Pending',
            Action: 'Accept',
        },
    ]

    useEffect(() => {
        setData(dummyData);
        const fetchRequests = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/lumina/bloodRequest');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching donation data:', error);
            }
        };

        fetchRequests();
    }, []);

    const handleAddBloodRequestClick = () => {
        setIsBloodRequest(false);
        setIsAddBloodRequest(true);
    };

    const closePopup = () => {
        setIsBloodRequest(true);
        setIsAddBloodRequest(false);
        setSelectedRequestId(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const preparedData = {
            bloodType: formData.bloodType,
            amount: formData.amount,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            request: {
                id: selectedRequestId,
            },
        };

        try {
            const response = await axios.post('http://localhost:8080/api/v1', preparedData);
            console.log('Blood request added successfully:', response.data);
            
        } catch (error) {
            console.error('Error submitting blood request:', error);
        }
    };

    return (
        <div className='D-main'>
            <SidemenuComponent userRole={'hospital'} />
            <div className='Aappointments'>
                <TopBannerComponent />
                {isBloodRequest ? (
                    <>
                        <h1>Blood Requests</h1>
                        {/* <div style={{display:"flex",justifyContent:"flex-end"}}>
                            <button onClick={()=>handleAddBloodRequestClick} className='SuperB'>
                                Add Blood Request
                            </button>
                        </div> */}
                        
                        <div className="D-leaderboard" style={{height:"320px",marginTop:"1%"}}>
                            <table>
                            <tr style={{ checkboxAlign: 'center' }} >
                            <th>Date</th>
                                <th>Time</th>
                                <th>Blood Type</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                            {data.length > 0 ? (
                                data.map((row, index) => (
                                <tr key={row.id || index}>
                                <td>{row.requestDate}</td>
                                    <td>{row.requestTime}</td>
                                    <td>{row.bloodType}</td>
                                    <td>{row.requestAmount}</td>
                                    <td>{row.bloodRequestStatus}</td>
                                    <td className="AdlButton">
                                        <button
                                            onClick={() => console.log(`Accepted: ${row.RequestId}`)}
                                            style={{ padding: '4px 20px', marginLeft: '10px' ,backgroundColor:"rgb(73 231 89)"}}
                                        >
                                            ACCEPT
                                        </button>
                                        <button
                                            onClick={() => console.log(`Rejected: ${row.RequestId}`)}
                                            style={{ padding: '4px 20px', marginLeft: '10px' }}
                                        >
                                            REJECT
                                        </button>
                                    </td>
                                </tr>
                                ))):(
                                <p>Blood Requests are currently not available</p>
                                )}
                        </table>
                        </div>
                    </>
                    
                    
                ) : (
                    isAddBloodRequest && (
                        <div className="searchDonor" style={{ height: "500px" }}>
                            <div className="search">
                                <div className="exit" onClick={closePopup}>
                                    <img src={close} alt="Close" />
                                </div>
                                <p>Request Blood</p>
                                <form id="searchDonor" onSubmit={handleSubmit}>
                                    <div className="labtech-form-group">
                                        <p style={{ textAlign: "left" }}>Blood Type</p>
                                        <select
                                            name='bloodType'
                                            value={formData.bloodType}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value=''>Select Blood Type</option>
                                            <option value='A+'>A+</option>
                                            <option value='A-'>A-</option>
                                            <option value='B+'>B+</option>
                                            <option value='B-'>B-</option>
                                            <option value='O+'>O+</option>
                                            <option value='O-'>O-</option>
                                            <option value='AB+'>AB+</option>
                                            <option value='AB-'>AB-</option>
                                        </select>
                                    </div>
                                    <div className="labtech-form-group">
                                        <label>Amount (units)</label>
                                        <input
                                            type='number'
                                            name='amount'
                                            value={formData.amount}
                                            onChange={handleChange}
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
                    )
                )}
            </div>
        </div>
    );
}
