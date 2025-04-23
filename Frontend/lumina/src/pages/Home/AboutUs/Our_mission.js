import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import mission from "../assets/images/23.jpg"
import "../styles/OurMission.css"

export default function OurMission() {
    return(
        <div>
        <NavBar />
        <div className="mission-container">
            <h1 className="mission-title">Our Mission</h1>
            <div className="mission-content">
                <img src={mission} alt="Our Mission" className="mission-image" />
                <div className="mission-text">
                    <p>
                        At Lumina, we are on a mission to save lives by bridging the gap between blood donors and those in need. We strive to create an inclusive and accessible ecosystem where donating blood becomes second nature and no life is lost due to the lack of blood.
                    </p>
                    <p>
                        Our organization is driven by innovation and compassion. We leverage advanced technology to provide real-time updates, efficient inventory management, and seamless coordination between donors and healthcare providers. By doing so, we ensure that every drop of blood reaches those who need it the most.
                    </p>
                    <p>
                        Beyond technology, Lumina is about building a community-a network of heros who come together to make a difference. Every action we take is aimed at empowering donors, educating communities, and inspiring individuals to contribute to this life-saving mission.
                    </p>
                </div>
            </div>
        </div>
        <Footer />
        </div>
    )
}