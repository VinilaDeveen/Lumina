import React, { useState } from 'react';
import close from '../../../assets/icons/close.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../../../context/AuthContext";
import '../../../styles/LoginPage.css';

export default function Signin({ closePopup }) {
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
            console.log('HERE IS THE PATH IT WILL LOCADED TO ');
            if (auth.userRole && roleToPathTest[auth.userRole]) {
                console.log("navigation routes: ",roleToPathTest[auth.userRole]);
              } else {
                setError("Unknown role. Please contact support.");
              }
            };
          
  
    return (
        <div className="popupBoxMain login">
            <div className="popupBox">
                <div
                    className="exit"
                    style={{ cursor: "pointer" }}
                    onClick={() => closePopup()}
                >
                    <img src={close} alt="closeImage" />
                </div>
                <p style={{ fontSize: "24px" }}>Login</p>
                <form onSubmit={handleLogin}>
                    <div className="input" style={{ width: '100%' }}>
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
                    <div className='rememberPwd'>
                        <Link to='/forgot-password'>Forgot Password?</Link>
                    </div>
                    <button className="AsaSubmit" type="submit">
                        SUBMIT
                    </button>
                    <div className='register'>
                        <span>Don't have an account?</span>
                        <Link to='/register'>Register Here</Link>
                    </div>
                </form>
            </div>
        </div>
    );
  }