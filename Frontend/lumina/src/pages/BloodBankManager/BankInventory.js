import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import '../../styles/BBM/BankInventory.css'; 
import TopBannerComponent from '../../components/TopBannerComponent';
import SidemenuComponent from '../../components/SidemenuComponent';
import FilledAlerts from '../../components/Main/FilledAlerts';

const BankInventory = () => {
  // Alert 
      const [alert, setAlert] = useState({ status: null, message: null });
      const statusCode = useRef("");
      const errorMessage = useRef("");

  const token = localStorage.getItem('accessToken');
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const fetchBloodInventory = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/lumina/bloodinventory', config) /* DonorAppointmentsService.findAppoinments() */;
      setInventory(response.data);
      console.log('Succesfully Fetched');
      setLoading(false);
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
    fetchBloodInventory();
    }, []);

  return (
    <>
      <div className="D-main">
        <SidemenuComponent userRole={'bbm'} />
        {
          <div className="Aappointments">
            <TopBannerComponent />
            <div className='bankinventory-container'>
              <h1>Bank Inventory</h1>

              <div className="main-content">
                {loading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <tr>
                      <td colSpan="5" className="text-center">No Data Available</td>
                  </tr>
                ) : (
                  <section className="bank-inventory" style={{width:"35%"}}>  
                    <table style={{width:"100%"}}>
                      <thead>
                        <tr>
                          <th style={{backgroundColor:"rgb(0 0 0 / 0%)"}}>Blood Type</th>
                          <th style={{backgroundColor:"rgb(0 0 0 / 0%)",marginRight:"10px"}}>Quantity</th>
                        </tr>
                      </thead>
                      <tbody style={{color:"#a3a3a3",fontSize:"13px"}}>
                        {inventory.map((item, index) => (
                          <tr key={index}>
                            <td style={{textAlign:"center",padding:"10px"}}>{item.bloodType}</td>
                            <td className='borderBottom'>{item.amount+" mL"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </section>
                )}
              </div>
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

export default BankInventory;
