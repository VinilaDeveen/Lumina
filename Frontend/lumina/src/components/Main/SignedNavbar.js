import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import logo from '../../assets/icons/LuminaLogo.ico';
import avatarIcon from '../../assets/icons/DemoAvatar.png';
import { useAuth } from '../../context/AuthContext';
import FilledAlerts from './FilledAlerts';

export default function SignedNavbar() {
    const { logout } = useAuth();
    const navigate = useNavigate();
  const [role,setRole] = useState('');
  const [Fname,setFName] = useState('');
  const [Lname,setLName] = useState('');
  const [handleProfileView,setHandleProfileView] = useState(false);
  const [userId,setUserId] = useState("");
  const [imageSrc,setImageSrc] = useState("");
  const [path,setPath] = useState("");

  const location = useLocation();
  const isDonorProfile = location.pathname === "/user/profiles";

  const token = localStorage.getItem("accessToken");
  const decoded = jwtDecode(token);
  const userEmail = decoded.sub;

  const fetchUserInformations = async()=>{
    try{
      const response = await axios.get(`http://localhost:8080/api/lumina/user/email?userEmail=${userEmail}`,
        { headers: { Authorization: `Bearer ${token}` } });
      console.log("User Details",response.data);
      const data = response.data;
      setUserId(data.userId);
      setRole(data.userRole);
      setLName(data.userLastName);
      setFName(data.userFirstName);
      
    }catch(error){
      console.log("There is an issue with fetching user informations ",error);
      alert("There is an issue with fetching user informations");
    }
  }

  const loadProfileImage = async () => {
    try {
      if (!userId) return; // Prevent the function from running without a valid userId
      const response = await axios.get(
        `http://localhost:8080/api/lumina/user/viewProfilePicture/${userId}`,
        { responseType: 'blob', headers: { Authorization: `Bearer ${token}` } }
      );
      if(response.data.size!=0){
        const imageUrl = URL.createObjectURL(response.data);
        setImageSrc(imageUrl);
      }else{
        setImageSrc('');
      }
    } catch (error) {
      console.log('Error fetching profile image:', error);
      alert('Failed to fetch profile image');
    }
  };

  const showProfileInformations = (e)=>{
    e.preventDefault();
    setHandleProfileView(!handleProfileView);
  }

  const handleLogout = ()=>{
    const confirmed = window.confirm("Are you sure you want to logout?");
    if(confirmed){
        logout()
    }
  }


  useEffect(()=>{
    fetchUserInformations();
    loadProfileImage();
  },[])

  useEffect(() => {
    loadProfileImage();
  }, [userId]);
  return (
    <div className="Alogin"  style={{position:"sticky",top:"0px",zIndex:"99999",borderRadius:"0px"}}>
      <div className='navbar'>
        <div className='navbar-left'>
            <Link to={'/'}><div className='logo'><img src={logo} alt='logo'/><span className='logo-text'>Lumina</span></div></Link>
        </div>
        <div className='navbar-centered'>
            <ul style={{marginBottom:"0px"}}>
                <Link to={'/home'}><li className={useLocation().pathname === "/"?'active':''} >HOME</li></Link>
                <Link to={'/aboutus'}><li className={useLocation().pathname === "/aboutus"?'active':''}>ABOUT US</li></Link>
                <Link to={'/contactus'}><li className={useLocation().pathname === '/contactus'?'active':''}>CONTACT US</li></Link>
                <Link to={'/feedback'}><li className={useLocation().pathname === '/feedback'?'active':''}>FEEDBACK</li></Link>
                <Link to={'/help'}><li className={useLocation().pathname === '/help'?'active':''}>HELP</li></Link>
            </ul>
        </div>
        <div className="login-info">
            <div className="profile" onClick={(e)=>showProfileInformations(e)}>
              <div className="profile-info" style={{cursor:"pointer"}}>
                <p className="title"  onClick={(e)=>showProfileInformations(e)}>{Fname+" "+Lname}</p>
                <p className="role" onClick={(e)=>showProfileInformations(e)}>{role}</p>
              </div>
              <img src={imageSrc!=''?imageSrc:avatarIcon} style={{objectFit:"cover"}} alt="profileImage" />
            </div>
            {handleProfileView &&
            <>
              <div className='drop-down' style={{position:"absolute", fontWeight:"500",top:"90px",zIndex:"888",color:"#333333",backgroundColor:"white",marginTop:"-10px ",padding:"10px 40px -10px 0px",borderRadius:"10px", fontSize:"14px", boxShadow:"5px 5px 4px #0000001a"}}>
                <Link style={{color:"#333333",textDecorationLine:"none"}} to="/user/profiles"><p style={{marginTop:"10px", margin:"20px 30px"}}>Update Profile Details</p></Link>
                <Link style={{color:"#333333",textDecorationLine:"none"}} to={`/user/profiles/${userId}`} ><p style={{marginTop:"10px", margin:"20px 30px"}}>Update Profile Image</p></Link>
                <Link style={{color:"#333333",textDecorationLine:"none"}} to="/"><p style={{marginTop:"10px", margin:"20px 30px"}}>Go To Dashboard</p></Link>
                <p style={{marginTop:"10px", margin:"20px 30px",color:"#333333",cursor:"pointer"}} onClick={()=>handleLogout()}><p>Log out</p></p>
              </div>
            </>}
        </div>
    </div>
      </div>
  )
}
