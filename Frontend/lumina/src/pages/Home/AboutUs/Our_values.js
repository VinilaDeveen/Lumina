import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../styles/OurValues.css"
import value from "../assets/images/6.jpg"


export default function OurValues() {
    return(
        <div>
            <NavBar />
            <div className="values-container">
                <h1 className="values-title">Our Values</h1>
                <div className="values-content">
                    <img src={value} alt="Our Values" className="values-image" />
                    <div className="values-text">
                        <p> 
                            At Lumina, our values form the cornerstone of our mission to save lives and build a better future. Our core values are:
                        </p>
                        <ul>
                            <li><strong>Compassion:</strong>We care deeply about the well-being of donors and recipients alike.</li>
                            <li><strong>Integrity:</strong>Trust and transparency are the foundation of our operations.</li>
                            <li><strong>Innovation:</strong>We embrace technology to transform the blood donation ecosystem.</li>
                        </ul>
                        <p>
                            By staying true to these principles, we ensure that every action we take aligns with our mission to save lives and inspire positive change.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}