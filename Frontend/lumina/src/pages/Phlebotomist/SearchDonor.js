import axios from 'axios';
import close from '../../assets/icons/close.svg';
import React, { useState } from 'react';
import FilledAlerts from '../../components/Main/FilledAlerts';

export default function SearchDonor({ handleSearchVisibility, handleSearchResult }) {
  // Alert 
          const [alert, setAlert] = useState({ status: null, message: null });
          const statusCode = useRef("");
          const errorMessage = useRef("");

  const token = localStorage.getItem('accessToken');
  const [search, setSearch] = useState('');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  // Handle Search Donation
  const SearchDonor = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8080/api/lumina/user/universal-search?searchRequest=${search}`, config);
      if (response.data.length > 0) {
        handleSearchResult(response.data[0]);
        console.log(response.data[0].userId);
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

  return (
    <>
      <div className="searchDonor">
        <div className="image"></div>
        <div className="search">
          <div className="exit" onClick={() => handleSearchVisibility()}>
            <img src={close} alt="closeImage" />
          </div>
          <p>Search Donor</p>
          <form id="searchDonor">
            <div className="input">
              <input
                autoComplete="off"
                placeholder="Donor ID / NIC / Username"
                type="text"
                key="search"
                required
                name="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button onClick={(e) => SearchDonor(e)} className="AsaSubmit">
              SEARCH
            </button>
          </form>
        </div>
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
