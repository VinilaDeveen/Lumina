import React from 'react';
import '../../styles/Main/Footer.css';
import { FaFacebookF, FaYoutube, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      
      <div className="socialIcon" style={{width:"100%", display:"flex", justifyContent:"center",flexDirection:"column", alignItems:"center"}}>
      <p>Copyright &copy; 2024 by Dark Genesis</p>
      <p>All Rights are reserved</p>
      <p>For frequent updates please follow our social media</p>
        <div>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebookF className="icon" style={{paddingRight:"20px"}} />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
          <FaYoutube className="icon" style={{paddingRight:"20px"}}/>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="icon" style={{paddingRight:"20px"}}/>
        </a>
        </div>
      </div>
      <div className="footerBottom">
      <p style={{fontSize:"11px"}}>Our goal is to bridge the gap between donors, recipients, and hospitals by providing an efficient, reliable,
      and user-friendly platform that enhances the entire donation process.</p>
        <div className="footerPolicies">
        <Link to={"/privacypolicy"}>Privacy Policy</Link> | <Link to={"/termofservice"}>Terms of Service</Link> | <Link to= {"/contactus"}>Contact Us</Link>
        </div>
      </div>
    </footer>
  );
}
