import React, { useState } from 'react';
import '../../styles/Main/Home.css';
import NavBar from '../../components/Main/NavBar';
import Signin from './Signin';
import SignUp from './SignUp';
import OTPVarification from '../../components/Main/Popups/OTPVarificationComponent';
import { useNavigate, useNavigation } from 'react-router-dom';

export default function ResetPassword() {
  const navigate = useNavigate();
    const [displaySignin, setDisplaySignin] = useState(false);
    const [displaySignup, setDisplaySignup] = useState(false);
  
    const DisplaySignIn = () => {
      setDisplaySignin(true);
      setDisplaySignup(false);
    };
  
    const DisplaySignup = () => {
      setDisplaySignin(false);
      setDisplaySignup(true);
    };
  
    const closePopup = () => {
      setDisplaySignin(false);
      setDisplaySignup(false);
    };

    const handleClosePopups = ()=>{
      navigate("/");
    }
  
    return (
      <div className="home">
        <NavBar DisplaySignIn={DisplaySignIn} DisplaySignup={DisplaySignup} />
        <>
          <div>
            <div className='heroMain' style={{position:"relative"}}>
              <div className='heroSection'>
              </div>
              <div style={{width:"100%",height:"92vh", backgroundColor:"#000000a6",display:"flex",justifyContent:"center",alignItems:"center", position:"absolute",top:0}}>
                <OTPVarification handleClosePopups={handleClosePopups}/>
              </div>
            </div>
          </div>
        </>
        {displaySignin && (
          <>
            <Signin closePopup={closePopup} DisplaySignup={DisplaySignup} />
          </>
        )}
        {displaySignup && (
          <>
            <SignUp closePopup={closePopup} />
          </>
        )}
      </div>
    );
}
