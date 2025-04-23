import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Main/AboutUsPage.css';
import mission from '../../assets/images/mission.jpg';
import vision from '../../assets/images/vision.jpg';
import value from '../../assets/images/value.jpg';
import why from '../../assets/images/why.jpg';
import NavBar from '../../components/Main/NavBar';
import Signin from '../../components/Main/Popups/Signin';
import SignUp from './SignUp';
import LoaderAnimation from '../../components/LoaderAnimation';
import Footer from '../../components/Main/Footer';
import { style } from '@mui/system';
import ChatBox from '../../components/Main/ChatBox';

export default function AboutUsPage() {
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
  const aboutUsData = [
    {
      title: 'Our Mission',
      image: mission,
      description:
        'At Lumina, we are dedicated to making blood donation easier and more accessible for everyone. Our goal is to bridge the gap between donors, recipients, and hospitals by providing an efficient, reliable, and user-friendly platform that enhances the entire donation process. We believe that with the right tools, we can make a significant impact on healthcare and save more lives through seamless blood donation management.',
      link: '/our-mission',
    },
    {
      title: 'Our Vision',
      image: vision,
      description:
        'We envision a world where blood donation is no longer a challenge, but a simple and regular act of generosity. Lumina aims to become a leading platform for global blood donation coordination, fostering trust and collaboration among all stakeholders in the healthcare ecosystem.',
      link: '/our-vision',
    },
    {
      title: 'Our Values',
      image: value,
      description:
        'We are guided by the core values of empathy, integrity, and innovation. At Lumina, we prioritize the needs of donors and recipients, ensuring every step of the donation process is secure and respectful. Our commitment to transparency and technology drives our continuous efforts to improve the platform.',
      link: '/our-values',
    },
    {
      title: 'Why Lumina?',
      image: why,
      description:
        "Lumina stands out by offering a user-friendly interface, real-time tracking of blood donations, and personalized support for both donors and recipients. Whether you're a first-time donor or a hospital managing supplies, our platform simplifies the process, making it effective and trustworthy.",
      link: '/why-choose-lumina',
    },
  ];

  return (
    <div className="home">
      {loading && <LoaderAnimation />}
      <NavBar DisplaySignIn={DisplaySignIn} DisplaySignup={DisplaySignup} />
      <div className="about-us">
        <h1>About Us</h1>
        <p>
          We're here to help, whatever you need. Pick a way to get in touch and give us a buzz, drop us a line, or send
          us an old-fashioned letter.
        </p>
      </div>
      <div style={{ marginBottom: '150px' }} className="aboutUsCards">
        {aboutUsData.map((data, index) => (
          <div key={index} className="aboutUsCard">
            <img
              src={data.image}
              alt={data.title}
              style={{ width: '260px', height: '200px' }}
              className="aboutUsImage"
            />
            <h2>{data.title}</h2>
            <p>{data.description.substring(0, 110)}...</p>
            <button className="readMoreButton" onClick={() => navigate('/aboutus/Why_lumina')}>
              READ MORE
            </button>
          </div>
        ))}
      </div>
      {displaySignin && (
        <>
          <Signin closePopup={closePopup} />
        </>
      )}
      {displaySignup && (
        <>
          <SignUp closePopup={closePopup} />
        </>
      )}
      <ChatBox />
      <Footer />
    </div>
  );
}
