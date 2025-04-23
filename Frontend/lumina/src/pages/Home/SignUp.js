import React, { useEffect, useRef, useState } from 'react';
import close from '../../assets/icons/close.svg';
import '../../styles/Main/SignUp.css';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import FilledAlerts from '../../components/Main/FilledAlerts';
import LoaderAnimation from '../../components/LoaderAnimation';

export default function SignUp({ closePopup, role,DisplaySignIn }) {
  
  const isCreateEmployee = useLocation().pathname === '/administrator/Employee';
  const token = localStorage.getItem('accessToken');
  const [loader,setLoader] = useState(false);
  const [weakPassword,setWeakPassword] = useState(false);
  const [PasswordsDoesNotMatch,setPasswordsDoesNotMatch] = useState(false);

  const [userFirstName,setuserFirstName] = useState('');
  const [userLastName,setUserLastName] = useState('');
  const [userNIC,setuserNIC] = useState('');
  const [userEmail,setuserEmail] = useState('');
  const [userMobile,setuserMobile] = useState('');
  const [userDOB,setuserDOB] = useState('');
  const [userAddressLine1,setuserAddressLine1] = useState('');
  const [userAddressLine2,setuserAddressLine2] = useState('');
  const [userAddressCity,setuserAddressCity] = useState('');
  const [userAddressZipCode,setuserAddressZipCode] = useState('');
  const [userGender,setuserGender] = useState('');
  const [userBloodType,setBloodType] = useState('');
  const [userPassword,setUserPassword] = useState('');
  const [userRole,setUserRole] = useState('DONOR');
  const [confirmPassword,setConfirmPassword] = useState('');

  

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  // Alert 
  const [alert, setAlert] = useState({ status: null, message: null });
  const statusCode = useRef("");
  const errorMessage = useRef("");

  const [haveDonatedBefore,setHaveDonatedBefore] = useState(false);

  // Donor Last Donation Date Attribute
  const [userLastDonationDate,setUserLastDonationDate] = useState('');

  const [maxDate, setMaxDate] = useState('');

    useEffect(()=>{
      const current = new Date().getFullYear();
      const maxYear = current - 17;
      setMaxDate(`${maxYear}-12-31`);
  },[])

  const profileInfo = {
    userFirstName: userFirstName,
    userLastName: userLastName,
    userNIC: userNIC,
    userEmail: userEmail,
    userMobile: userMobile,
    userDOB: userDOB,
    userAddressLine1: userAddressLine1,
    userAddressLine2: userAddressLine2,
    userAddressCity: userAddressCity,
    userAddressZipCode: userAddressZipCode,
    userGender: userGender,
    userBloodType: userBloodType,
    userPassword: userPassword,
    lastDonationDate: userLastDonationDate,
    userRole:userRole,
  };

  const handleEmployeeRegistration = async()=>{
    const response = await axios.post("http://localhost:8080/api/lumina/auth/register",profileInfo, config );
    console.log("THis is the reg response",response)
    statusCode.current = 200;
    errorMessage.current = "Successfully Registered";
    setAlert({status:statusCode,message:errorMessage});
    setTimeout(() => {
      closePopup();
    },3000)
  }
  const handleDonorRegistration = async()=>{
    const response = await axios.post("http://localhost:8080/api/lumina/auth/register",profileInfo );
    console.log("THis is the reg response",response)
    statusCode.current = 200;
    errorMessage.current = "Successfully Registered";
    setAlert({status:statusCode,message:errorMessage});
    setTimeout(() => {
      closePopup();
      DisplaySignIn();
    },3000)
  }

const SignUpProcess = async(e)=>{
  setLoader(true);
    e.preventDefault();
    if (!userFirstName || !userLastName || !userEmail || !userPassword || !confirmPassword) {
      alert("Please fill in all required fields.");
      return;
    }
    
    // Validate passwords
    if (userPassword.length <= 7) {
      setWeakPassword(true);
      return;
    }

    if (userPassword !== confirmPassword) {
      setPasswordsDoesNotMatch(true);
      return;
    }

    try{
      {token?
        await handleEmployeeRegistration()
        :
        await handleDonorRegistration();
      }
    }catch(error){
      if(error.response){
        statusCode.current = error.response.status;
        errorMessage.current = error.response.data;
      }else{
        statusCode.current = 100;
        errorMessage.current = "Failed to connect to the server.";
      }
      
      setAlert({status:statusCode,message:errorMessage});
    }
    setLoader(false);
}

const checkPasswordCorrection = (e)=>{
    setWeakPassword(userPassword.length<=7);
    if(confirmPassword.length>0){
        setPasswordsDoesNotMatch(confirmPassword!=userPassword);
    }
    
}

useEffect(()=>{
    checkPasswordCorrection();
},[userPassword,confirmPassword])

  const label = { color: '#c3c3c3', marginBottom: '-10px', fontSize: '13px' };

  return (
    <>
      <div className="searchDonor" style={{ width: 'auto', height: 'auto', marginTop: '4vh' ,zIndex:"999"}}>
        <div className="search" style={{ margin: 'unset' }}>
          <div className="exit" onClick={() => closePopup()} style={{cursor:"pointer"}}>
            <img src={close} alt="closeImage" />
          </div>
          <p style={{ fontSize: '24px' }}>Create Account</p>
          <form id="searchDonor" onSubmit={(e) => SignUpProcess(e)} autoComplete="new-password">
            <div className="User-registration" style={{ display: 'flex' }}>
              <div className="User-registration-top" style={{ marginRight: '20px', width: '700px' }}>
                <div style={label}>First Name</div>
                <input
                  className="form-input"
                  style={{ fontSize: '16px' }}
                  autoComplete="new-password"
                  placeholder="First Name"
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
                  autoComplete="new-password"
                  placeholder="Last Name"
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
                  autoComplete="new-password"
                  placeholder="NIC"
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
                  autoComplete="new-password"
                  placeholder="Email"
                  type="email"
                  id="E04"
                  key="email"
                  required
                  name="email"
                  value={userEmail}
                  onChange={(e) => setuserEmail(e.target.value.trim())}
                />
                <div style={label}>Mobile Number</div>
                <input
                  className="form-input"
                  style={{ fontSize: '16px' }}
                  autoComplete="new-password"
                  placeholder="Mobile"
                  type="text"
                  minLength={10}
                  id="E05"
                  key="mobile"
                  required
                  name="mobile"
                  value={userMobile}
                  onChange={(e) => setuserMobile(e.target.value.trim())}
                />
                <div style={label}>Date Of Birth</div>
                <input
                  className="form-input"
                  style={{ fontSize: '16px' }}
                  autoComplete="new-password"
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
                <select id='E13' style={{backgroundColor:"transparent",border:"none",color:"#7c7c7c", borderBottom:"1px solid white",padding: "10px 10px 10px 0px"}} value={userGender} onChange={(e)=>setuserGender(e.target.value.trim())}>
                  <option value={""}>Select Gender</option>
                  <option value={"MALE"}>Male</option>
                  <option value={"FEMALE"}>Female</option>
                  <option value={"OTHER"}>Other</option>
                  <option value={"PREFERNOTTOSAY"}>Prefer Not To Say</option>
                </select>
                {isCreateEmployee && 
                  <><div style={label}>Role</div>
                  <select id='E014' style={{backgroundColor:"transparent",border:"none",color:"#7c7c7c", borderBottom:"1px solid white",padding: "10px 10px 10px 0px"}} value={userRole} onChange={(e)=>setUserRole(e.target.value.trim())}>
                    <option value={""}>Select Role</option>
                    <option value={"DONOR"}>Donor</option>
                    <option value={"ADMINISTRATOR"}>Administrator</option>
                    <option value={"PHLEBOTOMIST"}>Phlebotomist</option>
                    <option value={"BLOODBANKMANAGER"}>Blood Bank Manager</option>
                    <option value={"LABTECHNICIAN"}>Lab Technician</option>
                    <option value={"HOSPITAL"}>Hospital</option>
                    </select>
                  </>
                }
                
              </div>
              <div className="User-registration-bottom" style={{ width: '100%' }}>
                <div style={label}>User Address Line 1</div>
                <input
                  className="form-input"
                  style={{ fontSize: '16px' }}
                  autoComplete="new-password"
                  placeholder="User Address Line 1"
                  type="text"
                  id="E07"
                  key="userAddressLine1"
                  name="userAddressLine1"
                  value={userAddressLine1}
                  onChange={(e) => setuserAddressLine1(e.target.value.trim())}
                />
                <div style={label}>User Address Line 2</div>
                <input
                  className="form-input"
                  style={{ fontSize: '16px' }}
                  autoComplete="new-password"
                  placeholder="User Address Line 2"
                  type="text"
                  id="E08"
                  key="userAddressLine2"
                  name="userAddressLine2"
                  value={userAddressLine2}
                  onChange={(e) => setuserAddressLine2(e.target.value.trim())}
                />
                <div style={label}>User Address City</div>
                <input
                  className="form-input"
                  style={{ fontSize: '16px' }}
                  autoComplete="new-password"
                  placeholder="User Address City"
                  type="text"
                  id="E09"
                  key="userAddressCity"
                  name="userAddressCity"
                  value={userAddressCity}
                  onChange={(e) => setuserAddressCity(e.target.value.trim())}
                />
                <div style={label}>user Address ZipCode</div>
                <input
                  className="form-input"
                  style={{ fontSize: '16px' }}
                  autoComplete="new-password"
                  placeholder="user Address ZipCode"
                  type="text"
                  id="E10"
                  key="userAddressZipCode"
                  name="userAddressZipCode"
                  value={userAddressZipCode}
                  onChange={(e) => setuserAddressZipCode(e.target.value.trim())}
                />
                <div style={label}>Blood Type</div>
                <select id='E11' style={{backgroundColor:"transparent",border:"none", borderBottom:"1px solid white",padding: "10px 10px 10px 0px"}} value={userBloodType} onChange={(e)=>setBloodType(e.target.value.trim())}>
                    <option value="">Select Blood Type</option>
                    <option value="APOSITIVE">A+</option>
                    <option value="ANEGATIVE">A-</option>
                    <option value="BPOSITIVE">B+</option>
                    <option value="BNEGATIVE">B-</option>
                    <option value="ABPOSITIVE">AB+</option>
                    <option value="ABNEGATIVE">AB-</option>
                    <option value="OPOSITIVE">O+</option>
                    <option value="ONEGATIVE">O-</option>
                </select>
                <div style={label}>Password</div>
                <div className="input-group">
                  <input
                    className="form-input"
                    autoComplete="new-password"
                    type="password"
                    placeholder="Password"
                    required
                    minLength={8}
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value.trim())}
                  />
                </div>
                <div style={label}>Confirm Password</div>
                <div className="input-group">
                  <input
                    className="form-input"
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    minLength={8}
                    onChange={(e) => setConfirmPassword(e.target.value.trim())}
                  />
                </div>
                {PasswordsDoesNotMatch && (
                    <div style={{fontWeight:"600",color:"red"}} className="displayNotMatch">** Passwords does not match</div>
                )}
                {weakPassword && (
                    <div style={{fontWeight:"600",color:"red"}} className="weak">** Weak Password</div>
                )}
              </div>
            </div>
            {isCreateEmployee ===false?
              <div style={{display:"flex", justifyContent:"center", alignItems:"center", width:"100%", marginTop:"10px",color:"white", fontSize:"14px"}}><div>Have you donated Blood Before ?</div>
              <div style={{display:"flex"}}>
                <div style={{display:"flex",alignItems:"center", marginLeft:"20px"}}><input type="radio" id='readio' value={haveDonatedBefore} onChange={()=>setHaveDonatedBefore(true)}  name='lastDonation' required/><label style={{marginLeft:"5px"}} for="readio">Yes</label></div>
                <div style={{display:"flex",alignItems:"center",marginLeft:"10px"}}><input type="radio" id='readio2' value={haveDonatedBefore} onChange={()=>(setHaveDonatedBefore(false),setUserLastDonationDate(""))}  name='lastDonation'/><label style={{marginLeft:"5px"}} for="readio2" >No</label></div>
                {userLastDonationDate && 
                  <>
                    <label style={{marginLeft:"5px",marginLeft:"20px", padding:"2px 10px",backgroundColor:"red",borderRadius:"5px"}} >Date: {userLastDonationDate}</label>
                    <label style={{marginLeft:"5px", padding:"2px 10px"}} ><span style={{borderBottom:"1px solid white", cursor:"pointer"}} onClick={()=>setHaveDonatedBefore(true)} >CHANDE DATE</span></label>
                  </>
                }
              </div>
            </div>:null}
            
            <button style={{marginTop:"10px"}} type="submit" className="AsaSubmit">
              {isCreateEmployee ? 'CREATE ACCOUNT' : (role = 'donor' ? 'ADD DONOR' : 'SIGN UP')}
            </button>
          </form>
          {haveDonatedBefore === true && (
              <div className="searchDonor" style={{ width: 'auto', height: 'auto', marginTop: '1%' ,borderRadius:"30px"}}>
                <div className="search" style={{backgroundColor:"black",width:"400px",borderRadius:"30px"}}>
                  <p style={{ fontSize: '24px' }}>Last Donation</p>
                  
                    <div className="User-registration" style={{ display: 'flex' }}>
                      <div
                        className="User-registration-top"
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          widows: '100%',
                          flexDirection: 'column',
                          alignItems: 'center',
                        }}
                      >
                        <i style={{ marginTop: '10px', color: 'white' }} class="fa fa-bed icon"></i>
                        <div style={label}>What is Your Last Donation Date?</div>
                          <input
                            className="form-input"
                            style={{ fontSize: '16px', width:"300px",marginTop:"20px",marginRight:"0px" }}
                            autoComplete="new-password"
                            placeholder="Donation Date"
                            type="date"
                            id="E06"
                            key="dob"
                            required
                            name="dob"
                            value={userLastDonationDate}
                            max={maxDate}
                            onChange={(e) => setUserLastDonationDate(e.target.value.trim())}
                          />
                          {console.log(userLastDonationDate, "HERE")}
                          <div style={{marginTop:"10px"}}><div style={label}> <span style={{color:"white"}}>## </span>Proceed with the <b style={{color:"white"}}>month</b> if you don't know the exact date</div></div>
                      </div>
                    </div>
                    <div className="AsaSubmit" onClick={(e)=>(userLastDonationDate ===""||null||undefined ?alert("Please enter a valid donation date"):(setHaveDonatedBefore(false)))}>
                      CONTINUE
                    </div>
                </div>
                
              </div>
            )}
        </div>
      </div>
      {alert.status && (
        <FilledAlerts
          status={alert.status}
          message={alert.message}
          onClose={() => setAlert({ status: null, message: null })}
        />
      )}

      {loader && 
        <LoaderAnimation type={"heart-rate"}/>
      }
    </>
  );
}
