import React, { useEffect, useState } from 'react'
import Charts from "../Employee/Charts";
import TopBannerComponent from '../TopBannerComponent';
import SidemenuComponent from '../SidemenuComponent';

export default function HospitalDashboard() {
    const [hidePie,setHidePie] = useState(true);
  return (
    <>
      <div className="D-main">
        <SidemenuComponent userRole={'hospital'} />
        {
          <div className="Aappointments">
            <TopBannerComponent />
            <h1 style={{margin:"1%"}}>Dashboard</h1>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"4%"}}>
                <Charts hidePie={hidePie}  />
            </div>
          </div>
        }
      </div>
    </>
  )
}
