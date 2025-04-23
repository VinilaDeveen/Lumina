import React from 'react'
import SidemenuComponent from '../../components/SidemenuComponent';
import TopBannerComponent from '../../components/TopBannerComponent';

export default function AdminEmployee() {
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
          </div>
        }
      </div>
    </>
  );
}