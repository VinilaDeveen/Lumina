import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Main/AboutUsPage.css';
import mission from '../../assets/images/mission.jpg';
import vision from '../../assets/images/vision.jpg';
import value from '../../assets/images/value.jpg';
import why from '../../assets/images/why.jpg';
import NavBar from '../../components/Main/NavBar';
import Signin from './Signin';
import SignUp from './SignUp';
import LoaderAnimation from '../../components/LoaderAnimation';
import Footer from '../../components/Main/Footer';
import ChatBox from '../../components/Main/ChatBox';

import '../../styles/Main/TermsOfService.css'
import SignedNavbar from '../../components/Main/SignedNavbar';

export default function TermsOfServicesPage() {
  const token = localStorage.getItem('accessToken');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 6000);
      return () => clearTimeout(timer);
    }, []);
  
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
      console.log('Hello');
      setDisplaySignin(false);
      setDisplaySignup(false);
    };
  
    const navigate = useNavigate();
  
    return (
      <div className="home">
        {token?<SignedNavbar/>:<NavBar DisplaySignIn={DisplaySignIn} DisplaySignup={DisplaySignup} />}
        <div className="about-us">
          <h1>Terms Of Service</h1>
          <p>
          This page outlines the services we offer, how we handle yor information, and explains our responsibilities and your rights as a user of our blood donation management system.
          </p>
        </div>
        <div className="terms-container">
                <div className="terms-content">
                    <section className="terms-section">
                        <h2 className="terms-subtitle">Donor Registration<span style={{color:"#333333",fontWeight:"normal", fontSize:"0.8rem", marginLeft:"10px"}}>{"( "}Last Updated on January 2025 {")"}</span></h2>
                        <p className="terms-text">
                            When you register as a donor with Lumina, you consent to being contacted about blood donation opportunities and other related updates. Our communication ensures you remain informed and engaged in the donation process. Here's what to expect:
                        </p>
                        <ul className="terms-list">
                            <li className="terms-listItem">As a registered donor, you can manage your profile through our platform. This includes updating your personal information, viewing donation history, and setting preferred donation locations.</li>
                            <li className="terms-listItem">Your registration details, including contact information, will be securely stored and used solely for operational purposes related to the donation process.</li>
                            <li className="terms-listItem">Lumina adheres to strict data protection policies to ensure your informaion is handled with the highest level of confidentiality.</li>
                            <li className="terms-listItem">By registering, you agree to provide accurate and truthful information about your health and medical history to ensure safe and compatible donations.</li>
                            <li className="terms-listItem">We prioritize the safety of donors and recipients and may reach out to discuss health screenings or eligibility requirements if necessary.</li>
                            <li className="terms-listItem">You are responsible for keeping your registration details up-to-date to avoid any disruptions in communication or appointment scheduling.</li>
                            <li className="terms-listItem">If you wish to update or withdraw your registration, you can contact Lumina's support team or modify your profile through the platform.</li>
                        </ul>
                        <p className="terms-text">
                            By becoming a part of the Lumina donor community, you contribute to saving lives and building a reliable blood donation ecosystem. Your participation enables us to ensure timely amd safe blood supply for those in need.
                        </p>
                    </section>

                    <section className="terms-section">
                        <h2 className="terms-subtitle">The Service</h2>
                        <p className="terms-text">
                            Lumina will allow you to undertake the following activities:
                        </p>
                        <ul className="terms-list">
                            <li className="terms-listItem">Register to donate</li>
                            <li className="terms-listItem">Create an online account</li>
                            <li className="terms-listItem">Find where you can donate</li>
                            <li className="terms-listItem">View, change, or cancel appointment</li>
                            <li className="terms-listItem">Check your eligibility to donate</li>
                            <li className="terms-listItem">Update your personal details</li>
                            <li className="terms-listItem">View your donation history</li>
                        </ul>
                        <p className="terms-text">
                            From time to time, we may test new ideas or technologies as we strive to improve our services. This may result in the need to, for example, store data in new databases. We will always apply our policies and procedures to such changes and will list any activities.
                        </p>
                    </section>

                    <section className="terms-section">
                        <h2 className="terms-subtitle">Terms of Use</h2>
                        <p className="terms-text">
                            When using the Lumina service, you agree:
                        </p>
                        <ul className="terms-list">
                            <li className="terms-listItem">
                                To ensure the data which you supply to us to register for such access are accurste and to update your profile promptly if any of the details which you have supplied to us about you change.
                            </li>
                            <li className="terms-listItem">
                                To keep your login credentials confidential and to be responsible for any loss or damage resulting from use of your password by any third party.
                            </li>
                            <li className="terms-listItem">
                                To accept that we may terminate your access if your actions negatively affect the cervice or other users.
                            </li>
                            <li className="terms-listItem">
                                When you register for this service, You consent to the use of your personal information, including sensitive details about your physical health, as outlined in our Privacy Policy. This information will be used to provide you with a donor information service as described.
                            </li>
                        </ul>
                    </section>

                    <section className="terms-section"><h2 className="terms-subtitle">
                        Our Responsibilities
                    </h2>
                    <p className="terms-text">
                        We are committed to safeguarding your donor records.We actively implement security measures to ensure your information is safe, and audit these regularly. All our staff and anypne who receives information from us have a legal duty to keep information about you confidential.
                    </p>
                    <p className="terms-text">
                            We will not release your personal details to any third party without first seeking your consent, unless this is allowed for or required by law.
                    </p>
                    <p className="terms-text">
                            We are constantly working to ensure compliance with current data protection legislation.
                    </p>
                    </section>

                    <section className="terms-section">
                        <h2 className="terms-subtitle"> Your Information</h2>
                        <p className="terms-text">
                            When you register with Lumina's service, we collect and maintain certain personal information t ensure a seamless and efficient donation process. This includes:
                    </p>
                        <ul className="terms-list">
                            <li className="terms-listItem">Personal details such as name, address, date of birth, gender, contact numbers, and donor ID</li>
                            <li className="terms-listItem">Information about your regular donatio locations, appointments, and donation history, including dates and venues.</li>
                            <li className="terms-listItem">Details of your blood group and results from tests conducted on your donations, ensuring safety and compatibility.</li>
                            <li className="terms-listItem">A With your permission, Lumina may use your device's location data to suggest nearby donation centers or hospitals requiring assistance.</li>
                        </ul>
                        <p className="terms-text">
                            At Lumina, we handle your information with care and use it only for purposes aligned with enhancing the donation process and ensuring safety for all parties involved.
                    </p>
                    </section>
                </div>
            </div>
        {displaySignin && (
          <>
            <Signin closePopup={closePopup} DisplaySignup={DisplaySignup} />
          </>
        )}
        {displaySignup && (
          <>
            <SignUp closePopup={closePopup}  DisplaySignIn={DisplaySignIn} />
          </>
        )}
        <Footer />
      </div>
    );
}
