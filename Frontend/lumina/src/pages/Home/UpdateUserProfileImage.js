import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import SidemenuComponent from '../../components/SidemenuComponent';
import TopBannerComponent from '../../components/TopBannerComponent';
import avatarIcon from '../../assets/icons/DemoAvatar.png';

export default function UpdateUserProfileImage() {
    const {userId} = useParams();
    const [imageSrc,setImageSrc] = useState("");
    const [selectedFile,setSelectedFile] = useState(null);
    const [userRole,setUserRole] = useState("");

  const token = localStorage.getItem("accessToken");
  const decoded = jwtDecode(token);
  const userEmail = decoded.sub;

  const fetchUserInformations = async()=>{
    try{
      const response = await axios.get(`http://localhost:8080/api/lumina/user/email?userEmail=${userEmail}`,
        { headers: { Authorization: `Bearer ${token}` } });
      console.log("User Details",response.data);
      const data = response.data;
      setUserRole(data.userRole);
      
    }catch(error){
      console.log("There is an issue with fetching user informations ",error);
      alert("There is an issue with fetching user informations");
    }
  }

    const loadProfileImage = async()=>{
        try {
            const response = await axios.get(`http://localhost:8080/api/lumina/user/viewProfilePicture/${userId}`,{ responseType: "blob" ,headers: { Authorization: `Bearer ${token}`  }})
            const imageUrl = URL.createObjectURL(response.data);
            if(response.data.size!=0){
              const imageUrl = URL.createObjectURL(response.data);
              setImageSrc(imageUrl);
            }else{
              setImageSrc('');
            }
        } catch (error) {
            console.log(error,"Error ")
            alert("Failed to fetch image data")
        }
    }

    const handleFileChange = (event) => {
      const file = event.target.files[0]; 
      if (file) {
        const fileName = file.name;
        setSelectedFile(file); 
        document.getElementById("file-name").textContent = `Chosen File: ${fileName}`;
      } else {
        document.getElementById("file-name").textContent = "No file chosen";
      }
    };
    

    const uploadProfileImage = async () => {
        if (!selectedFile) {
            alert("Please select a file to upload.");
            return;
        }

        const formData = new FormData(); // Create FormData object
        formData.append("file", selectedFile); // Append the file with key 'file'

        try {
            const response = await axios.put(
                `http://localhost:8080/api/lumina/user/updateProfilePicture/${userId}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}` 
                    },
                }
            );
            alert("Image uploaded successfully!");
            loadProfileImage(); // Reload the profile image after successful upload
        } catch (error) {
            console.error(error);
            alert("Failed to upload image. Please try again later!");
        }
        document.getElementById("file-name").textContent = "No file chosen";
    };

    useEffect(()=>{
        loadProfileImage();
        fetchUserInformations();
    },[])
    
  return (
    <>
    <div className="D-main">
        <SidemenuComponent userRole={userRole} />
        {
          <div className="Aappointments">
            <TopBannerComponent />
            <div style={{width:"100%",display:"flex",justifyContent:"center",marginTop:"40px"}}>
                <div style={{display:"flex", alignItems:"center",backgroundColor:"white", padding:"20px 40px",borderRadius:"30px", height:"450px",boxShadow:"5px 5px 4px #0000001a"}}>
                    <div style={{display:"flex",flexDirection:"column", alignItems:"center", marginRight:"30px"}}>
                        <p style={{fontSize:"18px",fontWeight:"500"}}>Upload an image to update the profile picture</p>
                        <label for="file-upload" class="custom-file-upload" style={{borderRadius:"10px",fontWeight:"bold"}}>
                            Choose Image
                        </label>
                        <span id="file-name" style={{marginTop:"20px"}}>No file chosen</span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ margin: "10px 0"}}
                            id="file-upload"
                        />
                        <button style={{backgroundColor:"rgb(0 86 255)"}} className='AsaSubmit' onClick={uploadProfileImage}><i class="fa-solid fa-upload" style={{color: "#ffffff",marginRight:"8px"}}></i>Upload Image</button>
                    </div>
                    <div>
                      <img src={imageSrc!=''?imageSrc:avatarIcon} style={{objectFit:"cover",width:"300px"}} alt="profileImage" />
                    </div>
                </div>
                
            </div>
          </div>
        }
      </div>
    </>
  )
}
