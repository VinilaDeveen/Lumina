import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RoleRoute from "./routes/RoleRoute";
import { useAuth } from './context/AuthContext';
import './App.css';

import DonorDashboardPage from './pages/DonorDashboardPage';
import DonorAppointmentsPage from './pages/DonorAppointmentsPage';
import DonorDonationsPage from './pages/DonorDonationsPage';
import OTPVarification from './components/Main/Popups/OTPVarificationComponent';
import BloodTestPage from './pages/LabTech/BloodTestPage';
import Dashboard from './pages/BloodBankManager/Dashboard';
import BankInventory from './pages/BloodBankManager/BankInventory';
import BloodRequests from './pages/BloodBankManager/BloodRequests';
import PhBloodStatistics from './pages/Phlebotomist/PhBloodStatistics';
import ContactUs from './pages/Main/ContactUs';
import LabTechDashboard from './pages/LabTech/LabTechDashboard';
/* import PhlebotomistRecieveDonationsPage from './pages/Phlebotomist/PhlebotomistRecieveDonationsPage'; */
import BloodStatistic from './pages/Admin/BloodStatistic';
import PhlebotomistDashboard from './pages/Phlebotomist/PhlebotomistDashboard';
/* import ContactPage from './pages/Home/ContactPage'; */
import HomePage from './pages/Home/HomePage';
import AdminDonations from './pages/Admin/AdminDonations';
import AdminDonorAppointments from './pages/Admin/AdminDonorAppointments';
import AdminEligibilityTest from './pages/Admin/AdminEligibilityTest';
import AdminLabTechnicianBloodTest from './pages/Admin/AdminLabTechnicianBloodTest';
import AdminBloodInventory from './pages/Admin/AdminBloodInventory';
import AdminBBMBloodRequests from './pages/Admin/AdminBBMBloodRequests';
import AdminActivityHistory from './pages/Admin/AdminActivityHistory';
import AdminDashboard from './pages/Admin/AdminDashboard';
import HospitalBloodCamp from './pages/Hospital/HospitalBloodCamp';
import DonorBloodCamp from './pages/Donor/DonorBloodCamp';
import SignUp from './pages/Home/SignUp';
import UpdateUserProfile from './pages/Home/UpdateUserProfile';
import AdminEmployee from './pages/Admin/AdminEmployee';
import ContactPage from './pages/Home/ContactPage';
import AboutUsPage from './pages/Home/AboutUsPage';
import FeedbackPage from './pages/Home/FeedbackPage';
import PDFGenerator from './components/PDFGenerator';
import HospitalDashboard from './pages/Hospital/HospitalDashboard';
import LabTechDonations from './pages/LabTech/LabTechDonations';
import Help from './pages/Home/Help';
import Donations from './pages/BloodBankManager/Donations';
import ChangePassword from './components/Main/Popups/ChangePassword';
import HospitalBloodRequests from './pages/Hospital/HospitalBloodRequests';
import PhAppointments from './pages/Phlebotomist/PhAppointments';
import PhDonorDonations from './pages/Phlebotomist/PhDonorDonations';
import PhSearchDonor from './pages/Phlebotomist/PhSearchDonor';
import PhBloodCamp from './pages/Phlebotomist/PhBloodCamp';
import PhOnWalk from './pages/Phlebotomist/PhOnWalk';
import AdminFeedback from './pages/Admin/AdminFeedback';
import PhEligibilityTestForOnWalk from './pages/Phlebotomist/PhEligibilityTestForOnWalk';
import PhDonationProcessForOnWalk from './pages/Phlebotomist/PhDonationProcessForOnWalk';
import PhEligibilityTestForBloodCamp from './pages/Phlebotomist/PhEligibilityTestForBloodCamp';
import PhDonationProcessForBloodCamp from './pages/Phlebotomist/PhDonationProcessForBloodCamp';
import PhEligibilityTestForAppointment from './pages/Phlebotomist/PhEligibilityTestForAppointment';
import PhDonationProcessForAppointment from './pages/Phlebotomist/PhDonationProcessForAppointment';
import TermsOfServicesPage from './pages/Home/TermsOfServicesPage';
import PrivacyPolicy from './pages/Home/PrivacyPolicyPage';
import ResetPassword from './pages/Home/ResetPassword';
import UpdateUserProfileImage from './pages/Home/UpdateUserProfileImage';
import SignedHomePage from './pages/Home/SignedHomePage';


const App = () => {
  const { auth } = useAuth();

  return (
    <>
      {auth.accessToken ? (
        <Routes>
          <Route path="/" element={<Navigate to={`/${auth.userRole?.toLowerCase() || ''}`} />} />
          <Route path="/donor" element={<RoleRoute userRole="DONOR"><DonorDashboardPage /></RoleRoute>}/>
          <Route path="/donor/BloodCamp" element={<RoleRoute userRole="DONOR">{<DonorBloodCamp />}</RoleRoute>}/>
          <Route path="/donor/Appointments" element={<RoleRoute userRole="DONOR">{<DonorAppointmentsPage />}</RoleRoute>}/>
          <Route path="/donor/Donations" element={<RoleRoute userRole="DONOR">{<DonorDonationsPage />}</RoleRoute>}/>
          <Route path="/donor/pdf/:donationId" element={<RoleRoute userRole="DONOR">{<PDFGenerator />}</RoleRoute>}/>
          
          {/* Admin */}
          <Route path="/administrator" element={<RoleRoute userRole="ADMINISTRATOR"><AdminDashboard /></RoleRoute>}/>
          <Route path="/administrator/BloodStatistics" element={<RoleRoute userRole="ADMINISTRATOR"><BloodStatistic /></RoleRoute>}/>  
          <Route path="/administrator/Employee" element={<RoleRoute userRole="ADMINISTRATOR"><AdminEmployee /></RoleRoute>}/>  
          <Route path="/administrator/Donations" element={<RoleRoute userRole="ADMINISTRATOR"><AdminDonations /></RoleRoute>}/>  
          <Route path="/administrator/DonorApointments" element={<RoleRoute userRole="ADMINISTRATOR"><AdminDonorAppointments /></RoleRoute>}/>  
          <Route path="/administrator/EligibilityTest" element={<RoleRoute userRole="ADMINISTRATOR"><AdminEligibilityTest /></RoleRoute>}/>  
          <Route path="/administrator/LabTechnicianBloodTest" element={<RoleRoute userRole="ADMINISTRATOR"><AdminLabTechnicianBloodTest /></RoleRoute>}/>  
          <Route path="/administrator/BloodInventory" element={<RoleRoute userRole="ADMINISTRATOR"><AdminBloodInventory /></RoleRoute>}/>  
          <Route path="/administrator/BBMBloodRequests" element={<RoleRoute userRole="ADMINISTRATOR"><AdminBBMBloodRequests /></RoleRoute>}/>  
          <Route path="/administrator/AdminActivityHistory" element={<RoleRoute userRole="ADMINISTRATOR"><AdminActivityHistory /></RoleRoute>}/>  
          <Route path="/administrator/feedback" element={<RoleRoute userRole="ADMINISTRATOR"><AdminFeedback /></RoleRoute>}/>  
          
          {/* Phlebotomist */}
          <Route path="/phlebotomist" element={<RoleRoute userRole="PHLEBOTOMIST"><PhlebotomistDashboard /></RoleRoute>}/>
          <Route path="/phlebotomist/BloodStatistics" element={<RoleRoute userRole="PHLEBOTOMIST"><PhBloodStatistics /></RoleRoute>}/>
          <Route path="/phlebotomist/appointments" element={<RoleRoute userRole="PHLEBOTOMIST"><PhAppointments /></RoleRoute>}/>
          <Route path="/phlebotomist/eligibilityTest/:userId/:appointmentId" element={<RoleRoute userRole="PHLEBOTOMIST"><PhEligibilityTestForAppointment /></RoleRoute>}/>
          <Route path="/phlebotomist/eligibilityTestOnBloodCamp/:bloodCamp/:userId" element={<RoleRoute userRole="PHLEBOTOMIST"><PhEligibilityTestForBloodCamp /></RoleRoute>}/>
          <Route path="/phlebotomist/eligibilityTest/:userId" element={<RoleRoute userRole="PHLEBOTOMIST"><PhEligibilityTestForOnWalk /></RoleRoute>}/>
          <Route path="/phlebotomist/donationsProcess/:userId/:appointmentId" element={<RoleRoute userRole="PHLEBOTOMIST"><PhDonationProcessForAppointment /></RoleRoute>}/>
          <Route path="/phlebotomist/donationsProcessOnBloodCamp/:bloodCamp/:userId" element={<RoleRoute userRole="PHLEBOTOMIST"><PhDonationProcessForBloodCamp /></RoleRoute>}/>
          <Route path="/phlebotomist/donationsProcess/:userId" element={<RoleRoute userRole="PHLEBOTOMIST"><PhDonationProcessForOnWalk /></RoleRoute>}/>
          <Route path="/phlebotomist/donations" element={<RoleRoute userRole="PHLEBOTOMIST"><PhDonorDonations /></RoleRoute>}/>
          <Route path="/phlebotomist/search" element={<RoleRoute userRole="PHLEBOTOMIST"><PhSearchDonor /></RoleRoute>}/>
          <Route path="/phlebotomist/bloodCamp" element={<RoleRoute userRole="PHLEBOTOMIST"><PhBloodCamp /></RoleRoute>}/>
          <Route path="/phlebotomist/onWalk" element={<RoleRoute userRole="PHLEBOTOMIST"><PhOnWalk /></RoleRoute>}/>
          
          {/* Blood Bank Manager */}
          <Route path="/bloodbankmanager" element={<RoleRoute userRole="BLOODBANKMANAGER"><Dashboard /></RoleRoute>}/>
          <Route path="/bloodbankmanager/BloodInventory" element={<RoleRoute userRole="BLOODBANKMANAGER"><BankInventory /></RoleRoute>}/>
          <Route path="/bloodbankmanager/BloodRequests" element={<RoleRoute userRole="BLOODBANKMANAGER"><BloodRequests /></RoleRoute>}/>
          <Route path="/bloodbankmanager/Donations" element={<RoleRoute userRole="BLOODBANKMANAGER"><Donations /></RoleRoute>}/>

          {/* Lab Technician */}
          <Route path="/labtechnician" element={<RoleRoute userRole="LABTECHNICIAN"><LabTechDashboard /></RoleRoute>}/>
          <Route path="/labtechnician/BloodTest" element={<RoleRoute userRole="LABTECHNICIAN"><BloodTestPage /></RoleRoute>}/>
          <Route path="/labtechnician/Donations" element={<RoleRoute userRole="LABTECHNICIAN"><LabTechDonations /></RoleRoute>}/>
          
          {/* Hospital */}
          <Route path="/hospital" element={<RoleRoute userRole="HOSPITAL"><HospitalDashboard /></RoleRoute>}/>
          <Route path="/hospital/BloodRequests" element={<RoleRoute userRole="HOSPITAL"><HospitalBloodRequests /></RoleRoute>}/>
          <Route path="/hospital/BloodCamp" element={<RoleRoute userRole="HOSPITAL"><HospitalBloodCamp /></RoleRoute>}/>

          <Route path="/contactUs" element={<ContactPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/help" element={<Help />} />
          <Route path="/aboutus" element={<AboutUsPage />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/user/profiles" element={<UpdateUserProfile />} />
          <Route path="/termofservice" element={<TermsOfServicesPage />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/user/profiles/:userId" element={<UpdateUserProfileImage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<SignedHomePage />} />

        </Routes>
      ) : (
        <Routes>
           <Route path="/home" element={<SignedHomePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/contactUs" element={<ContactPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/help" element={<Help />} />
          <Route path="/aboutus" element={<AboutUsPage />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/termofservice" element={<TermsOfServicesPage />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
        </Routes>
      )}
    </>
  );
};

export default App;

