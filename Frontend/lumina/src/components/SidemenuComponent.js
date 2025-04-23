import React, { useEffect, useState } from 'react';
import '../../src/styles/SidemenuComponent.css';

import dashboard from '../assets/icons/dashboard.svg';
import AppointmentImage from '../assets/icons/appointments.svg';
import donationsImage from '../assets/icons/donations.svg';
import logo from '../assets/icons/LuminaLogo.ico';
import bloodStatisticsImage from '../assets/icons/bloodStatistics.svg';
import employeeImage from '../assets/icons/employee.svg';
import phlebotomistImage from '../assets/icons/phlebotomist.svg';
import eligibilityTestsImage from '../assets/icons/eligibilityTesting.svg';
import labTechnicianImage from '../assets/icons/labTechnician.svg';
import bloodBankImage from '../assets/icons/bloodBank.svg';
import bloodBankInventoryImage from '../assets/images/bloodbankInventory.png';
import bloodReqeustsImage from '../assets/images/bloodRequest.png';
import historyImage from '../assets/icons/history.svg';
import bloodTestsImage from '../assets/icons/bloodTests.svg';
import menu from '../assets/icons/BurgerMenu.svg';
import logoutIcon from '../assets/icons/logoutIcon.svg';
import bloodCampImage from '../assets/icons/bloodCamp.svg';
import onWalkImage from '../assets/icons/onWalk.svg';
import feedbackImage from '../assets/icons/feedback.svg';

import { Link, useLocation } from 'react-router-dom';

import { useAuth } from "../context/AuthContext";

export default function SidemenuComponent({ userRole }) {
  const { logout } = useAuth();

  const handlelogout = ()=>{
    const confirmed = window.confirm("Are you sure you want to logout");
    if(confirmed){
      logout()
    }
  }
  

  console.log("USER ROLE", userRole);
  // Donor Menu
  const isDonorDashboard = useLocation().pathname === '/donor';
  const isDonorDonations = useLocation().pathname === '/donor/Donations';
  const isDonorAppointment = useLocation().pathname === '/donor/Appointments';
  const isDonorBloodCamp = useLocation().pathname === '/donor/BloodCamp';

  // Phlebotomist Menu
  const isPhlebotomistAppointments = useLocation().pathname === '/phlebotomist/appointments';
  const isPhlebotomistReciveDonation = useLocation().pathname === '/phlebotomist/donations';
  const isPhlebotomistDashboard = useLocation().pathname === '/phlebotomist';
  const isPhlebotomistBloodStatistics = useLocation().pathname === '/phlebotomist/BloodStatistics';
  const isPhlebotomistBloodCamp = useLocation().pathname === '/phlebotomist/bloodCamp';
  const isPhlebotomistOnWalk = useLocation().pathname === '/phlebotomist/onWalk';

  // Admin menu
  const isAdminDashboard = useLocation().pathname === '/administrator';
  const isAdminBloodStatistics = useLocation().pathname === '/administrator/BloodStatistics';
  const isAdminBloodTests = useLocation().pathname === '/';
  const isAdminEmployee = useLocation().pathname === '/administrator/Employee';
  const isAdminDonors = useLocation().pathname === '/';
  const isAdminDonorsAppointments = useLocation().pathname === '/administrator/DonorApointments';
  const isAdminDonorDonations = useLocation().pathname === '/administrator/Donations';
  const isAdminPhlebotomist = useLocation().pathname === '/';
  const isAdminPhlebotomistEligibilityTests = useLocation().pathname === '/administrator/EligibilityTest';
  const isAdminLabTechnician = useLocation().pathname === '/';
  const isAdminLabTechnicianBloodTests = useLocation().pathname === '/administrator/LabTechnicianBloodTest';
  const isAdminBankManager = useLocation().pathname === '/';
  const isAdminBankMangerBankInventory = useLocation().pathname === '/administrator/BloodInventory';
  const isAdminBankManagerBloodRequests = useLocation().pathname === '/administrator/BBMBloodRequests';
  const isAdminActivityHistory = useLocation().pathname === '/administrator/AdminActivityHistory';
  const isAdminFeedbacks = useLocation().pathname === '/administrator/feedback';

  //Hospital Menu
  const isHospitalDashboard = useLocation().pathname === '/hospital';
  const isHospitalBloodRequests = useLocation().pathname === '/hospital/BloodRequests';
  const isHospitalBloodCamp = useLocation().pathname === '/hospital/BloodCamp';

  //BBM Menu
  const isBBMDashboard = useLocation().pathname === '/bloodbankmanager';
  const isBBMBloodInventory = useLocation().pathname === '/bloodbankmanager/BloodInventory';
  const isBBMBloodRequests = useLocation().pathname === '/bloodbankmanager/BloodRequests';
  const isBBMDonations = useLocation().pathname === '/bloodbankmanager/Donations';

  //Lab Technician Menu
  const isLabTechnicianDashboard = useLocation().pathname === '/labtechnician';
  const isLabTechnicianBloodTest = useLocation().pathname === '/labtechnician/BloodTest';
  const isLabTechnicianDonations = useLocation().pathname === '/labtechnician/Donations';

  //Volunteer Menu
  const isVolunteerDashboard = useLocation().pathname === '/Volunteer/Dashboard';
  const isVolunteerBloodCamp = useLocation().pathname === '/';

  const handleToggler = (e) => {
    if ((e.key = 'Click')) {
      const sidebar = document.querySelector('.sidebar');
      if (sidebar) {
        sidebar.classList.toggle('collapsed');
      }
    }
  };

  const active = {
    backgroundColor: 'rgba(255, 255, 255, 0.237)',
    backdropFilter: 'blur(1px)',
    cursor: 'pointer',
  };

  const menuItems = () => {
    if (userRole === 'admin' || userRole === 'ADMINISTRATOR') {
      return (
        <nav className="sidebar-nav">
          <ul className="nav-list primary-nav">
            <li className="nav-item" style={{ marginTop: '-10px' }}>
              <Link to="/administrator" className="nav-link" style={isAdminDashboard ? active : {}}>
                <img src={dashboard} />
                <span className="nav-label">Dashboard</span>
              </Link>
              <span className="nav-tooltip">Dashboard</span>
            </li>
            <li className="nav-item">
              <Link to="/administrator/BloodStatistics" className="nav-link" style={isAdminBloodStatistics ? active : {}}>
                <img src={bloodStatisticsImage} />
                <span className="nav-label">Blood Statistics</span>
              </Link>
              <span className="nav-tooltip">Blood Statistics</span>
            </li>
            <li className="nav-item">
              <Link to="/administrator/Employee" className="nav-link" style={isAdminEmployee ? active : {}}>
                <img src={employeeImage} />
                <span className="nav-label">Employee</span>
              </Link>
              <span className="nav-tooltip">Employee</span>
            </li>
            <li className="nav-item">
              <div
                className="nav-link"
                style={
                  isAdminDonors
                    ? active
                    : isAdminDonorsAppointments
                    ? active
                    : isAdminDonorDonations
                    ? active
                    : { cursor: 'pointer' }
                }
              >
                <img src={donationsImage} />
                <span className="nav-label">Donors</span>
              </div>
              <span className="nav-tooltip">Donors</span>
              <ul>
                <li className="nav-item hidden">
                  <Link
                    to="/administrator/DonorApointments"
                    className="nav-link"
                    style={isAdminDonorsAppointments ? active : {}}
                  >
                    <img src={AppointmentImage} />
                    <span className="nav-label">Appointments</span>
                  </Link>
                  <span className="nav-tooltip">Appointments</span>
                </li>
                <li className="nav-item hidden">
                  <Link to="/administrator/Donations" className="nav-link" style={isAdminDonorDonations ? active : {}}>
                    <img src={donationsImage} />
                    <span className="nav-label">Donations</span>
                  </Link>
                  <span className="nav-tooltip">Donations</span>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <div
                className="nav-link"
                style={
                  isAdminPhlebotomist ? active : isAdminPhlebotomistEligibilityTests ? active : { cursor: 'pointer' }
                }
              >
                <img src={phlebotomistImage} />
                <span className="nav-label">Phlebotomist</span>
              </div>
              <span className="nav-tooltip">Phlebotomist</span>
              <ul>
                <li className="nav-item hidden">
                  <Link
                    to="/administrator/EligibilityTest"
                    className="nav-link"
                    style={isAdminPhlebotomistEligibilityTests ? active : {}}
                  >
                    <img src={eligibilityTestsImage} />
                    <span className="nav-label">Eligibility Tests</span>
                  </Link>
                  <span className="nav-tooltip">Eligibility Tests</span>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <div
                className="nav-link"
                style={isAdminLabTechnician ? active : isAdminLabTechnicianBloodTests ? active : { cursor: 'pointer' }}
              >
                <img src={labTechnicianImage} />
                <span className="nav-label">Lab Technician</span>
              </div>
              <span className="nav-tooltip">Lab Technician</span>
              <ul>
                <li className="nav-item hidden">
                  <Link to="/administrator/LabTechnicianBloodTest" className="nav-link" style={isAdminBloodTests ? active : {}}>
                    <img src={bloodTestsImage} />
                    <span className="nav-label">Blood Tests</span>
                  </Link>
                  <span className="nav-tooltip">Blood Tests</span>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <div
                className="nav-link"
                style={
                  isAdminBankManager
                    ? active
                    : isAdminBankMangerBankInventory
                    ? active
                    : isAdminBankManagerBloodRequests
                    ? active
                    : { cursor: 'pointer' }
                }
              >
                <img src={bloodBankImage} />
                <span className="nav-label">Bank Manager</span>
              </div>
              <span className="nav-tooltip">Bank Manager</span>
              <ul>
                <li className="nav-item hidden">
                  <Link
                    to="/administrator/BloodInventory"
                    className="nav-link"
                    style={isAdminBankMangerBankInventory ? active : {}}
                  >
                    <img src={bloodBankInventoryImage} />
                    <span className="nav-label">Bank Inventory</span>
                  </Link>
                  <span className="nav-tooltip">Bank Inventory</span>
                </li>
                <li className="nav-item hidden">
                  <Link
                    to="/administrator/BBMBloodRequests"
                    className="nav-link"
                    style={isAdminBankManagerBloodRequests ? active : {}}
                  >
                    <img src={bloodReqeustsImage} />
                    <span className="nav-label">Blood Requests</span>
                  </Link>
                  <span className="nav-tooltip">Blood Requests</span>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <Link to="/administrator/feedback" className="nav-link" style={isAdminFeedbacks ? active : {}}>
                <img src={feedbackImage} />
                <span className="nav-label">Feedbacks</span>
              </Link>
              <span className="nav-tooltip">Feedbacks</span>
            </li>
            <li className="nav-item">
              <Link to="/administrator/AdminActivityHistory" className="nav-link" style={isAdminActivityHistory ? active : {}}>
                <img src={historyImage} />
                <span className="nav-label">Activity History</span>
              </Link>
              <span className="nav-tooltip">Activity History</span>
            </li>
          </ul>
          <ul className="nav-list secondary-nav">
            <li className="nav-item" onClick={()=>handlelogout()}>
              <a className="nav-link">
              <img src={logoutIcon} />
                <span className="nav-label" style={{ cursor: 'pointer' }} >
                  Logout
                </span>
              </a>
            </li>
          </ul>
        </nav>
      );
    } else if (userRole === 'donor'|| userRole === 'DONOR') {
      return (
        <nav className="sidebar-nav">
          <ul className="nav-list primary-nav">
            <li className="nav-item">
              <Link to="/donor" className="nav-link" style={isDonorDashboard ? active : {}}>
                <img src={dashboard} />
                <span className="nav-label">Dashboard</span>
              </Link>
              <span className="nav-tooltip">Dashboard</span>
            </li>
            <li className="nav-item hidden">
              <Link to="/donor/Appointments" className="nav-link" style={isDonorAppointment ? active : {}}>
                <img src={AppointmentImage} />
                <span className="nav-label">Appointments</span>
              </Link>
              <span className="nav-tooltip">Appointments</span>
            </li>
            <li className="nav-item hidden">
              <Link to="/donor/Donations" className="nav-link" style={isDonorDonations ? active : {}}>
                <img src={donationsImage} />
                <span className="nav-label">Donations</span>
              </Link>
              <span className="nav-tooltip">Donations</span>
            </li>
            <li className="nav-item hidden">
              <Link to="/donor/BloodCamp" className="nav-link" style={isDonorBloodCamp ? active : {}}>
                <img src={bloodCampImage} />
                <span className="nav-label">Blood Camp</span>
              </Link>
              <span className="nav-tooltip">Blood Camp</span>
            </li>
          </ul>
          <ul className="nav-list secondary-nav">
            <li className="nav-item" onClick={()=>handlelogout()}>
              <a className="nav-link">
                <img src={logoutIcon} />
                <span className="nav-label" style={{ cursor: 'pointer' }}>
                  Logout
                </span>
              </a>
            </li>
          </ul>
        </nav>
      );
    } else if (userRole === 'hospital' || userRole ==='HOSPITAL') {
      return (
        <nav className="sidebar-nav">
          <ul className="nav-list primary-nav">
            <li className="nav-item">
              <Link to="/hospital" className="nav-link" style={isHospitalDashboard ? active : {}}>
                <img src={dashboard} />
                <span className="nav-label">Dashboard</span>
              </Link>
              <span className="nav-tooltip">Dashboard</span>
            </li>
            <li className="nav-item hidden">
              <Link to="/hospital/BloodRequests" className="nav-link" style={isHospitalBloodRequests ? active : {}}>
                <img src={AppointmentImage} />
                <span className="nav-label">Blood Requests</span>
              </Link>
              <span className="nav-tooltip">Blood Requests</span>
            </li>
            <li className="nav-item hidden">
              <Link to="/hospital/BloodCamp" className="nav-link" style={isHospitalBloodCamp ? active : {}}>
                <img src={bloodCampImage} />
                <span className="nav-label">Blood Camp</span>
              </Link>
              <span className="nav-tooltip">Blood Camp</span>
            </li>
          </ul>
          <ul className="nav-list secondary-nav">
            <li className="nav-item" onClick={()=>handlelogout()}>
              <a className="nav-link" style={{ cursor: 'pointer' }}>
              <img src={logoutIcon} />
                <span className="nav-label" style={{ cursor: 'pointer' }} >
                  Logout
                </span>
              </a>
            </li>
          </ul>
        </nav>
      );
    } else if (userRole === 'phlebotomist' || userRole === 'PHLEBOTOMIST') {
      return (
        <nav className="sidebar-nav">
          <ul className="nav-list primary-nav">
            <li className="nav-item">
              <Link to="/phlebotomist" className="nav-link" style={isPhlebotomistDashboard ? active : {}}>
                <img src={dashboard} />
                <span className="nav-label">Dashboard</span>
              </Link>
              <span className="nav-tooltip">Dashboard</span>
            </li>
            <li className="nav-item hidden">
              <Link
                to="/phlebotomist/BloodStatistics"
                className="nav-link"
                style={isPhlebotomistBloodStatistics ? active : {}}
              >
                <img src={bloodStatisticsImage} />
                <span className="nav-label">Blood Statistics</span>
              </Link>
              <span className="nav-tooltip">Blood Statistics</span>
            </li>
            <li className="nav-item hidden">
              <Link
                to="/phlebotomist/appointments"
                className="nav-link"
                style={isPhlebotomistAppointments ? active : {}}
              >
                <img src={AppointmentImage} />
                <span className="nav-label">Appointments</span>
              </Link>
              <span className="nav-tooltip">Appointments</span>
            </li>
            <li className="nav-item hidden">
              <Link to="/phlebotomist/bloodCamp" className="nav-link" style={isPhlebotomistBloodCamp ? active : {}}>
                <img src={bloodCampImage} />
                <span className="nav-label">Blood Camps</span>
              </Link>
              <span className="nav-tooltip">Blood Camps</span>
            </li>
            <li className="nav-item hidden">
              <Link to="/phlebotomist/onWalk" className="nav-link" style={isPhlebotomistOnWalk ? active : {}}>
                <img src={onWalkImage} />
                <span className="nav-label">On Walk</span>
              </Link>
              <span className="nav-tooltip">On Walk</span>
            </li>
            <li className="nav-item hidden">
              <Link
                to="/phlebotomist/donations"
                className="nav-link"
                style={isPhlebotomistReciveDonation ? active : {}}
              >
                <img src={donationsImage} />
                <span className="nav-label">Recieved Donations</span>
              </Link>
              <span className="nav-tooltip">Recieved Donations</span>
            </li>
          </ul>
          <ul className="nav-list secondary-nav">
            <li className="nav-item" onClick={()=>handlelogout()}>
              <a className="nav-link" style={{ cursor: 'pointer' }}>
              <img src={logoutIcon} />
                <span className="nav-label" style={{ cursor: 'pointer' }}>
                  Logout
                </span>
              </a>
            </li>
          </ul>
        </nav>
      );
    } else if (userRole === 'bbm' || userRole ==='BLOODBANKMANAGER') {
      return (
        <nav className="sidebar-nav">
          <ul className="nav-list primary-nav">
            <li className="nav-item">
              <Link to="/bloodbankmanager" className="nav-link" style={isBBMDashboard ? active : {}}>
                <img src={dashboard} />
                <span className="nav-label">Dashboard</span>
              </Link>
              <span className="nav-tooltip">Dashboard</span>
            </li>
            <li className="nav-item hidden">
              <Link to="/bloodbankmanager/BloodInventory" className="nav-link" style={isBBMBloodInventory ? active : {}}>
                <img src={bloodBankInventoryImage} />
                <span className="nav-label">Blood Inventory</span>
              </Link>
              <span className="nav-tooltip">Blood Inventory</span>
            </li>
            <li className="nav-item hidden">
              <Link to="/bloodbankmanager/BloodRequests" className="nav-link" style={isBBMBloodRequests ? active : {}}>
                <img src={bloodReqeustsImage} />
                <span className="nav-label">Blood Requests</span>
              </Link>
              <span className="nav-tooltip">Blood Requests</span>
            </li>
            <li className="nav-item hidden">
              <Link to="/bloodbankmanager/Donations" className="nav-link" style={isBBMDonations ? active : {}}>
                <img src={donationsImage} />
                <span className="nav-label">Donations</span>
              </Link>
              <span className="nav-tooltip">Donations</span>
            </li>
          </ul>
          <ul className="nav-list secondary-nav">
            <li className="nav-item" onClick={()=>handlelogout()}>
              <a className="nav-link" style={{ cursor: 'pointer' }}>
              <img src={logoutIcon} />
                <span className="nav-label" style={{ cursor: 'pointer' }}>
                  Logout
                </span>
              </a>
            </li>
          </ul>
        </nav>
      );
    } else if (userRole === 'labTechnician' || userRole === 'LABTECHNICIAN') {
      return (
        <nav className="sidebar-nav">
          <ul className="nav-list primary-nav">
            <li className="nav-item">
              <Link to="/labtechnician" className="nav-link" style={isLabTechnicianDashboard ? active : {}}>
                <img src={dashboard} />
                <span className="nav-label">Dashboard</span>
              </Link>
              <span className="nav-tooltip">Dashboard</span>
            </li>
            <li className="nav-item hidden">
              <Link to="/labtechnician/Donations" className="nav-link" style={isLabTechnicianDonations ? active : {}}>
                <img src={donationsImage} />
                <span className="nav-label">Donations</span>
              </Link>
              <span className="nav-tooltip">Donations</span>
            </li>
            <li className="nav-item hidden">
              <Link to="/labtechnician/BloodTest" className="nav-link" style={isLabTechnicianBloodTest ? active : {}}>
                <img src={eligibilityTestsImage} />
                <span className="nav-label">Blood Test result</span>
              </Link>
              <span className="nav-tooltip">Blood Test result</span>
            </li>
          </ul>
          <ul className="nav-list secondary-nav">
            <li className="nav-item" onClick={()=>handlelogout()}>
              <a className="nav-link" style={{ cursor: 'pointer' }}>
              <img src={logoutIcon} />
                <span className="nav-label" style={{ cursor: 'pointer' }}>
                  Logout
                </span>
              </a>
            </li>
          </ul>
        </nav>
      );
    } else if (userRole === 'volunteer') {
      return (
        <nav className="sidebar-nav">
          <ul className="nav-list primary-nav">
            <li className="nav-item">
              <Link to="/Volunteer/Dashboard" className="nav-link" style={isVolunteerDashboard ? active : {}}>
                <img src={dashboard} />
                <span className="nav-label">Dashboard</span>
              </Link>
              <span className="nav-tooltip">Dashboard</span>
            </li>
            <li className="nav-item hidden">
              <Link to="" className="nav-link" style={isVolunteerBloodCamp ? active : {}}>
                <img src={donationsImage} />
                <span className="nav-label">Blood Camp</span>
              </Link>
              <span className="nav-tooltip">Blood Camp</span>
            </li>
          </ul>
          <ul className="nav-list secondary-nav">
            <li className="nav-item" onClick={()=>handlelogout()}>
              <a className="nav-link" style={{ cursor: 'pointer' }}>
              <img src={logoutIcon} />
                <span className="nav-label" style={{ cursor: 'pointer' }}>
                  Logout
                </span>
              </a>
            </li>
          </ul>
        </nav>
      );
    }
  };

  return (
    <aside className="sidebar">
      <header className="sidebar-header">
        <a
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '25px',
            textDecoration: 'none',
            fontWeight: 'bold',
          }}
          className="header-logo"
        >
          <img src={logo} alt="lumina" />
          <span style={{ marginLeft: '10px', color: 'white', textDecoration: '' }}>Lumina</span>
        </a>
        <button className="toggler iconSidebar" onClick={(e) => handleToggler(e)}>
          <img src={menu} />
        </button>
      </header>
      {menuItems()}
    </aside>
  );
}
