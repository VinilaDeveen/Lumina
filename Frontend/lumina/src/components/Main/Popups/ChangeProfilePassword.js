import React, { useState, useRef, useEffect } from 'react';
import close from '../../../assets/icons/close.svg';
import '../../../styles/OtpVerification.css';
import axios from 'axios';
import LoaderAnimation from '../../LoaderAnimation';
import FilledAlerts from '../FilledAlerts';

export default function ChangeProfilePassword({ handleClosePopups, existUserEmail }) {
  const token = localStorage.getItem('accessToken');
  const [inputs, setInputs] = useState(['', '', '', '', '', '']);
  const [showOTPisIncorrect, setShowOTPisIncorrect] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [seconds, setSeconds] = useState(59);
  const [minutes, setMinutes] = useState(2);
  const [loader,setLoader] = useState(false);

  // Alert 
  const [alert, setAlert] = useState({ status: null, message: null });
  const statusCode = useRef("");
  const errorMessage = useRef("");

  const inputsRef = useRef([]);
  const [showOTP, setShowOTP] = useState(true);
  const [showOTPVerified, setShowOTPVerified] = useState(false);
  const userEmail = useRef(existUserEmail);

  // OTP input change handler
  const handleOnChange = (e, index) => {
    const value = e.target.value;
    if (value.length === 1) {
      const newInputs = [...inputs];
      newInputs[index] = value;
      setInputs(newInputs);
      
      if (inputsRef.current[index + 1]) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const newInputs = [...inputs];
      newInputs[index] = '';
      setInputs(newInputs);
      
      if (index > 0) {
        inputsRef.current[index - 1].focus();
      }
    }
  };

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  // Check if OTP entered is correct
  const checkIfEnteredOTPIsCorrect = async (e) => {
    e.preventDefault();
    const otp = inputs.join('');
    try {
      await axios.post(
        `http://localhost:8080/changePassword/verifyOtp/${otp}/${userEmail.current}`,
        {},
        config
      );
      setShowOTP(false);
      setShowOTPVerified(true);
      setShowOTPisIncorrect(false);
      statusCode.current = 200;
      errorMessage.current = "OTP varified succesfully";
      setAlert({status:statusCode,message:errorMessage});
    } catch (error) {
      setShowOTPisIncorrect(true);
      console.error("OTP Verification error:", error);
    }
  };

  // Send OTP email
  const sendTheEmail = async () => {
    setLoader(true);
    try {
      await axios.post(
        `http://localhost:8080/changePassword/sendOtp/${userEmail.current}`,
        {},
        config
      );
      resetTimer();
      setShowOTP(true);
      statusCode.current = 201;
      errorMessage.current = "OTP send succesfully";
    } catch (error) {
      if(error.response){
        console.log("Error message",error.response);
        statusCode.current = error.response.status;
        errorMessage.current = "You have reached the daily limit of sending OTP";
      }else{
        statusCode.current = 100;
        errorMessage.current = "Failed to connect to the server.";
      }
      setAlert({status:statusCode,message:errorMessage});
      setTimeout(() => {
        handleClosePopups();
      }, 1);
    }
    setLoader(false);
  };

  useEffect(() => {
    sendTheEmail();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds > 0) return prevSeconds - 1;
        if (minutes > 0) {
          setMinutes((prevMinutes) => prevMinutes - 1);
          return 59;
        }
        clearInterval(timer);
        return 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [minutes]);

  const resetTimer = () => {
    setSeconds(59);
    setMinutes(2);
  };

  // Reset password
  const resetPassword = async (e) => {
    e.preventDefault();
    
    if (!password || !confirmPassword) {
      alert("Password and confirm password are required.");
      return;
    }
    
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    const passwordBody = { "password":password, "repeatPassword":confirmPassword };
    try {
      await axios.post(
        `http://localhost:8080/changePassword/changePassword/${userEmail.current}`,passwordBody,config);
      statusCode.current = 201;
      errorMessage.current = "Password Reset succesfully";
      setTimeout(() => {
        handleClosePopups();
      }, 1);
    } catch (error) {
      console.error("Error resetting password:", error);
      statusCode.current = error.response.status;
      errorMessage.current = "Passwords does not match";
    }
    setAlert({status:statusCode,message:errorMessage});
  };

  return (
    <div>
      {showOTP && (
        <div className="popupBoxMain">
          <div className="image"></div>
          <div className="popupBox" style={{ width: '830px' }}>
            <div className="exit" onClick={handleClosePopups} style={{ cursor: "pointer" }}>
              <img src={close} alt="close" />
            </div>
            <form onSubmit={checkIfEnteredOTPIsCorrect}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{marginBottom:"-80px"}}>
                <p style={{ fontSize: '28px', fontWeight: '600' ,textAlign:"center",marginTop:"10px"}}>OTP VERIFICATION</p>
                <p style={{ fontSize: '15px', marginTop: '-10px', fontWeight: '300', textAlign: 'center' ,marginTrim:"30px"}}>
                  An OTP has been sent to your email <span>{userEmail.current}</span> and is valid for 3 minutes
                </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <p id="otpIncorrect" style={showOTPisIncorrect ? { color: 'white' } : { color: 'transparent' }}>
                    Entered OTP Is Incorrect
                  </p>
                  <div style={{ marginLeft: '20px' }}>
                    {inputs.map((input, index) => (
                      <input
                        className="inputBoxes"
                        style={{
                          width: '40px',
                          height: '40px',
                          marginRight: '10px',
                          fontSize: '20px',
                          textAlign: 'center',
                          backgroundColor: 'transparent',
                          border: '1px solid rgba(255,255,255,0.3)',
                          borderRadius: '3px',
                          color: 'white',
                        }}
                        key={index}
                        value={input}
                        ref={(el) => (inputsRef.current[index] = el)}
                        onChange={(e) => handleOnChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        maxLength={1}
                      />
                    ))}
                  </div>
                  <button type="submit" className="AsaSubmit">CONTINUE</button>
                  <div
                    className="timer"
                    style={{
                      border: '1px solid white',
                      color: 'red',
                      fontSize: '12px',
                      padding: '5px 20px',
                      borderRadius: '30px',
                      width: '85px',
                      textAlign: 'center',
                      fontWeight: '500',
                      backgroundColor: 'white',
                      marginTop:"20px"
                    }}
                  >
                    {`0${minutes}:${seconds > 9 ? seconds : '0' + seconds}`}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {showOTPVerified && (
        <div className="popupBoxMain login">
          <div className="image"></div>
          <div className="popupBox">
            <div className="exit" style={{ cursor: "pointer" }} onClick={handleClosePopups}>
              <img src={close} alt="closeImage" />
            </div>
            <h2 style={{ color: "white", fontSize: "24px",marginBottom:"20px" }}>OTP VERIFIED!</h2>
            <form onSubmit={resetPassword}>
              <div className="input" style={{ width: '100%' }}>
                <input
                  id="pwd"
                  placeholder="Password"
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  id="cpwd"
                  placeholder="Confirm Password"
                  type="password"
                  required
                  minLength={8}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="rememberPwd" style={{ fontSize: "12px", color: 'white', fontWeight: '300', marginTop: "10px" }}></div>
              <button type="submit" className="AsaSubmit">
                RESET PASSWORD
              </button>
            </form>
          </div>
        </div>
      )}
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
    </div>
    
  );
}