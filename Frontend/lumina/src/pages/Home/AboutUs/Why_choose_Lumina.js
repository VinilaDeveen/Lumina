import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../styles/WhyLumina.css"
import why from "../assets/images/16.jpg"


export default function WhyLumina() {
    return(
        <div>
            <NavBar />
            <div className="why-container">
                <h1 className="why-title">Why Lumina?</h1>
                <div className="why-content">
                    <img src={why} alt="Why Lumina" className="why-image" />
                    <div className="why-text">
                        <p>
                            Lumina stands out because of our dedication to innovation, Trust, and community impact. We are committed to making blood donation easier and more rewarding for everyone involved.
                        </p>
                        <ul>
                            <li><strong>Ease of Access:</strong>Our platform is simple and intuitive, Making it easy for donors and healthcare providers to navigate and use efficiently.</li>
                            <li><strong>Strong Collaboration:</strong>Lumina fosters a collaborative environment among healthcare providers, blood banks, and volunteers, ensuring better coordination in managing blood supplies.</li>
                            <li><strong>Secure Data Management:</strong>The system prioritizes data security, ensuring that donor and healthcare data are protected with robust encryption and compliance with privacy laws.</li>
                            <li><strong>Comprehensive Features:</strong>Lumina supports appointment scheduling, donor management, and detailed reporting, making the entire process streamlined and reliable.</li>
                        </ul>
                        <p>
                            Join Lumina today and be a part of a mission that truly saves lives!
                        </p>
                    </div>
                </div>
                </div>
                <Footer />
        </div>
    )
}