import React from 'react'
import BStatistics from './BStatistics';
import PieChart from './PieChart';
import { useLocation } from 'react-router-dom';

export default function BloodStatistics({bloodData,bloodDropStatistics,statistics}) {
    const isLabTech = useLocation().pathname === "/labtechnician";
    
  return (
    <>
    <BStatistics bloodDropStatistics={bloodDropStatistics} />
    <div className="statistics-and-chart">
        <div className="statistics-section">
        <div className="statistics-box">
            <p className="stat-label">Total Blood Donations</p>
            <h4 className="stat-value">{statistics.totalDonors}</h4>
        </div>
        <div className="statistics-box">
            <p className="stat-label">Today Blood Donations</p>
            <h4 className="stat-value">{statistics.todayDonors}</h4>
        </div>
        {!isLabTech?
            <div className="statistics-box">
                <p className="stat-label">Today Blood Requests</p>
                <h4 className="stat-value">{statistics.totlaRequests}</h4>
            </div>
            :null
        }
        
        </div>
        <div >
            <PieChart bloodData={bloodData}/>
        </div>
    </div>
    </>
  )
}



