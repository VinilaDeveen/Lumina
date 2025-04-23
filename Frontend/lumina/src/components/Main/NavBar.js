import React, { useState } from 'react'
import logo from '../../assets/icons/LuminaLogo.ico';
import { Link, Navigate, useLocation } from 'react-router-dom';
import '../../styles/NavBar.css';

export default function NavBar({DisplaySignIn,DisplaySignup}) {
    const isContactUs = useLocation().pathname === "/contactus";
    const isHome = useLocation().pathname === "/";
  return (
    <div className='navbar' style={{position:"sticky",top:"0px"}}>
        <div className='navbar-left'>
        <Link to={'/'}><div className='logo'><img src={logo} alt='logo'/><span className='logo-text'>Lumina</span></div></Link>
        </div>
        <div className='navbar-centered'>
        <ul style={{marginBottom:"0px"}}>
            <Link style={isHome?{BorderBottom:"2px solid black"}:{}} to={'/'}><li>HOME</li></Link>
            <Link to={'/aboutus'}><li>ABOUT US</li></Link>
            <Link style={isContactUs?{BorderBottom:"2px solid black"}:{}} to={'/contactus'}><li>CONTACT US</li></Link>
            <Link to={'/feedback'}><li>FEEDBACK</li></Link>
            <Link to={'/help'}><li>HELP</li></Link>
        </ul>
        </div>
        <div className='navbar-right'>
            <button onClick={()=>DisplaySignup()}  style={{marginRight:"20px",backgroundColor:"red"}}  className='AsaSubmit'>SIGN UP</button>
            <button onClick={()=>DisplaySignIn()} style={{marginRight:"20px",backgroundColor:"red"}} className='AsaSubmit'>SIGN IN</button>
        </div>
    </div>
  )
}