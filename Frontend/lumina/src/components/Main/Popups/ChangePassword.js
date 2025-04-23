import axios from 'axios';
import React, { useEffect, useState } from 'react'
import close from '../../../assets/icons/close.svg';

export default function ChangePassword({userPassword,handlePasswordUpdate}) {
  
    console.log(userPassword);
    const [currentPassword,setCurrentPassword] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');

    const validateAndChangePassword = (e) => {
        e.preventDefault(); 
        if (userPassword !== currentPassword) {
          alert("Current password does not match with the existing one");
        } else if (password !== confirmPassword) {
          alert("New Password and Confirm Password do not match");
        } else if (
          window.confirm("Are you sure you want to change the password? Don't Forget to submit")
        ) {
          handlePasswordUpdate(password);
        }
    };
    
  return (
    <>
      <div className="popupBoxMain login">
        <div className="image"></div>
            <div className="popupBox" >
            <div className="exit" style={{cursor:"pointer"}} >
                <img src={close} alt="closeImage" />
            </div>
            <h2 style={{color:"white",fontSize:"24px"}}>CHANGE PASSWORD</h2>
            <form id="searchDonor" onSubmit={(e)=>validateAndChangePassword(e)}>
                <div className="input" style={{ width: '100%' }}>
                <input
                    id="pwd"
                    placeholder="currentPassword"
                    type="password"
                    key="currentPassword"
                    required
                    name="currentPassword"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <input
                    minLength={8}
                    id="pwd"
                    placeholder="Password"
                    type="password"
                    key="password"
                    required
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    id="cpwd"
                    placeholder="Confirm Password"
                    type="password"
                    key="confirm password"
                    required
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                </div>
                <div className='rememberPwd' style={{fontSize:"12px", color: 'white', fontWeight: '300',marginTop:"10px"}}>
                </div>
                <button type='submit' className="AsaSubmit">
                APPLY NEW PASSWORD
                </button>
            </form>
          </div>
        </div>
      </>
  )
}