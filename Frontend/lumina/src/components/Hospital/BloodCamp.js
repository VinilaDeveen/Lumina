import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/Hospital/BloodCamp.css';
import SidemenuComponent from '../SidemenuComponent'
import TopBannerComponent from '../TopBannerComponent'

export default function BloodCamp() {
    const [data, setData] = useState([]);

  const BASE_URL = 'http://localhost:5000/bloodDonations'; 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(BASE_URL);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching blood camps:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddClick = async (id) => {
    try {
      await axios.post(`${BASE_URL}/${id}`, {status:"Accepted"});
      alert(`Blood Camp accepted.`);
     
      const response = await axios.get(BASE_URL);
      setData(response.data);
    } catch (error) {
      console.error('Error accepting blood camp:', error);
    }
  };


  const handleDisposeClick = async (id) => {
    try {
      await axios.post(`${BASE_URL}/${id}/reject`);
      alert(`Blood Camp rejected.`);
     
      const response = await axios.get(BASE_URL);
      setData(response.data);
    } catch (error) {
      console.error('Error rejecting blood camp:', error);
    }
  };
  return (
    <>
      <div className="D-main">
        <SidemenuComponent userRole={'hospital'} />
        {
          <div className="Aappointments">
            <TopBannerComponent />
            <h1>Blood Donation</h1>
            <div className="D-leaderboard" style={{height:"430px"}}>
                  <table>
                    <tr style={{ checkboxAlign: 'center' }} className="Ahead">
                    <th>Date</th>
                    <th>Time</th>
                    <th>Location</th>
                    <th>Expected Donation</th>
                    <th>Action</th>
                </tr>
                {data.length > 0 ? (
                      data.map((row, index) => (
                        <tr key={row.id} style={{ checkboxAlign: 'center' }}>
                    <td>{row.date}</td>
                    <td>{row.time}</td>
                    <td>{row.location}</td>
                    <td>{row.expectedDonation}</td>
                    <td className='AdlButton'>
                        <button style={{backgroundColor:"#4CAF50"}}
                        className="btn green-btn"
                        onClick={() => handleAddClick(row.id)}
                        >
                        Accept
                        </button>
                        <button
                        style={{backgroundColor:"#f44336"}}
                        className="btn red-btn"
                        onClick={() => handleDisposeClick(row.id)}
                        >
                        Reject
                        </button>
                    </td>
                    </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">Donations Currently Not Available</td>
                  </tr>
                  )}
            </table>
            </div>
          </div>
        }
      </div>
    </>
  )
}
