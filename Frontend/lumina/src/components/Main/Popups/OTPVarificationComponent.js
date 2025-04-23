import React, { useState, useRef, useEffect } from 'react';
import close from '../../../assets/icons/close.svg';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import '../../../styles/OtpVerification.css';
import axios from 'axios';

export default function OTPVerification({handleClosePopups}) {
  const token = localStorage.getItem('accessToken');
  const [email, setEmail] = useState('');
  const [inputs, setInputs] = useState(['', '', '', '', '', '']);
  const [actualOTP, setActualOTP] = useState('');
  const [showOTPisIncorrect, setShowOTPisIncorrect] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const [seconds, setSeconds] = useState(59);
  const [minutes, setMinutes] = useState(2);

  const inputsRef = useRef([]);
  const [showEmail, setShowEmail] = useState(true);
  const [showOTP, setShowOTP] = useState(false);
  const [showOTPVerified, setShowOTPVerified] = useState(false);
  
  const [decoded, setDecoded] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [config, setConfig] = useState('');


  // OTP input change handler
  const handleOnChange = (e, index) => {
    if (e.target.value.length === 1) {
      const newInputs = [...inputs];
      newInputs[index] = e.target.value;
      setInputs(newInputs);
    }
    if (inputsRef.current[index + 1] && e.target.value.length === 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (e.target.value === '' && index > 0) {
        inputsRef.current[index - 1].focus();
      } else {
        const newInputs = [...inputs];
        newInputs[index] = '';
        setInputs(newInputs);
      }
    }
  };

  // Check if OTP entered is correct
  const checkIfEnteredOTPIsCorrect = async (e) => {
    e.preventDefault();
    const otp = inputs.join('');
    try {
      const url = token 
        ?await axios.post(`http://localhost:8080/changePassword/verifyOtp/${otp}/${userEmail}`,{}, config)
        :
        await axios.post(`http://localhost:8080/forgotPassword/verifyOtp/${otp}/${userEmail}`,{});
      setShowOTP(false);
      setShowOTPVerified(true);
      setShowOTPisIncorrect(false);
    } catch (error) {
      setShowOTPisIncorrect(true);
      console.log("OTP Verification error", error);
    }
  };

  // Send OTP email
  const sendTheEmail = async () => {
    console.log("Config is not existing",config)
    try {
    token? await axios.post(`http://localhost:8080/changePassword/sendOtp/${userEmail}`,{}, config)
      : await axios.post(`http://localhost:8080/forgotPassword/verifyMail/${userEmail}`,{})
      alert("Mail sent");
      resetTimer();
      setShowEmail(false);
      setShowOTP(true);
    } catch (error) {
      console.log("error Sending the otp to email",error);
      alert("Failed to send");
    }
  };

  // Start timer for OTP expiry
  const startCountTime = () => {
    setSeconds(59);
    setMinutes(2);
  };

  const resetTimer = () => {
    startCountTime();
  };

  // Decode the token and set authorization config if token exists
  useEffect(() => {
    const processToken = async () => {
      if (token) {
        const decodedToken = jwtDecode(token);
        setDecoded(decodedToken);
        setUserEmail(decodedToken.sub);
        const newConfig = {
          headers: { Authorization: `Bearer ${token}` },
        };
        setConfig(newConfig);
        sendTheEmail();
      } else {
        setShowEmail(true);
      }
    };
    processToken();
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
  }, [seconds, minutes]);

  // Reset password
  const resetPassword = async () => {
    if (!password || !confirmPassword) {
      alert("Password and confirm password are required.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    const passwordBody = { "password":password, "repeatPassword":confirmPassword };
    try {
      await axios.post(`http://localhost:8080/forgotPassword/changePassword/${userEmail}`, passwordBody);
      alert("Password successfully reset!");
    } catch (error) {
      console.log("There is an issue with sending the password", error);
    }
  };

  return (
    <div>
      {showEmail && (
        <div className="popupBoxMain">
          <div className="popupBox" style={{ borderRadius: '30px 0px 0px 30px', border: 'none' }}>
            <div className="exit" style={{ left: 0, borderRadius: '30px 0px 30px 0px' }}>
              <img src={close} alt="close" onClick={()=>handleClosePopups()} style={{cursor:"pointer"}} />
            </div>
            <form id="searchDonor">
              <div className="input" style={{ width: '100%' }}>
                <input
                  id="emailOTP"
                  style={{
                    backgroundColor: 'transparent',
                    border: '0px',
                    borderBottom: '0.01em solid white',
                    width: '100%',
                    fontSize: '16px',
                    color: 'white',
                    fontWeight: '300',
                  }}
                  autoComplete="off"
                  placeholder="Please Enter Your Email"
                  type="text"
                  required
                  name="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </div>
              <button type='button' className="AsaSubmit" onClick={()=>sendTheEmail()}>SUBMIT</button>
            </form>
          </div>
          <div className="image"></div>
        </div>
      )}

      {showOTP && (
        <div className="popupBoxMain">
          <div className="image"></div>
          <div className="popupBox" style={{ width: '830px' }}>
            <div className="exit" onClick={()=>handleClosePopups()} style={{cursor:"pointer"}}>
              <img src={close} alt="close" />
            </div>
            <form onSubmit={checkIfEnteredOTPIsCorrect}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <p style={{ fontSize: '28px', fontWeight: '600' }}>OTP VERIFICATION</p>
                <p style={{ fontSize: '15px', marginTop: '-10px', fontWeight: '300', textAlign: 'center' }}>
                  An OTP has been sent to your email <span>{userEmail}</span> to reset your password and is valid for 3 minute
                </p>
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
                        maxLength={1}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                      />
                    ))}
                  </div>
                  <button className="AsaSubmit">CONTINUE</button>
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
                    }}
                  >
                    {`0${minutes} : ${seconds > 9 ? seconds : '0' + seconds}`}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {showOTPVerified &&
        <>
            <div className="popupBoxMain login">
            <div className="image"></div>
              <div className="popupBox" >
                <div className="exit" style={{cursor:"pointer"}}  onClick={()=>handleClosePopups()} >
                  <img src={close} alt="closeImage"  />
                </div>
                <h2 style={{color:"white",fontSize:"24px"}}>OTP VERIFIED !</h2>
                <form id="searchDonor">
                  <div className="input" style={{ width: '100%' }}>
                    <input
                      id="pwd"
                      placeholder="Password"
                      type="password"
                      key="password"
                      required
                      name="password"
                      value={password}
                      minLength={6}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                      id="cpwd"
                      placeholder="Confirm Password"
                      type="password"
                      key="confirm password"
                      required
                      name="password"
                      minLength={8}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <div className='rememberPwd' style={{fontSize:"12px", color: 'white', fontWeight: '300',marginTop:"10px"}}>
                    </div>
                  <button className="AsaSubmit" onClick={(e)=>resetPassword(e)}>
                    RESET PASSWORD
                  </button>
                </form>
              </div>
            </div>
          </>
      }
    </div>
  );
}
