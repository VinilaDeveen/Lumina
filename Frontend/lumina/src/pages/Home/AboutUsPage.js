import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
import SignedNavbar from '../../components/Main/SignedNavbar';

export default function AboutUsPage() {
  const token = localStorage.getItem('accessToken');
  const [loading, setLoading] = useState(true);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  
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

  const aboutUsData = [

    {
      title: 'Our Mission',
      image: mission,
      description:'At Lumina, we are on a mission to save lives by bridging the gap between blood donors and those in need. We strive to create an inclusive and accessible ecosystem where donating blood becomes second nature and no life is lost due to the lack of blood.\n\n Our organization is driven by innovation and compassion. We leverage advanced technology to provide real-time updates, efficient inventory management, and seamless coordination between donors and healthcare providers. \n\nBy doing so, we ensure that every drop of blood reaches those who need it the most. Beyond technology, Lumina is about building a community-a network of heros who come together to make a difference. Every action we take is aimed at empowering donors, educating communities, and inspiring individuals to contribute to this life-saving mission.',
      link: '/our-mission',
    },
    {
      title: 'Our Vision',
      image: vision,
      description:
        'At Lumina, we envision a world where no one as to suffer due to the unavailability of blood. Our vision is to narmalize blood donation as a routine part of the life while fostering a culture of empathy and community support. \n\nBy integrating cutting-edge technologies with grassroots efforts, we aim to transform the way blood donation systems operate. Our goal is to make blood donation a seamless, transparent, and rewarding experience for everyone invilved-donors, recipients, and healthcare providers. \n\nTogether, we aspire to create a global network of heroes who are united by their shared mission to save lives. Through innovation, education, and community-driven initiatives, we believe we can achieve a future where blood shortages are a thing of the past.',
      link: '/our-vision',
    },
    {
      title: 'Our Values',
      image: value,
      description:
        'At Lumina, our values form the cornerstone of our mission to save lives and build a better future. Our core values are:\n\nCompassion: We care deeply about the well-being of donors and recipients alike.\n\nIntegrity: Trust and transparency are the foundation of our operations.\n\nInnovation: We embrace technology to transform the blood donation ecosystem.',
      link: '/our-values',
    },
    {
      title: 'Why Lumina?',
      image: why,
      description:
        "Lumina stands out because of our dedication to innovation, Trust, and community impact. We are committed to making blood donation easier and more rewarding for everyone involved.\n\n Ease of Access: Our platform is simple and intuitive, Making it easy for donors and healthcare providers to navigate and use efficiently.\n\nStrong Collaboration: Lumina fosters a collaborative environment among healthcare providers, blood banks, and volunteers, ensuring better coordination in managing blood supplies.\n\nSecure Data Management: The system prioritizes data security, ensuring that donor and healthcare data are protected with robust encryption and compliance with privacy laws.\n\nComprehensive Features: Lumina supports appointment scheduling, donor management, and detailed reporting, making the entire process streamlined and reliable.",
      link: '/why-choose-lumina',
    },
  ];

  const handleCardClick = (index) => {
    setSelectedCardIndex(selectedCardIndex === index ? null : index);
  };

  return (
    <div className="home">
      {loading && <LoaderAnimation />}
      {token ? <SignedNavbar /> : <NavBar DisplaySignIn={DisplaySignIn} DisplaySignup={DisplaySignup} />}
      
      <div className="about-us">
        <h1>About Us</h1>
        <p>
          We're here to help, whatever you need. Pick a way to get in touch and give us a buzz, drop us a line, or send
          us an old-fashioned letter.
        </p>
      </div>
      <div 
        style={{ 
          marginBottom: '150px',
          width: selectedCardIndex !== null ? '' : 'auto'
        }} 
        className={`aboutUsCards ${selectedCardIndex !== null ? 'no-hover' : ''}`}
      >
        {aboutUsData.map((data, index) => (
          selectedCardIndex === null || selectedCardIndex === index ? (
            <div 
              key={index} 
              className={`aboutUsCard ${selectedCardIndex === index ? 'expanded no-hover' : ''}`}
              style={{
                width: selectedCardIndex === index ? 'auto' : '40vh',
              }}
            >
              <img
                src={data.image}
                alt={data.title}
                style={{ 
                  width: selectedCardIndex === index ? '0%' : '260px', 
                  height: selectedCardIndex === index ? '0px' : '200px',
                  objectFit: 'cover'
                }}
                className="aboutUsImage"
              />
              <h2>{data.title}</h2>
              <p>{selectedCardIndex === index ?data.description.split('\n').map((line, i) => <span key={i}>{line}<br /></span>) : `${data.description.substring(0, 110)}...`}</p>
              {selectedCardIndex !== index && (
                <button className="readMoreButton" onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick(index);
                }}>
                  READ MORE
                </button>
              )}
              {selectedCardIndex === index && (
                <button className="readMoreButton" onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick(null);
                }}>
                  SHOW LESS
                </button>
              )}
            </div>
          ) : null
        ))}
      </div>
      {displaySignin && (
        <Signin closePopup={closePopup} DisplaySignup={DisplaySignup} />
      )}
      {displaySignup && (
        <SignUp closePopup={closePopup} DisplaySignIn={DisplaySignIn} />
      )}
      <Footer />
    </div>
  );
}