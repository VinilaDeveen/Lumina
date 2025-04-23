import React, { useState } from 'react';
import close from '../../assets/icons/close.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import '../../styles/LoginPage.css';

export default function Signin({ closePopup, DisplaySignup }) {
  const {signin, auth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
      e.preventDefault();
      try {
          await signin(email, password);
          navigateToDashboard();
        } 
        catch (err) {
            console.error("Error during login: ", err);
          setError("Login failed. Please check your credentials.");
        }
      };

  const navigateToDashboard = () => {
  const roleToPathTest = {
    DONOR: "/donor",
    ADMINISTRATOR: "/administrator",
    PHLEBOTOMIST: "/phlebotomist",
    BLOODBANKMANAGER: "/bloodbankmanager",
    LABTECHNICIAN: "/labtechnician",
    HOSPITAL: "/hospital",
  };
  navigate(roleToPathTest[auth.userRole]);
  if (auth.userRole && roleToPathTest[auth.userRole]) {
      console.log("navigation routes: ",roleToPathTest[auth.userRole]);
    } else {
    navigate("/");
        
    }
  };

  return (
      <div className="popupBoxMain login" style={{height:"600px",width:"430px",zIndex:"9999"}}>
          <div className="popupBox">
              <div
                  className="exit"
                  style={{ cursor: "pointer" }}
                  onClick={() => closePopup()}
              >
                  <img src={close} alt="closeImage" />
              </div>
              <p style={{ fontSize: "24px" }}>Login</p>
              <form onSubmit={handleLogin} >
                  <div style={{fontSize:"14px", fontWeight:"normal",color:"red",marginBottom:"20px"}}>{error}</div>
                  <div className="input" style={{ width: '100%'}}>
                      <input
                          className='form-input'
                          id="email"
                          placeholder="Email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          
                      />
                      <input
                          className='form-input'
                          id="password"
                          placeholder="Password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                      />
                  </div>
                  <div className='rememberPwd' style={{fontSize:"14px",marginTop:"5px"} }>
                      <span style={{color:"#898989" ,marginRight:"10px"}}>Forgot Password? <Link to={"/resetpassword"}><span style={{color:"white", cursor:"pointer"} }>Reset Password</span></Link></span>
                  </div>
                  <button className="AsaSubmit" type="submit" style={{marginTop:"20px"}}>
                      SUBMIT
                  </button>
                  <div className='register' style={{marginTop:"20px", fontSize:"14px"}}>
                      <span style={{color:"#898989" ,marginRight:"10px"}}>Don't have an account?</span>
                      <span onClick={()=>DisplaySignup()} style={{color:"white",borderBottom:"1px solid white", cursor:"pointer"}}>Click Here</span>
                  </div>
              </form>
          </div>
      </div>
  );
}
