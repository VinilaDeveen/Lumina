import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import '../../styles/Employee/employeeaccount.css'

const Main = () => {

    const [firs, setFirs] = useState(false);
    const [firs1, setFirs1] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [nic, setNic] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [bloodtype, setBloodtype] = useState('');
    
    // Set a default role or allow selection
    const [role, setRole] = useState('PHLEBOTOMIST'); // Assuming default role for now

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setFirs(!firs);
    };

    const toggleConfirmPasswordVisibility = () => {
        setFirs1(!firs1);
    };

    // Handle form submission
    const handleSubmit = async () => {
        // Ensure passwords match
        if (password !== confirmpassword) {
            alert("Passwords do not match!");
            return;
        }

        const formData = {
            firstName,
            lastName,
            email,
            nic,
            password,
            role // Include role here
        };

        try {
            // Make sure to replace 'http://localhost:8080' with your backend's URL if it's different
            const response = await axios.post('http://localhost:8080/api/lumina/employee/', formData);
            console.log('Account created successfully:', response.data);
        } catch (error) {
            console.error('Error creating account:', error);
        }
    };

    return (
        <div>
            <div className="popupform1" id="popupform">
                <Container>
                    <br />
                    <Row className="mai" style={{ display: "flex" }}>
                        <Col className="pic">
                            <Container fluid></Container>
                        </Col>
                        <Col className="rightpart" xs={6}>
                            <div className="form">
                                <i
                                    className="bi bi-x-circle-fill"
                                    onClick={() => document.getElementById("popupform").style.display = "none"}
                                    style={{ float: 'right', fontSize: '25px', color: 'red' }}
                                ></i>
                                <h2>Create Employee Account</h2>
                                <br /><br />
                                <div className="inputclass">
                                    <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                    <i className="bi bi-person-fill"></i>
                                </div>
                                <div className="inputclass">
                                    <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                    <i className="bi bi-person-fill"></i>
                                </div>
                                <div className="inputclass">
                                    <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <i className="bi bi-envelope-fill"></i>
                                </div>
                                <div className="inputclass">
                                    <input type="text" placeholder="NIC" value={nic} onChange={(e) => setNic(e.target.value)} />
                                    <i className="bi bi-person-vcard-fill"></i>
                                </div>
                                <br />
                                <div className="inputclass">
                                    <input type={firs1 ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <i className={firs1 ? "fa fa-eye" : "fa fa-eye-slash"} onClick={togglePasswordVisibility}></i>
                                </div>
                                <br />
                                <div className="inputclass">
                                    <input type={firs ? "text" : "password"} placeholder="Confirm Password" value={confirmpassword} onChange={(e) => setConfirmpassword(e.target.value)} />
                                    <i className={firs ? "fa fa-eye" : "fa fa-eye-slash"} onClick={toggleConfirmPasswordVisibility}></i>
                                </div>
                                <br />
                                <select value={bloodtype} onChange={(e) => setBloodtype(e.target.value)}>
                                    <option>A+</option>
                                    <option>A-</option>
                                    <option>B+</option>
                                    <option>B-</option>
                                    <option>O+</option>
                                    <option>O-</option>
                                    <option>AB+</option>
                                    <option>AB-</option>
                                </select>
                                <br />
                                <input type="button" className="submit" value="CREATE ACCOUNT" onClick={handleSubmit}></input>
                            </div>
                        </Col>
                    </Row>
                    <br />
                </Container>
            </div>
        </div>
    );
}

export default Main;