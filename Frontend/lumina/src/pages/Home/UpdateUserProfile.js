import React, { useCallback, useEffect, useState } from 'react';
import SidemenuComponent from '../../components/SidemenuComponent';
import TopBannerComponent from '../../components/TopBannerComponent';
import axios from 'axios';
import OTPVarification from '../../components/Main/Popups/OTPVarificationComponent';
import { jwtDecode } from 'jwt-decode';
import { useLocation, useNavigate } from 'react-router-dom';
import ChangeProfilePassword from '../../components/Main/Popups/ChangeProfilePassword';

export default function UpdateUserProfile() {
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState(null);
  const [userFirstName, setuserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userNIC, setuserNIC] = useState('');
  const [userEmail, setuserEmail] = useState('');
  const [userMobile, setuserMobile] = useState('');
  const [userDOB, setuserDOB] = useState('');
  const [userAddressLine1, setuserAddressLine1] = useState('');
  const [userAddressLine2, setuserAddressLine2] = useState('');
  const [userAddressCity, setuserAddressCity] = useState('');
  const [userAddressZipCode, setuserAddressZipCode] = useState('');
  const [userGender, setuserGender] = useState('');
  const [userBloodType, setBloodType] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userRole, setUserRole] = useState('');
  const [lastDonationDate, setLastDonationDate] = useState();

  const navigation = useNavigate();
  

  const [maxDate, setMaxDate] = useState('');

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showUpdateUserProfile, setShowUpdateUserProfile] = useState(true);

  const handleSetChangePasswordView = (e) => {
    e.preventDefault();
    setShowUpdateUserProfile(false);
    setShowChangePassword(true);
  };

  const handlePopupCancell = () => {
    setShowChangePassword(false);
    setShowUpdateUserProfile(true);
  };

  const handlePasswordUpdate = (password) => {
    setUserPassword(password);
    alert('To apply the new password you need to update the profile');
    handlePopupCancell(false);
  };

  useEffect(() => {
    const current = new Date().getFullYear();
    const maxYear = current - 17;
    setMaxDate(`${maxYear}-12-31`);
  }, []);

  const handleClosePopups = ()=>{
    setShowChangePassword(!showChangePassword);
    setShowUpdateUserProfile(!showUpdateUserProfile);
  }

  const fetchUserInformations = async (userEmail, token) => {
    

    if (userEmail) {
      try {
        const response = await axios.get(`http://localhost:8080/api/lumina/user/email?userEmail=${userEmail}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        // ;
        const data = response.data;
        setUserId(data.userId || '');
        setLastDonationDate(data.lastDonationDate)
        setuserFirstName(data.userFirstName || '');
        setUserLastName(data.userLastName || '');
        setuserNIC(data.userNIC || '');
        setuserEmail(data.userEmail || '');
        setuserMobile(data.userMobile || '');
        setuserDOB(data.userDOB || '');
        setuserAddressLine1(data.userAddressLine1 || '');
        setuserAddressLine2(data.userAddressLine2 || '');
        setuserAddressCity(data.userAddressCity || '');
        setuserAddressZipCode(data.userAddressZipCode || '');
        setuserGender(data.userGender || '');
        setUserPassword(data.password || '');
        setBloodType(data.userBloodType || '');
        setUserRole(data.userRole || '');
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    const decoded = jwtDecode(token);
    const userEmail = decoded.sub;
    fetchUserInformations(userEmail, token);
  }, []);

  const UpdateUserProfileData = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    setuserAddressLine1(userAddressLine1.trim());

    const profileInfo = {
      userFirstName:userFirstName,
      userLastName:userLastName,
      userNIC:userNIC,
      userEmail:userEmail,
      userMobile:userMobile,
      userDOB:userDOB,
      userAddressLine1:userAddressLine1,
      userAddressLine2:userAddressLine2,
      userAddressCity:userAddressCity,
      userAddressZipCode:userAddressZipCode,
      userGender:userGender,
      userBloodType:userBloodType,
      lastDonationDate:lastDonationDate,
      userRole:userRole,
    };
    
    axios
      .put(`http://localhost:8080/api/lumina/user/${userId}`, profileInfo, { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        alert('Profile updated successfully');
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again later.');
      });
      navigation("/");
  };

  const handleMobileInput = (value) => {
    if (/^\+94\d{0,11}$/.test(value)) {
      setuserMobile(value);
    }
  };
  const label = { color: 'grey', marginBottom: '-10px', fontSize: '13px' };

  return (
    <>
      <div className="D-main">
        <SidemenuComponent userRole={userRole} />
        {
          <div className="Aappointments">
            <TopBannerComponent />
            {showUpdateUserProfile === true && (
              <>
                <div className="searchDonor" style={{ width: 'auto', height: 'auto', marginTop:"-20px" }}>
                <div className="image" style={{marginTop:"80px", height:"690px",opacity:"0"}}></div>
                  <div className="search" style={{ marginTop: '12%', width: '700px', marginBottom:"0px" ,borderRadius:"30px"}}>
                    <p style={{ fontSize: '24px' }}>Update Account</p>
                    <form id="searchDonor"  onSubmit={(e) => UpdateUserProfileData(e)} autoComplete='off'>
                      <div className="User-registration" style={{ display: 'flex' }}>
                        <div className="User-registration-top" style={{ marginRight: '20px', width: '100%' }}>
                          <div style={label}>First Name</div>
                          <input
                            className="form-input"
                            style={{ fontSize: '16px' }}
                            autoComplete="off"
                            placeholder="Chamuditha"
                            type="text"
                            id="E01"
                            key="fName"
                            required
                            name="fName"
                            value={userFirstName}
                            onChange={(e) => setuserFirstName(e.target.value.trim())}
                          />
                          <div style={label}>Last Name</div>
                          <input
                            className="form-input"
                            style={{ fontSize: '16px' }}
                            autoComplete="off"
                            placeholder="Adithya"
                            type="text"
                            id="E02"
                            key="userLastName"
                            required
                            name="userLastName"
                            value={userLastName}
                            onChange={(e) => setUserLastName(e.target.value.trim())}
                          />
                          <div style={label}>National Identity Card</div>
                          <input
                            className="form-input"
                            style={{ fontSize: '16px' }}
                            autoComplete="off"
                            placeholder="1234567890 V/X"
                            readOnly
                            type="text"
                            id="E03"
                            minLength={10}
                            maxLength={12}
                            key="userNIC"
                            required
                            name="userNIC"
                            value={userNIC}
                            onChange={(e) => setuserNIC(e.target.value.trim())}
                          />
                          <div style={label}>Email</div>
                          <input
                            className="form-input"
                            style={{ fontSize: '16px' }}
                            autoComplete="off"
                            placeholder="examplemail@gmail.com"
                            type="email"
                            id="E04"
                            key="email"
                            readOnly
                            required
                            name="email"
                            value={userEmail}
                            onChange={(e) => setuserEmail(e.target.value.trim())}
                          />
                          <div style={label}>Mobile Number</div>
                          <input
                            className="form-input"
                            style={{ fontSize: '16px' }}
                            autoComplete="off"
                            placeholder="Mobile (+94) 123 454 234"
                            type="text"
                            minLength={10}
                            maxLength={13}
                            id="E05"
                            key="mobile"
                            required
                            name="mobile"
                            value={userMobile}
                            onChange={(e) => handleMobileInput(e.target.value.trim())}
                          />
                          <div style={label}>Date Of Birth</div>
                          <input
                            className="form-input"
                            style={{ fontSize: '16px' }}
                            autoComplete="off"
                            placeholder="Date Of Birth"
                            type="date"
                            id="E06"
                            key="dob"
                            required
                            name="dob"
                            value={userDOB}
                            max={maxDate}
                            onChange={(e) => setuserDOB(e.target.value.trim())}
                          />
                          <div style={label}>Gender</div>
                          <select
                            id="E07"
                            style={{
                              backgroundColor: 'transparent',
                              border: 'none',
                              color: '#7c7c7c',
                              borderBottom: '1px solid white',
                              padding: '10px 10px 10px 0px',
                            }}
                            value={userGender}
                            onChange={(e) => setuserGender(e.target.value)}
                          >
                            <option value={''}>Select Gender</option>
                            <option value={'MALE'}>Male</option>
                            <option value={'FEMALE'}>Female</option>
                            <option value={'OTHER'}>Other</option>
                            <option value={'PREFERNOTTOSAY'}>Prefer Not To Say</option>
                          </select>
                        </div>
                        <div className="User-registration-bottom" style={{ marginRight: '20px', width: '100%' }}>
                          <div style={label}>Address Line 1</div>
                          <input
                            className="form-input"
                            style={{ fontSize: '16px' }}
                            autoComplete="off"
                            placeholder="123 Main Street"
                            type="text"
                            id="E07"
                            key="userAddressLine1"
                            name="userAddressLine1"
                            value={userAddressLine1}
                            onChange={(e) => setuserAddressLine1(e.target.value)}
                          />
                          <div style={label}>Address Line 2</div>
                          <input
                            className="form-input"
                            style={{ fontSize: '16px' }}
                            autoComplete="off"
                            placeholder="Apartment 4B"
                            type="text"
                            id="E08"
                            key="userAddressLine2"
                            name="userAddressLine2"
                            value={userAddressLine2}
                            onChange={(e) => setuserAddressLine2(e.target.value.trim())}
                          />
                          <div style={label}>City</div>
                          <input
                            className="form-input"
                            style={{ fontSize: '16px' }}
                            autoComplete="off"
                            placeholder="Colombo, Nuwara, Galle"
                            type="text"
                            id="E09"
                            key="userAddressCity"
                            name="userAddressCity"
                            value={userAddressCity}
                            onChange={(e) => setuserAddressCity(e.target.value.trim())}
                          />
                          <div style={label}>User Address ZipCode</div>
                          <input
                            className="form-input"
                            style={{ fontSize: '16px' }}
                            autoComplete="off"
                            placeholder="user Address ZipCode"
                            type="text"
                            id="E10"
                            key="userAddressZipCode"
                            name="userAddressZipCode"
                            value={userAddressZipCode}
                            onChange={(e) => setuserAddressZipCode(e.target.value.trim())}
                          />
                          <div style={label}>Blood Type</div>
                          <select
                            id="E11"
                            style={{
                              backgroundColor: 'transparent',
                              border: 'none',
                              borderBottom: '1px solid white',
                              padding: '10px 10px 10px 0px',
                            }}
                            value={userBloodType}
                            onChange={(e) => setBloodType(e.target.value)}
                          >
                            <option value="">Select Blood Type</option>
                            <option value="APOSITIVE">A+</option>
                            <option value="ANEGATIVE">A-</option>
                            <option value="BPOSITIVE">B+</option>
                            <option value="BNEGATIVE">B-</option>
                            <option value="OPOSITIVE">AB+</option>
                            <option value="ONEGATIVE">AB-</option>
                            <option value="ABPOSITIVE">O+</option>
                            <option value="ABNEGATIVE">O-</option>
                          </select>
                          <div style={label}>Role</div>
                          <select
                            disabled
                            id="E014"
                            style={{
                              backgroundColor: 'transparent',
                              border: 'none',
                              color: '#7c7c7c',
                              borderBottom: '1px solid white',
                              padding: '10px 10px 10px 0px',
                            }}
                            
                            value={userRole}
                            
                          >
                            <option value={'DONOR'}>Donor</option>
                            <option value={'ADMINISTRATOR'}>Administrator</option>
                            <option value={'PHLEBOTOMIST'}>Phlebotomist</option>
                            <option value={'BLOODBANKMANAGER'}>Blood Bank Manager</option>
                            <option value={'LABTECHNICIAN'}>Lab Technician</option>
                            <option value={'HOSPITAL'}>Hospital</option>
                          </select>
                          <button
                            onClick={(e) => handleSetChangePasswordView(e)}
                            className="AsaSubmit"
                            style={{ margin: '10px 0px 0px 0px ', padding: '4px 10px' }}
                          >
                            CHANGE PASSWORD
                          </button>
                        </div>
                      </div>
                      <div
                        className="buttonsBottom"
                        style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', marginTop: '3%' }}
                      >
                        <button
                          className="AsaSubmit"
                          style={{ marginTop: '10px' }}
                          type="submit"
                        >
                          SUBMIT
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </>
            )}
          </div>
        }
      </div>

      {showChangePassword === true && <ChangeProfilePassword existUserEmail={userEmail} handleClosePopups={handleClosePopups} />}
    </>
  );
}
