import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Main/AboutUsPage.css';

import NavBar from '../../components/Main/NavBar';
import Signin from './Signin';
import SignUp from './SignUp';
import Footer from '../../components/Main/Footer';
import '../../styles/Main/PrivacyPolicy.css';
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
      setDisplaySignin(false);
      setDisplaySignup(false);
    };
  
    const navigate = useNavigate();
  
    return (
      <div className="home">
        {token?<SignedNavbar/>:<NavBar DisplaySignIn={DisplaySignIn} DisplaySignup={DisplaySignup} />}
        <div className="about-us">
          <h1>Privacy Policy</h1>
          <p>
          Lumina is an unity that promotes voluntary blood donation and raises awarness among people to donate blood to help the poor and needy.
          </p>
        </div>
        <div className="privacyPolicy-container">
            <div className='privacyPolicy-content'>
                <p className='privacyPolicy-date'><span style={{color:"#333333",fontWeight:"normal", fontSize:"0.8rem", marginLeft:"10px"}}>{"( "}Last Updated on January 2025 {")"}</span></p>

                <section className='privacyPolicy-section'>
                    <p className='privacyPolicy-text'>
                        </p>
                        <p className='privacypolicy-text'>
                        At Lumina, protecting your privacy is more than a responsibility-it's a priority. Whether you're donating blood, registering as a donor, or using any of our services, your personal data is treated with the utmost respect and security. This Privacy Policy sets out Lumina's commitment to protecting the privacy of personal information, including health information, collected by or provided to Lumina in person or online.
                    </p>
                        <p className='privacypolicy-text'>
                        This Privacy Policy details how personal information is collected, used, stored, and disclosed by Lumina and your rights in relation to this. 
                    </p>
                    
                </section>

                <section className='privacyPolicy-section'>
                    <h2 className='privacyPolicy-subtitle'>What information we collect and hold</h2>
                    <p className='privacypolicy-text'>
                        To provide blood, for world-leading health outcomes, Lumina collects and holds personal information about individuals (including sensitive health information).
                        <p className='privacypolicy-text'>
                        To ensure the safety of donors, Lumina needs to collect information about health, medical history, travel, and certain high-risk activities of donors and people volunteering to be donors includind:
                    </p>
                    </p>
                    <ul className='privacyPolicy-list'>
                        <li className='privacyPolicy-listI'>Name</li>
                        <li className='privacyPolicy-listI'>Contact details (email address, telephone numbers)</li>
                        <li className='privacyPolicy-listI'>Date of birth</li>
                        <li className='privacyPolicy-listI'>Medical history</li>
                        <li className='privacyPolicy-listI'>Travel history</li>
                        <li className='privacyPolicy-listI'>Certain high-risk behaviours relevant to a safe blood supply, such as recent sexual activity</li>
                    </ul>
                    <p className='privacypolicy-text'>
                        Lumina will collect and hold the personal information supplied by donors when they register or attend Lumina as a donor including in the test results of each donation, details of any adverse events and any communication or correspondence with individual donors.
                    </p>
                </section>

                <section className='privacyPolicy-section'>
                    <h2 className='privacyPolicy-subtitle'>
                        Why we collect information
                    </h2>
                    <p className='privacyPolicy-text'>
                        Lumina only collects personal information for following pursoses:
                    </p>
                    <ul className='privacyPolicy-list'>
                        <li className='privacyPolicy-listI'>To evaluate the eligibility of individuals to donate blood and ensure the health and safety of both donors and recipients.</li>
                        <li className='privacyPolicy-listI'>To keep in touch with donors about past, current, and future donations, ensuring continuous engagement and support for the donation process.</li>
                        <li className='privacyPolicy-listI'>To improve internal processes, ensuring better donor experience, efficient blood inventory management, and streamlined operations.</li>
                        <li className='privacyPolicy-listI'>For internal record-keeping, quality assurance, and risk management purposes. This also includes the training and education of staff to enhance service delivery.</li>
                        <li className='privacyPolicy-listI'>To adhere to applicable laws and regulations, including health and safety standards, and to fulfill obligations under relevant healthcare and data protection laws.</li>
                    </ul>
                </section>

                <section className='privacyPolicy-section'>
                    <h2 className='privacyPolicy-subtitle'>Sharing of Personal Data</h2>
                    <p className='privacyPolicy-text'>
                        Lumina is committed to safeguarding your data and does not sell, trade, or share donor information without explicit consent.
                    </p>
                    <p className='privacyPolicy-text'>
                        If we provide your details to a third party acting on behalf of Lumina for any purpose, the third party will be subject to a confidentiality agreement and mut only use your personal information for the purposes for which it was provided.
                    </p>
                    <p className='privacyPolicy-text'>
                        In some instances, it may be necessary for Lumina to release personal information relating to your donation to our hospital customers, insurers or regulatory auditors. The hospital, insurers and auditors will be required to hold this information in confidence.
                    </p>
                    <p className='privacyPolicy-text'>
                        Lumina will not sell your personal information.
                    </p>
                </section>

                <section className='privacyPolicy-section'>
                    <h2 className='privacyPolicy-subtitle'>
                        Copyright and Trademark
                    </h2>
                    <p className='privacyPolicy-text'>
                        All content on the website is the exclusive property of Dark Genesis. Unauthorized use may result in penalties.
                    </p>
                </section>

                <section className='privacyPolicy-section'>
                    <h2 className='privacyPolicy-subtitle'>
                        Contact Us About Privacy
                    </h2>
                    <p className='privacyPolicy-text'>
                        If you have questions about his Privacy Policy, you may send us an email at <a href='#'>donatewithlumina@email</a>.
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
