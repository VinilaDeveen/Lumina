import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../styles/OurVision.css"
import vision from "../assets/images/17.jpg"


export default function OurVision() {
    return(
        <div>
            <NavBar />
            <div className="vision-container">
                <h1 className="vision-title">Our Vision</h1>
                <div className="vision-content">
                    <img src={vision} alt="Ou Vision" className="vision-image" />
                    <div className="vision-text">
                        <p> 
                            At Lumina, we envision a world where no one as to suffer due to the unavailability of blood. Our vision is to narmalize blood donation as a routine part of the life while fostering a culture of empathy and community support.
                        </p>
                        <p>
                            By integrating cutting-edge technologies with grassroots efforts, we aim to transform the way blood donation systems operate. Our goal is to make blood donation a seamless, transparent, and rewarding experience for everyone invilved-donors, recipients, and healthcare providers.
                        </p>
                        <p> 
                            Together, we aspire to create a global network of heroes who are united by their shared mission to save lives. Through innovation, education, and community-driven initiatives, we believe we can achieve a future where blood shortages are a thing of the past.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}