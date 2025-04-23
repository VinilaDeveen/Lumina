import React, { useState } from 'react'
import '../../styles/Main/Contact.css'
import Contact from '../../components/Main/Contact'
import Signin from './Signin';
import SignUp from './SignUp';
import NavBar from '../../components/Main/NavBar';
import Footer from '../../components/Main/Footer';
import SignedNavbar from '../../components/Main/SignedNavbar';


export default function ContactPage() {
  const token = localStorage.getItem('accessToken');
  const [displaySignin,setDisplaySignin] = useState(false);
    const [displaySignup,setDisplaySignup] = useState(false);
  
    const DisplaySignIn = ()=>{
      setDisplaySignin(true);
      setDisplaySignup(false)
    }
  
    const DisplaySignup = ()=>{
      setDisplaySignin(false);
      setDisplaySignup(true)
    }
  
    const closePopup = ()=>{
      setDisplaySignin(false);
      setDisplaySignup(false);
    }

  return (
    <div className='home'>
      {token?<SignedNavbar/>:<NavBar DisplaySignIn={DisplaySignIn} DisplaySignup={DisplaySignup} />}
        {displaySignin &&
          <>
            <Signin closePopup={closePopup} DisplaySignup={DisplaySignup}/>
          </>
        }
        {displaySignup &&
          <>
            <SignUp closePopup={closePopup}  DisplaySignIn={DisplaySignIn} />
          </>
        }
      <Contact/>
      <Footer/>   
    </div>
  )
}
