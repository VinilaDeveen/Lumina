import React, { useState } from 'react'
import SidemenuComponent from './SidemenuComponent';
import TopBannerComponent from './TopBannerComponent';
import close from '../assets/icons/close.svg'
import axios from 'axios';

export default function BloodCampPop() {
    const [enableAddEmployee,setEnableAddEmployee] = useState(false);

    const [StartingTime, setStartingTime] = useState("");
    const [EndingTime, setEndingTime] = useState("");
    const [DonorCount, setDonorCount] = useState("");
    const [Date, setDate] = useState("");
    const [Location, setLocation] = useState("");

    const handleBloodCampCreation= (e)=>{
        const data = {starting_time:StartingTime,ending_time:EndingTime,donor_count:DonorCount,date:Date,location:Location};
        try{
            axios.post(`localhost:8080`,data)
        }catch(error){
            console.log(error,"Error In Blood Camp Creation");
            alert("Error In Blood Camp Creation");
        }
    }

  return (
    <>
      <div className="D-main">
        <SidemenuComponent userRole={'admin'} />
        {
          <div className="Aappointments">
            <TopBannerComponent />
            <button onClick={()=>setEnableAddEmployee(true)} className="AsaButton">
              ADD EMPLOYEE
            </button>
            {enableAddEmployee && 
                <>
                    <div className="searchDonor" style={{width:"auto",height:"70%"}}>
                    <div className="image"></div>
                        <div className="search">
                        <div className="exit" onClick={() => setEnableAddEmployee(false)}>
                            <img src={close} alt="closeImage" />
                        </div>
                        <p style={{fontSize:"24px"}}>Create Employee Account</p>
                        <form id="searchDonor">
                            <input
                                style={{fontSize:"16px"}}
                                autoComplete="off"
                                placeholder="Starting Time"
                                type="time"
                                key="StartingTime"
                                required
                                name="StartingTime"
                                value={StartingTime}
                                onChange={(e) => setStartingTime(e.target.value)}
                            />
                            <input
                                style={{fontSize:"16px"}}
                                autoComplete="off"
                                placeholder="Ending Time"
                                type="time"
                                key="EndingTime"
                                required
                                name="EndingTime"
                                value={EndingTime}
                                onChange={(e) => setEndingTime(e.target.value)}
                            />
                            <input
                                style={{fontSize:"16px"}}
                                autoComplete="off"
                                placeholder="Donor Count"
                                type="text"
                                key="DonorCount"
                                required
                                name="DonorCount"
                                value={DonorCount}
                                onChange={(e) => setDonorCount(e.target.value)}
                            />
                            <input
                                style={{fontSize:"16px"}}
                                autoComplete="off"
                                placeholder="Date"
                                type="text"
                                key="Date"
                                required
                                name="Date"
                                value={Date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                           
                            <input
                                style={{fontSize:"16px"}}
                                autoComplete="off"
                                placeholder="Location"
                                type="Location"
                                key="Location"
                                required
                                name="Location"
                                value={Location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                            <button onClick={(e) => handleBloodCampCreation(e)} className="AsaSubmit">
                            REQUEST BLOOD CAMP
                            </button>
                        </form>
                        </div>
                    </div>
                </>
                }
          </div>
        }
      </div>
    </>
  )
}
