import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import close from '../../assets/icons/close.svg';
import SignUp from '../Home/SignUp';
import FilledAlerts from '../../components/Main/FilledAlerts';

export default function PhSearchDonor({ hadleClosePopup, bloodCamp }) {
  // Alert 
          const [alert, setAlert] = useState({ status: null, message: null });
          const statusCode = useRef("");
          const errorMessage = useRef("");

  const token = localStorage.getItem('accessToken');
  const [searchInputValue, setSearchInputValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const [enableAddEmployee, setEnableAddEmployee] = useState(false);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const fetchFrequenceSearchOnChangeOfInput = async (e, search) => {
    e.preventDefault();
    setSearchInputValue(search);
    try {
      const response = await axios.get(`http://localhost:8080/api/lumina/user/universal-search?searchRequest=${search}`, config)
      setSearchResult(response.data);
    } catch (error) {
      console.log('fetching error');
    }
  };

  // Search PROCEED BUTTON
  const handleProceed = async (e, userFirstName) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:8080/api/lumina/user/universal-search?searchRequest=${userFirstName}`, config);
      const data = response.data;
      console.log(data[0].userId);
  
      if (data.length > 0) {
        // Pass the first donor's ID or any identifier needed for navigation.
        EligibilityTest(data[0].userId);
      } else {
        statusCode.current = 400;
        errorMessage.current = "Donor does not exist";
        setAlert({status:statusCode,message:errorMessage});
      }
    } catch (error) {
      if(error.response){
        statusCode.current = error.response.status;
        errorMessage.current = error.response.data;
      }else{
        statusCode.current = 400;
        errorMessage.current = "Donor does not exist.";
      }
      setAlert({status:statusCode,message:errorMessage});
    }
  };

  const navigate = useNavigate();

  const EligibilityTest = (userId) => {
    navigate(`/phlebotomist/eligibilityTestOnBloodCamp/${bloodCamp}/${userId}`);
  };

  const closePopup = () => {
    setEnableAddEmployee(false);
  };

  return (
    <>
      <div className="searchDonor" style={{ width: 'auto', height: 'auto', marginTop: '1%' ,zIndex:"999"}}>
        <div className="search" style={{ margin: 'unset', borderRadius: '30px', border: 'none' }}>
          {hadleClosePopup === undefined ? (
            <button
              style={{
                position: 'absolute',
                right: '20px',
                top: '20px',
                border: 'none',
                borderRadius: '30px',
                padding: '5px 15px',
              }}
              onClick={() => setEnableAddEmployee(true)}
            >
              {' '}
              + Add Donors
            </button>
          ) : (
            <div className="exit" onClick={() => hadleClosePopup()} style={{ cursor: 'pointer' }}>
              <img src={close} alt="closeImage" />
            </div>
          )}

          <p style={{ fontSize: '34px', marginTop: '20px' }}>Search Donor</p>
          <form
            id="searchDonor"
          >
            <div className="User-registration" style={{ display: 'flex' }}>
              <div
                className="User-registration-top"
                style={
                  searchResult.length > 0
                    ? { marginRight: '20px', width: '500px', display: 'flex', flexDirection: 'column', height: '200px' }
                    : { width: '500px' }
                }
              >
                <input
                  className="form-input"
                  style={{ fontSize: '16px' }}
                  autoComplete="off"
                  placeholder="Donor ID / NIC / Username"
                  type="text"
                  key="fName"
                  required
                  name="fName"
                  value={searchInputValue}
                  onChange={(e) => fetchFrequenceSearchOnChangeOfInput(e, e.target.value)}
                />
                <div className="searchResults">
                  {searchResult.map((item, index) => (
                    <p
                      style={{ cursor: 'pointer', fontSize: '16px' }}
                      onClick={() => setSearchInputValue(item.username)}
                    >
                      {item.userFirstName}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="AsaSubmit"
              onClick={(e) => handleProceed(e, searchInputValue)}
            >
              PROCCEED
            </button>

          </form>
        </div>
      </div>
      {enableAddEmployee && (
        <>
          <SignUp closePopup={closePopup} role={'donor'} />
        </>
      )}

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
