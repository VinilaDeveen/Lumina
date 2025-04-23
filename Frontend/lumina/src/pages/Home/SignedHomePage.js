import React, { useEffect, useState } from 'react';
import '../../styles/Main/Home.css';
import NavBar from '../../components/Main/NavBar';
import Footer from '../../components/Main/Footer';
import MapComponent from '../../components/Main/MapComponent';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import avatarIcon from '../../assets/icons/DemoAvatar.png';
import logo from '../../assets/icons/LuminaLogo.ico';
import SignedNavbar from '../../components/Main/SignedNavbar';


export default function SignedHomePage() {  
  return (
    <div className="home">
      <SignedNavbar/>
      <>
        <div>
          <div className='heroMain' style={{position:"relative"}}>
            <div className='heroSection'>
            </div>
            <div style={{width:"100%",height:"92vh", backgroundColor:"#000000a6",display:"flex",justifyContent:"center",alignItems:"center", position:"absolute",top:0}}>
              <div className='hero-info' style={{color:"white"}}>
                    <div className='sub'>DONATE BLOOD, SAVE LIFE!</div>
                    <div className='main'>DONATE YOUR BLOOD <br/> AND INSPIRTE OTHER TO DONATE.</div>
                    <div>
                    </div>
                </div>
            </div>
          </div>
            <div className='joinUs' style={{width:"93%", display:"flex",justifyContent:"center",alignItems:"center",padding:"0px 50px",marginTop:"70px", margin:"0px 50px",marginTop:"60px"}}>
              <div style={{width:"50%"}}>
                <p style={{fontSize:"40px", textAlign:"center"}}>Join to <span style={{color:"red"}}>Help</span> our Blood Donation System</p>
                <p style={{fontSize:"0.9rem"}}>By joining our blood donation system, you’re becoming a vital part of a life-saving mission. Your donation can help save multiple lives and ensure that hospitals have the blood they need in emergencies. It’s quick, safe, and incredibly impactful. Be a Hero – Donate blood and make a real difference in your community. Sign up today to start donating and help those in need. Together, we can create a healthier, stronger future for all.</p>
              </div>
              <div style={{width:"50%", padding:"50px 70px"}}>
                <div style={{backgroundColor:"#ececec", padding:"20px 40px", borderRadius:"20px"}}>
                  <p style={{fontSize:"20px",fontWeight:"bold"}}>Ready To Save Lives ?</p>
                  <p style={{fontSize:"0.9rem"}}>Your blood donation can make a difference! Click below to register and become a hero today.</p>
                </div>
              </div>
            </div>
            <div className='bloodDonartion' style={{width:"100%",display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center", margin:"50px 0px 50px 0px"}}>
              <p style={{fontSize:"40px", fontWeight:"500", color:"red"}}>WHY YOU SHOULD DONATE BLOOD ?</p>
              <div className='info' style={{fontSize:"0.9rem",textAlign:"center", lineHeight:"2", margin:"0px 100px"}}>Donating blood is a simple yet powerful way to save lives. Each donation can help up to three people in need, whether they’re undergoing surgery, battling cancer, or in a trauma emergency. Regular blood donations ensure hospitals have enough supply to respond to critical situations, especially during shortages. Beyond saving lives, donating blood offers personal health benefits, strengthens community bonds, and provides a sense of fulfillment. It’s a safe, quick, and impactful way to make a real difference – at no cost to you.</div>
            </div>
            <div className='joinUs' style={{width:"93%", display:"flex",justifyContent:"center",alignItems:"center",padding:"0px 50px", margin:"0px 50px", marginBottom:"30px"}}>
              <div style={{width:"50%", padding:"20px 40px"}}>
                  <MapComponent/>
              </div>
              <div style={{width:"40%"}}>
                <p style={{fontSize:"40px", textAlign:"center"}}>Find Blood Donation Centers Near You</p>
                <p style={{fontSize:"0.9rem"}}>Explore the map below to see available blood donation centers marked with pins. Select a center that’s convenient for you and visit during their operating hours to donate blood.</p>
              </div>
            </div>
        </div>
      </>
      <Footer/>
    </div>
  );
}
